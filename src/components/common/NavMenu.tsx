import React from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

const NavMenu = () => {
  return (
    <>
      <nav className={cn(
        "bg-slate-900 p-4 rounded-sm gap-8 flex",
        "shadow-[rgba(111,109,120,0.1)_0px_0px_30px,rgba(60,57,63,0.4)_0px_0px_0px_1px]"
      )}
      >
        <div>
          <Link href="/" className="text-white hover:text-gray-300">
            Home
          </Link>
        </div>
        <div>
          <Link href="/discover" className="text-white hover:text-gray-300">
            Discover
          </Link>
        </div>
      </nav>
    </>
  )
}

export default NavMenu