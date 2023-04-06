import { ComponentPropsWithoutRef, ReactNode } from 'react'

type ButtonProps = {
  children: ReactNode
  className?: string
}

export const Button = ({
  children,
  className,
  ...rest
}: ButtonProps & Omit<ComponentPropsWithoutRef<'button'>, keyof ButtonProps>) => {
  return (
    <button
      type='button'
      className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 ${className}`}
      {...rest}>
      {children}
    </button>
  )
}

type PageButtonProps = {
  children: ReactNode
  className?: string
}

export const PageButton = ({
  children,
  className,
  ...rest
}: PageButtonProps & Omit<ComponentPropsWithoutRef<'button'>, keyof PageButtonProps>) => {
  return (
    <button
      type='button'
      className={`relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 ${className}`}
      {...rest}>
      {children}
    </button>
  )
}
