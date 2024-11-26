import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  console.log(' Middleware - Request URL:', req.nextUrl.pathname);
  
  // Create a response early so we can modify cookies
  const res = NextResponse.next();
  
  try {
    // Create supabase client with both req and res
    const supabase = createMiddlewareClient({ req, res });

    // Refresh session if expired - required for Server Components
    const { data: { session }, error } = await supabase.auth.getSession();
    console.log(' Middleware - Session status:', session ? 'Authenticated' : 'Not authenticated');
    
    if (error) {
      console.error(' Middleware - Session error:', error);
    }

    // If accessing a protected route and not logged in, redirect to login
    if (!session && req.nextUrl.pathname.startsWith('/account')) {
      console.log(' Middleware - Unauthorized access to protected route, redirecting to login');
      const redirectUrl = req.nextUrl.clone();
      redirectUrl.pathname = '/login';
      redirectUrl.searchParams.set('redirectTo', req.nextUrl.pathname);
      console.log(' Middleware - Redirect URL:', redirectUrl.toString());
      return NextResponse.redirect(redirectUrl);
    }

    // If logged in and accessing login page, redirect to account
    if (session && req.nextUrl.pathname === '/login') {
      console.log(' Middleware - Authenticated user at login, redirecting');
      const redirectTo = req.nextUrl.searchParams.get('redirectTo') || '/account';
      const redirectUrl = req.nextUrl.clone();
      redirectUrl.pathname = redirectTo;
      redirectUrl.searchParams.delete('redirectTo');
      console.log(' Middleware - Redirect URL:', redirectUrl.toString());
      return NextResponse.redirect(redirectUrl);
    }

    return res;
  } catch (e) {
    console.error(' Middleware - Unexpected error:', e);
    return res;
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public (public files)
     */
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
};
