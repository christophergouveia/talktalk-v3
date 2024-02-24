"use client";

import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarContent,
  NavbarItem,
  Link,
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
      name: "Sobre a ferramenta",
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

      <NavbarContent className="navbar-content flex gap-4" justify="center">
        <NavbarBrand>
          <Image src="/logo.png" width={70} alt="Logotipo do website" />
        </NavbarBrand>
        {listaItems.map((item) => {
          return (
            <NavbarItem className={`sm:block hidden ${(pathname === item.href) ? "border-b-1 border-b-sky-600 h-full leading-[calc(4rem)]" : ""}`} key={item.href}>
              <Link className={`text-slate-400 ${(pathname === item.href) ? "!text-sky-600" : ""}`} href={item.href}>{item.name}</Link>
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
