"use client";

import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";
import { CookiesProvider } from "react-cookie";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <NextUIProvider>
      <CookiesProvider>
        <ThemeProvider
          attribute="class"
          enableSystem
          themes={["light", "dark"]}
        >
          {children}
        </ThemeProvider>
      </CookiesProvider>
    </NextUIProvider>
  );
}
