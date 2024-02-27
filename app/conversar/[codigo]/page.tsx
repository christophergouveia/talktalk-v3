"use client";

import React, { useEffect } from "react";
import NotFound from "@/app/not-found";
import Avatar from "react-avatar";
import { ScrollShadow, Select, SelectItem } from "@nextui-org/react";
import { Textarea } from "@nextui-org/react";
import { IoSettingsSharp } from "react-icons/io5";
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import MessageList from "@/app/components/chatComponent/messageListComponent";
import Message from "@/app/components/chatComponent/messageComponent";
import ChatComponent from "@/app/components/chatComponent/chatComponent";
import { usePeerConnection } from '@/app/peerRooms/peerConnection';
import Peer from "peerjs";

const linguagens = [
  { label: "Português", value: "pt_br", description: "Português Brasil" },
  { label: "Inglês", value: "en_us", description: "English (USA)" },
];

export default function RoomPage({ params }: { params: { codigo: string } }) {
  const [linguaSelecionada, setLinguaSelecionada] = React.useState<{
    label: string;
    value: string;
  } | null>({ label: "Português", value: "pt_br" });

  const [pessoasConectadas, setPessoasConectadas] = React.useState<number>(0);
  const [showErrorModal, setShowErrorModal] = React.useState(false);

  const languageOptions = React.useMemo(function languageOptions() {
    return linguagens.map((idioma) => (
      <SelectItem key={idioma.value} value={idioma.value}>
        {idioma.label}
      </SelectItem>
    ));
  }, []);

  // const { peer, connectionCount } = usePeerConnection({
  //   onPeopleCountChange: (count) => {
  //     setPessoasConectadas(count);
  //     if (count >=  2) {
  //       setShowErrorModal(true);
  //     }
  //   },
  //   codigo: params.codigo
  // });

  const peer = new Peer();

  peer.connect("abc123")

  peer.on("connection", () => {
    console.log("conectou")
  })

  peer.on("open", () => {
    console.log("abriu");
  })

  if (params.codigo.length < 4) {
    return <NotFound />;
  }

  if (showErrorModal) {
    return (
      <div>
        <h2>Sala Cheia</h2>
        <p>Desculpe, mas a sala já está cheia. Por favor, tente novamente mais tarde.</p>
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
              <Avatar name="Christopher" round size="2.5rem" />
              <span>e</span>
              <Avatar name="Kaike" round size="2.5rem" />
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
            <MessageList>
            </MessageList>
          </ScrollShadow>
        </ChatComponent.Body>
        <ChatComponent.Footer className="border-t-2 border-t-slate-600 flex items-center p-3">
          <Textarea
            label=""
            placeholder="Digite uma mensagem..."
            classNames={{
              input: "textarea-message",
            }}
            size="sm"
            maxRows={4}
            rows={1}
          />
        </ChatComponent.Footer>
      </section>
    </div>
  );
}
