"use client";

import React, { ReactNode } from "react";
import NotFound from "@/app/not-found";
import Avatar from "react-avatar";
import {
  Select,
  SelectItem,
} from "@nextui-org/react";

import { IoSettingsSharp } from "react-icons/io5";
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import MessageList from "@/app/components/chatComponent/messageListComponent";
import Message from "@/app/components/chatComponent/messageComponent";

const linguagens = [
  { label: "Português", value: "pt_br", description: "Português Brasil" },
  { label: "Inglês", value: "en_us", description: "English (USA)" },
];

export default function RoomPage({ params }: { params: { codigo: string } }) {
  const [linguaSelecionada, setLinguaSelecionada] = React.useState<{
    label: string;
    value: string;
  } | null>({ label: "Português", value: "pt_br" });

  if (params.codigo.length < 4) {
    return <NotFound />;
  }

  function updateLanguage(value: string) {
    const selectedLanguage = linguagens.find((item) => item.value === value);
    if (selectedLanguage) {
      setLinguaSelecionada({ label: selectedLanguage.label, value: selectedLanguage.value });
    }
  }

  return (
    <div className="flex items-center justify-center mt-6 h-full">
      <section className="shadow border-2 bg-slate-100 dark:shadow-slate-900 dark:border-slate-900 dark:bg-slate-800 rounded-md w-4/5 h-full">
        <ChatComponent.Header className="bg-slate-300 dark:bg-slate-600 flex justify-between w-full">
          <ChatComponent.Avatars className={"p-2"}>
            <div className="flex items-center gap-2">
              <Avatar name="Christopher" round size="2.5rem" />
              <span>e</span>
              <Avatar name="Kaike" round size="2.5rem" />
            </div>
          </ChatComponent.Avatars>
          <ChatComponent.LanguageOptions className="w-full flex items-center justify-center gap-2">
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
              {linguagens.map((idioma) => (
                <SelectItem key={idioma.value} value={idioma.value}>
                  {idioma.label}
                </SelectItem>
               ))}
            </Select>
            <FaArrowRightArrowLeft size={32} className="text-slate-600 dark:text-slate-300" />
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
            <IoSettingsSharp size={32} style={{ marginRight: "1rem" }} className="text-slate-600 dark:text-slate-300"/>
          </ChatComponent.Settings>
        </ChatComponent.Header>
        <ChatComponent.Body>
          <MessageList>
            <Message ownMessage={false} sender="Christopher" date={Date.now()}>Oi teste</Message>
          </MessageList>
        </ChatComponent.Body>
        <ChatComponent.Footer>

        </ChatComponent.Footer>
      </section>
    </div>
  );
}

function ChatComponent({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={className}>{children}</div>;
}

ChatComponent.Header = ChatComponent;
ChatComponent.Body = ChatComponent;
ChatComponent.Footer = ChatComponent;
ChatComponent.Avatars = ChatComponent;
ChatComponent.LanguageOptions = ChatComponent;
ChatComponent.Settings = ChatComponent;
