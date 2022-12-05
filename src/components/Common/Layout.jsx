
import { toastOptions } from '@utils/functions'
import Head from 'next/head'
import { useTheme } from 'next-themes'
import { Toaster } from 'react-hot-toast'
import Sidebar from './Sidebar'
import dynamic from 'next/dynamic'
import { useState } from 'react'

const MobileMenu = dynamic(() => import('./Menu/MobileMenu'), { ssr: false })
const Header = dynamic(() => import('./Header'), { ssr: false })
const Layout = ({ children }) => {
    const { theme } = useTheme()
    const [isSidebarCollapsed, setSidebarCollapsed] = useState(false)
    return (
        <>
            <Head>
                <meta name="theme-color" content={theme === 'dark' ? '#000000' : '#ffffff'}/>
            </Head>
            <Toaster
                position="bottom-right"
                toastOptions={toastOptions}
            />
            <div className='flex'>
                <div className='hidden bg-primary fixed top-0 left-0 md:flex md:flex-shrink-0'>
                    <Sidebar isSidebarCollapsed={isSidebarCollapsed} />
                </div>
                <div className='flex flex-col mx-auto flex-1'>
                    <Header isSidebarCollapsed={isSidebarCollapsed} setSidebarCollapsed={setSidebarCollapsed} />
                    <div className={`relative md:ml-64 md:mb-0 md:pb-0 pb-20 mb-10`}>
                        <div className="pt-16 pb-0 lg:pb-12">
                            <div className="">
                                <div className={`max-w-full w-full mx-auto md:pl-0 p-0 md:p-5 `}>
                                    {children}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='md:hidden flex flex-shrink-0'>
                        <MobileMenu/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Layout