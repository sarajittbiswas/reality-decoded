import { getRequestContext } from '@cloudflare/next-on-pages';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export const runtime = 'edge';

// Store OTPs temporarily in memory (for edge environments)
const otpStore = new Map();

export async function POST(req: Request) {
  const db = (getRequestContext().env as any).reality_decoded_db;
  const { action, email, password, otp } = await req.json();

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

  // STEP 2: VERIFY OTP & SET COOKIE
  if (action === 'verify') {
    if (otpStore.get(email) === otp) {
      otpStore.delete(email); 
      
      const cookieStore = await cookies();
      cookieStore.set('hr_session', 'authenticated', { 
        httpOnly: true, secure: true, maxAge: 60 * 60 * 24 
      });

      return NextResponse.json({ success: true });
    }
    return NextResponse.json({ success: false, error: 'Invalid OTP' }, { status: 401 });
  }

  // STEP 3: LOGOUT
  if (action === 'logout') {
    const cookieStore = await cookies();
    cookieStore.delete('hr_session');
    return NextResponse.json({ success: true });
  }
}
export async function GET() {
  const cookieStore = await cookies();
  const session = cookieStore.get('hr_session');
  
  if (session?.value === 'authenticated') {
    return NextResponse.json({ success: true });
  }
  return NextResponse.json({ success: false }, { status: 401 });
}