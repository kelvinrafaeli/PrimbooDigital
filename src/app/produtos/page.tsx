"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Monitor,
  RectangleHorizontal,
  Frame,
  Radio,
  CheckCircle,
  XCircle,
  ArrowRight,
  ShoppingCart,
  MessageCircle,
  Menu,
  X as XIcon,
  ArrowUp,
  Instagram,

  MapPin,
  Phone,
  Mail,
  Minus,
  Plus,
} from "lucide-react";

function formatBRL(value: number) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const products = [
  {
    id: "locacoes-corporativas",
    icon: Monitor,
    title: "Locações Corporativas",
    video: "/videos-produtos/locacoes-corporativas.mp4",
    subtitle: "Telas profissionais para eventos e ativações",
    description:
      "Serviço de locação de displays para eventos, ações promocionais, recepções e ativações corporativas.",
    plans: [
      {
        name: "Tela 50 polegadas",
        basePrice: 499,
        priceSuffix: "/diária",
        description: "Locação diária para eventos e ações promocionais.",
        features: [
          "Tela automatizada",
          "Suporte incluso",
          "Entrega e recolhimento",
          "Ideal para ativações e recepções",
        ],
        highlighted: true,
      },
      {
        name: "Tela 32 polegadas",
        basePrice: 349,
        priceSuffix: "/diária",
        description: "Opção compacta para pontos estratégicos de menor espaço.",
        features: [
          "Tela automatizada",
          "Suporte incluso",
          "Entrega e recolhimento",
          "Excelente custo-benefício",
        ],
        highlighted: false,
      },
    ],
    benefits: [
      "Estrutura pronta para o evento",
      "Entrega e recolhimento incluídos",
      "Suporte operacional",
    ],
  },
  {
    id: "vitrines-digitais",
    icon: RectangleHorizontal,
    title: "Vitrines Digitais",
    video: "/videos-produtos/vitrines-digitais.mp4",
    subtitle: "Presença visual profissional para sua vitrine",
    description:
      "Solução ideal para transformar a vitrine física em um ponto de atenção com conteúdo automatizado e identidade visual profissional.",
    plans: [
      {
        name: "Plano 1 - 1 Display + Moldura",
        basePrice: 399,
        priceSuffix: "/mês",
        description: "Investimento inicial de R$ 999,00 (à vista ou em até 10x).",
        features: [
          "1 display com moldura personalizada",
          "Automatização liga/desliga",
          "Instalação inclusa",
          "Suporte técnico",
        ],
        highlighted: true,
      },
      {
        name: "Plano 2 - 2 Displays + Molduras",
        basePrice: 799,
        priceSuffix: "/mês",
        description: "Investimento inicial de R$ 1.799,00 (à vista ou em até 10x).",
        features: [
          "2 displays com molduras personalizadas",
          "Até 20 conteúdos exclusivos da marca",
          "Programação e gestão de conteúdo",
          "Suporte técnico",
        ],
        highlighted: false,
      },
    ],
    benefits: [
      "Moldura personalizada",
      "Conteúdo automatizado",
      "Gestão de conteúdo inclusa",
    ],
  },
  {
    id: "visibilidade-estrategica",
    icon: Radio,
    title: "Visibilidade Estratégica",
    video: "/videos-produtos/visibilidade-estrategica.mp4",
    subtitle: "Presença física e digital para sua marca",
    description:
      "Solução desenvolvida para fortalecer a presença da sua marca com exibição física em displays estratégicos e divulgação digital nos canais da Primboo.",
    plans: [
      {
        name: "Start",
        basePrice: 198,
        priceSuffix: "/display/mês",
        description: "Ideal para começar com presença local e reforço digital.",
        features: [
          "Exibição em 1 display estratégico",
          "Presença no site da Primboo",
          "Divulgação nas redes sociais",
          "Alcance orgânico",
          { text: "Anúncio no S.E.R. Caxias", included: false },
        ],
        highlighted: false,
      },
      {
        name: "Essencial",
        basePrice: 345,
        priceSuffix: "/3 displays/mês",
        description: "Mais visibilidade para alcançar mais pessoas de forma estratégica.",
        features: [
          "Exibição em 3 displays estratégicos",
          "Presença no site da Primboo",
          "Divulgação nas redes sociais",
          "Melhor custo-benefício local",
          { text: "Anúncio no S.E.R. Caxias", included: false },
        ],
        highlighted: false,
      },
      {
        name: "Destaque",
        basePrice: 495,
        priceSuffix: "/5 displays/mês",
        description: "Mais frequência de exibição e maior força nos canais digitais.",
        features: [
          "Exibição em 5 displays estratégicos",
          "Presença no site da Primboo",
          "Divulgação nas redes sociais",
          "Maior exposição em pontos selecionados",
          { text: "Anúncio no S.E.R. Caxias", included: false },
        ],
        highlighted: false,
      },
      {
        name: "Elite",
        basePrice: 749,
        priceSuffix: "/10 displays/mês",
        description: "A solução mais completa para autoridade e impacto em escala.",
        features: [
          "Exibição em 10 displays estratégicos",
          "Presença no site da Primboo",
          "Alcance orgânico e tráfego pago",
          "Produção de vídeo profissional inclusa",
          { text: "Anúncio no S.E.R. Caxias", included: false },
        ],
        highlighted: true,
      },
      {
        name: "Premium",
        basePrice: 1190,
        priceSuffix: "/15 displays/mês",
        description: "Plano avançado para marcas que querem presença máxima e geração de demanda.",
        features: [
          "Exibição em 15 displays estratégicos",
          "Presença no site da Primboo",
          "Alcance orgânico e tráfego pago",
          "Gestão estratégica de campanhas no Meta Ads",
          "Suporte prioritário",
          { text: "Anúncio no S.E.R. Caxias", included: true },
        ],
        highlighted: false,
        whatsappText:
          "Olá, gostaria de contratar o plano Premium de Visibilidade Estratégica da Primboo.",
      },
    ],
    benefits: [
      "Presença física e digital integrada",
      "Planos escaláveis por volume",
      "Maior lembrança de marca",
    ],
  },
];

