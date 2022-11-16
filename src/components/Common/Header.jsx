// import NewVideoTrigger from '@/components/Channel/NewVideoTrigger'
// import NotificationTrigger from '@/components/Notifications/NotificationTrigger'

import useAppStore from '@store/app'
import usePersistStore from '@store/persist'
import { HOME } from '@utils/paths'
import Link from 'next/link'
import { useState } from 'react'
import { Search } from '@components/Search'
import { Button } from '@components/UIElements/Button'
import { APP } from '@utils/constants'
import Image from 'next/image'
import ThemeSwitch from './ThemeSwitch'



const Header = ({ className }) => {
  const hasNewNotification = useAppStore((state) => state.hasNewNotification)
  const selectedChannelId = usePersistStore((state) => state.selectedChannelId)
  const [showShowModal, setSearchModal] = useState(false)
  const isLoggedIn = usePersistStore((state) => state.isLoggedIn)
  const [loading, setLoading] = useState(false)

  return (
    <div className='fixed items-center flex justify-between flex-row z-20 left-0 right-0 top-0 flex-shrink-0 header-glassy h-16 px-4'>
      <div className="w-56 flex md:justify-center py-4">
        <Link
          href={HOME}
          className="flex items-center justify-start pb-1 focus:outline-none"
        >
          <Image src='/videso.png' alt={APP.Name} height={35} width={31} />
          <span className='font-semibold font-oswald text-gray-700 dark:text-white text-2xl md:text-3xl ml-2'>Videso</span>
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
        {/* {selectedChannelId ? (
          <>
            <NotificationTrigger />
            <Link href={NOTIFICATIONS} className="relative p-1 md:hidden">
              <CgBell className="text-lg" />
              {hasNewNotification && (
                <span className="absolute flex w-1.5 h-1.5 bg-red-500 rounded-full top-0 right-0" />
              )}
            </Link>
            <NewVideoTrigger />
          </>
        ) : null} */}
        <ThemeSwitch/>
        {isLoggedIn ? (
          <>
            <Button onClick={() => setLoading(!loading)} loading={loading}>
              Upload Video
            </Button>
          </>
        ) : (
          <>
            <Button onClick={() => setLoading(!loading)} loading={loading}>
                Sign In
                <span className="hidden ml-1 md:inline-block">with DeSo</span>
            </Button>
          </>
        )}
      </div>
    </div>
  )
}

export default Header