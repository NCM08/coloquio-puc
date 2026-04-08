"use client";

import { useTransition } from "react";
import { cambiarEstadoPago, type EstadoPago } from "@/app/actions/admin";

const OPCIONES: { value: EstadoPago; label: string }[] = [
  { value: "pendiente", label: "Pendiente" },
  { value: "por_verificar", label: "Por verificar" },
  { value: "aprobado", label: "Aprobado" },
  { value: "rechazado", label: "Rechazado" },
];

const COLOR_CLASS: Record<EstadoPago, string> = {
  pendiente: "bg-slate-100 text-slate-700 border-slate-300 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-600",
  por_verificar: "bg-amber-50 text-amber-800 border-amber-300 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-700",
  aprobado: "bg-emerald-50 text-emerald-800 border-emerald-300 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-700",
  rechazado: "bg-red-50 text-red-800 border-red-300 dark:bg-red-900/30 dark:text-red-300 dark:border-red-700",
};

interface Props {
  pagoId: string;
  estadoActual: EstadoPago | null;
}

export default function SelectorEstadoPago({ pagoId, estadoActual }: Props) {
  const [isPending, startTransition] = useTransition();

  const valorActual: EstadoPago = estadoActual ?? "pendiente";

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const nuevoEstado = e.target.value as EstadoPago;
    startTransition(async () => {
      await cambiarEstadoPago(pagoId, nuevoEstado);
    });
  }

  return (
    <select
      defaultValue={valorActual}
      onChange={handleChange}
      disabled={isPending}
      className={`text-xs font-semibold rounded-full px-2.5 py-1 border cursor-pointer transition-opacity
        ${COLOR_CLASS[valorActual]}
        ${isPending ? "opacity-50 cursor-not-allowed" : "hover:opacity-80"}`}
    >
      {OPCIONES.map((op) => (
        <option key={op.value} value={op.value}>
          {op.label}
        </option>
      ))}
    </select>
  );
}
