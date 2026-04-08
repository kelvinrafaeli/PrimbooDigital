import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  Inline SVG illustrations (inspired by the reference design)        */
/* ------------------------------------------------------------------ */

function IllustrationPainel() {
  return (
    <svg viewBox="0 0 180 140" fill="none" className="w-full h-full">
      {/* Monitor body */}
      <rect x="20" y="15" width="140" height="85" rx="6" stroke="currentColor" strokeWidth="2.5" />
      {/* Screen */}
      <rect x="30" y="25" width="120" height="65" rx="3" fill="currentColor" opacity="0.15" />
      {/* Play button */}
      <circle cx="90" cy="57" r="16" fill="currentColor" opacity="0.9" />
      <polygon points="85,49 85,65 99,57" fill="white" />
      {/* Stand */}
      <rect x="70" y="100" width="40" height="8" rx="2" stroke="currentColor" strokeWidth="2" />
      <rect x="60" y="108" width="60" height="5" rx="2.5" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function IllustrationLocacoesCorporativas() {
  return (
    <svg viewBox="0 0 180 140" fill="none" className="w-full h-full">
      {/* Building */}
      <rect x="35" y="20" width="70" height="90" rx="4" stroke="currentColor" strokeWidth="2.5" />
      <rect x="115" y="38" width="30" height="72" rx="3" stroke="currentColor" strokeWidth="2.5" />

      {/* Windows */}
      <rect x="46" y="32" width="12" height="10" rx="1.5" fill="currentColor" opacity="0.2" />
      <rect x="64" y="32" width="12" height="10" rx="1.5" fill="currentColor" opacity="0.2" />
      <rect x="82" y="32" width="12" height="10" rx="1.5" fill="currentColor" opacity="0.2" />
      <rect x="46" y="48" width="12" height="10" rx="1.5" fill="currentColor" opacity="0.2" />
      <rect x="64" y="48" width="12" height="10" rx="1.5" fill="currentColor" opacity="0.2" />
      <rect x="82" y="48" width="12" height="10" rx="1.5" fill="currentColor" opacity="0.2" />

      {/* Door */}
      <rect x="63" y="78" width="14" height="32" rx="2" stroke="currentColor" strokeWidth="2" />

      {/* Location pin */}
      <path d="M130 20c-9 0-16 6.8-16 15.2 0 10.8 16 24.8 16 24.8s16-14 16-24.8C146 26.8 139 20 130 20z" fill="currentColor" opacity="0.85" />
      <circle cx="130" cy="35" r="5" fill="white" />
    </svg>
  );
}

function IllustrationVeiculacao() {
  return (
    <svg viewBox="0 0 180 140" fill="none" className="w-full h-full">
      {/* Monitor frame */}
      <rect x="25" y="30" width="120" height="70" rx="5" stroke="currentColor" strokeWidth="2.5" />
      {/* Screen */}
      <rect x="33" y="38" width="104" height="54" rx="3" fill="currentColor" opacity="0.15" />
      {/* Play button */}
      <circle cx="85" cy="65" r="14" fill="currentColor" opacity="0.9" />
      <polygon points="81,58 81,72 93,65" fill="white" />
    </svg>
  );
}

function IllustrationVisibilidadeEstrategica() {
  return (
    <svg viewBox="0 0 180 140" fill="none" className="w-full h-full">
      {/* Bullseye */}
      <circle cx="68" cy="70" r="34" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="68" cy="70" r="22" stroke="currentColor" strokeWidth="2.5" opacity="0.8" />
      <circle cx="68" cy="70" r="10" fill="currentColor" opacity="0.9" />

      {/* Growth arrow */}
      <path d="M100 95 L145 50" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M130 50 H145 V65" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

      {/* Bars */}
      <rect x="108" y="88" width="8" height="18" rx="2" fill="currentColor" opacity="0.35" />
      <rect x="121" y="80" width="8" height="26" rx="2" fill="currentColor" opacity="0.55" />
      <rect x="134" y="70" width="8" height="36" rx="2" fill="currentColor" opacity="0.8" />
    </svg>
  );
}

function IllustrationPainelLED() {
  return (
    <svg viewBox="0 0 180 140" fill="none" className="w-full h-full">
      {/* Left panel */}
      <rect x="15" y="15" width="65" height="85" rx="4" stroke="currentColor" strokeWidth="2.5" />
      <rect x="22" y="22" width="51" height="68" rx="2" fill="currentColor" opacity="0.12" />
      {/* Left panel stand */}
      <line x1="47" y1="100" x2="47" y2="118" stroke="currentColor" strokeWidth="2" />
      <line x1="33" y1="118" x2="61" y2="118" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      {/* Right panel */}
      <rect x="100" y="15" width="65" height="85" rx="4" stroke="currentColor" strokeWidth="2.5" />
      <rect x="107" y="22" width="51" height="68" rx="2" fill="currentColor" opacity="0.12" />
      {/* Right panel stand */}
      <line x1="132" y1="100" x2="132" y2="118" stroke="currentColor" strokeWidth="2" />
      <line x1="118" y1="118" x2="146" y2="118" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const services = [
  {
    title: "Visibilidade Estratégica",
    Illustration: IllustrationVisibilidadeEstrategica,
    href: "/produtos#visibilidade-estrategica",
  },
  {
    title: "Vitrines Digitais",
    Illustration: IllustrationPainelLED,
    href: "/produtos#vitrines-digitais",
  },
  {
    title: "Locações Corporativas",
    Illustration: IllustrationLocacoesCorporativas,
    href: "/produtos#locacoes-corporativas",
  },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function Services() {
  return (
    <section id="servicos" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-orange font-semibold text-sm uppercase tracking-widest">
            Produtos e Serviços
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-black">
            Soluções completas em{" "}
            <span className="text-orange">mídia digital</span>
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Oferecemos uma gama completa de produtos e serviços para
            transformar a comunicação visual do seu negócio.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <Link
              key={service.title}
              href={service.href}
              className="group bg-white rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-orange/20 hover:-translate-y-1 flex flex-col items-start"
            >
              <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-6">
                {service.title}
              </h3>
              <div className="w-full flex-1 flex items-end justify-center text-orange/70 group-hover:text-orange transition-colors">
                <div className="w-36 h-28 sm:w-44 sm:h-32">
                  <service.Illustration />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
