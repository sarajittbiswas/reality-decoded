import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // 1. Redirect old RSS route to the correct feed
  if (request.nextUrl.pathname === '/rss.xml') {
    return NextResponse.redirect(new URL('/feed.xml', request.url), 301);
  }

  // 2. Check for the secure browser session cookie
  const session = request.cookies.get('syndicate_session');

  // 3. Protect all /hq routes EXCEPT the login page itself
  if (
    request.nextUrl.pathname.startsWith('/hq') &&
    !request.nextUrl.pathname.startsWith('/hq/login')
  ) {
    // If cookie is missing or doesn't match your .env token, redirect to login
    if (session?.value !== process.env.HQ_SESSION_TOKEN) {
      return NextResponse.redirect(new URL('/hq/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  // 🚨 ADDED '/rss.xml' to the matcher so the middleware actually intercepts it
  matcher: ['/hq/:path*', '/rss.xml'],
};