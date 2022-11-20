import useAppStore from '@store/app'
import { HOME } from '@utils/paths'
import Link from 'next/link'
import { useState } from 'react'
import { Search } from '@components/Search'
import { APP } from '@utils/constants'
import Image from 'next/image'
import ThemeSwitch from './ThemeSwitch'
import usePersistStore from '@app/store/persist'
import { NotificationMenu, NewVideoMenu, UserMenu } from './Menu'
import MobileMenu from './Menu/MobileMenu'


const Header = ({ className }) => {
  const isLoggedIn = usePersistStore((state) => state.isLoggedIn)
  const [loading, setLoading] = useState(false)
  const [showShowModal, setSearchModal] = useState(false)

  return (
    <>
      <div className='fixed items-center flex justify-between flex-row z-20 left-0 right-0 top-0 flex-shrink-0 header-glassy h-16 px-4'>
        <div className="md:w-56 flex md:justify-center py-4">
          <Link
            href={HOME}
            className="flex items-center justify-start pb-1 focus:outline-none"
          >
            <Image src='/videso.png' alt={APP.Name} height={35} width={31} />
            <span className='font-semibold font-oswald text-gray-700 dark:text-white text-2xl md:text-3xl ml-2'>{APP.Name}</span>
          </Link>
        </div>
        <Search />
        <div className="flex flex-row items-center justify-end space-x-3 md:w-56">
          {/* <button
            type="button"
            onClick={() => setSearchModal(true)}
            className="outline-none md:hidden"
          >
            <AiOutlineSearch className="text-lg" aria-hidden="true" />
          </button> */}
          {isLoggedIn ? (
            <>
              <NotificationMenu/>
              <NewVideoMenu />
            </>
          ) : <ThemeSwitch/>} 
          <UserMenu/>
        </div>
      </div>
    </>
  )
}

export default Header