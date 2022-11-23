import { HOME } from '@utils/paths'
import Link from 'next/link'
import { Search } from '@components/Search'
import { APP } from '@utils/constants'
import Image from 'next/image'
import ThemeSwitch from './ThemeSwitch'
import usePersistStore from '@app/store/persist'
import { NotificationMenu, NewVideoMenu, UserMenu } from './Menu'
import { useState } from 'react'


const Header = ({ setSidebarCollapsed, isSidebarCollapsed }) => {
  const isLoggedIn = usePersistStore((state) => state.isLoggedIn)
  return (
    <>
      <div className='fixed items-center flex justify-start md:justify-between flex-row z-30 left-0 right-0 top-0 flex-shrink-0 header-glassy h-16 px-4'>
        <div className="md:w-56 flex md:flex-none flex-1 md:justify-center py-4">
          {/* <button className='-ml-[55px] mr-4' onClick={() => setSidebarCollapsed(!isSidebarCollapsed)}>
            <svg

              className="w-6 h-6 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button> */}
          <Link
            href={HOME}
            className="flex items-center justify-start pb-1 focus:outline-none"
          >
            <Image src='/videso.png' alt={APP.Name} height={35} width={31} />
            <span className='font-semibold font-oswald text-gray-700 dark:text-white text-2xl md:text-3xl ml-2'>{APP.Name}</span>
          </Link>
        </div>
        <Search />
        <div className="flex mr-[2px] flex-row items-center justify-end md:w-56">
          {isLoggedIn ? (
            <>
              {/* <NotificationMenu/> */}
              <NewVideoMenu />
            </>
          ) : <div className='mr-1'><ThemeSwitch/></div>} 
          <UserMenu/>
        </div>
      </div>
    </>
  )
}

export default Header