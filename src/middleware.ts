import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  // 1. Redirect old RSS route to the correct feed
  if (request.nextUrl.pathname === '/rss.xml') {
    return NextResponse.redirect(new URL('/feed.xml', request.url), 301);
  }

  // 2. Protect all /hq routes EXCEPT the login page itself
  if (
    request.nextUrl.pathname.startsWith('/hq') &&
    !request.nextUrl.pathname.startsWith('/hq/login')
  ) {
    const session = request.cookies.get('syndicate_session');

    // If no cookie exists at all, instantly redirect
    if (!session?.value) {
      return NextResponse.redirect(new URL('/hq/login', request.url));
    }

    // 3. SECURE VERIFICATION: Ask the Auth API to check the D1 Database
    const verifyUrl = new URL('/api/auth', request.url);
    const verifyResponse = await fetch(verifyUrl, {
      // Forward the user's cookie to the internal API route
      headers: { cookie: request.headers.get('cookie') || '' }
    });

    // If the database says the token doesn't exist or is expired
    if (!verifyResponse.ok) {
      const redirectRes = NextResponse.redirect(new URL('/hq/login', request.url));
      // Delete the dead cookies from the browser
      redirectRes.cookies.delete('syndicate_session');
      redirectRes.cookies.delete('hq_operator_id');
      return redirectRes;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/hq/:path*', '/rss.xml'],
};