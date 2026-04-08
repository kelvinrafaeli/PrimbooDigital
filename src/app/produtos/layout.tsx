import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Produtos e Serviços",
  description:
    "Conheça nossos produtos de mídia digital: Visibilidade Estratégica, Vitrines Digitais e Locações Corporativas em Caxias do Sul.",
  openGraph: {
    title: "Produtos e Serviços | Primboo Digital Media",
    description:
      "Visibilidade Estratégica, Vitrines Digitais e Locações Corporativas. Soluções completas em mídia digital.",
  },
};

export default function ProdutosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
