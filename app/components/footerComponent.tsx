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
    <footer className="mt-6 pb-4 pt-4 text-center text-gray-500">
      <span>
        2024&copy; Todos os direitos reservados. Desenvolvido por Kaike Sathler
        e Christopher Gouveia.
      </span>
      <br />
      <ButtonGroup>
        <Button isIconOnly radius="full" onClick={() => toggleTheme("dark")}><FaMoon /></Button>
        <Button isIconOnly radius="full" onClick={() => toggleTheme("light")}><FaSun /></Button>
      </ButtonGroup>
    </footer>
  );
}
