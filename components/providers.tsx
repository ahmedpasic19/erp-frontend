'use client'

import { ReactNode } from 'react'

import { SessionProvider } from 'next-auth/react'
import { Provider } from 'react-redux'

import { store } from '@/app/_features/store'

type TProps = {
   children: ReactNode
}

const Providers = ({ children }: TProps) => {
   return (
      <SessionProvider>
         <Provider store={store}>{children}</Provider>
      </SessionProvider>
   )
}

export default Providers
