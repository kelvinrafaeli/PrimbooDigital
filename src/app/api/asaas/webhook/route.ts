import { NextRequest, NextResponse } from "next/server";

interface AsaasWebhookPayload {
  event?: string;
  payment?: {
    id?: string;
    status?: string;
    value?: number;
    externalReference?: string;
  };
}

export async function POST(request: NextRequest) {
  const configuredToken = process.env.ASAAS_WEBHOOK_TOKEN?.trim();
  const receivedToken = request.headers.get("asaas-access-token")?.trim();

  if (configuredToken && receivedToken !== configuredToken) {
    return NextResponse.json({ error: "Webhook nao autorizado." }, { status: 401 });
  }

  let payload: AsaasWebhookPayload;

  try {
    payload = (await request.json()) as AsaasWebhookPayload;
  } catch {
    return NextResponse.json({ error: "Payload invalido." }, { status: 400 });
  }

  // Log estruturado para auditoria basica em ambiente de deploy/logs.
  console.info("[ASAAS_WEBHOOK]", {
    event: payload.event,
    paymentId: payload.payment?.id,
    status: payload.payment?.status,
    value: payload.payment?.value,
    externalReference: payload.payment?.externalReference,
  });

  return NextResponse.json({ received: true });
}

export async function GET() {
  return NextResponse.json({ ok: true, service: "asaas-webhook" });
}
