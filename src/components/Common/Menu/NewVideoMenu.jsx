import { Menu } from '@headlessui/react'
import { useRouter } from 'next/router'
import { RiVideoAddLine } from 'react-icons/ri'
import DropMenu, { NextLink } from '../../UIElements/DropMenu'
import { TfiPencilAlt, TfiVideoCamera } from "react-icons/tfi";
import usePersistStore from '@app/store/persist';

function NewVideoMenu() {
    const { query } = useRouter()
    const {isLoggedIn, user } = usePersistStore()
    return (
        <>
            <DropMenu
                trigger={
                    <button className="text-secondary hover-primary flex items-center justify-center w-10 h-10 rounded-full flex-none">
                        <RiVideoAddLine className='h-6 w-6' />
                    </button>
                }
            >
                <div className="py-2 my-1 overflow-hidden rounded-lg dropdown-shadow bg-dropdown outline-none ring-0 focus:outline-none focus:ring-0 divide-y dropdown-shadow max-h-96 bg-dropdown theme-divider border theme-border w-44">
                    <div className="pt-2 text-sm">
                        <Menu.Item
                            as={NextLink}
                            href={`/upload`}
                            className="inline-flex w-full items-center px-3 py-2 space-x-3 hover-primary"
                        >
                            <TfiVideoCamera size="20" />
                            <span className="truncate whitespace-nowrap">
                                Upload Video
                            </span>
                        </Menu.Item>
                        <Menu.Item
                            as={NextLink}
                            href={`/${user.profile.Username}/community`}
                            className="inline-flex w-full items-center px-3 py-2 space-x-3 hover-primary"
                        >
                            <TfiPencilAlt size="20" />
                            <span className="truncate whitespace-nowrap">
                                Create Post
                            </span>
                        </Menu.Item>
                    </div>
                </div>
            </DropMenu>
        
        </>
    )
}

export default NewVideoMenu