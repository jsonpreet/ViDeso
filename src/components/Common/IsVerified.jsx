import clsx from 'clsx'
import { MdVerified } from 'react-icons/md'
import { GoVerified } from "react-icons/go";
import { BsFillPatchCheckFill, BsPatchCheckFill } from 'react-icons/bs';

const IsVerified = ({ id, size = 'sm', color }) => {
  return (
    <div>
      <BsPatchCheckFill
        className={clsx(
          'text-gray-800 -mt-[2px] dark:text-gray-400',
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