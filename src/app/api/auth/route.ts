import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function POST(request: Request) {
  try {
    const { step, username, password, pin } = await request.json();

    // 🚨 STEP 1: Validate ID and Password individually
    if (step === 1) {
      if (username !== process.env.HQ_USERNAME) {
        return NextResponse.json({ success: false, error: 'invalid_id' }, { status: 401 });
      }
      if (password !== process.env.HQ_PASSWORD) {
        return NextResponse.json({ success: false, error: 'invalid_password' }, { status: 401 });
      }
      // Both are correct, grant permission to proceed to Step 2
      return NextResponse.json({ success: true });
    }

    // 🚨 STEP 2: Final PIN verification
    if (step === 2) {
      // Re-verify Step 1 just in case a hacker tried to skip it
      if (username !== process.env.HQ_USERNAME || password !== process.env.HQ_PASSWORD) {
        return NextResponse.json({ success: false, error: 'auth_tampered' }, { status: 401 });
      }
      
      // Verify PIN
      if (pin !== process.env.HQ_PIN) {
        return NextResponse.json({ success: false, error: 'invalid_pin' }, { status: 401 });
      }

      // 🚨 SUCCESS: All checks passed. Issue the Session Cookie.
      const response = NextResponse.json({ success: true });
      response.cookies.set({
        name: 'syndicate_session',
        value: process.env.HQ_SESSION_TOKEN as string,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
      });

      return response;
    }

    return NextResponse.json({ success: false, error: 'Invalid step' }, { status: 400 });

  } catch (error) {
    return NextResponse.json({ success: false, error: 'Server error.' }, { status: 500 });
  }
}