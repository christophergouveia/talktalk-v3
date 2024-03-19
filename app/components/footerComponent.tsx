"use client";

import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import Image from "next/image";
import imagemLogo from "@/public/images/logo-ifpr.png";
import { ButtonGroup, Button } from "@nextui-org/react";

export default function Footer({}) {
  const { theme, setTheme } = useTheme();

  const toggleTheme = (tema: string) => {
    setTheme(tema);
  };
  const [commitSha, setCommitSha] = useState("");
  useEffect(() => {
    fetch("/api/lastCommit")
      .then((response) => response.json())
      .then((data) => setCommitSha(data.commitSha));
  }, []);

  return (
    <footer className="relative mt-6 py-4 sm:px-0 px-2 !pb-8 text-center text-gray-500 flex flex-col gap-2">
      <span>
        Copyright&copy; 2024 Todos os direitos reservados. Desenvolvido por
        Kaike Sathler e Christopher Gouveia.
      </span>
      <ButtonGroup>
        <Button isIconOnly radius="full" onClick={() => toggleTheme("dark")}>
          <FaMoon />
        </Button>
        <Button isIconOnly radius="full" onClick={() => toggleTheme("light")}>
          <FaSun />
        </Button>
      </ButtonGroup>
      <Image className="w-[8rem] absolute top-2 left-2" src={imagemLogo} alt="Logotipo do Instituto Federal do Paraná" width={500}  />
      <span className="absolute right-2 bottom-2 dark:text-gray-300/10 text-gray-600/20 text-sm -z-10">{commitSha}</span>
    </footer>
  );
}
