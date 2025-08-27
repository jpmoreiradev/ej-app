import { type NextRequest, NextResponse } from 'next/server';

const publicRoutes = [
  {
    path: '/login',
    whenAutenticated: 'redirect',
  },
  {
    path: '/register',
    whenAutenticated: 'redirect',
  },
  {
    path: '/esqueceu-senha',
    whenAutenticated: 'redirect',
  },
] as const;

const REDIRECT_WHEN_NOT_AUTHENTICATED = '/login';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const publicRoute = publicRoutes.find((route) => route.path === path);
  const authToken = request.cookies.get('authToken');

  if (!authToken && publicRoute) {
    return NextResponse.next();
  }

  if (!authToken && !publicRoute) {
    const url = request.nextUrl.clone();
    url.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED;
    return NextResponse.redirect(url);
  }

  if (authToken && publicRoute && publicRoute.whenAutenticated === 'redirect') {
    const url = request.nextUrl.clone();
    url.pathname = '/';
    return NextResponse.redirect(url);
  }

  if (authToken && !publicRoute) {
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
