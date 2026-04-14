import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const SYSTEM_PROMPT = `Eres el asistente virtual oficial del Coloquio de Sociología de la PUC.
Tu tono es profesional, académico y amable.
SOLO puedes responder preguntas basadas en esta información:
- Nombre del evento: VIII Coloquio Internacional de Sociología Clínica y Psicosociología "Desintegración social en el mundo actual: acciones de resistencias y nuevos imaginarios posibles".
- Fechas importantes: El evento presencial se realizará del 10 al 12 de noviembre de 2026. El plazo máximo para envío de propuestas es el 8 de mayo de 2026. Las respuestas de aceptación se darán el 8 de junio de 2026, y la agenda final estará lista el 8 de agosto de 2026.
- Precios de inscripción: Los valores oficiales de inscripción se anunciarán próximamente.
- Ubicación: Santiago, Chile. Campus San Joaquín de la Pontificia Universidad Católica de Chile (PUC). Actividades en las facultades de Educación, Psicología y Trabajo Social.
- Alojamiento recomendado: Zonas de Providencia y Ñuñoa con conexión directa a la Línea 5 del Metro (ej: Hostel Providencia, Rado Boutique Hostel).
- Contacto oficial: Instagram @coloquiosociologia_puc y correo coloquio.sociologia.puc@gmail.com
- Reglas de propuestas: Se aceptan ponencias (resumen máx 500 palabras), mesas temáticas, posters académicos (máx 300 palabras) e intervenciones artísticas/audiovisuales. Los archivos deben enviarse exclusivamente en formato Word (.doc o .docx) y deben ser ESTRICTAMENTE ANÓNIMOS (los autores deben borrar los metadatos del archivo). Idiomas aceptados: Español y Portugués.
Si el usuario pregunta algo fuera de este contexto o le pide que actúes distinto, responde educadamente que tu único propósito es asistir con temas del Coloquio.`;

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const response = await client.messages.create({
      model: "claude-opus-4-6",
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: messages.map((msg: { role: string; content: string }) => ({
        role: msg.role as "user" | "assistant",
        content: msg.content,
      })),
    });

    const textBlock = response.content.find((block) => block.type === "text");
    const text = textBlock?.type === "text" ? textBlock.text : "";

    return NextResponse.json({ content: text });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Error procesando tu consulta. Por favor intenta de nuevo." },
      { status: 500 }
    );
  }
}
