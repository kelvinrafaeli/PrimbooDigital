import { MapPin, ExternalLink } from "lucide-react";

const locations = [
  { name: "Barbearia El Toro", address: "Av. Rio Branco", query: "Barbearia El Toro, Av. Rio Branco, Caxias do Sul, RS" },
  { name: "Soul Cachos", address: "R. Os Dezoito do Forte", query: "Soul Cachos, R. Os Dezoito do Forte, Caxias do Sul, RS" },
  { name: "Estética e Boutique Dhes", address: "Av. Rio Branco (Vitrine)", query: "Estética e Boutique Dhes, Av. Rio Branco, Caxias do Sul, RS" },
  { name: "Restaurante Vó Mirta", address: "R. Pinheiro Machado", query: "Restaurante Vó Mirta, R. Pinheiro Machado, Caxias do Sul, RS" },
  { name: "Arena Pio X", address: "Pio X", query: "Arena Pio X, Caxias do Sul, RS" },
  { name: "JD Studio", address: "Bairro Rio Branco", query: "JD Studio, Rio Branco, Caxias do Sul, RS" },
  { name: "Adré Society", address: "Bairro Santa Catarina", query: "Adré Society, Santa Catarina, Caxias do Sul, RS" },
  { name: "Quadra Parque do Sol", address: "Bairro Santa Lucia", query: "Quadra Parque do Sol, Santa Lucia, Caxias do Sul, RS" },
  { name: "Salão Studio Beauty", address: "R. Bento Gonçalves - Centro", query: "Salão Studio Beauty, R. Bento Gonçalves, Centro, Caxias do Sul, RS" },
  { name: "Academia Vida Sports", address: "R. Pinheiro Machado | Bairro São Pelegrino", query: "Academia Vida Sports, Rua Pinheiro Machado, São Pelegrino, Caxias do Sul, RS" },
  { name: "Estádio Centenário", address: "R. Thomas Beltrão de Queiroz | Mal Floriano", query: "Estádio Centenário, Rua Thomas Beltrão de Queiroz, Mal Floriano, Caxias do Sul, RS" },
];

const partnerLogos = Array.from({ length: 11 }, (_, i) => ({
  name: `Parceiro ${i + 1}`,
  logo: `/logos-parceiros/${i + 1}.png`,
}));

export default function Coverage() {
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
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(loc.query)}`}
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
