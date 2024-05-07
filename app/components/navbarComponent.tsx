"use client";

import React, { useEffect } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarContent,
  NavbarItem,
  Link,
  NavbarMenu,
  Image,
  Button
} from "@nextui-org/react";
import { usePathname } from "next/navigation";
import { IoIosMoon } from "react-icons/io";
import { IoSunny } from "react-icons/io5";
import { useTheme } from "next-themes";
import { FaGithub } from "react-icons/fa";

import LogoSite from "@/public/images/icon/logo.png";

export default function NavBar() {
  const pathname = usePathname();
  const theme = useTheme();

  const [hasMounted, setHasMounted] = React.useState(false);

  useEffect(() => setHasMounted(true), [setHasMounted]);

  let listaItems = [
    {
      name: "Página inicial",
      href: "/",
    },
    {
      name: "Sobre a ferramenta",
      href: "/sobre",
    },
    {
      name: "Conversar",
      href: "/conversar",
    },
  ];

  function toggleTheme() {
    theme.setTheme(theme.resolvedTheme == "dark" ? "light" : "dark");
  }

  return (
    <Navbar isBordered isBlurred height={"4rem"}>
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarContent className="navbar-content flex gap-3" justify="center">
        <NavbarBrand>
          <Image src={LogoSite.src} width={64} height={64} alt="Logo" />
        </NavbarBrand>
        {listaItems.map((item) => {
          return (
            <NavbarItem
              className={`sm:block hidden ${
                pathname === item.href
                  ? "border-b-1 border-b-sky-600 h-full leading-[calc(4rem)]"
                  : ""
              }`}
              key={item.href}
            >
              <Link
                className={`text-slate-400 ${
                  pathname === item.href ? "!text-sky-600" : ""
                }`}
                href={item.href}
              >
                {item.name}
              </Link>
            </NavbarItem>
          );
        })}
      </NavbarContent>

      <NavbarMenu>
        {listaItems.map((item) => {
          return (
            <NavbarItem
              className="w-full"
              isActive={pathname === item.href}
              key={item.href}
            >
              <Link className="text-slate-400" href={item.href}>
                {item.name}
              </Link>
            </NavbarItem>
          );
        })}
      </NavbarMenu>
      {hasMounted && (
        <div className="flex items-center gap-2 ">
          <Button
            isIconOnly
            className="rounded-full gap-0 p-0 text-2xl bg-0 hover:bg-blue-100 text-gray-600 dark:text-gray-500 hover:dark:text-gray-600 dark:hover:bg-gray-300"
            onClick={() => toggleTheme()}
          >
            {theme.resolvedTheme === "dark" ? <IoIosMoon /> : <IoSunny />}
          </Button>
          <span className="border-l border-neutral-300 dark:border-neutral-700">
            &nbsp;
          </span>
          <Button
            isIconOnly
            className="rounded-full gap-0 p-0 text-2xl bg-0 hover:bg-blue-100 text-gray-600 dark:text-gray-500 hover:dark:text-gray-600 dark:hover:bg-gray-300"
          >
            <FaGithub />
          </Button>
        </div>
      )}
    </Navbar>
  );
}
