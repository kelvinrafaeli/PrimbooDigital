import { Instagram, MessageCircle, ArrowUp } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo_vetor.svg"
                alt="Primboo Digital Media"
                className="h-10 w-10"
              />
              <div className="flex flex-col">
                <span className="text-white font-bold text-lg leading-tight">Primboo</span>
                <span className="text-orange text-[10px] font-medium tracking-[0.2em] uppercase">Digital Media</span>
              </div>
            </div>
            <p className="text-white/50 text-sm leading-relaxed">
              Soluções estratégicas no mundo físico e digital em Caxias do Sul.
            </p>
            <div className="flex gap-3 mt-6">
              <a
                href="https://www.instagram.com/primboodigital/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-orange transition-colors"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://api.whatsapp.com/send?phone=5554991366449&text=Ol%C3%A1%2C%20gostaria%20de%20saber%20mais%20sobre%20a%20Primboo%20Digital%20Media!"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-orange transition-colors"
              >
                <MessageCircle size={18} />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-bold text-white mb-4">Navegação</h3>
            <ul className="space-y-3">
              {[
                { label: "Início", href: "#inicio" },
                { label: "Sobre", href: "#sobre" },
                { label: "Serviços", href: "#servicos" },
                { label: "Vantagens", href: "#vantagens" },
                { label: "Parceiros", href: "/parceiros" },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-white/50 hover:text-orange transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-bold text-white mb-4">Serviços</h3>
            <ul className="space-y-3">
              {[
                "Visibilidade Estratégica",
                "Vitrines Digitais",
                "Locações Corporativas",
              ].map((service) => (
                <li key={service}>
                  <a
                    href="#servicos"
                    className="text-white/50 hover:text-orange transition-colors text-sm"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-white mb-4">Contato</h3>
            <ul className="space-y-3 text-white/50 text-sm">
              <li>Caxias do Sul, RS</li>
              <li>Caxias do Sul e região</li>
              <li>
                <a
                  href="mailto:contato@primboodigital.com.br"
                  className="hover:text-orange transition-colors"
                >
                  contato@primboodigital.com.br
                </a>
              </li>
              <li>
                <a
                  href="tel:+5554991366449"
                  className="hover:text-orange transition-colors"
                >
                  (54) 99136-6449
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm">
            &copy; {new Date().getFullYear()} Primboo Digital Media. Todos os
            direitos reservados.
          </p>
          <a
            href="#inicio"
            className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-orange transition-colors"
            aria-label="Voltar ao topo"
          >
            <ArrowUp size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}
