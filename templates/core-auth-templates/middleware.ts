/**
 * ============================================
 * TEMPLATE: NextAuth Middleware
 * ============================================
 *
 * Açıklama: Bu middleware, route protection sağlar.
 * - Giriş yapmamış kullanıcıları korumalı route'lardan engeller
 * - Giriş yapmış kullanıcıları login/register sayfalarından engeller
 * - Admin route'larını sadece ADMIN rolündeki kullanıcılara açar
 *
 * Özellikler:
 * - ✅ Protected routes (/dashboard/*)
 * - ✅ Public routes (/login, /register)
 * - ✅ Admin-only routes (/dashboard/admin/*)
 * - ✅ Callback URL preservation
 * - ✅ Role-based access control
 *
 * Kurulum:
 * 1. Bu dosyayı src/middleware.ts olarak kopyalayın
 * 2. NextAuth configuration (@/lib/auth) doğru ayarlanmış olmalı
 * 3. User modelinde 'role' field olmalı (USER, ADMIN)
 *
 * Hedef Yol: src/middleware.ts
 *
 * @see templates/core-auth-templates/PROMPT.md
 * ============================================
 */

import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const isAuth = !!token;
    const isAuthPage =
      req.nextUrl.pathname.startsWith("/login") ||
      req.nextUrl.pathname.startsWith("/register");

    // Auth sayfalarına erişim kontrolü
    if (isAuthPage) {
      if (isAuth) {
        // Giriş yapmış kullanıcıyı dashboard'a yönlendir
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }
      return undefined;
    }

    // Korumalı route'lar
    const isProtectedRoute = req.nextUrl.pathname.startsWith("/dashboard");
    const isAdminRoute = req.nextUrl.pathname.startsWith("/dashboard/admin");

    if (isProtectedRoute) {
      if (!isAuth) {
        // Giriş yapmamış kullanıcıyı login'e yönlendir
        const loginUrl = new URL("/login", req.url);
        // Callback URL'i preserve et (login sonrası geri dönsün)
        loginUrl.searchParams.set("callbackUrl", req.nextUrl.pathname);
        return NextResponse.redirect(loginUrl);
      }

      // Admin route kontrolü
      if (isAdminRoute && token?.role !== "ADMIN") {
        // ADMIN değilse dashboard'a yönlendir
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }
    }

    return undefined;
  },
  {
    callbacks: {
      // Middleware'i her zaman çalıştır
      authorized: () => true,
    },
    pages: {
      signIn: "/login",
    },
  }
);

// Middleware'in çalışacağı route'lar
export const config = {
  matcher: ["/login", "/register", "/dashboard/:path*"],
};
