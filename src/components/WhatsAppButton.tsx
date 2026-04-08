"use client";

import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  return (
    <a
      href="https://api.whatsapp.com/send?phone=5554991366449&text=Ol%C3%A1%2C%20gostaria%20de%20saber%20mais%20sobre%20a%20Primboo%20Digital%20Media!"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-green-500 flex items-center justify-center shadow-lg hover:bg-green-600 transition-colors hover:scale-110 transform duration-200"
      aria-label="Fale conosco pelo WhatsApp"
    >
      <MessageCircle size={28} className="text-white" />
    </a>
  );
}
