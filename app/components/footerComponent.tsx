"use client";

import { Button, ButtonGroup } from "@nextui-org/react";
import { useTheme } from "next-themes";
import { FaMoon, FaSun } from "react-icons/fa";

export default function Footer({}) {
  const { theme, setTheme } = useTheme();

  const toggleTheme = (tema: string) => {
    setTheme(tema);
  };
  return (
    <footer className="mt-6 py-4 sm:px-0 px-2 text-center text-gray-500 flex flex-col gap-2">
      <span>
        Copyright&copy; 2024 Todos os direitos reservados. Desenvolvido por Kaike Sathler
        e Christopher Gouveia.
      </span>
      <ButtonGroup>
        <Button isIconOnly radius="full" onClick={() => toggleTheme("dark")}><FaMoon /></Button>
        <Button isIconOnly radius="full" onClick={() => toggleTheme("light")}><FaSun /></Button>
      </ButtonGroup>
    </footer>
  );
}
