'use client'

import React from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'
import Image from 'next/image'

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar"
import CreateButton from './CreateButton'
import GuideButton from './GuideButton'

const menuItems = [
  { label: 'Home', path: '/' },
  { label: 'Discover', path: '/discover' },
  { label: 'About', path: '/about' }, // Add as many as you need
  { label: 'Contact', path: '/contact' },
];

/*
const Menu = () => {
  const pathname = usePathname()

  const isActive = (path: string) => pathname === path;

  return (
    <Menubar>
      <MenubarMenu>
        {menuItems.map((item) => (
          <Link href={item.path} key={item.label} passHref>
            <MenubarTrigger
              className={`${
                isActive(item.path) ? "bg-blue-500 text-white" : ""
              } px-4 py-2 rounded-lg`}
            >
              {item.label}
            </MenubarTrigger>
          </Link>
        ))}
      </MenubarMenu>
    </Menubar>
  );
};
*/

const NavMenu = () => {
  const pathname = usePathname()

  return (
    <div className="flex gap-4 justify-center items-center">
      <Image src="/logo2.png" alt="logo" width={200} height={150} />
      <div className='font-extrabold'>Epicurean Advice & Travel</div>
      <nav className={cn(
        "bg-[#a797d5] px-2 py-2 rounded-sm gap-4 flex",
        //"shadow-[rgba(111,109,120,0.1)_0px_0px_30px,rgba(60,57,63,0.4)_0px_0px_0px_1px]"
      )}
      >
        {/*
        <Menu/>
        */}
        <div className={cn(
          "flex justify-center rounded-sm py-1 px-2",
          pathname === '/' && 'bg-slate-900/80 sm'
        )}>
          <Link href="/" className="text-white hover:text-gray-300">
            Home
          </Link>
        </div>
        <div className={cn(
          "flex justify-center rounded-sm py-1 px-2",
          pathname === '/discover' && 'bg-slate-900/80 sm'
        )}>
          <Link href="/discover" className="text-white hover:text-gray-300">
            Discover
          </Link>
        </div>
        <CreateButton />
        <GuideButton/>
      </nav>
    </div>
  )
}

export default NavMenu