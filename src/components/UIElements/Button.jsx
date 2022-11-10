import clsx from 'clsx'
import React, {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  forwardRef,
  ReactNode
} from 'react'

import { Loader } from './Loader'


export const Button = forwardRef(function Button(
  {
    className = '',
    size = 'md',
    variant = 'primary',
    loading,
    children,
    icon,
    ...rest
  },
  ref
) {
  return (
    <button
      ref={ref}
      className={clsx(
        'relative inline-block disabled:opacity-50 rounded-full group',
        {
          'px-4 py-1.5 text-xs': size === 'sm',
          'px-5 md:py-2 py-1.5 text-sm': size === 'md',
          'px-6 py-3 text-base': size === 'lg',
          'px-8 py-4 text-lg': size === 'xl',
          'bg-blue-500 hover:bg-blue-600 border border-blue-500 md:rounded-full':
            variant === 'primary',
          'bg-transparent md:rounded-full': variant === 'secondary',
          'bg-red-500 border border-red-500 md:rounded-full':
            variant === 'danger',
        },
        className
      )}
      disabled={loading}
      {...rest}
    >
      <span
        className={clsx('relative flex items-center justify-center space-x-2', {
          'text-white': variant !== 'secondary' && variant !== 'outlined'
        })}
      >
        {icon}
        {loading && <Loader size="sm" />}
        <span
          className={clsx('whitespace-nowrap', {
            'font-medium': variant !== 'secondary'
          })}
        >
          {children}
        </span>
      </span>
    </button>
  )
})