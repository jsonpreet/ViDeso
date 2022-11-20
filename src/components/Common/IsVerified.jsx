import clsx from 'clsx'
import { HiCheckCircle } from 'react-icons/hi';

const IsVerified = ({size = 'sm', color, className }) => {
  return (
    <div>
      {size === 'xs' ? (
        <HiCheckCircle className={clsx('text-gray-800 text-[16px] -mt-[2px] dark:text-gray-200', color)} />
      ) : (
        <HiCheckCircle
          className={clsx(
            'text-gray-800 -mt-[2px] dark:text-gray-200',
            {
              'text-xs': size === 'xs',
              'text-sm': size === 'sm',
              'text-base': size === 'base',
              'text-lg': size === 'lg',
              'text-xl': size === 'xl',
              'text-2xl': size === '2xl'
            },
            color,
            className
          )}
        />
      )}
    </div>
  )
}

export default IsVerified