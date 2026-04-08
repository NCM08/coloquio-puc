// ============================================================
// app/admin/login/page.tsx — PÁGINA DE LOGIN ADMIN
// ============================================================

import { loginAdmin } from "@/app/actions/auth";
import { Lock } from "lucide-react";

interface Props {
  searchParams: Promise<{ error?: string }>;
}

export default async function AdminLoginPage({ searchParams }: Props) {
  const { error } = await searchParams;

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">

        {/* Logo / Título */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-slate-800 border border-slate-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Lock size={24} className="text-slate-300" />
          </div>
          <h1 className="text-2xl font-bold text-white">Acceso Admin</h1>
          <p className="text-slate-400 text-sm mt-1">Coloquio de Sociología PUC</p>
        </div>

        {/* Formulario */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
          <form action={loginAdmin} className="space-y-4">
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-slate-300 mb-1.5"
              >
                Contraseña maestra
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                placeholder="••••••••••••"
                className="w-full px-4 py-2.5 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition text-sm"
              />
            </div>

            {/* Error */}
            {error === "1" && (
              <p className="text-sm text-red-400 font-medium bg-red-900/20 border border-red-800 rounded-lg px-3 py-2">
                Contraseña incorrecta. Inténtalo de nuevo.
              </p>
            )}

            <button
              type="submit"
              className="w-full py-2.5 px-4 bg-white text-slate-900 font-semibold rounded-lg hover:bg-slate-100 active:bg-slate-200 transition text-sm"
            >
              Ingresar
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
