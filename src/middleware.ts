import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'

import setupDB from '@/models/server/dbSetup'
import setupStorage from '@/models/server/mediaStorage'

// This function can be marked `async` if using `await` inside
// export async function middleware(request: NextRequest) {
export async function middleware() {
    
    await Promise.all([
        setupDB(),
        setupStorage()
    ])
    return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
    /* middleware won't run on the path defined in the matcher 
    - API
    - _next/static
    - _next/image
    - public
    - static
    - favicon.ico
    */
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico).*)'
    ],
}