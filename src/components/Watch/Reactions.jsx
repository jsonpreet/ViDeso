import useAppStore from '@app/store/app'
import usePersistStore from '@app/store/persist'
import { formatNumber } from '@app/utils/functions'
import { Button } from '@components/UIElements/Button'
import clsx from 'clsx'
import Deso from 'deso-protocol'
import { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { IoDiamondOutline } from 'react-icons/io5'
import party from "party-js"
import { FaRegThumbsUp, FaThumbsUp } from 'react-icons/fa'
import { DESO_CONFIG } from '@app/utils/constants'
import Tooltip from '../UIElements/Tooltip'
import logger from '@app/utils/logger'
import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect';
import { MdOutlineAttachMoney } from 'react-icons/md'

const Reactions = ({ showTip, setShowTip, video, iconSize = '21', isVertical = false, showButton = true}) => {
    const {isLoggedIn, user } = usePersistStore()
    const selectedChannel = useAppStore((state) => state.selectedChannel)
    const [liking, setLiking] = useState(false)
    const [postReader, setPostReader] = useState()
    const [liked, setLiked] = useState(video.PostEntryReaderState.LikedByReader)
    const [diamondBestowed, setDiamondBestowed] = useState(video.PostEntryReaderState.DiamondLevelBestowed)
    const [likes, setLikes] = useState(video.LikeCount);
    const likeRef = useRef(null);
    const [deso, setDeso] = useState();

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const deso = new Deso(DESO_CONFIG);
            setDeso(deso);
        }
    }, []);

    const likeVideo = async (isLiked) => {
        if (!isLoggedIn) {
            return toast.error('You must be logged in!')
        } 
        setLiking(true)
        const isUnlike = isLiked ? true : false;
        try {
            const request = {
                ReaderPublicKeyBase58Check: user.profile.PublicKeyBase58Check,
                LikedPostHashHex: video.PostHashHex,
                MinFeeRateNanosPerKB: 1000,
                IsUnlike: isUnlike,
            };
            const response = await deso.social.createLikeStateless(request);
            if (response && response.TxnHashHex !== null) {
                setLikes(!isUnlike ? likes + 1 : likes - 1);
                setLiked(!isUnlike);
                //toast.success('Post liked');
                if (!isLiked) {
                    party.confetti(likeRef.current, {
                        count: party.variation.range(50, 100),
                        size: party.variation.range(0.2, 1.0),
                    });
                }
                setLiking(false)
            }
        } catch (error) {
            logger.error('error', error);
            setLiking(false)
            toast.error(`Error: ${error.message}`);
        }
    }
    return (
        <div
            className={'  flex items-center justify-end space-x-2.5 md:space-x-4'}
        >
            {isBrowser ? <Tooltip visible={false} title={`${liked ? `Unlike` : `I like this`}`}>
                <Button ref={likeRef} variant={showButton ? "light" : "none"} size={showButton ? 'md' : 'small'} className={`group ${showButton ? `h-10` : `!p-0`}`} onClick={() => { likeVideo(liked) }}>
                    <span className={clsx('flex items-center dark:group-hover:text-brand2-400 group-hover:text-brand2-500 space-x-2 outline-none', {
                        'text-brand2-500 dark:text-brand2-400 font-semibold': liked
                    },
                        { 'space-x-3': showButton },
                        { 'mt-1.5': !showButton }
                    )}>
                        {liked ? <FaThumbsUp size={iconSize}
                            className={clsx({
                                'text-brand2-500 dark:text-brand2-400': liked,
                                'animate-bounce': liking
                            })}
                        /> :
                            <FaRegThumbsUp size={iconSize}
                                className={clsx({
                                    'text-brand2-500 dark:text-brand2-400': liked,
                                    'animate-bounce': liking
                                })}
                            />
                        }

                        <span
                            className={clsx({
                                'text-brand2-500 dark:text-brand2-400': liked
                            })}
                        >
                            {likes > 0 ? formatNumber(likes) : 'Like'}
                        </span>
                    </span>
                </Button>
            </Tooltip>
                :
                <Button ref={likeRef} variant={showButton ? "light" : "none"} size={showButton ? 'md' : 'small'} className={`group ${showButton ? `h-10` : `!p-0`}`} onClick={() => { likeVideo(liked) }}>
                    <span className={clsx('flex items-center dark:group-hover:text-brand2-400 group-hover:text-brand2-500 space-x-2 outline-none', {
                        'text-brand2-500 dark:text-brand2-400 font-semibold': liked
                    },
                        { ' space-x-1 md:space-x-3': showButton },
                        { 'mt-1.5': !showButton }
                    )}>
                        {liked ? <FaThumbsUp size={18}
                            className={clsx({
                                'text-brand2-500 dark:text-brand2-400': liked,
                                'animate-bounce': liking
                            })}
                        /> :
                            <FaRegThumbsUp size={18}
                                className={clsx({
                                    'text-brand2-500 dark:text-brand2-400': liked,
                                    'animate-bounce': liking
                                })}
                            />
                        }

                        <span
                            className={clsx({
                                'text-brand2-500 dark:text-brand2-400': liked
                            })}
                        >
                            {likes > 0
                                ? formatNumber(likes)
                                : '0'}
                        </span>
                    </span>
                </Button>
            }
            
            
            {isBrowser ? <Tooltip title="Diamonds">
                <Button variant={showButton ? "light" : "none"} size={showButton ? 'md' : 'small'} className={`group ${showButton ? `h-10` : `!p-0`}`} onClick={() => { setShowTip(!showTip) }}>
                    <span className={clsx('flex items-center group-hover:text-brand2-500 dark:group-hover:text-brand2-400 space-x-2 outline-none', {
                        'text-brand2-500 dark:text-brand2-400 font-semibold': diamondBestowed > 0
                    },
                        { 'space-x-1 md:space-x-3': showButton },
                        { 'mt-1.5': !showButton }
                    )}>
                        <IoDiamondOutline size={iconSize} />
                        <span>{video.DiamondCount}</span>
                    </span>
                </Button>
            </Tooltip> :
                
                <Button variant={showButton ? "light" : "none"} size={showButton ? 'md' : 'small'} className={`group ${showButton ? `h-10` : `!p-0`}`} onClick={() => { setShowTip(!showTip) }}>
                    <span className={clsx('flex items-center group-hover:text-brand2-500 dark:group-hover:text-brand2-400 space-x-2 outline-none', {
                        'text-brand2-500 dark:text-brand2-400 font-semibold': diamondBestowed > 0
                    },
                        { 'space-x-1': showButton },
                        { 'mt-1.5': !showButton }
                    )}>
                        <IoDiamondOutline size={18} />
                        <span>{video.DiamondCount}</span>
                    </span>
                </Button>
            }
        </div>
    )
}

export default Reactions