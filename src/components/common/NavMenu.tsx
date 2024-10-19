'use client'

import React from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'

const NavMenu = () => {
  const pathname = usePathname()

  return (
    <>
      <nav className={cn(
        "bg-slate-900 px-2 py-2 rounded-sm gap-4 flex",
        "shadow-[rgba(111,109,120,0.1)_0px_0px_30px,rgba(60,57,63,0.4)_0px_0px_0px_1px]"
      )}
      >
        <div className={cn(
          "w-[100px] flex justify-center rounded-sm py-1 px-2",
          pathname === '/' && 'bg-slate-900/80 sm'
        )}>
          <Link href="/" className="text-white hover:text-gray-300">
            Home
          </Link>
        </div>
        <div className={cn(
          "w-[100px] flex justify-center rounded-sm py-1 px-2",
          pathname === '/discover' && 'bg-slate-900/80 sm'
        )}>
          <Link href="/discover" className="text-white hover:text-gray-300">
            Discover
          </Link>
        </div>
      </nav>
    </>
  )
}

export default NavMenu