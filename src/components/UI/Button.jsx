import clsx from 'clsx'
import { Loader } from './Loader'


export const Button = ({className = '', size = 'md', variant = 'primary', loading, children, icon, ...rest}) => {
  return (
    <button
      className={clsx(
        'relative inline-block disabled:opacity-50 rounded-full group',
        {
          'px-4 py-1.5 text-xs': size === 'sm',
          'px-5 md:py-2 py-1.5 text-sm': size === 'md',
          'px-6 md:py-3 py-1.5 text-base': size === 'lg',
          'px-8 md:py-4 py-1.5 text-lg': size === 'xl',
          'p-0 text-sm': size === 'small',
          'primary-button md:rounded-full':
           variant === 'primary',
          'bg-transparent md:rounded-full': variant === 'secondary',
          'bg-red-500 border border-red-500 md:rounded-full': variant === 'danger',
          'dark-button md:rounded-full': variant === 'dark',
          'light-button md:rounded-full': variant === 'light',
        },
        className
      )}
      disabled={loading}
      {...rest}
    >
      <span
        className={clsx('relative flex items-center justify-center ', {
          'text-white': variant !== 'secondary' && variant !== 'outlined' && variant !== 'light' && variant !== 'dark' && variant !== 'none',
        }, { 'text-secondary': variant === 'light' }
          , { 'dark-button-text': variant === 'dark'}
          , { 'dark-text': variant === 'none' },
          {'space-x-2': size !== 'small'}
        )}
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
}