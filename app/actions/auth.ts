// ============================================================
// app/actions/auth.ts — SERVER ACTIONS DE AUTENTICACIÓN ADMIN
// ============================================================

"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const COOKIE_NAME = "admin_session";
const ONE_DAY_SECONDS = 60 * 60 * 24;

export async function loginAdmin(formData: FormData) {
  const password = formData.get("password") as string;

  if (!password || password !== process.env.ADMIN_PASSWORD) {
    redirect("/admin/login?error=1");
  }

  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, "true", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: ONE_DAY_SECONDS,
    path: "/",
  });

  redirect("/admin");
}

export async function logoutAdmin() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
  redirect("/admin/login");
}
