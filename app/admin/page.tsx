// ============================================================
// app/admin/page.tsx — PANEL DE ADMINISTRACIÓN (Server Component)
// ============================================================

import { obtenerDatosDashboard, type PerfilConRelaciones } from "@/app/actions/admin";
import { logoutAdmin } from "@/app/actions/auth";
import { Users, CheckCircle, Clock, XCircle, FileText, Globe, LogOut, Eye, UserCheck } from "lucide-react";
import SelectorEstadoPago from "@/components/admin/SelectorEstadoPago";
import BotonExportarCSV from "@/components/admin/BotonExportarCSV";

// ── Helpers de UI ─────────────────────────────────────────────

function getEstadoPago(perfil: PerfilConRelaciones) {
  const inscripcion = perfil.inscripciones?.[0];
  if (!inscripcion) return null;
  const pago = inscripcion.pagos?.[0];
  if (!pago) return null;
  return pago.estado;
}

function BadgePago({ estado }: { estado: string | null }) {
  if (estado === "aprobado") {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
        Aprobado
      </span>
    );
  }
  if (estado === "por_verificar") {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300">
        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 flex-shrink-0" />
        Por verificar
      </span>
    );
  }
  if (estado === "rechazado") {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300">
        <span className="w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0" />
        Rechazado
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400">
      <span className="w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
      No enviado
    </span>
  );
}

function BadgePonencia({ tienePonencia }: { tienePonencia: boolean }) {
  if (tienePonencia) {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300">
        <FileText size={11} className="flex-shrink-0" />
        Sí
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-500">
      No
    </span>
  );
}

// ── Helpers de fecha ─────────────────────────────────────────

function tiempoRelativo(fechaStr: string): string {
  const ahora = Date.now();
  const fecha = new Date(fechaStr).getTime();
  const diffMs = ahora - fecha;
  const diffMin = Math.floor(diffMs / 60000);
  if (diffMin < 1) return "Hace un momento";
  if (diffMin < 60) return `Hace ${diffMin} min`;
  const diffH = Math.floor(diffMin / 60);
  if (diffH < 24) return `Hace ${diffH} h`;
  const diffD = Math.floor(diffH / 24);
  if (diffD < 7) return `Hace ${diffD} día${diffD !== 1 ? "s" : ""}`;
  return new Date(fechaStr).toLocaleDateString("es-CL", { day: "2-digit", month: "short", year: "numeric" });
}

// ── Tarjetas de estadísticas ──────────────────────────────────

