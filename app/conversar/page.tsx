/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { SetStateAction, useEffect, useState, useCallback } from "react";
import Avatar from "react-avatar";
import { Button, Input } from "@nextui-org/react";
import ColorPicker from "../components/colorPicker";
import * as yup from "yup";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import socket from "../components/socket";
import { CreateRoomModal } from "../components/modalConsetiment";
import { FaUserCircle } from "react-icons/fa";

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
  const [isLoading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleColorChange = useCallback((newColor: SetStateAction<string>) => {
    setColor(newColor);
  }, []);

  const handleEntrarSala = useCallback(async () => {
    if(!validarCodigo()) {
      return false;
    }
    setLoading(true);
    try {
      const response = await fetch("/api/salas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ codigo: codigo }),
      });
      const data = await response.json();
      if (data.sala != null) {
        if (data.sala.pessoasConectadas == 2) {
          return toast("Já tem 2 usuários conversando nessa sala.", {
            type: "error",
          });
        }
        // router.push(`/conversar/${codigo}`);
      } else {
        toast("Essa sala não existe.", {
          type: "error",
        });
      }
    } catch (error) {
      toast("Ocorreu um erro ao entrar na sala.", {
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  }, [codigo, router]);

  const handleCriarSala = useCallback(async () => {
    if(!validarApelido()) {
      return false;
    }
    setLoading(true);
    try {
      const response = await fetch("/api/criarSala", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ apelido: apelido, cor: color })
      });
      const data = await response.json();
      if (data.sala != null) {
        router.push(`/conversar/${data.sala.codigoSala}`);
      } else {
        toast("Ocorreu um erro ao criar a sala.", {
          type: "error",
        });
      }
    } catch (error) {
      toast("Ocorreu um erro ao criar a sala.", {
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  }, [apelido, codigo]);

  const validarApelido = useCallback(async () => {
    try {
      await InputsSchema.pick(["apelido"]).validate({
        apelido: apelido,
      });
      setErrorInputs((prevState) => ({
        ...prevState,
        errorApelido: false,
        errorApelidoMessage: "",
      }));
      return true;
    } catch (error) {
      setErrorInputs((prevState) => ({
        ...prevState,
        errorApelido: true,
        errorApelidoMessage: (error as Error).message,
      }));
      return false;
    }
  }, [apelido, handleCriarSala]);

  const validarCodigo = useCallback(async () => {
    try {
      await InputsSchema.pick(["codigo"]).validate({
        codigo: codigo,
      });
      setErrorInputs((prevState) => ({
        ...prevState,
        errorCodigo: false,
        errorCodigoMessage: "",
      }));
      return true;
      // handleEntrarSala();
    } catch (error) {
      setErrorInputs((prevState) => ({
        ...prevState,
        errorCodigo: true,
        errorCodigoMessage: (error as Error).message,
      }));
      return false;
    }
  }, [codigo, handleEntrarSala]);

  useEffect(() => {
    if (errorInputs.errorApelido) {
      validarApelido();
    }
  }, [apelido, errorInputs.errorApelido, validarApelido]);

  useEffect(() => {
    if (errorInputs.errorCodigo) {
      validarCodigo();
    }
  }, [codigo, errorInputs.errorCodigo, validarCodigo]);

  return (
    <>
      <div className="flex flex-col mt-12 gap-4 items-center justify-center h-full">
        <div className="lg:text-3xl text-xl lg:w-[60%] w-full mx-auto font-bold text-center">
          <h1>Quer começar um bate-papo com alguém? Entrou no lugar certo!</h1>
          <h3 className="!text-xl font-normal lg:block hidden">
            Caso queira entrar em alguma sala, preencha o campo indicado com o
            código que o seu amigo lhe passou (ou entre no link diretamente).
            Caso queira criar uma sala, clique em &quot;criar sala&quot;
          </h3>
        </div>
        <section className="lg:w-1/2 mx-2 w-fit shadow-lg dark:shadow-none dark:border dark:border-gray-400 rounded-lg m-auto">
          <div className="flex flex-col p-4 gap-3 items-center justify-center">
            {apelido.trim().length == 0 ? (
              <FaUserCircle className="text-9xl text-gray-400" />
            ) : (
              <div className="flex lg:flex-row flex-col gap-3 items-center">
                <Avatar
                  className="[text-shadow:_0_1px_1px_rgb(0_0_0_/_100%)]"
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
            <form className="flex lg:flex flex-col gap-4 items-center">
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
                  onClick={handleEntrarSala}
                  isLoading={isLoading}
                >
                  ENTRAR NA SALA
                </Button>
              </div>
              <span className="text-xl font-bold">OU</span>
              <Button
                color="warning"
                className="font-semibold"
                onClick={handleCriarSala}
                isLoading={isLoading}
              >
                CRIAR UMA SALA
              </Button>
            </form>
          </div>
        </section>
      </div>
    <CreateRoomModal aberto={isLoading} />
    </>
  );
}
