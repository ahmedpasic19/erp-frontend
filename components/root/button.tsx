import React, { ButtonHTMLAttributes } from 'react'

interface TProps extends ButtonHTMLAttributes<HTMLButtonElement> {
   isLoading?: boolean
   white?: boolean
}

const Button = (props: TProps) => {
   return (
      <button
         className={`w-full rounded-md ${
            props.white ? ' border-2 border-black bg-white text-black dark:text-black' : 'bg-black'
         } p-2 text-white disabled:bg-gray-600`}
         {...props}
      >
         {!props.isLoading ? props.children : 'Loading...'}
      </button>
   )
}

export default Button
