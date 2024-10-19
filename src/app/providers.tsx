'use client'
import Web3Providers from '@/components/Web3Provider'

import React from 'react'
// import Stats from '@/components/common/Stats'

const Providers = ({ children }: { children: React.ReactNode }) => {
  // const messages = useMessages();

  return (
    <>
      <Web3Providers>
        {children}
      </Web3Providers>
    </>
  )
}

export default Providers
