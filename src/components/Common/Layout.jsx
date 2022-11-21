
import { toastOptions } from '@utils/functions'
import Head from 'next/head'
import { useTheme } from 'next-themes'
import { Toaster } from 'react-hot-toast'
//import Header from './Header'
import Sidebar from './Sidebar'
import dynamic from 'next/dynamic'
import MobileMenu from './Menu/MobileMenu'

const Header = dynamic(() => import('./Header'), { ssr: false })
//const Sidebar = dynamic(() => import('./Sidebar'), { ssr: false })

const Layout = ({ children }) => {
    const { theme } = useTheme()

    return (
        <>
            <Head>
                <meta name="theme-color" content={theme === 'dark' ? '#000000' : '#ffffff'}/>
            </Head>
            <Toaster
                position="bottom-right"
                toastOptions={toastOptions}
            />
            <div className='bg-primary h-screen flex'>
                <div className='hidden md:flex md:flex-shrink-0'>
                    <Sidebar />
                </div>
                <div className='flex flex-col mx-auto flex-1'>
                    <Header />
                    <div className='relative overflow-y-scroll overflow-x-hidden md:mb-0 md:pb-0 pb-20 mb-10'>
                        <div className="pt-16 pb-0 lg:pb-12">
                            <div className="min-h-screen">
                                <div className='max-w-full w-full mx-auto md:pl-0 p-0 md:p-5'>
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