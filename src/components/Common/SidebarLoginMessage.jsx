import usePersistStore from '@app/store/persist'
import { DESO_CONFIG } from '@app/utils/constants'
import Deso from 'deso-protocol'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { Button } from '../UIElements/Button'

function SidebarLoginMessage() {
  const { setLoggedIn, isLoggedIn, user, setUser } = usePersistStore()
  const [loading, setLoading] = useState(false)

  const loginWithDeso = async () => {
    setLoading(true)
    try {
      const deso = new Deso(DESO_CONFIG);
      const request = 3;
      const response = await deso.identity.login(request);
      if (response) {
          const request = {
            PublicKeyBase58Check: response.key,
          };
          try {
            const data = await deso.user.getSingleProfile(request);
            setUser({ profile: data.Profile });
            setLoggedIn(true);
            setLoading(false)
          } catch (error) {
            toast.error(error);
            console.log(error);
            setLoading(false)
          }
      } else {
        console.log(response);
        setLoading(false)
      }
    } catch (error) {
      toast.error(error);
      console.log(error);
      setLoading(false)
    }
  }
  
  return (
    <>
      {!isLoggedIn ? 
        <>
          <div className="h-[1px] mt-4 mb-6 relative theme-border-bg" />
          <div className="flex flex-col w-full mb-3 space-y-3 px-3">
            <div className='text-sm'>Sign in to like videos, comment, and subscribe.</div>
            <div className='w-full'><Button onClick = { () => loginWithDeso() } loading = { loading }>Sign In</Button></div>
          </div>
        </>
      : null}  
    </>
  )
}

export default SidebarLoginMessage