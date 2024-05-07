"use client";

import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import Image from "next/image";
import imagemLogo from "@/public/images/icon/logo-ifpr.png";
import { ButtonGroup, Button } from "@nextui-org/react";

export default function Footer({}) {
  const { setTheme } = useTheme();

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
    <footer className="relative mt-6 py-4 sm:px-0 px-2 text-center items-center justify-center sm:flex-row  flex-col text-gray-500 flex gap-2">
      <Image
        className="sm:w-[7rem] w-[5rem] top-2 left-2"
        src={imagemLogo}
        alt="Logotipo do Instituto Federal do Paraná"
        width={500}
      />
      <div className="flex flex-col gap-2 sm:mr-[8rem]">
        <span className="text-sm">
          Copyright&copy; 2024 Todos os direitos reservados. Desenvolvido por{" "}
          <strong>Kaike Sathler</strong> e <strong>Christopher Gouveia</strong>.
        </span>
        <ButtonGroup>
          <Button isIconOnly radius="full" onClick={() => toggleTheme("dark")}>
            <FaMoon />
          </Button>
          <Button isIconOnly radius="full" onClick={() => toggleTheme("light")}>
            <FaSun />
          </Button>
        </ButtonGroup>
        <span className="absolute right-2 bottom-2 dark:text-gray-300/10 text-gray-600/20 text-sm -z-10">
          {commitSha}
        </span>
      </div>
    </footer>
  );
}
