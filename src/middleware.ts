import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Check for the secure browser session cookie
  const session = request.cookies.get('syndicate_session');
  
  // Protect all /hq routes EXCEPT the login page itself
  if (request.nextUrl.pathname.startsWith('/hq') && !request.nextUrl.pathname.startsWith('/hq/login')) {
    
    // If cookie is missing or doesn't match your .env token, redirect to login
    if (session?.value !== process.env.HQ_SESSION_TOKEN) {
      return NextResponse.redirect(new URL('/hq/login', request.url));
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/hq/:path*'],
};