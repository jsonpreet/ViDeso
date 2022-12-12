import { getProfilePicture } from '@utils/functions/getProfilePicture';
import ChannelLinks from './Links';
import Tooltip from '../UI/Tooltip';
import IsVerified from '../Common/IsVerified';
import { useEffect, useRef, useState } from 'react';
import Deso from 'deso-protocol';
import { DESO_CONFIG } from '@utils/constants';
import usePersistStore from '@store/persist';
import toast from 'react-hot-toast';
import { formatNumber } from '@utils/functions';
import { getCoverPicture } from '@utils/functions/getCoverPicture';
import { Button } from '../UI/Button';
import Link from 'next/link';
import party from "party-js"
import { getProfileName } from '@utils/functions/getProfileName';

function ChannelInfo({ following, followers, channel }) {
    const cover = getCoverPicture(channel);
    const avatar = getProfilePicture(channel);
    const [subscribing, setSubscribing] = useState(false)
    const followRef = useRef(null);
    const [follow, setFollow] = useState(following)
    const user = usePersistStore((state) => state.user)
    const isLoggedIn = usePersistStore((state) => state.isLoggedIn)
    const reader = isLoggedIn ? user.profile.PublicKeyBase58Check : '';


    const onFollow = async() => {
        if (!isLoggedIn) {
            return toast.error('Please login to Subscribe this user');
        }
        try{
            const deso = new Deso(DESO_CONFIG);
            setSubscribing(true)
            const isFollow = follow ? true : false;
            const request = {
                IsUnfollow: isFollow,
                FollowedPublicKeyBase58Check: channel.PublicKeyBase58Check,
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
                console.log(`ChanneInfo: ${channel.Username} Something went wrong!`);
                toast.error("Something went wrong!");
                setSubscribing(false)
            }
        }  catch (error) {
            console.log(error);
            setSubscribing(false)
            toast.error('Something went wrong');
        }
    }
    return (
        <>
            <div className="flex flex-col w-full md:-mt-5 mb-4">
                <div style={{
                    backgroundImage: `url(${cover})`,
                    backgroundPosition: 'center',
                    
                }} className="bg-gray-300 bg-no-repeat w-full bg-cover object-cover relative md:h-72 h-28 dark:bg-gray-700">
                    <ChannelLinks channel={channel} />
                </div>
                <div className="relative z-10 max-w-7xl w-full mx-auto flex items-center md:space-x-5">
                    <div className="w-20 h-20 bg-white border-white border-4 dark:border-gray-900 rounded-full md:relative md:-mt-10 -mt-7 absolute -top-2 md:w-32 md:h-32 md:ml-0 ml-4 dark:bg-gray-700">
                        <img src={avatar} alt="cover" className="w-full h-full object-cover rounded-full" />
                    </div>
                    <div className="flex-none md:flex-1 w-full md:w-auto md:p-0 p-4 flex flex-col mt-5 md:mt-2 space-y-2">
                        <div className='flex space-x-10 items-center justify-between md:justify-end w-full -mb-0 -mt-0 md:-mb-1'>
                            <div className='flex flex-col mt-4 md:mt-0 mb-2 flex-none md:flex-1 items-start'>
                                <div className='flex items-center'>
                                    <Tooltip placement='top' contentClass='text-[12px]' title={channel.Username}>
                                        <h3 className='text-xl md:text-2xl mr-1 md:mr-2 tracking-wide leading-0 hover:opacity-100 opacity-80'>{getProfileName(channel)}</h3>
                                    </Tooltip>    
                                    {channel.IsVerified ?
                                        <Tooltip placement='top' contentClass='text-[12px]' title='Verified'>
                                            <span><IsVerified className='mt-0.5 w-4 h-4 md:w-5 md:h-5' color='text-gray-600' /></span>
                                        </Tooltip>
                                    : null}
                                </div>
                                <div className='flex md:-mt-0 -mt-1 items-center'>
                                    <p className='text-sm tracking-wide text-light leading-0'>@{channel.Username}</p>
                                </div>
                                <div className='flex mt-2 md:mt-1.5 items-center'>
                                    <span className="leading-none text-light">
                                        {formatNumber(followers)} subscribers
                                    </span>
                                </div>
                            </div>
                            {isLoggedIn ?
                                channel.PublicKeyBase58Check !== user.profile.PublicKeyBase58Check ?
                                <div className='justify-start md:justify-end' ref={followRef}>
                                    {!follow ?
                                        <Button className={`${subscribing ? `animate-pulse` : ``}`} variant="dark" onClick={() => onFollow(follow)}>
                                            <span>Subscribe</span>
                                        </Button>
                                        :
                                        
                                        <Button className={`${subscribing ? `animate-pulse` : ``}`} variant="light" onClick={() => onFollow(follow)}>
                                            <span>Subscribed</span>
                                        </Button>
                                    }
                                </div>
                                    :
                                    <div className='justify-start md:justify-end'>
                                        <Link
                                            className='relative inline-block disabled:opacity-50 rounded-full group px-5 md:py-2 py-1.5 text-sm font-medium primary-button md:rounded-full'
                                            href={`/@${channel.Username}/settings`}>
                                            <span>Customize Channel</span>
                                        </Link>
                                    </div>
                                : 
                                <Button className={`${subscribing ? `animate-pulse` : ``}`} variant="dark" onClick={() => onFollow(follow)}>
                                    <span>Subscribe</span>
                                </Button>
                            }
                        </div>
                    </div>
                </div>    
            </div>
        </>
    )
}

export default ChannelInfo