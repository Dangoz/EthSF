import React from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar"


const Menu = () => 
  <Menubar>
    <MenubarMenu>
      <Link href="/"><MenubarTrigger>Home</MenubarTrigger></Link>
      <Link href="/discover"><MenubarTrigger>Discover</MenubarTrigger></Link>
    </MenubarMenu>
  </Menubar>

const NavMenu = () => {
  return (
    <>
      <nav /*className={cn(
        "bg-slate-900 p-4 rounded-sm gap-8 flex",
        "shadow-[rgba(111,109,120,0.1)_0px_0px_30px,rgba(60,57,63,0.4)_0px_0px_0px_1px]"
      )}*/
      >
        <div>
          <Menu/>
        </div>
      </nav>
    </>
  )
}

export default NavMenu