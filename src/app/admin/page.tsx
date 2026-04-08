"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Film, Megaphone, Image, MapPin } from "lucide-react";
import Link from "next/link";

interface Stats {
  partnerVideos: number;
  advertiserVideos: number;
  logos: number;
  locations: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    partnerVideos: 0,
    advertiserVideos: 0,
    logos: 0,
    locations: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      const supabase = createClient();
      const [pv, av, logos, locs] = await Promise.all([
        supabase
          .from("partner_videos")
          .select("*", { count: "exact", head: true }),
        supabase
          .from("advertiser_videos")
          .select("*", { count: "exact", head: true }),
        supabase
          .from("partner_logos")
          .select("*", { count: "exact", head: true }),
        supabase.from("locations").select("*", { count: "exact", head: true }),
      ]);
      setStats({
        partnerVideos: pv.count ?? 0,
        advertiserVideos: av.count ?? 0,
        logos: logos.count ?? 0,
        locations: locs.count ?? 0,
      });
    };
    fetchStats();
  }, []);

  const cards = [
    {
      label: "Vídeos Parceiros",
      count: stats.partnerVideos,
      icon: Film,
      href: "/admin/videos-parceiros",
      color: "text-blue-400",
      bg: "bg-blue-400/10",
    },
    {
      label: "Vídeos Anunciantes",
      count: stats.advertiserVideos,
      icon: Megaphone,
      href: "/admin/videos-anunciantes",
      color: "text-[#FF6B00]",
      bg: "bg-[#FF6B00]/10",
    },
    {
      label: "Logos Parceiros",
      count: stats.logos,
      icon: Image,
      href: "/admin/logos",
      color: "text-green-400",
      bg: "bg-green-400/10",
    },
    {
      label: "Locais",
      count: stats.locations,
      icon: MapPin,
      href: "/admin/locais",
      color: "text-purple-400",
      bg: "bg-purple-400/10",
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-1">Dashboard</h1>
      <p className="text-white/50 text-sm mb-8">
        Gerencie o conteúdo do site Primboo Digital
      </p>

      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {cards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="rounded-xl bg-white/5 border border-white/10 p-5 hover:border-white/20 transition-colors group"
          >
            <div className="flex items-center justify-between mb-4">
              <div
                className={`w-10 h-10 rounded-lg ${card.bg} flex items-center justify-center`}
              >
                <card.icon size={20} className={card.color} />
              </div>
              <span className="text-3xl font-bold text-white">
                {card.count}
              </span>
            </div>
            <p className="text-sm text-white/60 group-hover:text-white/80 transition-colors">
              {card.label}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
