"use client";

import { useRef, useState } from "react";
import { Monitor, MapPin, Award, Users, Volume2, VolumeX, DollarSign } from "lucide-react";

export default function About() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  return (
    <section id="sobre" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Text */}
          <div>
            <span className="text-orange font-semibold text-sm uppercase tracking-widest">
              Sobre nós
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-black leading-tight">
              Soluções estratégicas no{" "}
              <span className="text-orange">mundo físico</span> e{" "}
              <span className="text-orange">digital</span>
            </h2>
            <p className="mt-6 text-lg text-gray-600 leading-relaxed">
              A Primboo Digital Media é um canal de comunicação que conversa com
              o público de forma moderna e atrativa. Com sede em Caxias do Sul,
              atendemos Caxias do Sul e região com excelência e qualidade,
              conectando marcas ao público certo no momento certo.
            </p>
            <p className="mt-4 text-lg text-gray-600 leading-relaxed">
              Nosso compromisso é entregar resultados reais através de
              tecnologia de ponta em mídia digital, ajudando empresas de todos
              os portes a ampliarem sua visibilidade e conquistarem novos
              clientes.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-6">
              {[
                {
                  icon: Monitor,
                  title: "Tecnologia",
                  desc: "Equipamentos de última geração",
                },
                {
                  icon: MapPin,
                  title: "Cobertura",
                  desc: "Caxias do Sul e região",
                },
                {
                  icon: Award,
                  title: "Qualidade",
                  desc: "Conteúdo profissional",
                },
                {
                  icon: Users,
                  title: "Parceiros",
                  desc: "Rede de parceiros sólida",
                },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-orange/10 flex items-center justify-center shrink-0">
                    <item.icon size={20} className="text-orange" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-black">{item.title}</h3>
                    <p className="text-sm text-gray-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Video */}
          <div className="relative flex justify-center items-center">
            {/* Decorative glow */}
            <div className="absolute w-72 h-72 bg-orange/10 rounded-full blur-3xl" />
            <div className="absolute -top-8 -right-8 w-40 h-40 bg-orange/5 rounded-full blur-2xl" />

            <div className="absolute left-1/2 top-1/2 z-0 h-0.5 w-107.5 -translate-x-1/2 -translate-y-1/2 rotate-28 bg-orange/40 shadow-[0_0_18px_rgba(255,107,0,0.35)]" />

            <div className="relative max-h-137.5 w-auto">
              <div className="absolute inset-x-[4.2%] top-[5.3%] bottom-[3.6%] overflow-hidden rounded-xl">
                <video
                  ref={videoRef}
                  className="w-full h-full object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                >
                  <source src="/videos/video-apresentacao.mp4" type="video/mp4" />
                </video>
                <button
                  onClick={toggleMute}
                  className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-orange transition-colors"
                  aria-label={isMuted ? "Ativar som" : "Desativar som"}
                >
                  {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                </button>
              </div>

              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/videos/moldura.png"
                alt="Moldura Primboo"
                className="relative z-10 max-h-137.5 w-auto pointer-events-none select-none"
                draggable={false}
              />
            </div>

            {/* Floating badges */}
            <div className="absolute -top-4 -left-4 z-20 bg-white rounded-xl shadow-lg p-3 flex items-center gap-2">
              <div className="w-8 h-8 rounded-full gradient-orange flex items-center justify-center">
                <DollarSign size={14} className="text-white" />
              </div>
              <span className="text-sm font-semibold text-black">Alto retorno</span>
            </div>

            <div className="absolute -bottom-4 -right-4 z-20 bg-white rounded-xl shadow-lg p-3 flex items-center gap-2">
              <div className="w-8 h-8 rounded-full gradient-orange flex items-center justify-center">
                <MapPin size={14} className="text-white" />
              </div>
              <span className="text-sm font-semibold text-black">Resultados reais</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
