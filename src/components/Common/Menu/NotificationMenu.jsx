import DropMenu from '@app/components/UI/DropMenu'
import useAppStore from '@app/store/app'
import usePersistStore from '@app/store/persist'
import React, { useState } from 'react'
import { CgBell } from 'react-icons/cg'

function NotificationMenu() {
    const hasNewNotification = useAppStore((state) => state.hasNewNotification)
    const isLoggedIn = usePersistStore((state) => state.isLoggedIn)
    const [loading, setLoading] = useState(false)
    const [showShowModal, setSearchModal] = useState(false)
    return (
        <>
            <DropMenu
                trigger={
                    <button className="text-secondary hover-primary flex items-center justify-center w-10 h-10 rounded-full flex-none">
                        <CgBell size={24} />
                    </button>
                }
                >
                <div className="py-2 my-1 overflow-hidden rounded-lg dropdown-shadow bg-dropdown outline-none ring-0 focus:outline-none focus:ring-0 divide-y dropdown-shadow max-h-96 bg-dropdown theme-divider border theme-border w-56 md:w-80">
                    <div className="flex flex-col space-y-1 text-sm transition duration-150 ease-in-out rounded-lg">
                        <div className="inline-flex items-center p-2 py-3 space-x-2 rounded-lg">
                            <div className='flex items-center space-x-1'>
                                <h3 className="text-base truncate leading-4">
                                    Notifications
                                </h3>
                            </div>
                        </div>
                    </div>
                    <div className="p-2 text-sm">
                        Coming Soon
                    </div>
                </div>
            </DropMenu>
        </>
    )
}

export default NotificationMenu