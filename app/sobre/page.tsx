"use client";

import Image from "next/image";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

export default function SobrePage() {
  return (
    <>
      <section className="bg-white dark:bg-gray-900">
        <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
          <div className="mr-auto place-self-center lg:col-span-7">
            <h1 className="max-w-7xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">
              Sua{" "}
              <span
                className={
                  "bg-clip-text text-transparent bg-gradient-to-r from-[#786FF2] to-[#A46FF2]"
                }
              >
                privacidade.
              </span>
              <br />
              Nossa{" "}
              <span
                className={
                  "bg-clip-text text-transparent bg-gradient-to-r from-[#6F90F2] to-[#38A3F5]"
                }
              >
                responsabilidade.
              </span>
            </h1>
            <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
              Esta ferramenta tem interação totalmente anônima com todas as suas
              mensagens criptografadas e seguras.
            </p>
          </div>
          <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
            <Image
              src="/images/Conversation-s.png"
              alt={"Foto do Hero"}
              width={500}
              height={500}
              className="w-full h-full"
            />
          </div>
        </div>
      </section>
      <section>
        <div className="flex itens-center justify-center p-10">
          <Card className="mt-6 w-96">
            <CardHeader>
              <Image
                src="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
                alt="card-image"
                width={500}
                height={500}
              />
            </CardHeader>
            <CardBody>
              <Typography variant="h5" color="blue-gray" className="mb-2">
                UI/UX Review Check
              </Typography>
              <Typography>
                The place is close to Barceloneta Beach and bus stop just 2 min
                by walk and near to &quot;Naviglio&quot; where you can enjoy the
                main night life in Barcelona.
              </Typography>
            </CardBody>
            <CardFooter className="pt-0">
              <Button>Read More</Button>
            </CardFooter>
          </Card>
        </div>
      </section>
    </>
  );
}
