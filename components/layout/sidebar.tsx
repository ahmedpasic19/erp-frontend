import React from 'react'

import Link from 'next/link'

const Sidebar = () => {
   const pages = [
      {
         title: 'Home',
         href: '/',
      },
      {
         title: 'Companies',
         href: '/companies',
      },
      {
         title: 'Users',
         href: '/users',
      },
   ]

   return (
      <div className="bg-white dark:bg-dark drop-shadow-lg p-4">
         <h3 className="uppercase text-lg font-extrabold tracking-tighter w-full text-center max-w-sm">
            ERP
         </h3>
         <ul className="flex flex-col w-full gap-4">
            {pages.map((page) => (
               <Link key={Math.random()} href={page.href} className="capitalize">
                  {page.title}
               </Link>
            ))}
         </ul>
      </div>
   )
}

export default Sidebar
