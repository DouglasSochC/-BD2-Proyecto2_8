import { NextResponse } from 'next/server'

export function middleware(request) {

  const cookies = request.cookies.get('auth');

  if (!cookies && request.nextUrl.pathname !== "/login") {
    return NextResponse.redirect(new URL('/login', request.url));
  } else if (cookies && request.nextUrl.pathname === '/login') {
    return NextResponse.redirect(new URL('/', request.url));
  } else if (cookies) {
    const { rol } = JSON.parse(cookies.value);
    // Si el usuario es admin y quiere acceder a otra ruta que no sea dashboard_admin o subrutas de este, se redirige a dashboard_admin
    if (rol == "Administrador" && !request.nextUrl.pathname.startsWith('/dashboard_admin')) {
      return NextResponse.redirect(new URL('/dashboard_admin', request.url));
    } else if (rol == "Cliente" && !request.nextUrl.pathname.startsWith('/dashboard_usuario')) {
      return NextResponse.redirect(new URL('/dashboard_usuario', request.url));
    }
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/dashboard_admin/:path*', '/dashboard_usuario/:path*', '/login', '/']
}