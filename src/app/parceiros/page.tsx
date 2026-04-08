"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { createClient } from "@/lib/supabase/client";
import { getPublicUrl } from "@/lib/supabase/storage";

export default function ParceirosPage() {
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
    <>
      <Header />
      <main className="pt-20">
        <section className="py-24 gradient-dark relative overflow-hidden min-h-[calc(100vh-80px)] flex items-center">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,107,0,0.08),transparent_50%)]" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              <div>
                <span className="text-orange font-semibold text-sm uppercase tracking-widest">
                  Parceiros
                </span>
                <h1 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
                  Nossos parceiros
                </h1>
                <p className="mt-6 text-lg text-white/70 leading-relaxed max-w-2xl">
                  Empresas de diversos segmentos confiam na Primboo Digital Media para
                  alcançar seus públicos em Caxias do Sul.
                </p>
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

                  <div className="absolute bottom-[4%] left-0 right-0 z-20 flex items-center justify-center gap-3">
                    <button
                      onClick={() => goTo(current - 1)}
                      className="w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-orange transition-colors"
                      aria-label="Vídeo anterior"
                    >
                      <ChevronLeft size={16} />
                    </button>

                    <div className="flex gap-1.5">
                      {videos.map((_, i) => (
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
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
