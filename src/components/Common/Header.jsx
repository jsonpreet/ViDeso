import { HOME } from '@utils/paths'
import Link from 'next/link'
import { Search } from '@components/Search'
import { APP } from '@utils/constants'
import Image from 'next/image'
import ThemeSwitch from './ThemeSwitch'
import usePersistStore from '@app/store/persist'
import { NotificationMenu, NewVideoMenu, UserMenu } from './Menu'


const Header = ({ className }) => {
  const isLoggedIn = usePersistStore((state) => state.isLoggedIn)

  return (
    <>
      <div className='fixed items-center flex justify-start md:justify-between flex-row z-30 left-0 right-0 top-0 flex-shrink-0 header-glassy h-16 px-4'>
        <div className="md:w-56 flex md:flex-none flex-1 md:justify-center py-4">
          <Link
            href={HOME}
            className="flex items-center justify-start pb-1 focus:outline-none"
          >
            <Image src='/videso.png' alt={APP.Name} height={35} width={31} />
            <span className='font-semibold font-oswald text-gray-700 dark:text-white text-2xl md:text-3xl ml-2'>{APP.Name}</span>
          </Link>
        </div>
        <Search />
        <div className="flex flex-row items-center justify-end md:w-56">
          {isLoggedIn ? (
            <>
              {/* <NotificationMenu/> */}
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