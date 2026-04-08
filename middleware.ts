// ============================================================
// middleware.ts — GUARDIA DE RUTAS ADMIN
// ============================================================

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const COOKIE_NAME = "admin_session";
const LOGIN_PATH = "/admin/login";
const ADMIN_PATH = "/admin";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isAdminRoute = pathname.startsWith(ADMIN_PATH);
  const isLoginPage = pathname.startsWith(LOGIN_PATH);
  const hasSession = request.cookies.get(COOKIE_NAME)?.value === "true";

  // Ruta /admin/* que NO es /admin/login → requiere sesión
  if (isAdminRoute && !isLoginPage) {
    if (!hasSession) {
      const loginUrl = new URL(LOGIN_PATH, request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Ruta /admin/login con sesión activa → redirigir al panel
  if (isLoginPage && hasSession) {
    const adminUrl = new URL(ADMIN_PATH, request.url);
    return NextResponse.redirect(adminUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
