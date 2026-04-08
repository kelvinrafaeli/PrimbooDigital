"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const partnerVideos = Array.from({ length: 9 }, (_, i) => `/videos/${i + 1}.mp4`);

export default function Partners() {
  const [current, setCurrent] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goTo = useCallback((index: number) => {
    setCurrent((index + partnerVideos.length) % partnerVideos.length);
  }, []);

  const handleEnded = useCallback(() => {
    goTo(current + 1);
  }, [current, goTo]);

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => goTo(current + 1), 8000);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [current, goTo]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(() => {});
    }
  }, [current]);

  return (
    <section id="parceiros" className="py-24 gradient-dark relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,107,0,0.08),transparent_50%)]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="text-orange font-semibold text-sm uppercase tracking-widest">
            Parceiros
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Nossos parceiros
          </h2>
          <p className="mt-4 text-lg text-white/60 max-w-2xl mx-auto">
            Empresas de diversos segmentos confiam na Primboo Digital Media para
            alcançar seus públicos em Caxias do Sul.
          </p>
        </div>

        <div className="mt-16 grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div>
            <span className="text-orange font-semibold text-sm uppercase tracking-widest">
              Parceiros
            </span>
            <h3 className="mt-4 text-2xl sm:text-3xl font-bold text-white leading-tight">
              Presença em pontos estratégicos de Caxias do Sul
            </h3>

            <p className="mt-6 text-white/70 leading-relaxed">
              Nossos parceiros anunciam em displays de alta visibilidade e mantêm
              suas marcas em evidência ao longo do dia, com impacto real no momento
              de decisão do cliente.
            </p>

            <p className="mt-4 text-white/70 leading-relaxed">
              Cada vídeo exibido reforça autoridade, aumenta lembrança de marca e
              gera oportunidades constantes de contato com o público local.
            </p>

            <p className="mt-4 text-white/70 leading-relaxed">
              No totem ao lado, você confere campanhas reais dos nossos parceiros,
              exibidas em rotação contínua nos ambientes da rede Primboo.
            </p>

            <a
              href="#contato"
              className="mt-8 inline-flex items-center gap-2 px-8 py-4 rounded-full gradient-orange text-white font-semibold text-lg hover:opacity-90 transition-opacity shadow-lg shadow-orange/25"
            >
              Quero ser parceiro
            </a>
          </div>

          <div className="relative flex justify-center lg:justify-end">
            <div className="relative max-h-137.5 w-auto">
              <div className="absolute inset-[3.5%] top-[5%] bottom-[7%] overflow-hidden rounded-xl">
                <video
                  ref={videoRef}
                  className="w-full h-full object-cover"
                  autoPlay
                  muted
                  playsInline
                  onEnded={handleEnded}
                >
                  <source src={partnerVideos[current]} type="video/mp4" />
                </video>
              </div>

              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/videos/moldura.png"
                alt="Moldura Primboo"
                className="relative z-10 max-h-137.5 w-auto pointer-events-none select-none"
                draggable={false}
              />

              <div className="absolute bottom-[4%] left-0 right-0 z-20 flex items-center justify-center gap-3">
                <button
                  onClick={() => goTo(current - 1)}
                  className="w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-orange transition-colors"
                  aria-label="Vídeo anterior"
                >
                  <ChevronLeft size={16} />
                </button>

                <div className="flex gap-1.5">
                  {partnerVideos.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => goTo(i)}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        i === current ? "bg-orange" : "bg-white/40"
                      }`}
                      aria-label={`Vídeo ${i + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={() => goTo(current + 1)}
                  className="w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-orange transition-colors"
                  aria-label="Próximo vídeo"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
