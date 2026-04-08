// ============================================================
// lib/mailer.ts — Motor de envío de correos con Nodemailer
// ============================================================

import nodemailer from "nodemailer";
import { render } from "@react-email/render";
import { ReactElement } from "react";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

interface EnviarCorreoOptions {
  to: string;
  subject: string;
  reactComponent: ReactElement;
}

export async function enviarCorreo({ to, subject, reactComponent }: EnviarCorreoOptions) {
  const html = await render(reactComponent);

  await transporter.sendMail({
    from: `"Coloquio PUC" <${process.env.GMAIL_USER}>`,
    to,
    subject,
    html,
  });
}
