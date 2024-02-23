"use client";

import React from "react";
import NotFound from "@/app/not-found";
import Avatar from "react-avatar";
import { ScrollShadow, Select, SelectItem } from "@nextui-org/react";
import { Textarea } from "@nextui-org/react";
import { IoSettingsSharp } from "react-icons/io5";
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import MessageList from "@/app/components/chatComponent/messageListComponent";
import Message from "@/app/components/chatComponent/messageComponent";
import ChatComponent from "@/app/components/chatComponent/chatComponent";

const linguagens = [
  { label: "Português", value: "pt_br", description: "Português Brasil" },
  { label: "Inglês", value: "en_us", description: "English (USA)" },
];

export default function RoomPage({ params }: { params: { codigo: string } }) {
  const [linguaSelecionada, setLinguaSelecionada] = React.useState<{
    label: string;
    value: string;
  } | null>({ label: "Português", value: "pt_br" });

  const languageOptions = React.useMemo(function languageOptions() {
    return linguagens.map((idioma) => (
      <SelectItem key={idioma.value} value={idioma.value}>
        {idioma.label}
      </SelectItem>
    ));
  }, []);

  if (params.codigo.length < 4) {
    return <NotFound />;
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
              {Array.from({ length: 50 }, (_, i) => {
                return (
                  <>
                    <Message
                      ownMessage={false}
                      sender="Christopher"
                      date={Date.now()}
                      key={i}
                    >
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                      Tempora quae delectus laboriosam non fugit similique unde
                      esse. Distinctio, nobis officia? Fuga, quam labore itaque
                      nisi quas mollitia dolores assumenda eum, nobis
                      perferendis voluptas beatae aut quis. Magni mollitia
                      numquam officia delectus illum suscipit quisquam,
                      assumenda porro blanditiis nostrum iste nihil et esse
                      pariatur quo quibusdam rem magnam quis exercitationem!
                      Praesentium qui mollitia nesciunt magni, nemo, cumque
                      similique repudiandae vitae sunt rem nostrum quasi.
                      Architecto, reprehenderit facilis. Molestias
                      exercitationem commodi ipsa similique fugiat, quis sed
                      quae officia at temporibus eius a reiciendis tempora dicta
                      itaque illum aperiam fugit quibusdam ut numquam! Suscipit
                      aliquam doloribus fuga distinctio aut exercitationem nihil
                      harum explicabo vel. Velit dolor ipsum nisi dolores quasi
                      pariatur quo, eius reprehenderit provident rerum officiis
                      laudantium perferendis a molestias praesentium nostrum
                      aliquam libero veritatis officia accusamus! Error, ullam
                      reiciendis expedita laudantium porro quia molestias quidem
                      in voluptas deleniti sequi aliquam unde assumenda illum ad
                      fuga id omnis veniam ipsum a voluptates adipisci, sed quam
                      beatae! Expedita nostrum pariatur accusantium, suscipit,
                      assumenda nulla reiciendis fugit repellat qui vitae animi
                      autem, distinctio incidunt? Quasi pariatur vero fugiat
                      cumque quos culpa soluta fuga adipisci eos nostrum vitae
                      expedita aperiam magnam minus ab consequuntur, dicta
                      placeat quia, non ipsa perferendis atque repellat,
                      praesentium qui. Sint, quod. Iure ipsam, itaque officiis
                      labore ad suscipit quis, iste reiciendis maxime quaerat,
                      eligendi eveniet dicta sit provident expedita rerum
                      commodi incidunt ut? Facere nam ratione voluptatum, veniam
                      placeat officiis.
                    </Message>
                    <Message
                      ownMessage={true}
                      sender="Kaike"
                      date={Date.now()}
                    >
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                      Tempora quae delectus laboriosam non fugit similique unde
                      esse. Distinctio, nobis officia? Fuga, quam labore itaque
                      nisi quas mollitia dolores assumenda eum, nobis
                      perferendis voluptas beatae aut quis. Magni mollitia
                      numquam officia delectus illum suscipit quisquam,
                      assumenda porro blanditiis nostrum iste nihil et esse
                      pariatur quo quibusdam rem magnam quis exercitationem!
                      Praesentium qui mollitia nesciunt magni, nemo, cumque
                      similique repudiandae vitae sunt rem nostrum quasi.
                      Architecto, reprehenderit facilis. Molestias
                      exercitationem commodi ipsa similique fugiat, quis sed
                      quae officia at temporibus eius a reiciendis tempora dicta
                      itaque illum aperiam fugit quibusdam ut numquam! Suscipit
                      aliquam doloribus fuga distinctio aut exercitationem nihil
                      harum explicabo vel. Velit dolor ipsum nisi dolores quasi
                      pariatur quo, eius reprehenderit provident rerum officiis
                      laudantium perferendis a molestias praesentium nostrum
                      aliquam libero veritatis officia accusamus! Error, ullam
                      reiciendis expedita laudantium porro quia molestias quidem
                      in voluptas deleniti sequi aliquam unde assumenda illum ad
                      fuga id omnis veniam ipsum a voluptates adipisci, sed quam
                      beatae! Expedita nostrum pariatur accusantium, suscipit,
                      assumenda nulla reiciendis fugit repellat qui vitae animi
                      autem, distinctio incidunt? Quasi pariatur vero fugiat
                      cumque quos culpa soluta fuga adipisci eos nostrum vitae
                      expedita aperiam magnam minus ab consequuntur, dicta
                      placeat quia, non ipsa perferendis atque repellat,
                      praesentium qui. Sint, quod. Iure ipsam, itaque officiis
                      labore ad suscipit quis, iste reiciendis maxime quaerat,
                      eligendi eveniet dicta sit provident expedita rerum
                      commodi incidunt ut? Facere nam ratione voluptatum, veniam
                      placeat officiis.
                    </Message>
                  </>
                );
              })}
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
