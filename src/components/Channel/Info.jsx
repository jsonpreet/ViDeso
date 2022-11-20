import { getProfilePicture } from '@app/utils/functions/getProfilePicture';
import ChannelLinks from './Links';
import Tooltip from '../UIElements/Tooltip';
import IsVerified from '../Common/IsVerified';
import { useEffect, useRef, useState } from 'react';
import Deso from 'deso-protocol';
import { DESO_CONFIG } from '@app/utils/constants';
import usePersistStore from '@app/store/persist';
import toast from 'react-hot-toast';
import { formatNumber } from '@app/utils/functions';
import { getCoverPicture } from '@app/utils/functions/getCoverPicture';
import { Button } from '../UIElements/Button';
import Link from 'next/link';
import logger from '@app/utils/logger';
import party from "party-js"

function ChannelInfo({ following, followers, channel }) {
    const channelExtra = channel.ExtraData || {};
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
                logger.error(`ChanneInfo: ${channel.Username} Something went wrong!`);
                toast.error("Something went wrong!");
                setSubscribing(false)
            }
        }  catch (error) {
            logger.error(error);
            setSubscribing(false)
            toast.error('Something went wrong');
        }
    }
    return (
        <>
            <div className="flex flex-col mb-5 md:-mt-5">
                <div style={{
                    backgroundImage: `url(${cover})`,
                    backgroundPosition: 'center',
                    
                }} className="bg-gray-300 bg-no-repeat bg-cover object-cover w-full relative md:h-72 h-44 dark:bg-gray-700">
                    <ChannelLinks channel={channel} />
                </div>
                <div className="relative z-10 max-w-7xl w-full mx-auto flex items-center space-x-5">
                    <div className="w-20 h-20 hidden md:block border-white border-4 dark:border-gray-900 rounded-full md:-mt-10 md:w-32 md:h-32 dark:bg-gray-700">
                        <img src={avatar} alt="cover" className="w-full h-full object-cover rounded-full" />
                    </div>
                    <div className="flex-1 flex flex-col space-y-2">
                        <div className='flex space-x-10 justify-end w-full -mb-1 -mt-2 items-center'>
                            <div className='flex flex-col space-y-1 flex-1 items-start'>
                                <div className='flex items-center'>
                                    <Tooltip placement='top' contentClass='text-[12px]' title={channel.Username}>
                                        <span className='text-2xl mr-2 tracking-wide leading-0 hover:opacity-100 opacity-80'>{channel.Username}</span>
                                    </Tooltip>    
                                    {channel.IsVerified ? <Tooltip placement='top' contentClass='text-[12px]' title='Verified'><span><IsVerified className='mt-0' color='text-gray-600' size="xl" /></span></Tooltip> : null}
                                </div>
                                <div className='flex items-center'>
                                    <span className="leading-none text-light">
                                        {formatNumber(followers)} subscribers
                                    </span>
                                </div>
                            </div>
                            {isLoggedIn ?
                                channel.PublicKeyBase58Check !== user.profile.PublicKeyBase58Check ?
                                <div className='justify-end' ref={followRef}>
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
                                    <div className='justify-end'>
                                        <Link
                                            className='relative inline-block disabled:opacity-50 rounded-full group px-5 md:py-2 py-1.5 text-sm font-medium primary-button md:rounded-full'
                                            href={`/${channel.Username}/settings`}>
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