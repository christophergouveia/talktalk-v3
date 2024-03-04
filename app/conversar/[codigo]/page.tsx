"use client";

import { useEffect, useMemo, useState } from "react";
import NotFound from "@/app/not-found";
import Avatar from "react-avatar";
import { Button, ScrollShadow, Select, SelectItem } from "@nextui-org/react";
import { Textarea } from "@nextui-org/react";
import { IoSettingsSharp } from "react-icons/io5";
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import { IoIosSend } from "react-icons/io";
import MessageList from "@/app/components/chatComponent/messageListComponent";
import Message from "@/app/components/chatComponent/messageComponent";
import ChatComponent from "@/app/components/chatComponent/chatComponent";
import socket from "@/app/components/socket";
import updateSala from "@/app/utils/roomUtils/updateSala";
import CryptoJS from "crypto-js";

const linguagens = [
  { label: "Português", value: "pt_br", description: "Português Brasil" },
  { label: "Inglês", value: "en_us", description: "English (USA)" },
];

interface dadosAvatares {
  apelido: string;
  cor: string;
}

export default function RoomPage({ params }: { params: { codigo: string } }) {
  const [linguaSelecionada, setLinguaSelecionada] = useState<{ label: string; value: string } | null>({ label: "Português", value: "pt_br" });
  const [pessoasConectadas, setPessoasConectadas] = useState<number>(0);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [dadosAvatares, setDadosAvatares] = useState<dadosAvatares>({ apelido: "", cor: "" });


  useEffect(() => {
    async function fetchSala() {
      const response = await fetch("/api/salas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ codigo: params.codigo }),
      });
      const data = await response.json();
      if (data.error) {
        setShowErrorModal(true);
        return;
      }
      const sala = data.sala;
      const bytes = CryptoJS.AES.decrypt(
        sala.dadosAvatares,
        process.env.NEXT_PUBLIC_SECRET_UUID || "kachris123!"
      );
      var dados = bytes.toString(CryptoJS.enc.Utf8);
      setDadosAvatares({
        apelido: dados.split("|")[0],
        cor: dados.split("|")[1],
      });
    }
    fetchSala();

    socket.connect();
    socket.on("client-connected", (socketId: string) => {
      socket.emit("join-room", { room: params.codigo, socketId });
      setPessoasConectadas((prevCount) => {
        const newCount = prevCount + 1;
        updateSala(newCount, params.codigo);
        return newCount;
      });
    });
    socket.on("client-disconnected", (socketId: string) => {
      socket.emit("exit-room", { room: params.codigo, socketId });
      setPessoasConectadas((prevCount) => {
        const newCount = prevCount - 1;
        updateSala(newCount, params.codigo);
        return newCount;
      });
    });
  }, [params.codigo]);

  const languageOptions = useMemo(function languageOptions() {
    return linguagens.map((idioma) => (
      <SelectItem key={idioma.value} value={idioma.value}>
        {idioma.label}
      </SelectItem>
    ));
  }, []);

  const sendMessage = useMemo(function sendMessage() {
    
  }, []);

  if (params.codigo.length < 4) {
    return <NotFound />;
  }

  if (showErrorModal) {
    return (
      <div className="text-center">
        <h2 className="text-2xl font-bold">Sala Cheia</h2>
        <p className="text-gray-600 mt-2">
          Desculpe, mas a sala já está cheia. Por favor, tente novamente mais
          tarde.
        </p>
      </div>
    );
  }

  function updateLanguage(value: string) {
    const selectedLanguage = linguagens.find((item) => item.value === value);
    if (selectedLanguage) {
      setLinguaSelecionada({
        label: selectedLanguage.label,
        value: selectedLanguage.value,
      });
    }
  }

  return (
    <div className="flex items-center justify-center mt-6 h-full">
      <section className="shadow border-2 bg-slate-100 dark:shadow-slate-900 dark:border-slate-900 dark:bg-slate-800 rounded-md lg:w-[60%] w-[90%]">
        <ChatComponent.Header className="bg-slate-300 dark:bg-slate-600 flex justify-between w-full">
          <ChatComponent.Avatars className={"p-2"}>
            <div className="flex items-center gap-2">
              <Avatar
                name={dadosAvatares.apelido}
                color={dadosAvatares.cor.replace(";", "")}
                round
                size="2.5rem"
                className="[text-shadow:_0_1px_1px_rgb(0_0_0_/_100%)]"
              />
              {/* <span>e</span>
              <Avatar name="Kaike" round size="2.5rem" /> */}
            </div>
          </ChatComponent.Avatars>
          <ChatComponent.LanguageOptions className="w-full items-center justify-center gap-2 lg:flex hidden">
            <Select
              onSelectionChange={(keys) => {
                if ((keys as Set<string>).size === 1) {
                  const value = Array.from(keys)[0];
                  updateLanguage(value as any);
                }
              }}
              label="Selecione seu idioma"
              className="max-w-64"
              size="sm"
              multiple={false}
            >
              {languageOptions}
            </Select>
            <FaArrowRightArrowLeft
              size={32}
              className="text-slate-600 dark:text-slate-300"
            />
            <Select
              onSelectionChange={(keys) => {
                if ((keys as Set<string>).size === 1) {
                  const value = Array.from(keys)[0];
                  updateLanguage(value as any);
                }
              }}
              label="Selecione seu idioma"
              className="max-w-56"
              size="sm"
              multiple={false}
            >
              {linguagens.map((idioma) => (
                <SelectItem key={idioma.value} value={idioma.value}>
                  {idioma.label}
                </SelectItem>
              ))}
            </Select>
          </ChatComponent.LanguageOptions>
          <ChatComponent.Settings className="flex items-center">
            <IoSettingsSharp
              size={32}
              style={{ marginRight: "1rem" }}
              className="text-slate-600 dark:text-slate-300"
            />
          </ChatComponent.Settings>
        </ChatComponent.Header>
        <ChatComponent.Body>
          <ScrollShadow size={100}>
            <MessageList></MessageList>
          </ScrollShadow>
        </ChatComponent.Body>
        <ChatComponent.Footer className="border-t-2 border-t-slate-600 flex items-center p-3 gap-3">
          <Textarea
            label=""
            placeholder="Digite uma mensagem..."
            minRows={1}
            maxRows={3}
            classNames={{
              input: "textarea-message p-2",
            }}
            size="sm"
          />
          <Button isIconOnly onClick={sendMessage}>
            <IoIosSend className={"text-2xl"} />
          </Button>
        </ChatComponent.Footer>
      </section>
    </div>
  );
}
