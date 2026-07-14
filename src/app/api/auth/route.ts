import { NextResponse } from 'next/server';
import { getRequestContext } from '@cloudflare/next-on-pages';

export const runtime = 'edge';

async function hashSecret(secret: string, salt: string) {
  const encoder = new TextEncoder();
  const data = encoder.encode(secret + salt);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export async function POST(request: Request) {
  try {
    const { step, username, password, pin, otp } = await request.json();
    const salt = process.env.HQ_SALT;

    if (!salt) {
      return NextResponse.json({ success: false, error: 'Server misconfiguration: Missing Salt' }, { status: 500 });
    }

    const db = getRequestContext().env.reality_decoded_db;

    const agent = await db.prepare('SELECT password_hash, pin_hash, email FROM hq_agents WHERE username = ?')
      .bind(username).first<{ password_hash: string, pin_hash: string, email: string }>();

    if (!agent) {
      return NextResponse.json({ success: false, error: 'invalid_id' }, { status: 401 });
    }

    const incomingPasswordHash = await hashSecret(password, salt);

    if (step === 1) {
      if (incomingPasswordHash !== agent.password_hash) {
        return NextResponse.json({ success: false, error: 'invalid_password' }, { status: 401 });
      }
      return NextResponse.json({ success: true });
    }

    if (step === 2) {
      if (incomingPasswordHash !== agent.password_hash) {
        return NextResponse.json({ success: false, error: 'auth_tampered' }, { status: 401 });
      }
      
      const incomingPinHash = await hashSecret(pin, salt);
      if (incomingPinHash !== agent.pin_hash) {
        return NextResponse.json({ success: false, error: 'invalid_pin' }, { status: 401 });
      }

      const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
      const expiresAt = new Date(Date.now() + 10 * 60000).toISOString();

      await db.prepare(
        'INSERT INTO hq_otps (email, code, expires_at) VALUES (?, ?, ?) ON CONFLICT(email) DO UPDATE SET code = excluded.code, expires_at = excluded.expires_at'
      ).bind(agent.email, otpCode, expiresAt).run();

      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: 'Syndicate HQ | Reality Decoded <security@realitydecoded.in>', 
          to: agent.email,
          subject: 'HQ Security: Phase 3 Authorization',
          html: `<div style="font-family: monospace; background: #050505; color: #a855f7; padding: 20px; border: 1px solid #a855f7;">
                  <h2 style="text-transform: uppercase; letter-spacing: 2px;">Syndicate Command Center</h2>
                  <p style="color: #fff;">Agent <b>${username}</b>, your Phase 3 transmission code is:</p>
                  <p><b style="font-size: 28px; letter-spacing: 5px; color: #fff;">${otpCode}</b></p>
                  <p style="font-size: 12px; color: #888;">This secure link expires in 10 minutes.</p>
                 </div>`
        })
      });

      const [name, domain] = agent.email.split('@');
      const maskedName = name.length > 2 ? name.substring(0, 2) + '*'.repeat(name.length - 2) : name.substring(0, 1) + '*';
      const maskedEmail = `${maskedName}@${domain}`;

      return NextResponse.json({ success: true, requireOtp: true, maskedEmail });
    }

    if (step === 3) {
      const result = await db.prepare('SELECT code, expires_at FROM hq_otps WHERE email = ?')
        .bind(agent.email).first<{ code: string, expires_at: string }>();

      if (!result || result.code !== otp) {
        return NextResponse.json({ success: false, error: 'invalid_otp' }, { status: 401 });
      }

      if (new Date() > new Date(result.expires_at)) {
        return NextResponse.json({ success: false, error: 'otp_expired' }, { status: 401 });
      }

      await db.prepare('DELETE FROM hq_otps WHERE email = ?').bind(agent.email).run();

      const response = NextResponse.json({ success: true });
      
      // The Global Security Token
      response.cookies.set({
        name: 'syndicate_session',
        value: process.env.HQ_SESSION_TOKEN as string,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
      });

      // 🚨 NEW: The Identity Tracker Cookie
      response.cookies.set({
        name: 'hq_operator_id',
        value: username,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
      });

      return response;
    }

    return NextResponse.json({ success: false, error: 'Invalid step' }, { status: 400 });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: 'Server error.' }, { status: 500 });
  }
}