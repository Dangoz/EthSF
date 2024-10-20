'use client'

import React from 'react'
import NavMenu from './NavMenu'
import { DynamicWidget } from '@dynamic-labs/sdk-react-core'
import CreateButton from './CreateButton'
import GuideButton from './GuideButton'

const NavBar = () => {
  return (
    <>
      <div className="flex justify-between items-center px-5 py-4 w-screen bg-[#a797d5]">
        <div className="">
          <NavMenu />
        </div>
        <DynamicWidget />
      </div>
      <>
        {/*<CreateButton />
        <GuideButton />*/}
      </>
    </>
  )
}

export default NavBar
