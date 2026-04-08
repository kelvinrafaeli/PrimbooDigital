"use client";

import { MapPin, Phone, Mail, Clock, Instagram, MessageCircle } from "lucide-react";

export default function Contact() {
  return (
    <section id="contato" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-orange font-semibold text-sm uppercase tracking-widest">
            Contato
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-black">
            Vamos conversar?
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Entre em contato conosco e descubra como a mídia digital pode
            transformar o seu negócio.
          </p>
        </div>

        <div className="mt-16 grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-black mb-6">
                Informações de Contato
              </h3>
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-orange/10 flex items-center justify-center shrink-0">
                    <MapPin size={20} className="text-orange" />
                  </div>
                  <div>
                    <p className="font-semibold text-black">Endereço</p>
                    <a
                      href="https://www.google.com/maps/search/?api=1&query=Rio+Branco+111%2C+Caxias+do+Sul+-+RS"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 text-sm hover:text-orange transition-colors"
                    >
                      Rio Branco 111, Caxias do Sul - RS
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-orange/10 flex items-center justify-center shrink-0">
                    <Phone size={20} className="text-orange" />
                  </div>
                  <div>
                    <p className="font-semibold text-black">Telefone</p>
                    <p className="text-gray-600 text-sm">(54) 99136-6449</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-orange/10 flex items-center justify-center shrink-0">
                    <Mail size={20} className="text-orange" />
                  </div>
                  <div>
                    <p className="font-semibold text-black">E-mail</p>
                    <p className="text-gray-600 text-sm">
                      primboomarketingindoor@gmail.com
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-orange/10 flex items-center justify-center shrink-0">
                    <Clock size={20} className="text-orange" />
                  </div>
                  <div>
                    <p className="font-semibold text-black">Horário</p>
                    <p className="text-gray-600 text-sm">
                      Segunda a Sexta: 8h às 18h
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-black mb-4">
                Redes Sociais
              </h3>
              <div className="flex gap-4">
                <a
                  href="https://www.instagram.com/primboodigital/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-orange/10 flex items-center justify-center hover:bg-orange hover:text-white transition-colors text-orange"
                >
                  <Instagram size={22} />
                </a>
                <a
                  href="https://api.whatsapp.com/send?phone=5554991366449&text=Ol%C3%A1%2C%20gostaria%20de%20saber%20mais%20sobre%20a%20Primboo%20Digital%20Media!"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-orange/10 flex items-center justify-center hover:bg-orange hover:text-white transition-colors text-orange"
                >
                  <MessageCircle size={22} />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold text-black mb-6">
              Envie uma mensagem
            </h3>
            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Nome
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange focus:ring-2 focus:ring-orange/20 outline-none transition-all text-black"
                  placeholder="Seu nome"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  E-mail
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange focus:ring-2 focus:ring-orange/20 outline-none transition-all text-black"
                  placeholder="seu@email.com"
                />
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Telefone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange focus:ring-2 focus:ring-orange/20 outline-none transition-all text-black"
                  placeholder="(54) 99136-6449"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Mensagem
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange focus:ring-2 focus:ring-orange/20 outline-none transition-all resize-none text-black"
                  placeholder="Como podemos ajudar?"
                />
              </div>
              <button
                type="submit"
                className="w-full py-4 rounded-xl gradient-orange text-white font-semibold text-lg hover:opacity-90 transition-opacity"
              >
                Enviar Mensagem
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
