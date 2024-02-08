'use client'

import { ReactNode } from 'react'

import { SessionProvider } from 'next-auth/react'

type TProps = {
   children: ReactNode
}

const Providers = ({ children }: TProps) => {
   return <SessionProvider>{children}</SessionProvider>
}

export default Providers
