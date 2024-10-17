'use client';

import React, { forwardRef, useEffect, useRef, useState } from 'react';
import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarContent,
  NavbarMenu,
  Image,
  Button,
  NavbarItemProps,
} from '@nextui-org/react';
import { usePathname } from 'next/navigation';
import { IoIosMoon } from 'react-icons/io';
import { IoSunny } from 'react-icons/io5';
import { useTheme } from 'next-themes';
import { FaGithub } from 'react-icons/fa';
import { motion } from 'framer-motion';

import LogoSite from '@/public/images/icon/logo.png';
import Link from 'next/link';

interface NavbarItem {
  name: string;
  href: string;
}

export default function NavBar() {
  const pathname = usePathname();
  const theme = useTheme();

  const [hasMounted, setHasMounted] = useState<boolean>(false);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [barPosition, setBarPosition] = useState<{ width: number; left: number }>({ width: 0, left: 0 });

  useEffect(() => setHasMounted(true), []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const listaItems: NavbarItem[] = [
    {
      name: 'Página inicial',
      href: '/',
    },
    {
      name: 'Sobre a ferramenta',
      href: '/sobre',
    },
    {
      name: 'Conversar',
      href: '/conversar',
    },
  ];

  useEffect(() => {
    const currentIndex = listaItems.findIndex((item) => pathname === item.href);
    setActiveIndex(currentIndex);
  }, [pathname, listaItems]);

  const itemRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    if (itemRefs.current[activeIndex]) {
      const currentItem = itemRefs.current[activeIndex];
      setBarPosition({
        width: currentItem?.offsetWidth || 0,
        left: currentItem?.offsetLeft || 0,
      });
    }
  }, [activeIndex]);

  function toggleTheme() {
    theme.setTheme(theme.resolvedTheme === 'dark' ? 'light' : 'dark');
  }

  return (
    <Navbar isBordered isBlurred height={'4rem'}>
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarContent className="navbar-content relative flex gap-3" justify="center">
        <NavbarBrand>
          <Image src={LogoSite.src} width={64} height={64} alt="Logo" />
        </NavbarBrand>
        {listaItems.map((item, index) => (
          <NavbarItem
            className={`hidden sm:block`}
            key={item.href}
            ref={(el: any) => (itemRefs.current[index] = el)}
          >
            <Link
              className={`text-slate-400 hover:text-slate-300 ${pathname === item.href ? '!text-sky-600' : ''}`}
              href={item.href}
            >
              {item.name}
            </Link>
          </NavbarItem>
        ))}

        <motion.div
          className="absolute sm:block hidden -bottom-[2px] h-1 bg-sky-600"
          animate={{ width: barPosition.width, left: barPosition.left }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        />
      </NavbarContent>

      <NavbarMenu>
        {listaItems.map((item) => (
          <NavbarItem className="w-full" isActive={pathname === item.href} key={item.href}>
            <Link className="text-slate-400 hover:text-slate-600" href={item.href}>
              {item.name}
            </Link>
          </NavbarItem>
        ))}
      </NavbarMenu>

      {hasMounted && (
        <div className="flex items-center gap-2">
          <Button
            isIconOnly
            className="bg-0 gap-0 rounded-full p-0 text-2xl text-gray-600 hover:bg-blue-100 dark:text-gray-400 dark:hover:bg-gray-700"
            onClick={toggleTheme}
          >
            {theme.resolvedTheme === 'dark' ? <IoIosMoon /> : <IoSunny />}
          </Button>
          <div className="bg-gray-500 dark:bg-gray-400 w-[1px]">&nbsp;</div>
          <Button
            isIconOnly
            className="bg-0 gap-0 rounded-full p-0 text-2xl text-gray-600 hover:bg-blue-100 dark:text-gray-400 dark:hover:bg-gray-700"
          >
            <FaGithub />
          </Button>
        </div>
      )}
    </Navbar>
  );
}

// eslint-disable-next-line react/display-name
const NavbarItem = forwardRef<HTMLLIElement, NavbarItemProps>(({ children, className, ...props }, ref) => (
  <li ref={ref} className={className} {...props}>
    {children}
  </li>
));
