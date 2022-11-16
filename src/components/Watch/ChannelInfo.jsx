import { formatNumber } from '@app/utils/functions'
import { getProfilePicture } from '@app/utils/functions/getProfilePicture'
import Deso from 'deso-protocol'
import Link from 'next/link'
import React, { useEffect } from 'react'
import IsVerified from '../Common/IsVerified'
import { Button } from '../UIElements/Button'

function ChannelInfo({ video, channel }) {
    const [followers, setFollowers] = React.useState(0)
    const [loading, setLoading] = React.useState(true)
    useEffect(() => {
        async function getFollowers() {
            const deso = new Deso();
            try {
                const request = {
                    PublicKeyBase58Check: channel.PublicKeyBase58Check ,
                    GetEntriesFollowingUsername: true
                };
                    
                const response = await deso.social.getFollowsStateless(request);
                if (response && response.NumFollowers) {
                    setFollowers(response.NumFollowers);
                    setLoading(false);
                }
                    
            } catch (error) {
                console.log(error);
                toast.error("Something went wrong!", toastOptions);
                setLoading(false);
            }
        }
        getFollowers()
    }, [channel])
    return (
        <>
            <div className='flex items-center space-x-3'>
                <div className='flex space-x-2'>
                    <Link href={`/${channel.Username}`} className="flex-none">
                        <img
                            className="w-10 h-10 rounded-full"
                            src={getProfilePicture(channel)}
                            alt={`${channel.Username} Picture`}
                            draggable={false}
                        />
                    </Link>
                    <div className='flex flex-col'>
                        <Link
                            href={`/${channel.Username}`}
                            className="flex items-center w-fit space-x-0.5 font-medium"
                        >
                            <span>{channel.Username}</span>
                            {channel.IsVerified ? <IsVerified size="lg" /> : null}
                        </Link>
                        {!loading ?
                            <span className="text-[13px] leading-4 text-gray-600">
                                {formatNumber(followers)} subscribers
                            </span>
                            : <div className="h-2 bg-gray-300 rounded dark:bg-gray-700" />
                        }
                        
                    </div>
                </div>
                <div>
                    <Button variant="dark">
                        <span>Subscribe</span>
                    </Button>
                </div>
            </div>
        </>
    )
}

export default ChannelInfo