import { NextRequest, NextResponse } from "next/server";

interface CheckoutRequestBody {
  productTitle?: string;
  planName?: string;
  amount?: number;
  priceSuffix?: string;
  days?: number;
}

export async function POST(request: NextRequest) {
  const apiKey = process.env.ASAAS_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "ASAAS_API_KEY nao configurada no ambiente." },
      { status: 500 },
    );
  }

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

  const payload: Record<string, unknown> = {
    name: `${productTitle} - ${planName}`,
    billingType: "UNDEFINED",
    chargeType: "DETACHED",
    value: Number(amount.toFixed(2)),
    description: `${productTitle} | ${planName}${days > 1 ? ` | ${days} dias` : ""}`,
  };

  const successUrl = process.env.ASAAS_SUCCESS_URL?.trim();
  if (successUrl) {
    payload.callback = {
      successUrl,
      autoRedirect: true,
    };
  }

  try {
    const asaasResponse = await fetch(`${apiBaseUrl}/paymentLinks`, {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        "user-agent": userAgent,
        access_token: apiKey,
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    });

    const asaasData = (await asaasResponse.json()) as {
      url?: string;
      id?: string;
      errors?: Array<{ description?: string }>;
    };

    if (!asaasResponse.ok) {
      const asaasError = asaasData?.errors?.[0]?.description;
      return NextResponse.json(
        { error: asaasError ?? "Falha ao criar link de pagamento no Asaas." },
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
    });
  } catch {
    return NextResponse.json(
      { error: "Nao foi possivel conectar ao Asaas." },
      { status: 502 },
    );
  }
}
