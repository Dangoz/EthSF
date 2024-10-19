import React from 'react'
import NavMenu from './NavMenu'
import { DynamicWidget } from '@dynamic-labs/sdk-react-core'

const NavBar = () => {
  return (
    <div className="flex justify-between items-center mx-10">
      <div />
      <div className="">
        <NavMenu />
      </div>
      <DynamicWidget />
    </div>
  )
}

export default NavBar
