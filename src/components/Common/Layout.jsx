
import { getToastOptions } from '@utils/functions'
import Head from 'next/head'
import { useTheme } from 'next-themes'
import { Toaster } from 'react-hot-toast'
import FullPageLoader from './FullPageLoader'
import Header from './Header'
import Sidebar from './Sidebar'
import { useState } from 'react'


const Layout = ({ children }) => {
    const { theme } = useTheme()
    const [loading, setLoading] = useState(false)
    if (loading) return <FullPageLoader />

    return (
        <>
            <Head>
                <meta name="theme-color" content={theme === 'dark' ? '#000000' : '#ffffff'}/>
            </Head>
            <Toaster
                position="bottom-right"
                toastOptions={getToastOptions(theme)}
            />
            <div className='dark:bg-black bg-white h-screen flex'>
                <div className='hidden md:flex md:flex-shrink-0'>
                    <Sidebar />
                </div>
                <div className='flex flex-col mx-auto flex-1'>
                    <Header />
                    <div className='relative overflow-y-scroll overflow-x-hidden'>
                        <div className="pt-16 pb-0 lg:pb-12">
                            <div className="min-h-screen">
                                <div className='max-w-7xl px-2.5 mx-auto sm:px-4 lg:px-8 pt-5'>
                                    {children}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Layout