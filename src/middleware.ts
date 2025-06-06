import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// These are your public routes that do not require authentication
const publicPaths = ['/login', '/register', '/'] // Assuming '/' is your landing/places recommendation page

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const sessionToken = request.cookies.get('appwrite-session') // IMPORTANT: Verify this is your Appwrite session cookie name

  const isPublicPath = publicPaths.some(p => pathname.startsWith(p));

  // Case 1: Trying to access a protected route without a session, redirect to login
  if (!isPublicPath && !sessionToken) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Case 2: Logged-in user trying to access /login or /register, redirect to home
  if (sessionToken && (pathname.startsWith('/login') || pathname.startsWith('/register'))) {
    return NextResponse.redirect(new URL('/', request.url)) // Changed from /home to /
  }

  // Allow all other requests:
  // - Accessing public paths (e.g., '/', '/login', '/register' if not logged in for the latter two)
  // - Accessing protected paths with a valid session
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}