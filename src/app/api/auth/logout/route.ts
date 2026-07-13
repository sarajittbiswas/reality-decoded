import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function POST() {
  const cookieStore = await cookies();
  
  // 🚨 IMPORTANT: Change 'syndicate_session' to whatever you named your cookie in your login API!
  // Common names might be 'auth_token', 'session', or 'syndicate_auth'.
  cookieStore.delete('syndicate_session'); 

  return NextResponse.json({ success: true });
}