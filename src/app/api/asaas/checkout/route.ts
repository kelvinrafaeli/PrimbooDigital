import { NextRequest, NextResponse } from "next/server";

interface CheckoutRequestBody {
  productTitle?: string;
  planName?: string;
  amount?: number;
  priceSuffix?: string;
  days?: number;
}

function isValidHttpUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

export async function POST(request: NextRequest) {
  const apiKey = process.env.ASAAS_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "ASAAS_API_KEY nao configurada no ambiente." },
      { status: 500 },
    );
  }

  const safeApiKey = apiKey;

  let body: CheckoutRequestBody;

  try {
    body = (await request.json()) as CheckoutRequestBody;
  } catch {
    return NextResponse.json({ error: "Payload invalido." }, { status: 400 });
  }

  const productTitle = body.productTitle?.trim();
  const planName = body.planName?.trim();
  const amount = Number(body.amount ?? 0);
  const days = Number(body.days ?? 1);

  if (!productTitle || !planName || !Number.isFinite(amount) || amount <= 0) {
    return NextResponse.json(
      { error: "Dados insuficientes para criar o link de pagamento." },
      { status: 400 },
    );
  }

  const apiBaseUrl =
    process.env.ASAAS_API_BASE_URL ?? "https://api-sandbox.asaas.com/v3";
  const userAgent = process.env.ASAAS_USER_AGENT ?? "primboo-digital/1.0";
  const appBaseUrl =
    process.env.APP_BASE_URL?.trim() || request.nextUrl.origin;
  const checkoutRef = crypto.randomUUID();

  const successBaseUrl = process.env.ASAAS_SUCCESS_URL?.trim();
  const errorBaseUrl = process.env.ASAAS_ERROR_URL?.trim();

  const fallbackErrorUrl =
    isValidHttpUrl(errorBaseUrl ?? "")
      ? new URL(errorBaseUrl as string)
      : new URL(`${appBaseUrl}/pagamento/erro`);
  fallbackErrorUrl.searchParams.set("ref", checkoutRef);

  const payload: Record<string, unknown> = {
    name: `${productTitle} - ${planName}`,
    billingType: "UNDEFINED",
    chargeType: "DETACHED",
    value: Number(amount.toFixed(2)),
    dueDateLimitDays: 7,
    externalReference: checkoutRef,
    description: `${productTitle} | ${planName}${days > 1 ? ` | ${days} dias` : ""}`,
  };

  if (isValidHttpUrl(successBaseUrl ?? "")) {
    const successUrl = new URL(successBaseUrl as string);
    successUrl.searchParams.set("ref", checkoutRef);
    payload.callback = {
      successUrl: successUrl.toString(),
      autoRedirect: true,
    };
  }

  async function createPaymentLink(requestPayload: Record<string, unknown>) {
    const asaasResponse = await fetch(`${apiBaseUrl}/paymentLinks`, {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        "user-agent": userAgent,
        access_token: safeApiKey,
      },
      body: JSON.stringify(requestPayload),
      cache: "no-store",
    });

    const asaasData = (await asaasResponse.json()) as {
      url?: string;
      id?: string;
      errors?: Array<{ description?: string }>;
    };

    return { asaasResponse, asaasData };
  }

  try {
    let requestPayload = { ...payload };
    let { asaasResponse, asaasData } = await createPaymentLink(requestPayload);

    const asaasError = asaasData?.errors?.[0]?.description ?? "";
    const mustRetryWithoutCallback =
      !asaasResponse.ok &&
      (
        asaasError.toLowerCase().includes("domínio configurado") ||
        asaasError.toLowerCase().includes("callback") ||
        asaasError.toLowerCase().includes("url") ||
        asaasError.toLowerCase().includes("inválida") ||
        asaasError.toLowerCase().includes("invalida")
      );

    if (mustRetryWithoutCallback) {
      const payloadWithoutCallback = { ...requestPayload };
      delete payloadWithoutCallback.callback;
      ({ asaasResponse, asaasData } = await createPaymentLink(payloadWithoutCallback));
    }

    if (!asaasResponse.ok) {
      const finalAsaasError = asaasData?.errors?.[0]?.description;
      return NextResponse.json(
        { error: finalAsaasError ?? "Falha ao criar link de pagamento no Asaas." },
        { status: asaasResponse.status },
      );
    }

    if (!asaasData.url) {
      return NextResponse.json(
        { error: "Asaas nao retornou a URL do checkout." },
        { status: 502 },
      );
    }

    return NextResponse.json({
      checkoutUrl: asaasData.url,
      paymentLinkId: asaasData.id,
      checkoutReference: checkoutRef,
      fallbackErrorUrl: fallbackErrorUrl.toString(),
    });
  } catch {
    return NextResponse.json(
      { error: "Nao foi possivel conectar ao Asaas." },
      { status: 502 },
    );
  }
}
