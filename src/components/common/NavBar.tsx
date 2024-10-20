'use client'

import React from 'react'
import NavMenu from './NavMenu'
import { DynamicWidget } from '@dynamic-labs/sdk-react-core'
import CreateButton from './CreateButton'

const NavBar = () => {
  return (
    <>
      <div className="flex justify-between items-center px-5 pt-4 w-screen ">
        <div className="">
          <NavMenu />
        </div>
        <DynamicWidget />
      </div>
      <CreateButton />
    </>
  )
}

export default NavBar
