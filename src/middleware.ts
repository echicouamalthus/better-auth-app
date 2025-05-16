import { NextRequest, NextResponse } from 'next/server';
import { betterFetch } from '@better-fetch/fetch';
import type { auth } from '@/lib/auth';

type Session = typeof auth.$Infer.Session;

export async function middleware(request: NextRequest) {
	const { data: session } = await betterFetch<Session>(
		'/api/auth/get-session',
		{
			baseURL: request.nextUrl.origin,
			headers: {
				cookie: request.headers.get('cookie') || '', // Forward the cookies from the request
			},
		}
	);

	if (!session) {
		return NextResponse.redirect(new URL('/login', request.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: ['/protected', '/dashboard'], // Apply middleware to specific routes
};


// import { NextRequest, NextResponse } from "next/server";
// import { headers } from "next/headers";
// import { auth } from "@/lib/auth";

// const protectedRoutes = ["/dashboard"];
// const authRoutes = ["/sign-in", "/sign-up"];

// export async function middleware(request: NextRequest) {
//     const session = await auth.api.getSession({
//         headers: await headers()
//     })
    
//     const { pathname } = request.nextUrl;
    
//     // If user is not authenticated and trying to access protected route
//     if (!session && protectedRoutes.some(route => pathname.startsWith(route))) {
//         return NextResponse.redirect(new URL("/sign-in", request.url));
//     }
    
//     // If user is authenticated but trying to access auth routes
//     if (session && authRoutes.some(route => pathname.startsWith(route))) {
//         return NextResponse.redirect(new URL("/dashboard", request.url));
//     }
 
//     return NextResponse.next();
// }

// export const config = {
//   runtime: "nodejs",
//   matcher: [
//     '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
//     '/(api|trpc)(.*)',
//   ],
// };