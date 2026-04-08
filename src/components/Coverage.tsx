"use client";

import { useEffect, useState } from "react";
import { MapPin, ExternalLink } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { getPublicUrl } from "@/lib/supabase/storage";

interface LocationData {
  id: string;
  name: string;
  address: string;
  maps_query: string;
}

interface LogoData {
  id: string;
  name: string;
  file_path: string;
}

export default function Coverage() {
  const [locations, setLocations] = useState<LocationData[]>([]);
  const [partnerLogos, setPartnerLogos] = useState<{ name: string; logo: string }[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const supabase = createClient();
      const [locsRes, logosRes] = await Promise.all([
        supabase
          .from("locations")
          .select("id, name, address, maps_query")
          .eq("active", true)
          .order("sort_order"),
        supabase
          .from("partner_logos")
          .select("id, name, file_path")
          .eq("active", true)
          .order("sort_order"),
      ]);

      setLocations(locsRes.data ?? []);
      setPartnerLogos(
        (logosRes.data ?? []).map((l) => ({
          name: l.name,
          logo: getPublicUrl(l.file_path),
        }))
      );
    };
    fetchData();
  }, []);
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="text-orange font-semibold text-sm uppercase tracking-widest">
            Cobertura
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-black">
            Cobertura{" "}
            <span className="text-orange">Estratégica</span>
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Estamos presentes em pontos de exibição estrategicamente posicionados
            em Caxias do Sul, levando visibilidade diária para marcas, serviços
            e negócios locais.
          </p>
        </div>

        {/* Locations grid */}
        <div className="mt-16 relative">
          <div className="rounded-2xl gradient-dark overflow-hidden relative p-8 sm:p-12">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,107,0,0.1),transparent_60%)]" />

            <div className="relative">
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                Nossa Rede{" "}
                <span className="text-orange">Estratégica</span>
              </h3>
              <p className="text-white/50 text-sm mb-8">
                Caxias do Sul, RS
              </p>

              <div className="mb-8 overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                <div className="flex animate-slide-left" style={{ width: `${partnerLogos.length * 150 * 2}px` }}>
                  {[...partnerLogos, ...partnerLogos].map((partner, i) => (
                    <div
                      key={`${partner.name}-${i}`}
                      className="shrink-0 w-37.5 h-30 flex items-center justify-center px-0"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={partner.logo}
                        alt={partner.name}
                        className="h-28.5 max-w-full object-contain"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {locations.map((loc) => (
                  <a
                    key={loc.name}
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(loc.maps_query)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-3 bg-white/5 rounded-xl p-4 hover:bg-orange/10 transition-colors group cursor-pointer"
                  >
                    <div className="w-8 h-8 rounded-full bg-orange/20 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-orange/30 transition-colors">
                      <MapPin size={14} className="text-orange" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-semibold text-sm group-hover:text-orange transition-colors">{loc.name}</p>
                      <p className="text-white/50 text-xs mt-0.5">{loc.address}</p>
                    </div>
                    <ExternalLink size={12} className="text-white/20 group-hover:text-orange shrink-0 mt-1 transition-colors" />
                  </a>
                ))}
              </div>

              {/* Central badge */}
              <div className="mt-8 flex justify-center">
                <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-orange/10 border border-orange/20">
                  <div className="w-2.5 h-2.5 rounded-full bg-orange animate-pulse" />
                  <span className="text-orange text-sm font-medium">
                    {locations.length} pontos ativos em Caxias do Sul
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Google Maps embed removed */}      </div>
    </section>
  );
}
