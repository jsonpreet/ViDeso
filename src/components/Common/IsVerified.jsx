import clsx from 'clsx'
import { MdVerified } from 'react-icons/md'
import { GoVerified } from "react-icons/go";
import { BsFillPatchCheckFill, BsPatchCheckFill } from 'react-icons/bs';
import { HiCheckCircle } from 'react-icons/hi';
import { HiCheckBadge } from "react-icons/hi2";

const IsVerified = ({ id, size = 'sm', color }) => {
  return (
    <div>
      {size === 'xs' ? (
        <HiCheckCircle className={clsx('text-gray-800 text-[16px] -mt-[2px] dark:text-gray-400', color)} />
      ) : (
        <HiCheckCircle
          className={clsx(
            'text-gray-800 -mt-[2px] dark:text-gray-400',
            {
              'text-xs': size === 'xs',
              'text-sm': size === 'sm',
              'text-base': size === 'base',
              'text-lg': size === 'lg'
            },
            color
          )}
        />
      )}
    </div>
  )
}

export default IsVerified