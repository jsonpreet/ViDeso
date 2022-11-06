// import NewVideoTrigger from '@/components/Channel/NewVideoTrigger'
// import NotificationTrigger from '@/components/Notifications/NotificationTrigger'

import useAppStore from '@store/app'
import usePersistStore from '@store/persist'
import { HOME } from '@utils/paths'
import Link from 'next/link'
import React, { useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { CgBell } from 'react-icons/cg'

import GlobalSearchBar from '@components/Search/GlobalSearchBar'
import { Button } from '@components/UIElements/Button'
import { APP } from '@app/utils/constants'



const Header = ({ className }) => {
  const hasNewNotification = useAppStore((state) => state.hasNewNotification)
  const selectedChannelId = usePersistStore((state) => state.selectedChannelId)
  const [showShowModal, setSearchModal] = useState(false)

  return (
    <div className='dark:bg-[#121214]/70 bg-white bg-opacity-70 fixed items-center flex justify-between flex-row z-20 left-0 right-0 top-0 flex-shrink-0 bg-clip-padding backdrop-blur-xl backdrop-filter h-16'>
      <div className="p-4">
        <Link
          href={HOME}
          className="flex items-center justify-center pt-1 focus:outline-none"
        >
          {APP.Name}
        </Link>
      </div>
      <div className="flex items-center justify-between w-full">
        {/* <div className="hidden md:block">
          <GlobalSearchBar />
        </div> */}
        <div className="flex flex-row items-center justify-end space-x-3 md:w-96">
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
           <Button>
            Sign In
            <span className="hidden ml-1 md:inline-block">with DeSo</span>
            </Button>
        </div>
      </div>

      {/* <Modal
        title="Search"
        onClose={() => setSearchModal(false)}
        show={showShowModal}
        panelClassName="max-w-md h-full"
      >
        <div className="max-h-[80vh] overflow-y-auto no-scrollbar">
          <GlobalSearchBar onSearchResults={() => setSearchModal(false)} />
        </div>
      </Modal> */}
    </div>
  )
}

export default Header