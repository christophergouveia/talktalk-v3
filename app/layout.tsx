import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import NavBar from "./components/navbarComponent";
import Footer from "./components/footerComponent";
import ModalConsetimento from "./components/modalConsetiment";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Projeto de tradução em tempo real",
  description: "Ferramenta de tradução via bate-papo em tempo real",
  authors: [
    {
      name: "KaChris",
      url: "",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt">
      <link rel="icon" href="/logo.png" sizes="any" />
      <body className={inter.className} style={{ marginBottom: "0.2rem" }}>
        <Providers>
          <ModalConsetimento/>
          <div className={"flex flex-col h-[99dvh] justify-between"}>
            <NavBar />
            <div style={{ flexGrow: "1" }}>{children}</div>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
