'use client'

import React from 'react'
// import Stats from '@/components/common/Stats'

const Providers = ({ children }: { children: React.ReactNode }) => {
  // const messages = useMessages();

  return (
    <>
      {children}
      {/* {process.env.NODE_ENV === 'production' ? null : <Stats />} */}
    </>
  )
}

export default Providers
