import { getRequestContext } from '@cloudflare/next-on-pages';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export const runtime = 'edge';

// Store OTPs temporarily in memory (for edge environments)
const otpStore = new Map();

export async function POST(req: Request) {
  const db = (getRequestContext().env as any).reality_decoded_db;
  const { action, email, password, otp } = await req.json();
  const cookieStore = await cookies();

  // STEP 1: VERIFY DB CREDENTIALS & SEND OTP
  if (action === 'login') {
    // Dynamically check the database for this specific user
    const user = await db.prepare("SELECT email, name FROM hr_users WHERE email = ? AND password = ?").bind(email, password).first();

    if (user) {
      const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
      otpStore.set(user.email, generatedOtp);

      // Send OTP dynamically to the user's real email
      if (process.env.RESEND_API_KEY) {
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
          body: JSON.stringify({
            from: 'Reality Decoded Security <hr@realitydecoded.in>',
            to: user.email,
            subject: 'HR Portal Access Code',
            html: `<div style="font-family: sans-serif; color: #333; padding: 20px;">
              <h2>Secure Authorization Required</h2>
              <p>Hello ${user.name || 'HR Agent'},</p>
              <p>Your one-time access code is: <strong style="font-size: 24px; color: #6b21a8;">${generatedOtp}</strong></p>
              <p>Do not share this code with anyone.</p>
            </div>`
          })
        });
      }
      return NextResponse.json({ success: true, message: 'OTP Sent' });
    }
    return NextResponse.json({ success: false, error: 'Invalid Credentials' }, { status: 401 });
  }

  // STEP 2: VERIFY OTP & GENERATE SECURE SESSION
  if (action === 'verify') {
    if (otpStore.get(email) === otp) {
      otpStore.delete(email); 
      
      // UPGRADE: Generate unique 128-bit UUID for the session
      const secureSessionId = crypto.randomUUID();
      
      // UPGRADE: Save to database with a strict 24-hour expiration
      await db.prepare(
        "INSERT INTO hr_sessions (session_id, email, expires_at) VALUES (?, ?, datetime('now', '+1 day'))"
      ).bind(secureSessionId, email).run();

      // Set the dynamic UUID in the cookie instead of a static word
      cookieStore.set('hr_session', secureSessionId, { 
        httpOnly: true, 
        secure: true, 
        maxAge: 60 * 60 * 24,
        path: '/'
      });

      return NextResponse.json({ success: true });
    }
    return NextResponse.json({ success: false, error: 'Invalid OTP' }, { status: 401 });
  }

  // STEP 3: LOGOUT & DESTROY SESSION
  if (action === 'logout') {
    const sessionCookie = cookieStore.get('hr_session');
    
    // UPGRADE: Delete the session from the database so the token can never be reused
    if (sessionCookie?.value) {
      await db.prepare("DELETE FROM hr_sessions WHERE session_id = ?").bind(sessionCookie?.value).run();
    }
    
    // Clear the browser cookie
    cookieStore.delete('hr_session');
    return NextResponse.json({ success: true });
  }
}

// STEP 4: VERIFY ACTIVE SESSION (GET ROUTE)
export async function GET() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('hr_session');
  
  if (!sessionCookie?.value) {
    return NextResponse.json({ success: false }, { status: 401 });
  }

  // UPGRADE: Validate the cookie's UUID against the live database sessions
  const db = (getRequestContext().env as any).reality_decoded_db;
  const liveSession = await db.prepare(
    "SELECT email FROM hr_sessions WHERE session_id = ? AND expires_at > datetime('now')"
  ).bind(sessionCookie.value).first();

  if (liveSession) {
    return NextResponse.json({ success: true });
  }
  
  // If token is invalid or expired, reject access
  return NextResponse.json({ success: false }, { status: 401 });
}