"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { CheckCircle, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

const features = [
  "Informativos para equipe interna",
  "Lançamentos de produtos e serviços",
  "Promoções e ofertas especiais",
  "Menus digitais para restaurantes",
  "Conteúdo institucional",
  "Integração com redes sociais",
];

const partnerVideos = Array.from({ length: 9 }, (_, i) => `/videos/${i + 1}.mp4`);

export default function PainelIndoor() {
  const [current, setCurrent] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goTo = useCallback((index: number) => {
    setCurrent((index + partnerVideos.length) % partnerVideos.length);
  }, []);

  // Auto-advance when video ends
  const handleEnded = useCallback(() => {
    goTo(current + 1);
  }, [current, goTo]);

  // Auto-advance fallback every 8s
  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => goTo(current + 1), 8000);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [current, goTo]);

  // Play new video when current changes
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(() => {});
    }
  }, [current]);

  return (
    <section className="py-24 gradient-dark relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-orange/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Content */}
          <div>
            <span className="text-orange font-semibold text-sm uppercase tracking-widest">
              Painel Corporativo
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
              O canal de comunicação interna do{" "}
              <span className="text-orange">seu negócio</span>
            </h2>
            <p className="mt-6 text-lg text-white/60 leading-relaxed">
              Conquiste um espaço na mente do seu cliente. Com o Painel Corporativo você
              tem seu próprio canal de comunicação interna de forma visível,
              atrativa e sem ruídos, possibilitando diversas ações de marketing.
            </p>

            <div className="mt-8 grid sm:grid-cols-2 gap-3">
              {features.map((feature) => (
                <div key={feature} className="flex items-center gap-2">
                  <CheckCircle size={18} className="text-orange shrink-0" />
                  <span className="text-white/80 text-sm">{feature}</span>
                </div>
              ))}
            </div>

            <a
              href="#contato"
              className="mt-10 inline-flex items-center gap-2 px-8 py-4 rounded-full gradient-orange text-white font-semibold text-lg hover:opacity-90 transition-opacity shadow-lg shadow-orange/25"
            >
              Quero saber mais
              <ArrowRight size={20} />
            </a>
          </div>

          {/* Right - Frame with video carousel */}
          <div className="relative flex justify-center">
            <div className="relative max-h-[550px] w-auto">
              {/* Video behind the frame */}
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

              {/* Moldura overlay */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/videos/moldura.png"
                alt="Moldura Primboo"
                className="relative z-10 max-h-[550px] w-auto pointer-events-none select-none"
                draggable={false}
              />

              {/* Controls overlay */}
              <div className="absolute bottom-[4%] left-0 right-0 z-20 flex items-center justify-center gap-3">
                <button
                  onClick={() => goTo(current - 1)}
                  className="w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-orange transition-colors"
                  aria-label="Vídeo anterior"
                >
                  <ChevronLeft size={16} />
                </button>

                {/* Dots */}
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
