"use client";

import { SetStateAction, useEffect, useState } from "react";
import Peer, { DataConnection } from "peerjs";
import Image from "next/image";
import { Button, Input } from "@nextui-org/react";
import Avatar from "react-avatar";
import ColorPicker from "../components/colorPicker";

export default function ConversarHome() {
  const [conn, setConn] = useState<DataConnection | null>(null);
  const [value, setValue] = useState("");
  const [color, setColor] = useState("#0dffff");

  const handleColorChange = (newColor: SetStateAction<string>) => {
    setColor(newColor);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const peer = new Peer();
      peer.on("connection", (connection) => {
        console.log("Conexão recebida:", connection);
      });
    }
  }, []);

  return (
    <>
      <div className="flex flex-col mt-12 gap-4 items-center justify-center">
        <div className="text-3xl w-[60%] mx-auto font-bold text-center">
          <h1>Quer começar um bate-papo com alguém? Entrou no lugar certo!</h1>
          <h3 className="!text-xl font-light">
            Caso queira entrar em alguma sala, preencha o campo indicado com o
            código que o seu amigo lhe passou (ou entre no link diretamente).
            Caso queira criar uma sala, clique em &quot;criar sala&quot;
          </h3>
        </div>
        <section className="w-2/3 h-fit shadow-lg dark:shadow-none dark:border dark:border-gray-400 rounded-lg m-auto">
          <div className="flex flex-col p-4 gap-3 items-center justify-center">
            {value.trim().length == 0 ? (
              <Image
                src="https://images.vexels.com/media/users/3/147103/isolated/preview/e9bf9a44d83e00b1535324b0fda6e91a-cone-de-linha-de-perfil-do-instagram.png"
                alt="Logo de perfil"
                className="rounded-full mx-auto dark:bg-white bg-slate-300 p-2"
                width={128}
                height={128}
              />
            ) : (
              <div className="flex gap-3 items-center">
                <Avatar className="[text-shadow:_0_1px_1px_rgb(0_0_0_/_40%)]" name={value} maxInitials={2} color={color} round />
                <ColorPicker onColorChange={handleColorChange} />
              </div>
            )}
            <form>
              <Input
                type="name"
                size="lg"
                label="Apelido"
                placeholder="Escolha um apelido"
                maxLength={32}
                value={value}
                onValueChange={setValue}
              />
            </form>
            <form className="flex gap-4 items-center">
              <div className="flex flex-col gap-3">
                <Input
                  type="name"
                  size="lg"
                  label="Código da sala"
                  placeholder="Digite o código da sala"
                />
                <Button color="success" className="font-semibold">
                  ENTRAR NA SALA
                </Button>
              </div>
              <span className="text-xl font-bold">OU</span>
              <Button color="warning" className="font-semibold">
                CRIAR UMA SALA
              </Button>
            </form>
          </div>
        </section>
      </div>
    </>
  );
}
