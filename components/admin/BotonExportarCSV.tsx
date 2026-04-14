"use client";

import { Download } from "lucide-react";
import type { PerfilConRelaciones } from "@/app/actions/admin";

interface Props {
  perfiles: PerfilConRelaciones[];
}

function getEstadoPago(perfil: PerfilConRelaciones): string {
  return perfil.inscripciones?.[0]?.pagos?.[0]?.estado ?? "sin pago";
}

function escaparCSV(valor: string | null | undefined): string {
  const str = valor ?? "";
  if (str.includes(",") || str.includes('"') || str.includes("\n")) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

export default function BotonExportarCSV({ perfiles }: Props) {
  function descargarCSV() {
    const cabecera = ["Nombre", "Apellidos", "Email", "Nacionalidad", "Rol", "Estado Pago", "Tiene Ponencia", "Título Ponencia", "Fecha Registro"];

    const filas = perfiles.map((p) => {
      const inscripcion = p.inscripciones?.[0] ?? null;
      const fechaRaw = p.creado_en;
      const fecha = fechaRaw
        ? new Date(fechaRaw).toLocaleDateString("es-CL", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })
        : "";
      const tituloPonencia = p.ponencias?.[0]?.titulo ?? "N/A";

      return [
        escaparCSV(p.nombre),
        escaparCSV(p.apellidos),
        escaparCSV(p.email),
        escaparCSV(p.nacionalidad),
        escaparCSV(inscripcion?.calidad_asistencia),
        escaparCSV(getEstadoPago(p)),
        (p.ponencias?.length ?? 0) > 0 ? "Sí" : "No",
        escaparCSV(tituloPonencia),
        escaparCSV(fecha),
      ].join(",");
    });

    const contenido = [cabecera.join(","), ...filas].join("\n");
    const blob = new Blob(["\uFEFF" + contenido], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "asistentes_coloquio.csv";
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <button
      onClick={descargarCSV}
      className="flex items-center gap-2 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 px-4 py-2 rounded-lg transition-colors"
    >
      <Download size={15} />
      Descargar CSV
    </button>
  );
}
