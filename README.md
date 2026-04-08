This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Integracao Asaas (Checkout)

Esta aplicacao possui integracao com Asaas para redirecionar o cliente ao pagamento ao clicar em comprar.

### 1) Configure as variaveis de ambiente

Copie `.env.example` para `.env.local` e preencha:

- `ASAAS_API_KEY`: chave da API Asaas (sandbox ou producao)
- `ASAAS_API_BASE_URL`: `https://api-sandbox.asaas.com/v3` ou `https://api.asaas.com/v3`
- `ASAAS_USER_AGENT`: identificador da aplicacao (obrigatorio para contas novas)
- `APP_BASE_URL`: URL base da aplicacao (ex.: `http://localhost:3000`)
- `ASAAS_SUCCESS_URL` (opcional): sobrescreve URL de sucesso
- `ASAAS_ERROR_URL` (opcional): sobrescreve URL de erro
- `ASAAS_WEBHOOK_TOKEN` (opcional): token para validar webhook

### 2) Como funciona

- Frontend chama `POST /api/asaas/checkout` ao clicar em continuar no modal.
- A rota server-side cria um link de pagamento em `POST /v3/paymentLinks` no Asaas.
- O frontend redireciona o cliente para a `url` retornada pelo Asaas.
- O callback do Asaas redireciona para ` /pagamento/sucesso ` apos confirmacao.
- Em caso de falha/cancelamento, a aplicacao possui a pagina ` /pagamento/erro `.
- O webhook oficial do Asaas aponta para `POST /api/asaas/webhook` para confirmar eventos.

### 3) Configuracao de webhook no Asaas

Configure no painel do Asaas o endpoint:

- URL: `{APP_BASE_URL}/api/asaas/webhook`
- Header/token (opcional): usar o mesmo valor de `ASAAS_WEBHOOK_TOKEN`

Eventos recomendados para acompanhar ciclo de pagamento:

- `PAYMENT_CONFIRMED`
- `PAYMENT_RECEIVED`
- `PAYMENT_OVERDUE`
- `PAYMENT_DELETED`

### 4) Observacoes

- Nunca exponha `ASAAS_API_KEY` no frontend.
- A `ASAAS_SUCCESS_URL`, quando informada, deve respeitar as regras de dominio do Asaas.
