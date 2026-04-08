"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { ArrowDown } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { getPublicUrl } from "@/lib/supabase/storage";

export default function Advertise() {
  const [videos, setVideos] = useState<string[]>([]);
  const [current, setCurrent] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const fetchVideos = async () => {
      const supabase = createClient();
      const { data } = await supabase
        .from("advertiser_videos")
        .select("file_path")
        .eq("active", true)
        .order("sort_order");
      if (data?.length) {
        setVideos(data.map((v) => getPublicUrl(v.file_path)));
      }
    };
    fetchVideos();
  }, []);

  const goTo = useCallback((index: number) => {
    if (videos.length === 0) return;
    setCurrent((index + videos.length) % videos.length);
  }, [videos.length]);

  const handleEnded = useCallback(() => {
    goTo(current + 1);
  }, [current, goTo]);

  useEffect(() => {
    if (videos.length === 0) return;
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => goTo(current + 1), 8000);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [current, goTo, videos.length]);

  useEffect(() => {
    if (videos.length === 0) return;
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(() => {});
    }
  }, [current, videos]);

  return (
    <section className="py-24 gradient-dark relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,107,0,0.08),transparent_50%)]" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-orange font-semibold text-sm uppercase tracking-widest">
              Anuncie
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
              Anuncie onde seu{" "}
              <span className="text-orange">público-alvo</span> se encontra
            </h2>
            <p className="mt-6 text-lg text-white/70 leading-relaxed">
              A mídia indoor está entre os formatos com maior índice de atenção
              do mercado, alcançando um público altamente qualificado no
              momento certo.
            </p>
            <p className="mt-4 text-lg text-white/70 leading-relaxed">
              Mas aqui, você vai além da mídia indoor.
            </p>
            <p className="mt-4 text-lg text-white/70 leading-relaxed">
              Sua marca presente no mundo físico e também no digital.
              Posicionamos seu negócio em displays estratégicos em Caxias do Sul
              e potencializamos sua presença online através do nosso site, com
              milhares de acessos diários, além das nossas redes sociais,
              unindo alcance orgânico com tráfego pago para gerar mais
              visibilidade e oportunidades reais de venda.
            </p>
            <p className="mt-4 text-lg text-white/70 leading-relaxed">
              Exiba sua marca nos principais pontos de Caxias do Sul, onde seu
              cliente realmente está com atenção, tempo e interesse.
            </p>
          </div>

          <div className="relative flex flex-col items-center">
            <div className="mb-4 flex flex-col items-center">
              <a
                href="/produtos#visibilidade-estrategica"
                className="inline-flex items-center rounded-full bg-orange px-5 py-2 text-sm font-bold uppercase tracking-wide text-white shadow-lg shadow-orange/40 hover:opacity-90 transition-opacity"
              >
                Anuncie você também
              </a>
              <div className="mt-1 flex flex-col items-center text-orange">
                <div className="h-5 w-0.5 bg-orange/70" />
                <ArrowDown size={18} className="animate-bounce" />
              </div>
            </div>

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
                  <source src={videos[current]} type="video/mp4" />
                </video>
              </div>

              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/videos/moldura.png"
                alt="Moldura Primboo"
                className="relative z-10 max-h-137.5 w-auto pointer-events-none select-none"
                draggable={false}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
