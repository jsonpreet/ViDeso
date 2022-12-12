import usePersistStore from '@store/persist'
import { formatNumber } from '@utils/functions'
import { getProfilePicture } from '@utils/functions/getProfilePicture'
import Deso from 'deso-protocol'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import IsVerified from '../Common/IsVerified'
import { Button } from '../UI/Button'
import party from "party-js"
import { DESO_CONFIG } from '@utils/constants'
import Tooltip from '../UI/Tooltip'
import { isBrowser } from 'react-device-detect'
import { getProfileName } from '@utils/functions/getProfileName'

function ChannelInfo({ views, video, channel }) {
    const [followers, setFollowers] = useState(0)
    const [loading, setLoading] = useState(true)
    const [subscribing, setSubscribing] = useState(false)
    const followRef = useRef(null);
    const [follow, setFollow] = useState(false)
    const user = usePersistStore((state) => state.user)
    const isLoggedIn = usePersistStore((state) => state.isLoggedIn)
    const reader = isLoggedIn ? user.profile.PublicKeyBase58Check : '';

    useEffect(() => {
        const deso = new Deso(DESO_CONFIG);
        async function getFollowers() {
            try {
                const request = {
                    PublicKeyBase58Check: video.ProfileEntryResponse.PublicKeyBase58Check,
                    GetEntriesFollowingUsername: true
                };
                const response = await deso.social.getFollowsStateless(request);
                setFollowers(response.NumFollowers);
                setLoading(false);
            } catch (error) {
                console.log(error);
                toast.error("Something went wrong!");
                setLoading(false);
            }
        }
        
        async function checkFollowing() {
            const request = {
                PublicKeyBase58Check: reader,
                IsFollowingPublicKeyBase58Check: video.ProfileEntryResponse.PublicKeyBase58Check
            };
            try {
                const response = await deso.social.isFollowingPublicKey(request);
                setFollow(response?.data?.IsFollowing);

            } catch (error) {
                console.log(error);
            }
        }
        getFollowers()
        if (isLoggedIn) {
            checkFollowing()
        }
    }, [video, reader, isLoggedIn])

    const onFollow = async() => {
        if (!isLoggedIn) {
            return toast.error('Please login to Subscribe this user');
        }
        try{
            const deso = new Deso();
            setSubscribing(true)
            const isFollow = follow ? true : false;
            const request = {
                IsUnfollow: isFollow,
                FollowedPublicKeyBase58Check: video.ProfileEntryResponse.PublicKeyBase58Check,
                FollowerPublicKeyBase58Check: reader
            };
            const response = await deso.social.createFollowTxnStateless(request);
            if (response && response.TxnHashHex !== null) {
                if (!isFollow) {
                    party.confetti(followRef.current, {
                        count: party.variation.range(50, 100),
                        size: party.variation.range(0.2, 1.0),
                    });
                }
                setSubscribing(false)
                setFollow(!isFollow)
            } else {
                toast.error("Something went wrong!");
                setSubscribing(false)
            }
        }  catch (error) {
            setSubscribing(false)
            console.log(error);
            toast.error('Something went wrong');
        }
    }
    
    return (
        <>
            <div className='flex items-center md:justify-start overflow-hidden flex-1 justify-between space-x-3'>
                <div className='flex space-x-2'>
                    <Link href={`/@${channel.Username}`} className="flex-none">
                        <img
                            className="w-10 h-10 rounded-full"
                            src={getProfilePicture(channel)}
                            alt={`${getProfileName(channel)} Picture`}
                            draggable={false}
                        />
                    </Link>
                    <div className='flex flex-col'>
                        <Link
                            href={`/@${channel.Username}`}
                            className="flex items-center w-fit space-x-1.5 font-medium"
                        >
                            {isBrowser ?
                                <Tooltip placement='top' contentClass='text-[12px]' title={getProfileName(channel)}>
                                    <span>{getProfileName(channel)}</span>
                                </Tooltip> :
                                <span>{channel.Username}</span>
                            }    
                            {channel.IsVerified ?
                                <Tooltip placement='top' contentClass='text-[12px]' title='Verified'>
                                    <span><IsVerified size="lg" /></span>
                                </Tooltip> : null
                            }
                        </Link>
                        {!loading ?
                            <span className="text-[14px] leading-4 text-secondary">
                                {formatNumber(followers)} subscribers
                            </span>
                            : <div className="h-2 bg-gray-300 rounded dark:bg-gray-700" />
                        }
                    </div>
                </div>
                <div ref={followRef}>
                    {!follow ?
                        <Button ref={followRef} className={`${subscribing ? `animate-pulse` : ``}`} variant="dark" onClick={() => onFollow(follow)}>
                            <span>Subscribe</span>
                        </Button>
                        :
                        
                        <Button className={`${subscribing ? `animate-pulse` : ``}`} variant="light" onClick={() => onFollow(follow)}>
                            <span>Subscribed</span>
                        </Button>
                    }
                </div>
            </div>
        </>
    )
}

export default ChannelInfo