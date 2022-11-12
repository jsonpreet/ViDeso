import clsx from 'clsx'
import { MdVerified } from 'react-icons/md'
import { GoVerified } from "react-icons/go";

const IsVerified = ({ id, size = 'sm', color }) => {
  return (
    <div>
      <GoVerified
        className={clsx(
          'text-gray-800 dark:text-gray-400',
          {
            'text-xs': size === 'xs',
            'text-sm': size === 'sm',
            'text-lg': size === 'lg'
          },
          color
        )}
      />
    </div>
  )
}

export default IsVerified