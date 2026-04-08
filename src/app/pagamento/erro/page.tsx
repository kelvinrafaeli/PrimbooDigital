import Link from "next/link";
import { AlertTriangle, RefreshCcw } from "lucide-react";

interface ErrorPageProps {
  searchParams: Promise<{
    ref?: string;
  }>;
}

export default async function PagamentoErroPage({ searchParams }: ErrorPageProps) {
  const params = await searchParams;
  const ref = params.ref;

  return (
    <main className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white border border-gray-200 rounded-3xl p-8 sm:p-10 shadow-sm">
          <div className="w-16 h-16 rounded-2xl bg-red-100 flex items-center justify-center mx-auto">
            <AlertTriangle size={34} className="text-red-600" />
          </div>

          <h1 className="mt-6 text-2xl sm:text-3xl font-bold text-black text-center">
            Nao foi possivel concluir o pagamento
          </h1>

          <p className="mt-3 text-gray-600 text-center leading-relaxed">
            O pagamento foi interrompido ou nao aprovado. Voce pode tentar novamente sem perder o seu pedido.
          </p>

          {ref && (
            <div className="mt-6 rounded-xl bg-gray-50 border border-gray-200 p-4 text-center">
              <p className="text-xs uppercase tracking-wide font-semibold text-gray-500">
                Referencia
              </p>
              <p className="mt-1 text-sm font-mono text-gray-700 break-all">{ref}</p>
            </div>
          )}

          <div className="mt-8 grid sm:grid-cols-2 gap-3">
            <Link
              href="/produtos"
              className="inline-flex items-center justify-center gap-2 py-3.5 rounded-xl bg-black text-white font-semibold hover:bg-gray-800 transition-colors"
            >
              <RefreshCcw size={18} />
              Tentar novamente
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center py-3.5 rounded-xl border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
            >
              Voltar ao inicio
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
