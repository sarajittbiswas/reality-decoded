import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/hq')) {
    const adminCookie = request.cookies.get('admin_key')?.value;
    
    // DEBUG: This prints to your VS Code terminal
    console.log("Middleware check: Found cookie value:", adminCookie);

    if (adminCookie !== 'syndicate-secret-key') {
      console.log("Middleware: Cookie invalid/missing. Redirecting to login.");
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }
  return NextResponse.next();
}