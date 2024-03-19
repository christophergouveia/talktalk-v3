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
  Button,
  ButtonGroup,
} from "@nextui-org/react";
import { usePathname } from "next/navigation";
import { FaMoon, FaSun } from "react-icons/fa6";
import { useTheme } from "next-themes";

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
        <NavbarBrand></NavbarBrand>
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
        <Button isIconOnly className="rounded-full gap-0 p-0"  onClick={() => toggleTheme()}>
          {theme.resolvedTheme === "dark" ? <FaMoon /> : <FaSun />}
        </Button>
      )}
    </Navbar>
  );
}
