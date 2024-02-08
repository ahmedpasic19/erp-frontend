import type { Metadata } from 'next'

import { Inter } from 'next/font/google'

import './globals.css'
import Navbar from '@/components/layout/navbar'
import Sidebar from '@/components/layout/sidebar'
import Providers from '@/components/providers'

type TProps = {
   children: React.ReactNode
   modal: React.ReactNode
}

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
   title: 'NextJS Enterprise',
   description: 'NextJS ERP System',
}

export default function RootLayout(props: TProps) {
   return (
      <html lang="en">
         <body className={inter.className}>
            <Providers>
               <Navbar />
               <div className="grid grid-cols-[minmax(15%,3rem)_auto]">
                  <Sidebar />
                  <main>
                     {props.children}
                     {props.modal}
                  </main>
               </div>
            </Providers>
         </body>
      </html>
   )
}
