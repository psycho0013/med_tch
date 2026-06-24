import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

// Define the paths that require authentication
const protectedApiPaths = ['/api/products', '/api/settings', '/api/hero', '/api/upload'];
const protectedPagePaths = ['/admin'];

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "default_super_secret_jwt_key_that_should_be_long");

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Allow access to login page and auth APIs
    if (pathname.startsWith('/admin/login') || pathname.startsWith('/api/auth/login') || pathname.startsWith('/api/auth/logout')) {
        return NextResponse.next();
    }

    // Check if the path needs protection
    const isProtectedApi = protectedApiPaths.some(path => pathname.startsWith(path));
    const isProtectedPage = protectedPagePaths.some(path => pathname.startsWith(path) && !pathname.startsWith('/admin/login'));

    // For API routes, only protect mutating methods (POST, PUT, DELETE)
    // We allow GET so the public site can read products, settings, hero
    const isMutatingApiRequest = isProtectedApi && ['POST', 'PUT', 'DELETE'].includes(request.method);

    if (isProtectedPage || isMutatingApiRequest) {
        const token = request.cookies.get('admin_token')?.value;

        if (!token) {
            return handleUnauthorized(request, isProtectedPage);
        }

        try {
            // Verify the JWT token
            await jwtVerify(token, JWT_SECRET);
            return NextResponse.next();
        } catch (error) {
            // Token is invalid or expired
            return handleUnauthorized(request, isProtectedPage);
        }
    }

    return NextResponse.next();
}

function handleUnauthorized(request: NextRequest, isPage: boolean) {
    if (isPage) {
        // Redirect to login page for unauthorized page access
        const loginUrl = new URL('/admin/login', request.url);
        return NextResponse.redirect(loginUrl);
    } else {
        // Return 401 for unauthorized API access
        return NextResponse.json({ error: 'Unauthorized access' }, { status: 401 });
    }
}

export const config = {
    matcher: ['/admin/:path*', '/api/:path*'],
};
