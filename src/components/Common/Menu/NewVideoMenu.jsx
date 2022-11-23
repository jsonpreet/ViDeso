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
                    <button className="text-secondary hover-primary flex items-center border theme-border mr-3 px-3 py-1.5 justify-center space-x-2 rounded-sm flex-none">
                        <RiVideoAddLine className='h-5 w-5 text-brand2-700' /> <span className='text-gray-700 font-medium'>Create</span>
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
                            href={`/@${user.profile.Username}/community`}
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