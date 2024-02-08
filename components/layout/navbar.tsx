import React from 'react'

import AuthBtns from './auth-btn'
import { ThemeBtn } from './theme-btn'

const Navbar = () => {
   return (
      <nav className="bg-white dark:bg-dark drop-shadow-lg p-4 flex justify-end gap-4">
         <ThemeBtn />
         <AuthBtns />
      </nav>
   )
}

export default Navbar
