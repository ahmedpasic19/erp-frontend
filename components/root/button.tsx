import React, { ButtonHTMLAttributes } from 'react'

interface TProps extends ButtonHTMLAttributes<HTMLButtonElement> {
   isLoading?: boolean
   white?: boolean
}

const Button = ({ isLoading, white, ...props }: TProps) => {
   return (
      <button
         className={`w-full rounded-md ${
            white ? ' border-2 border-black bg-white text-black' : 'bg-black'
         } p-2 text-white disabled:bg-gray-600`}
         {...props}
      >
         {!isLoading ? props.children : 'Loading...'}
      </button>
   )
}

export default Button
