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
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
      <body className={inter.className} style={{ marginBottom: "0.2rem" }}>
        <Providers>
          <ModalConsetimento />
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
