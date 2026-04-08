import Link from "next/link";
import { CheckCircle2, MessageCircle } from "lucide-react";

interface SuccessPageProps {
  searchParams: Promise<{
    ref?: string;
  }>;
}

export default async function PagamentoSucessoPage({ searchParams }: SuccessPageProps) {
  const params = await searchParams;
  const ref = params.ref;

  return (
    <main className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white border border-gray-200 rounded-3xl p-8 sm:p-10 shadow-sm">
          <div className="w-16 h-16 rounded-2xl bg-green-100 flex items-center justify-center mx-auto">
            <CheckCircle2 size={34} className="text-green-600" />
          </div>

          <h1 className="mt-6 text-2xl sm:text-3xl font-bold text-black text-center">
            Pagamento confirmado
          </h1>

          <p className="mt-3 text-gray-600 text-center leading-relaxed">
            Recebemos a confirmacao do pagamento no Asaas. Nossa equipe vai iniciar o processo de onboarding e entrar em contato em breve.
          </p>

          {ref && (
            <div className="mt-6 rounded-xl bg-gray-50 border border-gray-200 p-4 text-center">
              <p className="text-xs uppercase tracking-wide font-semibold text-gray-500">
                Referencia do pagamento
              </p>
              <p className="mt-1 text-sm font-mono text-gray-700 break-all">{ref}</p>
            </div>
          )}

          <div className="mt-8 grid sm:grid-cols-2 gap-3">
            <Link
              href="/produtos"
              className="inline-flex items-center justify-center py-3.5 rounded-xl bg-black text-white font-semibold hover:bg-gray-800 transition-colors"
            >
              Voltar aos produtos
            </Link>
            <a
              href="https://api.whatsapp.com/send?phone=5554991366449&text=Ola%2C%20acabei%20de%20concluir%20o%20pagamento%20e%20quero%20dar%20sequencia%20ao%20onboarding."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 py-3.5 rounded-xl gradient-orange text-white font-semibold hover:opacity-90 transition-opacity"
            >
              <MessageCircle size={18} />
              Falar no WhatsApp
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
