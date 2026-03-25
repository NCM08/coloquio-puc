// ============================================================
// data/speakers.ts — Fuente única de verdad para Conferencistas
// ============================================================
// Para añadir conferencistas, completar cada objeto con los
// datos reales del cliente y descomentar el array.
// ============================================================

export interface Speaker {
  id: string;
  name: string;
  role: string;         // Cargo / Título académico
  country: string;      // País de origen
  imageUrl: string;     // Ruta a la imagen (ej: "/images/speakers/nombre.jpg")
  bio: string;          // Biografía breve (2-4 oraciones)
}

// Descomenta y rellena cada objeto cuando el cliente envíe los datos:
// export const speakersList: Speaker[] = [
//   {
//     id: "speaker-1",
//     name: "Nombre Apellido",
//     role: "Profesor Titular, Universidad X",
//     country: "Chile",
//     imageUrl: "/images/speakers/speaker-1.jpg",
//     bio: "Descripción breve del académico y sus líneas de investigación.",
//   },
// ];

export const speakersList: Speaker[] = [];
