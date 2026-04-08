"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Início", href: "/#inicio" },
  { label: "Sobre", href: "/#sobre" },
  { label: "Produtos", href: "/produtos" },
  { label: "Serviços", href: "/#servicos" },
  { label: "Parceiros", href: "/parceiros" },
  { label: "Contato", href: "/#contato" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
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
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-white/80 hover:text-orange transition-colors text-sm font-medium"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <a
            href="https://api.whatsapp.com/send?phone=5554991366449&text=Ol%C3%A1%2C%20gostaria%20de%20saber%20mais%20sobre%20a%20Primboo%20Digital%20Media!"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center px-6 py-2.5 rounded-full gradient-orange text-white font-semibold text-sm hover:opacity-90 transition-opacity"
          >
            Fale Conosco
          </a>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-white p-2"
            aria-label="Abrir menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-black/95 border-t border-white/10">
          <nav className="flex flex-col px-4 py-4 gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-white/80 hover:text-orange transition-colors py-3 px-4 rounded-lg hover:bg-white/5 text-sm font-medium"
              >
                {link.label}
              </Link>
            ))}
            <a
              href="https://api.whatsapp.com/send?phone=5554991366449&text=Ol%C3%A1%2C%20gostaria%20de%20saber%20mais%20sobre%20a%20Primboo%20Digital%20Media!"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 text-center px-6 py-3 rounded-full gradient-orange text-white font-semibold text-sm"
            >
              Fale Conosco
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
