import type { Metadata } from 'next'

import { Inter } from 'next/font/google'

import Navbar from '@/components/layout/navbar'
import Sidebar from '@/components/layout/sidebar'

type TProps = {
   children: React.ReactNode
   modal: React.ReactNode
}

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
   title: 'Offers | NextJS Enterprise',
   description: 'Offers | NextJS ERP System',
}

export default function SalesLayout(props: TProps) {
   return (
      <div className={inter.className}>
         <Navbar />
         <div className="grid grid-cols-[minmax(15%,3rem)_auto]">
            <Sidebar />
            <main>{props.children}</main>
         </div>
      </div>
   )
}
