/* ------------------------------------------------------------------ */
/*  Inline SVG icons for speech‑bubble cards                           */
/* ------------------------------------------------------------------ */

function IconConteudos() {
  return (
    <svg viewBox="0 0 80 80" fill="none" className="w-14 h-14">
      {/* Film/reel frame */}
      <rect x="14" y="10" width="52" height="42" rx="5" stroke="white" strokeWidth="2.5" />
      {/* Film strip holes left */}
      <circle cx="20" cy="20" r="2.5" fill="white" />
      <circle cx="20" cy="32" r="2.5" fill="white" />
      <circle cx="20" cy="44" r="2.5" fill="white" />
      {/* Film strip holes right */}
      <circle cx="60" cy="20" r="2.5" fill="white" />
      <circle cx="60" cy="32" r="2.5" fill="white" />
      <circle cx="60" cy="44" r="2.5" fill="white" />
      {/* Play triangle */}
      <polygon points="35,22 35,40 49,31" fill="white" />
      {/* Signal waves below */}
      <path d="M28 60 Q40 52 52 60" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M22 67 Q40 56 58 67" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
  );
}

function IconPublico() {
  return (
    <svg viewBox="0 0 80 80" fill="none" className="w-14 h-14">
      {/* Magnifying glass */}
      <circle cx="34" cy="32" r="18" stroke="white" strokeWidth="2.5" />
      <line x1="47" y1="45" x2="62" y2="60" stroke="white" strokeWidth="3" strokeLinecap="round" />
      {/* Person silhouette inside */}
      <circle cx="34" cy="27" r="5" stroke="white" strokeWidth="2" />
      <path d="M25 42 C25 35 43 35 43 42" stroke="white" strokeWidth="2" strokeLinecap="round" />
      {/* Crosshair marks */}
      <line x1="34" y1="12" x2="34" y2="16" stroke="white" strokeWidth="1.5" />
      <line x1="34" y1="48" x2="34" y2="52" stroke="white" strokeWidth="1.5" />
      <line x1="14" y1="32" x2="18" y2="32" stroke="white" strokeWidth="1.5" />
      <line x1="50" y1="32" x2="54" y2="32" stroke="white" strokeWidth="1.5" />
    </svg>
  );
}

function IconComunicacao() {
  return (
    <svg viewBox="0 0 80 80" fill="none" className="w-14 h-14">
      {/* Bubble 1 – back */}
      <rect x="6" y="8" width="40" height="28" rx="6" stroke="white" strokeWidth="2.5" />
      <path d="M14 36 L10 46 L22 36" stroke="white" strokeWidth="2" strokeLinejoin="round" />
      {/* Bubble 2 – front */}
      <rect x="30" y="28" width="42" height="24" rx="6" stroke="white" strokeWidth="2.5" fill="white" fillOpacity="0.15" />
      <path d="M60 52 L64 62 L52 52" stroke="white" strokeWidth="2" strokeLinejoin="round" />
      {/* Lines inside bubbles */}
      <line x1="14" y1="19" x2="36" y2="19" stroke="white" strokeWidth="2" strokeLinecap="round" />
      <line x1="14" y1="26" x2="28" y2="26" stroke="white" strokeWidth="2" strokeLinecap="round" />
      <line x1="38" y1="38" x2="62" y2="38" stroke="white" strokeWidth="2" strokeLinecap="round" />
      <line x1="38" y1="44" x2="54" y2="44" stroke="white" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function IconCusto() {
  return (
    <svg viewBox="0 0 80 80" fill="none" className="w-14 h-14">
      {/* Tag shape */}
      <path d="M10 40 L10 14 L40 14 L66 40 L40 66 L10 40 Z" stroke="white" strokeWidth="2.5" strokeLinejoin="round" />
      {/* Hole in tag */}
      <circle cx="24" cy="28" r="4" stroke="white" strokeWidth="2" />
      {/* Percentage symbol */}
      <circle cx="38" cy="36" r="4" stroke="white" strokeWidth="2" />
      <circle cx="52" cy="50" r="4" stroke="white" strokeWidth="2" />
      <line x1="54" y1="34" x2="36" y2="52" stroke="white" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const benefits = [
  {
    Icon: IconConteudos,
    color: "bg-[#FF6B00]",        // orange (primary)
    title: "Conteúdos dinâmicos",
    description:
      "Notícias e conteúdos de entretenimento atualizados diariamente",
  },
  {
    Icon: IconPublico,
    color: "bg-[#1A1A1A]",        // black
    title: "Público mais segmentado",
    description:
      "Escolha o local que te dará mais retorno de acordo com seu público",
  },
  {
    Icon: IconComunicacao,
    color: "bg-[#FF8A33]",        // orange light
    title: "Comunicação diversificada",
    description:
      "Comunicação com clientes e colaboradores no mesmo display",
  },
  {
    Icon: IconCusto,
    color: "bg-[#2D2D2D]",        // dark gray
    title: "Menor custo",
    description: "Planos que se adaptam ao seu orçamento",
  },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function WhyInvest() {
  return (
    <section id="vantagens" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-orange font-semibold text-sm uppercase tracking-widest">
            Vantagens
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-black leading-tight">
            Por que investir em{" "}
            <span className="text-orange">mídia digital?</span>
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            A mídia digital tem os maiores índices de atenção entre todos os
            segmentos de mídia, com a audiência mais qualificada do mercado.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((b) => (
            <div
              key={b.title}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              {/* Speech‑bubble top */}
              <div className={`relative ${b.color} rounded-b-[2rem] px-6 pt-8 pb-10 flex items-center justify-center`}>
                <b.Icon />
                {/* Tail / pointer */}
                <svg
                  viewBox="0 0 40 20"
                  className="absolute -bottom-4 left-6 w-10 h-5"
                  preserveAspectRatio="none"
                >
                  <path d="M0 0 L20 20 L40 0 Z" className={`${b.color.replace("bg-", "fill-")}`} />
                </svg>
              </div>

              {/* Content */}
              <div className="px-5 pt-8 pb-6">
                <h3 className="font-bold text-gray-900 text-base sm:text-lg leading-snug">
                  {b.title}
                </h3>
                <p className="text-gray-500 text-sm mt-2 leading-relaxed">
                  {b.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