const navLinks = [
  { label: "Início", href: "/#inicio" },
  { label: "Sobre", href: "/#sobre" },
  { label: "Produtos", href: "/produtos" },
  { label: "Serviços", href: "/#servicos" },
  { label: "Parceiros", href: "/parceiros" },
  { label: "Contato", href: "/#contato" },
];

/* ------------------------------------------------------------------ */
/*  Modal types                                                        */
/* ------------------------------------------------------------------ */

interface ModalState {
  open: boolean;
  productTitle: string;
  planName: string;
  basePrice: number;
  priceSuffix: string;
  days: number;
}

const initialModal: ModalState = {
  open: false,
  productTitle: "",
  planName: "",
  basePrice: 0,
  priceSuffix: "/mês",
  days: 1,
};

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function ProdutosPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeProduct, setActiveProduct] = useState(products[0].id);
  const [modal, setModal] = useState<ModalState>(initialModal);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  useEffect(() => {
    const validIds = new Set(products.map((p) => p.id));

    const syncFromHash = () => {
      const hashId = window.location.hash.replace("#", "");
      if (validIds.has(hashId)) {
        setActiveProduct(hashId);
      }
    };

    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, []);

  const current = products.find((p) => p.id === activeProduct) ?? products[0];
  const menuProducts = [
    products.find((p) => p.id === "visibilidade-estrategica"),
    products.find((p) => p.id === "vitrines-digitais"),
    products.find((p) => p.id === "locacoes-corporativas"),
  ].filter((p): p is (typeof products)[number] => Boolean(p));

  function openModal(productTitle: string, planName: string, basePrice: number, priceSuffix?: string) {
    setCheckoutError(null);
    setModal({
      open: true,
      productTitle,
      planName,
      basePrice,
      priceSuffix: priceSuffix ?? "/mês",
      days: 1,
    });
  }

  function closeModal() {
    setCheckoutError(null);
    setModal(initialModal);
  }

  function setDays(days: number) {
    setModal((prev) => ({ ...prev, days: Math.max(1, Math.min(30, days)) }));
  }

  const isDailyPlan = modal.open && modal.priceSuffix === "/diária";
  const total = modal.open ? modal.basePrice * (isDailyPlan ? modal.days : 1) : 0;

  async function handleCheckout() {
    if (!modal.open) return;

    setCheckoutLoading(true);
    setCheckoutError(null);

    try {
      const response = await fetch("/api/asaas/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productTitle: modal.productTitle,
          planName: modal.planName,
          amount: total,
          priceSuffix: modal.priceSuffix,
          days: isDailyPlan ? modal.days : 1,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error ?? "Nao foi possivel iniciar o pagamento.");
      }

      if (!data?.checkoutUrl) {
        throw new Error("Link de pagamento nao retornado pelo Asaas.");
      }

      window.location.href = data.checkoutUrl;
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Falha ao iniciar pagamento. Tente novamente.";
      setCheckoutError(message);
      setCheckoutLoading(false);
    }
  }

  return (
    <>
      {/* ── Header ──────────────────────────────────────────────── */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="flex items-center gap-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo_vetor.svg" alt="Primboo Digital Media" className="h-10 w-10" />
              <div className="flex flex-col">
                <span className="text-white font-bold text-lg leading-tight">Primboo</span>
                <span className="text-orange text-[10px] font-medium tracking-[0.2em] uppercase">
                  Digital Media
                </span>
              </div>
            </Link>

            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-white/80 hover:text-orange transition-colors text-sm font-medium"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <a
              href="https://api.whatsapp.com/send?phone=5554991366449&text=Ol%C3%A1%2C%20gostaria%20de%20saber%20mais%20sobre%20os%20produtos%20da%20Primboo!"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center px-6 py-2.5 rounded-full gradient-orange text-white font-semibold text-sm hover:opacity-90 transition-opacity"
            >
              Fale Conosco
            </a>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden text-white p-2"
              aria-label="Abrir menu"
            >
              {menuOpen ? <XIcon size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-black/95 border-t border-white/10">
            <nav className="flex flex-col px-4 py-4 gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-white/80 hover:text-orange transition-colors py-3 px-4 rounded-lg hover:bg-white/5 text-sm font-medium"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* ── Hero ────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-16 gradient-dark overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,107,0,0.15),_transparent_50%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange/10 border border-orange/20 mb-6">
            <ShoppingCart size={16} className="text-orange" />
            <span className="text-orange text-sm font-medium">Produtos &amp; Serviços</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight max-w-4xl mx-auto">
            A Primboo oferece a{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange to-orange-light">
              solução ideal
            </span>{" "}
            para sua empresa
          </h1>
          <p className="mt-4 text-lg text-white/60 max-w-2xl mx-auto">
            Conheça nossos painéis e escolha a melhor opção para destacar sua
            marca em Caxias do Sul.
          </p>
        </div>
      </section>

      {/* ── Product Tabs ────────────────────────────────────────── */}
      <section className="py-4 bg-white sticky top-20 z-40 border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide sm:justify-center">
            {menuProducts.map((product) => (
              <button
                key={product.id}
                onClick={() => setActiveProduct(product.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  activeProduct === product.id
                    ? "gradient-orange text-white shadow-lg shadow-orange/20"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <product.icon size={16} />
                {product.title}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Active Product Detail ───────────────────────────────── */}
      <main className="bg-gray-50 pb-24">
        {/* Product header */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl gradient-orange flex items-center justify-center">
                    <current.icon size={24} className="text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-black">
                      {current.title}
                    </h2>
                    <p className="text-orange text-sm font-medium">{current.subtitle}</p>
                  </div>
                </div>
                <p className="text-gray-600 text-lg leading-relaxed mt-4">
                  {current.description}
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  {current.benefits.map((b) => (
                    <div
                      key={b}
                      className="flex items-center gap-2 bg-orange/5 text-orange px-4 py-2 rounded-full text-sm font-medium"
                    >
                      <CheckCircle size={14} />
                      {b}
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative flex justify-center">
                <div className="relative max-h-[560px] w-auto">
                  <div className="absolute left-[2.9%] right-[2.9%] top-[4.6%] bottom-[5.4%] overflow-hidden rounded-xl">
                    <video
                      key={current.id}
                      className="w-full h-full object-cover"
                      autoPlay
                      loop
                      muted
                      playsInline
                    >
                      <source src={current.video} type="video/mp4" />
                    </video>
                  </div>

                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/videos/moldura.png"
                    alt="Moldura Primboo"
                    className="relative z-10 max-h-[560px] w-auto pointer-events-none select-none"
                    draggable={false}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Plans / pricing cards */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h3 className="text-2xl sm:text-3xl font-bold text-black">
                Escolha o plano ideal
              </h3>
              <p className="text-gray-500 mt-2">
                Compare os pacotes e escolha o formato ideal para sua marca
              </p>
            </div>

            <div
              className={`grid gap-8 ${
                current.plans.length === 1
                  ? "max-w-md mx-auto"
                  : current.plans.length === 2
                  ? "md:grid-cols-2 max-w-3xl mx-auto"
                  : current.plans.length === 5
                  ? "md:grid-cols-6 max-w-6xl mx-auto"
                  : current.plans.length === 4
                  ? "sm:grid-cols-2 lg:grid-cols-4"
                  : "md:grid-cols-3"
              }`}
            >
              {current.plans.map((plan, index) => {
                const isEliteTheme =
                  current.id === "visibilidade-estrategica" && plan.name === "Elite";
                const isPremiumTheme =
                  current.id === "visibilidade-estrategica" && plan.name === "Premium";

                return (
                  <div
                    key={plan.name}
                    className={`relative rounded-2xl p-8 flex flex-col ${
                      current.plans.length === 5
                        ? `md:col-span-2 ${
                            index === 3
                              ? "md:col-start-2"
                              : index === 4
                              ? "md:col-start-4"
                              : ""
                          }`
                        : ""
                    } ${
                      isEliteTheme
                        ? "bg-white text-black border border-gray-200 shadow-sm"
                        : isPremiumTheme
                        ? "bg-black text-white shadow-2xl shadow-orange/20 border-2 border-orange/55 ring-1 ring-white/10"
                        : plan.highlighted
                        ? "bg-black text-white shadow-2xl shadow-orange/10 border-2 border-orange ring-1 ring-orange/20"
                        : "bg-white text-black border border-gray-200 shadow-sm"
                    }`}
                  >
                  {plan.highlighted && (
                    <div
                      className={`absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${
                        isEliteTheme
                          ? "bg-orange text-white"
                          : "gradient-orange text-white"
                      }`}
                    >
                      Recomendado
                    </div>
                  )}

                  {current.id === "visibilidade-estrategica" && plan.name === "Premium" && (
                    <div className="absolute top-3 right-3 pointer-events-none select-none">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src="/logos-parceiros/11.png"
                        alt="S.E.R. Caxias"
                        className="h-20 w-auto object-contain"
                      />
                    </div>
                  )}

                  <h4
                    className={`text-xl font-bold ${
                      isEliteTheme
                        ? "text-black"
                        : isPremiumTheme
                        ? "text-white"
                        : plan.highlighted
                        ? "text-white"
                        : "text-black"
                    } ${current.id === "visibilidade-estrategica" && plan.name === "Premium" ? "pr-32" : ""}`}
                    style={{ minHeight: "72px" }}
                  >
                    {plan.name}
                  </h4>
                  <p
                    className={`mt-2 text-sm leading-relaxed ${
                      isEliteTheme
                        ? "text-gray-500"
                        : isPremiumTheme
                        ? "text-white/75"
                        : plan.highlighted
                        ? "text-white/70"
                        : "text-gray-500"
                    }`}
                    style={{ minHeight: "84px" }}
                  >
                    {plan.description}
                  </p>

                  {!(current.id === "visibilidade-estrategica" && plan.name === "Premium") && (
                    <div className="mt-4 mb-6 min-h-[88px]">
                      <span className="text-3xl font-bold text-orange">
                        {formatBRL(plan.basePrice)}
                      </span>
                      <span
                        className={`block text-sm ${
                          isEliteTheme
                            ? "text-gray-400"
                            : isPremiumTheme
                            ? "text-white/60"
                            : plan.highlighted
                            ? "text-white/50"
                            : "text-gray-400"
                        }`}
                      >
                        {plan.priceSuffix ?? "/mês"}
                      </span>
                    </div>
                  )}

                  <ul className="space-y-3 flex-1">
                    {plan.features.map((feat, index) => {
                      const isIncluded = typeof feat === "string" ? true : feat.included;
                      const featureText = typeof feat === "string" ? feat : feat.text;

                      return (
                        <li key={`${featureText}-${index}`} className="flex items-start gap-2">
                          {isIncluded ? (
                            <CheckCircle
                              size={16}
                              className="mt-0.5 shrink-0 text-orange"
                            />
                          ) : (
                            <XCircle
                              size={16}
                              className="mt-0.5 shrink-0 text-red-500"
                            />
                          )}
                          <span
                            className={`text-sm ${
                              isIncluded
                                ? isEliteTheme
                                  ? "text-gray-600"
                                  : isPremiumTheme
                                  ? "text-white/85"
                                  : plan.highlighted
                                  ? "text-white/80"
                                  : "text-gray-600"
                                : isEliteTheme
                                ? "text-gray-400"
                                : isPremiumTheme
                                ? "text-white/40"
                                : plan.highlighted
                                ? "text-white/50"
                                : "text-gray-400"
                            }`}
                          >
                            {featureText}
                          </span>
                        </li>
                      );
                    })}
                  </ul>

                  {plan.whatsappText ? (
                    <a
                      href={`https://api.whatsapp.com/send?phone=5554991366449&text=${encodeURIComponent(plan.whatsappText)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`mt-8 flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-sm transition-all ${
                        isEliteTheme
                          ? "bg-black text-white hover:bg-gray-800"
                          : isPremiumTheme
                          ? "bg-orange/85 text-white hover:bg-orange shadow-lg shadow-orange/25"
                          : plan.highlighted
                          ? "gradient-orange text-white hover:opacity-90 shadow-lg shadow-orange/25"
                          : "bg-black text-white hover:bg-gray-800"
                      }`}
                    >
                      <MessageCircle size={16} />
                      Falar no WhatsApp
                    </a>
                  ) : (
                    <button
                      onClick={() => openModal(current.title, plan.name, plan.basePrice, plan.priceSuffix)}
                      className={`mt-8 flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-sm transition-all cursor-pointer ${
                        isEliteTheme
                          ? "bg-black text-white hover:bg-gray-800"
                          : isPremiumTheme
                          ? "bg-orange/85 text-white hover:bg-orange shadow-lg shadow-orange/25"
                          : plan.highlighted
                          ? "gradient-orange text-white hover:opacity-90 shadow-lg shadow-orange/25"
                          : "bg-black text-white hover:bg-gray-800"
                      }`}
                    >
                      <ShoppingCart size={16} />
                      Adquirir Agora
                    </button>
                  )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="gradient-dark rounded-3xl p-12 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,107,0,0.2),_transparent_60%)]" />
              <div className="relative">
                <h3 className="text-2xl sm:text-3xl font-bold text-white">
                  Não encontrou o plano ideal?
                </h3>
                <p className="text-white/60 mt-3 max-w-lg mx-auto">
                  Montamos uma solução personalizada de acordo com a
                  necessidade da sua marca, objetivo e quantidade displays desejada.
                </p>
                <div className="mt-8 flex items-center justify-center">
                  <a
                    href="https://api.whatsapp.com/send?phone=5554991366449&text=Ol%C3%A1%2C%20gostaria%20de%20uma%20proposta%20personalizada!"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-full gradient-orange text-white font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-orange/25"
                  >
                    <MessageCircle size={20} />
                    Fale com um consultor
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* All products overview – illustration cards (same style as homepage) */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h3 className="text-2xl sm:text-3xl font-bold text-black">
                Todos os nossos produtos
              </h3>
              <p className="text-gray-500 mt-2">
                Clique em qualquer produto para ver os detalhes e planos
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => {
                const isActive = activeProduct === product.id;
                return (
                  <button
                    key={product.id}
                    onClick={() => {
                      setActiveProduct(product.id);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className={`group text-left rounded-2xl p-6 sm:p-8 transition-all duration-300 hover:-translate-y-1 flex flex-col items-start border-2 ${
                      isActive
                        ? "border-orange bg-orange/5 shadow-lg"
                        : "border-gray-100 bg-white hover:border-orange/20 shadow-sm hover:shadow-xl"
                    }`}
                  >
                    <h4 className="text-lg sm:text-xl font-bold text-gray-800 mb-1">
                      {product.title}
                    </h4>
                    <p className="text-sm text-gray-500">{product.subtitle}</p>

                    <div className={`w-full flex-1 flex items-end justify-center mt-6 transition-colors ${
                      isActive ? "text-orange" : "text-orange/70 group-hover:text-orange"
                    }`}>
                      <div className="w-36 h-28 sm:w-44 sm:h-32">
                        {product.id === "locacoes-corporativas" && (
                          <svg viewBox="0 0 180 140" fill="none" className="w-full h-full">
                            <rect x="35" y="20" width="70" height="90" rx="4" stroke="currentColor" strokeWidth="2.5" />
                            <rect x="115" y="38" width="30" height="72" rx="3" stroke="currentColor" strokeWidth="2.5" />
                            <rect x="46" y="32" width="12" height="10" rx="1.5" fill="currentColor" opacity="0.2" />
                            <rect x="64" y="32" width="12" height="10" rx="1.5" fill="currentColor" opacity="0.2" />
                            <rect x="82" y="32" width="12" height="10" rx="1.5" fill="currentColor" opacity="0.2" />
                            <rect x="46" y="48" width="12" height="10" rx="1.5" fill="currentColor" opacity="0.2" />
                            <rect x="64" y="48" width="12" height="10" rx="1.5" fill="currentColor" opacity="0.2" />
                            <rect x="82" y="48" width="12" height="10" rx="1.5" fill="currentColor" opacity="0.2" />
                            <rect x="63" y="78" width="14" height="32" rx="2" stroke="currentColor" strokeWidth="2" />
                            <path d="M130 20c-9 0-16 6.8-16 15.2 0 10.8 16 24.8 16 24.8s16-14 16-24.8C146 26.8 139 20 130 20z" fill="currentColor" opacity="0.85" />
                            <circle cx="130" cy="35" r="5" fill="white" />
                          </svg>
                        )}
                        {product.id === "vitrines-digitais" && (
                          <svg viewBox="0 0 180 140" fill="none" className="w-full h-full">
                            {/* Left panel */}
                            <rect x="15" y="15" width="65" height="85" rx="4" stroke="currentColor" strokeWidth="2.5" />
                            <rect x="22" y="22" width="51" height="68" rx="2" fill="currentColor" opacity="0.12" />
                            <line x1="47" y1="100" x2="47" y2="118" stroke="currentColor" strokeWidth="2" />
                            <line x1="33" y1="118" x2="61" y2="118" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            {/* Right panel */}
                            <rect x="100" y="15" width="65" height="85" rx="4" stroke="currentColor" strokeWidth="2.5" />
                            <rect x="107" y="22" width="51" height="68" rx="2" fill="currentColor" opacity="0.12" />
                            <line x1="132" y1="100" x2="132" y2="118" stroke="currentColor" strokeWidth="2" />
                            <line x1="118" y1="118" x2="146" y2="118" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                          </svg>
                        )}
                        {product.id === "visibilidade-estrategica" && (
                          <svg viewBox="0 0 180 140" fill="none" className="w-full h-full">
                            <circle cx="68" cy="70" r="34" stroke="currentColor" strokeWidth="2.5" />
                            <circle cx="68" cy="70" r="22" stroke="currentColor" strokeWidth="2.5" opacity="0.8" />
                            <circle cx="68" cy="70" r="10" fill="currentColor" opacity="0.9" />
                            <path d="M100 95 L145 50" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                            <path d="M130 50 H145 V65" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                            <rect x="108" y="88" width="8" height="18" rx="2" fill="currentColor" opacity="0.35" />
                            <rect x="121" y="80" width="8" height="26" rx="2" fill="currentColor" opacity="0.55" />
                            <rect x="134" y="70" width="8" height="36" rx="2" fill="currentColor" opacity="0.8" />
                          </svg>
                        )}
                      </div>
                    </div>

                    <div className="mt-4 flex items-center gap-1 text-orange text-sm font-semibold">
                      Ver planos <ArrowRight size={14} />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

      </main>

      {/* ── Purchase Modal ──────────────────────────────────────── */}
      {modal.open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={closeModal}
          />

          {/* Modal */}
          <div className="relative bg-white rounded-3xl shadow-2xl max-w-lg w-full p-8 animate-fade-in-up">
            {/* Close */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
              aria-label="Fechar"
            >
              <XIcon size={16} className="text-gray-500" />
            </button>

            {/* Header */}
            <div className="text-center mb-6">
              <div className="w-14 h-14 rounded-xl gradient-orange flex items-center justify-center mx-auto mb-3">
                <ShoppingCart size={24} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-black">Adquirir Plano</h3>
              <p className="text-gray-500 text-sm mt-1">
                {modal.productTitle} — {modal.planName}
              </p>
            </div>

            {isDailyPlan && (
              <div className="bg-gray-50 rounded-2xl p-6 mb-6">
                <p className="text-sm font-medium text-gray-700 mb-3">Quantidade de dias</p>
                <div className="flex items-center justify-center gap-4">
                  <button
                    onClick={() => setDays(modal.days - 1)}
                    disabled={modal.days <= 1}
                    className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:border-orange disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    aria-label="Diminuir dias"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="text-4xl font-bold text-black w-16 text-center">{modal.days}</span>
                  <button
                    onClick={() => setDays(modal.days + 1)}
                    disabled={modal.days >= 30}
                    className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:border-orange disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    aria-label="Aumentar dias"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
            )}

            {/* Total */}
            <div className="bg-black rounded-2xl p-5 mb-6 flex items-center justify-between">
              <div>
                <p className="text-white/60 text-xs">{isDailyPlan ? "Valor total" : "Valor do plano"}</p>
                <p className="text-white font-bold text-2xl">{formatBRL(total)}</p>
              </div>
              <div className="text-right">
                {isDailyPlan && (
                  <p className="text-white/60 text-xs">{modal.days} {modal.days === 1 ? "dia" : "dias"}</p>
                )}
                <p className="text-orange font-bold text-sm">
                  {isDailyPlan ? `${formatBRL(modal.basePrice)} por dia` : modal.priceSuffix}
                </p>
              </div>
            </div>

            {/* Action */}
            <button
              onClick={handleCheckout}
              disabled={checkoutLoading}
              className="w-full flex items-center justify-center gap-2 py-4 rounded-xl gradient-orange text-white font-bold text-lg hover:opacity-90 transition-opacity shadow-lg shadow-orange/25 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <ArrowRight size={20} />
              {checkoutLoading ? "Redirecionando..." : "Continuar para pagamento"}
            </button>

            {checkoutError && (
              <p className="mt-3 text-sm text-red-500 text-center">{checkoutError}</p>
            )}

          </div>
        </div>
      )}

      {/* ── Footer ──────────────────────────────────────────────── */}
      <footer className="bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/logo_vetor.svg" alt="Primboo" className="h-10 w-10" />
                <div className="flex flex-col">
                  <span className="text-white font-bold text-lg leading-tight">Primboo</span>
                  <span className="text-orange text-[10px] font-medium tracking-[0.2em] uppercase">
                    Digital Media
                  </span>
                </div>
              </div>
              <p className="text-white/50 text-sm leading-relaxed">
                Soluções estratégicas no mundo físico e digital em Caxias do Sul.
              </p>
              <div className="flex gap-3 mt-6">
                <a href="https://www.instagram.com/primboodigital/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-orange transition-colors">
                  <Instagram size={18} />
                </a>
                <a href="https://api.whatsapp.com/send?phone=5554991366449" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-orange transition-colors">
                  <MessageCircle size={18} />
                </a>
              </div>
            </div>
            <div>
              <h3 className="font-bold text-white mb-4">Navegação</h3>
              <ul className="space-y-3">
                {navLinks.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="text-white/50 hover:text-orange transition-colors text-sm">{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-white mb-4">Produtos</h3>
              <ul className="space-y-3">
                {menuProducts.map((p) => (
                  <li key={p.id}>
                    <button onClick={() => { setActiveProduct(p.id); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="text-white/50 hover:text-orange transition-colors text-sm">
                      {p.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-white mb-4">Contato</h3>
              <ul className="space-y-3 text-white/50 text-sm">
                <li className="flex items-center gap-2"><MapPin size={14} className="text-orange" /> Caxias do Sul, RS</li>
                <li className="flex items-center gap-2"><Phone size={14} className="text-orange" /> (54) 99136-6449</li>
                <li className="flex items-center gap-2"><Mail size={14} className="text-orange" /> contato@primboodigital.com.br</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between">
            <p className="text-white/40 text-sm">
              &copy; {new Date().getFullYear()} Primboo Digital Media. Todos os direitos reservados.
            </p>
            <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-orange transition-colors" aria-label="Voltar ao topo">
              <ArrowUp size={18} />
            </button>
          </div>
        </div>
      </footer>

      {/* WhatsApp floating */}
      <a
        href="https://api.whatsapp.com/send?phone=5554991366449&text=Ol%C3%A1%2C%20gostaria%20de%20saber%20mais%20sobre%20os%20produtos%20da%20Primboo!"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-green-500 flex items-center justify-center shadow-lg hover:bg-green-600 transition-colors hover:scale-110 transform duration-200"
        aria-label="WhatsApp"
      >
        <MessageCircle size={28} className="text-white" />
      </a>
    </>
  );
}

