import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface PagoAprobadoEmailProps {
  nombre: string;
}

export default function PagoAprobadoEmail({ nombre }: PagoAprobadoEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Tu pago ha sido aprobado - Coloquio PUC</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Heading style={logo}>Coloquio PUC</Heading>
          </Section>

          <Section style={content}>
            <Heading as="h2" style={heading}>
              ¡Pago aprobado!
            </Heading>

            <Text style={paragraph}>Hola {nombre},</Text>

            <Text style={paragraph}>
              Tu comprobante de pago ha sido verificado y aprobado exitosamente.
              ¡Nos vemos en el Coloquio!
            </Text>

            <Hr style={divider} />

            <Text style={footer}>
              Este correo fue generado automáticamente. Por favor, no respondas a este mensaje.
            </Text>

            <Text style={footer}>
              © {new Date().getFullYear()} Coloquio PUC. Todos los derechos reservados.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

// ── Estilos ────────────────────────────────────────────────────
const main: React.CSSProperties = {
  backgroundColor: "#f4f4f5",
  fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
};

const container: React.CSSProperties = {
  margin: "40px auto",
  maxWidth: "560px",
  backgroundColor: "#ffffff",
  borderRadius: "8px",
  overflow: "hidden",
  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
};

const header: React.CSSProperties = {
  backgroundColor: "#1a1a2e",
  padding: "24px 32px",
};

const logo: React.CSSProperties = {
  color: "#ffffff",
  fontSize: "22px",
  fontWeight: "700",
  margin: "0",
};

const content: React.CSSProperties = {
  padding: "32px",
};

const heading: React.CSSProperties = {
  color: "#1a1a2e",
  fontSize: "20px",
  fontWeight: "600",
  marginBottom: "24px",
};

const paragraph: React.CSSProperties = {
  color: "#374151",
  fontSize: "15px",
  lineHeight: "1.6",
  margin: "0 0 16px",
};

const divider: React.CSSProperties = {
  borderColor: "#e5e7eb",
  margin: "24px 0",
};

const footer: React.CSSProperties = {
  color: "#9ca3af",
  fontSize: "12px",
  lineHeight: "1.5",
  margin: "0 0 8px",
};
