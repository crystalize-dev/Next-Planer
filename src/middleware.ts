import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export default async function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname;

    const session = await getToken({
        req,
        secret: process.env.AUTH_SECRET
    });

    const protectedPaths = ['/', '/plans'];

    const isProtected = !!protectedPaths.find(
        (protectedPath) => protectedPath === path
    );

    if (!session && isProtected) {
        return NextResponse.redirect(new URL('/login', req.url));
    }

    if (session && path === '/login') {
        return NextResponse.redirect(new URL('/', req.url));
    }

    return NextResponse.next();
}
