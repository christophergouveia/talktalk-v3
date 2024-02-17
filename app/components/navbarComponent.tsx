"use client";

import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  NavbarMenu,
  Image,
} from "@nextui-org/react";
import { usePathname } from "next/navigation";

export default function NavBar() {
  const pathname = usePathname();
  
  let listaItems = [
    {
      name: "Página inicial",
      href: "/",
    },
    {
      name: "Sobre nós",
      href: "/sobre",
    },
    {
      name: "Conversar",
      href: "/conversar"
    }
  ];
  return (
    <Navbar isBordered isBlurred className="pt-1">
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarContent className="flex gap-4" justify="center">
        <NavbarBrand>
          {/* <p className="font-bold text-inherit">TalkTalk!</p> */}
          <Image src="logo.png" width={70} alt="Logotipo do website" />
        </NavbarBrand>
        {listaItems.map((item) => {
          return (
            <NavbarItem className="sm:block hidden" isActive={pathname === item.href} key={item.href}>
              <Link className="text-slate-400" href={item.href}>{item.name}</Link>
            </NavbarItem>
          );
        })}
      </NavbarContent>

      <NavbarMenu>
        {listaItems.map((item) => {
          return (
            <NavbarItem className="w-full" isActive={pathname === item.href} key={item.href}>
              <Link className="text-slate-400" href={item.href}>{item.name}</Link>
            </NavbarItem>
          );
        })}
      </NavbarMenu>
    </Navbar>
  );
}
