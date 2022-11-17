import usePersistStore from '@app/store/persist'
import React from 'react'
import { Button } from '../UIElements/Button'

function SidebarLoginMessage() {
    const { isLoggedIn } = usePersistStore() 
    return (
        <>
            {!isLoggedIn ? 
                <>
                  <div className="h-[1px] mt-4 mb-6 relative theme-border-bg" />
                  <div className="flex flex-col w-full mb-3 space-y-3 px-3">
                    <div className='text-sm'>Sign in to like videos, comment, and subscribe.</div>
                    <div className='w-full'><Button>Sign In</Button></div>
                  </div>
                </>
            : null}  
        </>
    )
}

export default SidebarLoginMessage