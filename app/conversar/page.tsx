/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { SetStateAction, useEffect, useState } from "react";
import Peer from "peerjs";
import Image from "next/image";
import { Button, Input } from "@nextui-org/react";
import Avatar from "react-avatar";
import ColorPicker from "../components/colorPicker";
import * as yup from "yup";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

interface ErrorInputs {
  errorApelido: boolean;
  errorApelidoMessage: string;
  errorCodigo: boolean;
  errorCodigoMessage: string;
}

const InputsSchema = yup.object().shape({
  apelido: yup
    .string()
    .required("Insira um apelido válido.")
    .min(4, "É necessário que o apelido contenha no mínimo 4 caracteres.")
    .max(32, "É necessário que o apelido contenha no máximo 32 caracteres."),
  codigo: yup
    .string()
    .required("Insira um código válido.")
    .min(4, "É necessário que o código contenha no mínimo 4 caracteres.")
    .max(6, "É necessário que o código contenha no máximo 6 caracteres."),
});

export default function ConversarHome() {
  const [apelido, setApelido] = useState("");
  const [codigo, setCodigo] = useState("");
  const [color, setColor] = useState("#0dffff");
  const [errorInputs, setErrorInputs] = useState<ErrorInputs>(
    {} as ErrorInputs
  );
  const router = useRouter();

  const handleColorChange = (newColor: SetStateAction<string>) => {
    setColor(newColor);
  };

  const handleEntrarSala = async () => {
    const response = await fetch("/api/salas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ codigo: codigo }),
    });
    const data = await response.json();
    if (data.sala != null) {
      router.push(`/conversar/${codigo}`);
    } else {
      console.log("erro");
      toast("Essa sala não existe.", {
        type: "error",
      });
    }
  };

  const handleCriarSala = async () => {
    const response = await fetch("/api/criarSala", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ codigo: codigo }),
    });
    const data = await response.json();
    if (data.sala != null) {
      router.push(`/conversar/${codigo}`);
    } else {
      toast("Ocorreu um erro ao criar a sala.", {
        type: "error",
      });
    }
  };

  const validarApelido = async () => {
    try {
      await InputsSchema.pick(["apelido"]).validate({
        apelido: apelido,
      });
      setErrorInputs((prevState) => ({
        ...prevState,
        errorApelido: false,
        errorApelidoMessage: "",
      }));
      handleCriarSala();
    } catch (error) {
      setErrorInputs((prevState) => ({
        ...prevState,
        errorApelido: true,
        errorApelidoMessage: (error as Error).message,
      }));
    }
  };

  const validarCodigo = async () => {
    try {
      await InputsSchema.pick(["codigo"]).validate({
        codigo: codigo,
      });
      setErrorInputs((prevState) => ({
        ...prevState,
        errorCodigo: false,
        errorCodigoMessage: "",
      }));
      handleEntrarSala();
    } catch (error) {
      setErrorInputs((prevState) => ({
        ...prevState,
        errorCodigo: true,
        errorCodigoMessage: (error as Error).message,
      }));
    }
  };

  useEffect(() => {
    if (errorInputs.errorApelido) {
      validarApelido();
    }
  }, [apelido]);

  useEffect(() => {
    if (errorInputs.errorCodigo) {
      validarCodigo();
    }
  }, [codigo]);

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
      <div className="flex flex-col mt-12 gap-4 items-center justify-center h-full">
        <div className="text-3xl w-[60%] mx-auto font-bold text-center">
          <h1>Quer começar um bate-papo com alguém? Entrou no lugar certo!</h1>
          <h3 className="!text-xl font-normal">
            Caso queira entrar em alguma sala, preencha o campo indicado com o
            código que o seu amigo lhe passou (ou entre no link diretamente).
            Caso queira criar uma sala, clique em &quot;criar sala&quot;
          </h3>
        </div>
        <section className="w-2/3 shadow-lg dark:shadow-none dark:border dark:border-gray-400 rounded-lg m-auto">
          <div className="flex flex-col p-4 gap-3 items-center justify-center">
            {apelido.trim().length == 0 ? (
              <Image
                src="https://images.vexels.com/media/users/3/147103/isolated/preview/e9bf9a44d83e00b1535324b0fda6e91a-cone-de-linha-de-perfil-do-instagram.png"
                alt="Logo de perfil"
                aria-label="Avatar com a(s) inicial/iniciais do apelido"
                className="rounded-full mx-auto dark:bg-white bg-slate-300 p-2"
                width={128}
                height={128}
              />
            ) : (
              <div className="flex gap-3 items-center">
                <Avatar
                  className="[text-shadow:_0_1px_1px_rgb(0_0_0_/_40%)]"
                  name={apelido}
                  maxInitials={2}
                  color={color}
                  round
                />
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
                value={apelido}
                onValueChange={setApelido}
                isInvalid={errorInputs.errorApelido}
              />
              {errorInputs.errorApelido && (
                <span className="text-danger">
                  * {errorInputs.errorApelidoMessage}
                </span>
              )}
            </form>
            <form className="flex gap-4 items-center">
              <div className="flex flex-col gap-3">
                <div>
                  <Input
                    type="name"
                    size="lg"
                    label="Código da sala"
                    placeholder="Digite o código da sala"
                    value={codigo}
                    onValueChange={setCodigo}
                    isInvalid={errorInputs.errorCodigo}
                  />
                  {errorInputs.errorCodigo && (
                    <span className="text-danger">
                      * {errorInputs.errorCodigoMessage}
                    </span>
                  )}
                </div>
                <Button
                  color="success"
                  className="font-semibold"
                  onClick={validarCodigo}
                >
                  ENTRAR NA SALA
                </Button>
              </div>
              <span className="text-xl font-bold">OU</span>
              <Button
                color="warning"
                className="font-semibold"
                onClick={validarApelido}
              >
                CRIAR UMA SALA
              </Button>
            </form>
          </div>
        </section>
      </div>
    </>
  );
}
