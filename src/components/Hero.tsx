import { ArrowRight, Play } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 gradient-dark" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,107,0,0.15),_transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(255,107,0,0.1),_transparent_50%)]" />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left – Text content */}
          <div>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange/10 border border-orange/20 mb-8">
              <div className="w-2 h-2 rounded-full bg-orange animate-pulse" />
              <span className="text-orange text-sm font-medium">
                Líder em mídia digital em Caxias do Sul
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
              Destaque sua marca com{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange to-orange-light">
                mídia digital
              </span>{" "}
              de alto impacto
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-white/60 max-w-xl leading-relaxed">
              Conquiste novos clientes com soluções estratégicas no mundo físico e digital em
              Caxias do Sul.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-start gap-4">
              <a
                href="#servicos"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full gradient-orange text-white font-semibold text-lg hover:opacity-90 transition-opacity shadow-lg shadow-orange/25"
              >
                Nossos Serviços
                <ArrowRight size={20} />
              </a>
              <a
                href="#sobre"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/20 text-white font-semibold text-lg hover:bg-white/5 transition-colors"
              >
                <Play size={18} className="text-orange" />
                Saiba Mais
              </a>
            </div>
          </div>

          {/* Right – Megaphone illustration */}
          <div className="hidden lg:flex items-center justify-center relative">
            {/* Glow behind */}
            <div className="absolute w-[420px] h-[420px] rounded-full bg-orange/10 blur-3xl" />

            {/* Panel / screen frame behind the megaphone */}
            <div className="absolute w-[340px] h-[240px] rounded-2xl border-[3px] border-white/15 bg-white/5 backdrop-blur-sm shadow-2xl">
              {/* Screen bezel highlight */}
              <div className="absolute inset-2 rounded-xl border border-white/10 bg-gradient-to-br from-orange/5 to-transparent" />
              {/* Stand bar */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-16 h-4 rounded-b-lg bg-white/10 border-x-[3px] border-b-[3px] border-white/15" />
              {/* Stand base */}
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-28 h-2 rounded-full bg-white/10 border border-white/10" />
              {/* Primboo watermark in the panel */}
              <div className="absolute bottom-3 right-3 flex items-center gap-1 opacity-30">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/logo_vetor.svg" alt="" className="h-5 w-5" />
                <span className="text-white text-[9px] font-bold tracking-wider">PRIMBOO</span>
              </div>
            </div>

            {/* Main megaphone SVG – redesigned modern flat style */}
            <svg
              viewBox="0 0 420 340"
              fill="none"
              className="relative w-[380px] h-[300px] drop-shadow-2xl"
            >
              <defs>
                <linearGradient id="coneGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#FF8A33" />
                  <stop offset="100%" stopColor="#FF6B00" />
                </linearGradient>
                <linearGradient id="bodyGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2D2D2D" />
                  <stop offset="100%" stopColor="#1A1A1A" />
                </linearGradient>
                <linearGradient id="handleGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#333" />
                  <stop offset="100%" stopColor="#111" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="6" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Shadow on ground */}
              <ellipse cx="200" cy="310" rx="120" ry="12" fill="black" opacity="0.2" />

              {/* Handle arm – curved ergonomic */}
              <path
                d="M95 195 L95 272 Q95 292 115 292 L145 292 Q165 292 165 272 L165 195"
                fill="url(#handleGrad)" stroke="white" strokeWidth="2"
              />
              {/* Handle grip band */}
              <rect x="100" y="255" width="60" height="18" rx="9" fill="#FF6B00" />
              <rect x="100" y="255" width="60" height="18" rx="9" fill="none" stroke="white" strokeWidth="1.5" />
              {/* Grip texture lines */}
              <line x1="115" y1="258" x2="115" y2="270" stroke="white" strokeWidth="0.8" opacity="0.4" />
              <line x1="125" y1="258" x2="125" y2="270" stroke="white" strokeWidth="0.8" opacity="0.4" />
              <line x1="135" y1="258" x2="135" y2="270" stroke="white" strokeWidth="0.8" opacity="0.4" />
              <line x1="145" y1="258" x2="145" y2="270" stroke="white" strokeWidth="0.8" opacity="0.4" />

              {/* Megaphone body – rounded rectangle */}
              <rect x="60" y="115" width="80" height="80" rx="16" fill="url(#bodyGrad)" stroke="white" strokeWidth="2.5" />

              {/* Body detail – speaker grill dots */}
              <circle cx="88" cy="143" r="3" fill="#FF6B00" opacity="0.7" />
              <circle cx="100" cy="143" r="3" fill="#FF6B00" opacity="0.7" />
              <circle cx="112" cy="143" r="3" fill="#FF6B00" opacity="0.7" />
              <circle cx="88" cy="155" r="3" fill="#FF6B00" opacity="0.5" />
              <circle cx="100" cy="155" r="3" fill="#FF6B00" opacity="0.5" />
              <circle cx="112" cy="155" r="3" fill="#FF6B00" opacity="0.5" />
              <circle cx="88" cy="167" r="3" fill="#FF6B00" opacity="0.3" />
              <circle cx="100" cy="167" r="3" fill="#FF6B00" opacity="0.3" />
              <circle cx="112" cy="167" r="3" fill="#FF6B00" opacity="0.3" />

              {/* Power indicator LED */}
              <circle cx="75" cy="130" r="4" fill="#00FF88" opacity="0.9" filter="url(#glow)" />

              {/* Megaphone cone – trapezoidal with rounded end */}
              <path
                d="M135 115 L295 62 Q305 58 305 68 L305 240 Q305 250 295 246 L135 195 Z"
                fill="url(#coneGrad)" stroke="white" strokeWidth="2"
              />

              {/* Cone ribbed texture */}
              <line x1="170" y1="105" x2="170" y2="205" stroke="white" strokeWidth="0.7" opacity="0.15" />
              <line x1="205" y1="93" x2="205" y2="215" stroke="white" strokeWidth="0.7" opacity="0.12" />
              <line x1="240" y1="82" x2="240" y2="228" stroke="white" strokeWidth="0.7" opacity="0.1" />
              <line x1="275" y1="70" x2="275" y2="240" stroke="white" strokeWidth="0.7" opacity="0.08" />

              {/* Cone highlight stripe */}
              <path
                d="M140 120 L290 70 L290 85 L140 132 Z"
                fill="white" opacity="0.15"
              />

              {/* Bell opening – elliptical */}
              <ellipse cx="305" cy="155" rx="16" ry="94" fill="#E55F00" stroke="white" strokeWidth="2" />
              {/* Inner bell shadow */}
              <ellipse cx="305" cy="155" rx="10" ry="80" fill="#CC4E00" opacity="0.5" />

              {/* Sound waves – 3 arcs with decreasing opacity */}
              <path d="M328 120 Q355 100 355 155 Q355 210 328 190" stroke="#FF6B00" strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.7">
                <animate attributeName="opacity" values="0.7;0.3;0.7" dur="2s" repeatCount="indefinite" />
              </path>
              <path d="M345 95 Q385 65 385 155 Q385 245 345 215" stroke="#FF6B00" strokeWidth="3.5" strokeLinecap="round" fill="none" opacity="0.45">
                <animate attributeName="opacity" values="0.45;0.15;0.45" dur="2s" begin="0.3s" repeatCount="indefinite" />
              </path>
              <path d="M362 72 Q410 35 410 155 Q410 275 362 238" stroke="#FF6B00" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.25">
                <animate attributeName="opacity" values="0.25;0.08;0.25" dur="2s" begin="0.6s" repeatCount="indefinite" />
              </path>

              {/* Decorative bolt on body */}
              <circle cx="100" cy="183" r="5" fill="#FF6B00" stroke="white" strokeWidth="1.5" />

            </svg>

            {/* Floating short speech bubbles – spread 360° around megaphone */}
            {/* Top center */}
            <div
              className="absolute -top-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-lg animate-bounce"
              style={{ animationDuration: "3s" }}
            >
              <span className="text-sm">📺</span>
              <span className="text-white text-xs font-semibold">Sua marca presente</span>
            </div>

            {/* Top right */}
            <div
              className="absolute top-8 -right-6 flex items-center gap-1.5 px-3 py-1.5 rounded-full gradient-orange shadow-lg shadow-orange/20 animate-bounce"
              style={{ animationDuration: "3.5s", animationDelay: "0.4s" }}
            >
              <span className="text-sm">👁️</span>
              <span className="text-white text-xs font-semibold">Mais visibilidade</span>
            </div>

            {/* Bottom right */}
            <div
              className="absolute bottom-16 -right-8 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white shadow-lg animate-bounce"
              style={{ animationDuration: "4s", animationDelay: "0.8s" }}
            >
              <span className="text-sm">🤝</span>
              <span className="text-black text-xs font-semibold">Mais conexões</span>
            </div>

            {/* Bottom center */}
            <div
              className="absolute -bottom-2 left-1/2 -translate-x-1/3 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-lg animate-bounce"
              style={{ animationDuration: "3.2s", animationDelay: "1.2s" }}
            >
              <span className="text-sm">📈</span>
              <span className="text-white text-xs font-semibold">Mais resultados</span>
            </div>

            {/* Left */}
            <div
              className="absolute top-1/2 -translate-y-1/2 -left-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full gradient-orange shadow-lg shadow-orange/20 animate-bounce"
              style={{ animationDuration: "3.8s", animationDelay: "1.6s" }}
            >
              <span className="text-sm">🚀</span>
              <span className="text-white text-xs font-semibold">Gere oportunidades</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}
