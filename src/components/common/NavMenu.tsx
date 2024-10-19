import React from 'react'
import Link from 'next/link'

const NavMenu = () => {
  return (
    <>
      <nav className="bg-gray-900 p-4 rounded-lg gap-2 flex">
        <div>
          <Link href="/create" className="text-white hover:text-gray-300">
            Create
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