function StatCard({
  label,
  value,
  icon: Icon,
  color,
}: {
  label: string;
  value: number;
  icon: React.ElementType;
  color: string;
}) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl p-5 shadow-sm border border-slate-200 dark:border-slate-700 flex items-center gap-4">
      <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${color}`}>
        <Icon size={22} className="text-white" />
      </div>
      <div>
        <p className="text-2xl font-bold text-slate-900 dark:text-white leading-none mb-1">{value}</p>
        <p className="text-sm text-slate-500 dark:text-slate-400">{label}</p>
      </div>
    </div>
  );
}

function UltimoInscritoCard({ perfil }: { perfil: PerfilConRelaciones | null }) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl p-5 shadow-sm border border-slate-200 dark:border-slate-700 flex items-center gap-4">
      <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 bg-indigo-500">
        <UserCheck size={22} className="text-white" />
      </div>
      <div className="min-w-0">
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-0.5">Último Inscrito</p>
        {perfil ? (
          <>
            <p className="font-bold text-slate-900 dark:text-white leading-snug truncate">
              {perfil.nombre} {perfil.apellidos ?? ""}
            </p>
            <p className="text-xs text-slate-400 dark:text-slate-500">
              {tiempoRelativo(perfil.creado_en)}
            </p>
          </>
        ) : (
          <p className="text-sm text-slate-400 dark:text-slate-500 italic">Sin registros</p>
        )}
      </div>
    </div>
  );
}

// ── Página principal ──────────────────────────────────────────

export default async function AdminPage() {
  let perfiles: PerfilConRelaciones[] = [];
  let errorMsg: string | null = null;

  try {
    perfiles = await obtenerDatosDashboard();
  } catch (err) {
    errorMsg = err instanceof Error ? err.message : "Error desconocido al cargar datos.";
  }

  // Estadísticas rápidas
  const totalInscritos = perfiles.filter((p) => p.inscripciones?.length > 0).length;
  const pagosAprobados = perfiles.filter((p) => getEstadoPago(p) === "aprobado").length;
  const pagosPendientes = perfiles.filter((p) => getEstadoPago(p) === "por_verificar").length;
  const conPonencia = perfiles.filter((p) => p.ponencias?.length > 0).length;
  // perfiles ya viene ordenado por creado_en DESC desde el servidor
  const ultimoInscrito = perfiles[0] ?? null;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">

      {/* ── Header ─────────────────────────────────────────────── */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between gap-4 flex-wrap">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-1">
              Coloquio de Sociología PUC
            </p>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              Panel de Administración
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-lg">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              {perfiles.length} perfiles registrados
            </div>
            <BotonExportarCSV perfiles={perfiles} />
            <form action={logoutAdmin}>
              <button
                type="submit"
                className="flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-300 border border-slate-300 dark:border-slate-700 hover:border-red-400 hover:text-red-500 dark:hover:border-red-600 dark:hover:text-red-400 px-4 py-2 rounded-lg transition-colors"
              >
                <LogOut size={15} />
                Cerrar Sesión
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* ── Estadísticas ─────────────────────────────────────── */}
        <div className="mb-4">
          <UltimoInscritoCard perfil={ultimoInscrito} />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard label="Inscritos" value={totalInscritos} icon={Users} color="bg-blue-500" />
          <StatCard label="Pagos aprobados" value={pagosAprobados} icon={CheckCircle} color="bg-emerald-500" />
          <StatCard label="Por verificar" value={pagosPendientes} icon={Clock} color="bg-amber-500" />
          <StatCard label="Con ponencia" value={conPonencia} icon={FileText} color="bg-violet-500" />
        </div>

        {/* ── Error ────────────────────────────────────────────── */}
        {errorMsg && (
          <div className="mb-6 flex items-start gap-3 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400">
            <XCircle size={18} className="flex-shrink-0 mt-0.5" />
            <p className="text-sm font-medium">{errorMsg}</p>
          </div>
        )}

        {/* ── Tabla Maestra ─────────────────────────────────────── */}
        <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">

          {/* Encabezado de tabla */}
          <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800">
            <h2 className="text-base font-semibold text-slate-900 dark:text-white">
              Tabla Maestra de Asistentes
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              Todos los perfiles registrados con sus inscripciones y estado de pago.
            </p>
          </div>

          {perfiles.length === 0 && !errorMsg ? (
            <div className="py-20 text-center">
              <Users size={40} className="mx-auto text-slate-300 dark:text-slate-700 mb-3" />
              <p className="text-slate-500 dark:text-slate-400 font-medium">No hay perfiles registrados aún.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-700">
                    <th className="text-left px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 whitespace-nowrap">
                      Nombre / País
                    </th>
                    <th className="text-left px-4 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      Email
                    </th>
                    <th className="text-left px-4 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 whitespace-nowrap">
                      Rol
                    </th>
                    <th className="text-center px-4 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 whitespace-nowrap">
                      Estado Pago
                    </th>
                    <th className="text-center px-4 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      Ponencia
                    </th>
                    <th className="text-left px-4 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 whitespace-nowrap">
                      Registro
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {perfiles.map((perfil) => {
                    const inscripcion = perfil.inscripciones?.[0] ?? null;
                    const estadoPago = getEstadoPago(perfil);
                    const tienePonencia = (perfil.ponencias?.length ?? 0) > 0;
                    const _fechaRaw = perfil.creado_en;
                    const fechaRegistro = _fechaRaw
                      ? new Date(_fechaRaw).toLocaleDateString("es-CL", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })
                      : "—";

                    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
                    const pagoId = inscripcion?.pagos?.[0]?.id ?? null;
                    const comprobanteRaw = inscripcion?.pagos?.[0]?.comprobante_url ?? null;
                    const comprobanteUrl = comprobanteRaw
                      ? `${supabaseUrl}/storage/v1/object/public/comprobantes_pago/${comprobanteRaw}`
                      : null;
                    const ponenciaRaw = perfil.ponencias?.[0]?.archivo_url ?? null;
                    const ponenciaUrl = ponenciaRaw
                      ? `${supabaseUrl}/storage/v1/object/public/documentos_ponencias/${ponenciaRaw}`
                      : null;

                    return (
                      <tr
                        key={perfil.id}
                        className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
                      >
                        {/* Nombre + País */}
                        <td className="px-6 py-4">
                          <p className="font-semibold text-slate-900 dark:text-white leading-snug">
                            {perfil.nombre} {perfil.apellidos ?? ""}
                          </p>
                          {perfil.nacionalidad && (
                            <p className="text-xs text-slate-400 dark:text-slate-500 flex items-center gap-1 mt-0.5">
                              <Globe size={10} className="flex-shrink-0" />
                              {perfil.nacionalidad}
                            </p>
                          )}
                        </td>

                        {/* Email */}
                        <td className="px-4 py-4">
                          <span className="text-slate-600 dark:text-slate-300 font-mono text-xs">
                            {perfil.email}
                          </span>
                        </td>

                        {/* Rol / Calidad de asistencia */}
                        <td className="px-4 py-4">
                          {inscripcion?.calidad_asistencia ? (
                            <span className="text-slate-700 dark:text-slate-300 text-xs leading-snug max-w-[200px] block">
                              {inscripcion.calidad_asistencia}
                            </span>
                          ) : (
                            <span className="text-slate-400 dark:text-slate-600 text-xs italic">
                              Sin inscripción
                            </span>
                          )}
                        </td>

                        {/* Estado del pago */}
                        <td className="px-4 py-4 text-center">
                          <div className="flex flex-col items-center gap-1.5">
                            {pagoId ? (
                              <SelectorEstadoPago pagoId={pagoId} estadoActual={estadoPago as import("@/app/actions/admin").EstadoPago} />
                            ) : (
                              <BadgePago estado={estadoPago} />
                            )}
                            {comprobanteUrl && (
                              <a
                                href={comprobanteUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400 hover:underline"
                              >
                                <Eye size={11} />
                                Ver pago
                              </a>
                            )}
                          </div>
                        </td>

                        {/* Ponencia */}
                        <td className="px-4 py-4 text-center">
                          <div className="flex flex-col items-center gap-1.5">
                            <BadgePonencia tienePonencia={tienePonencia} />
                            {ponenciaUrl && (
                              <a
                                href={ponenciaUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400 hover:underline"
                              >
                                <Eye size={11} />
                                Ver ponencia
                              </a>
                            )}
                          </div>
                        </td>

                        {/* Fecha de registro */}
                        <td className="px-4 py-4">
                          <span className="text-xs text-slate-400 dark:text-slate-500 whitespace-nowrap">
                            {fechaRegistro}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
