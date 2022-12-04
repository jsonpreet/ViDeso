import useAppStore from '@store/app'
import usePersistStore from '@store/persist'
import { formatNumber } from '@utils/functions'
import { Button } from '@components/UI/Button'
import clsx from 'clsx'
import Deso from 'deso-protocol'
import { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import party from "party-js"
import { FaRegThumbsUp, FaThumbsUp } from 'react-icons/fa'
import { DESO_CONFIG } from '@utils/constants'
import Tooltip from '../UI/Tooltip'
import logger from '@utils/logger'
import { isBrowser } from 'react-device-detect';
import TipModal from '../Common/TipModal'
import { BiDollar } from 'react-icons/bi'

const Reactions = ({ video, iconSize = '21', showTipButton = true, isVertical = false, showButton = true}) => {
    const {isLoggedIn, user } = usePersistStore()
    const selectedChannel = useAppStore((state) => state.selectedChannel)
    const [liking, setLiking] = useState(false)
    const [postReader, setPostReader] = useState()
    const [liked, setLiked] = useState(video.PostEntryReaderState.LikedByReader)
    const [diamondBestowed, setDiamondBestowed] = useState(video.PostEntryReaderState.DiamondLevelBestowed)
    const [likes, setLikes] = useState(video.LikeCount);
    const likeRef = useRef(null);
    const [deso, setDeso] = useState();
    const diamondRef = useRef(null)
    const [showTip, setShowTip] = useState(false)

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

    const showTipModal = () => {
        // if (!isLoggedIn) {
        //     return toast.error('You must be logged in!')
        // } 
        setShowTip(!showTip)
    }


    return (
        <>
            <TipModal diamondBestowed={diamondBestowed} setDiamondBestowed={setDiamondBestowed} rootRef={diamondRef} show={showTip} setShowTip={setShowTip} video={video} />
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
                
                {showTipButton ?
                isBrowser ? <Tooltip title="Tips">
                    <Button ref={diamondRef} variant={showButton ? "light" : "none"} size={showButton ? 'md' : 'small'} className={`group ${showButton ? `h-10` : `!p-0`}`} onClick={showTipModal}>
                        <span className={clsx('flex items-center group-hover:text-brand2-500 dark:group-hover:text-brand2-400 space-x-2 outline-none', {
                            'text-brand2-500 dark:text-brand2-400 font-semibold': diamondBestowed > 0
                        },
                            { 'space-x-1 md:space-x-3': showButton },
                            { 'mt-1.5': !showButton }
                        )}>
                            <BiDollar size={iconSize} />
                            <span>Tip</span>
                        </span>
                    </Button>
                </Tooltip> :
                    
                    <Button variant={showButton ? "light" : "none"} size={showButton ? 'md' : 'small'} className={`group ${showButton ? `h-10` : `!p-0`}`} onClick={showTipModal}>
                        <span className={clsx('flex items-center group-hover:text-brand2-500 dark:group-hover:text-brand2-400 space-x-2 outline-none', {
                            'text-brand2-500 dark:text-brand2-400 font-semibold': diamondBestowed > 0
                        },
                            { 'space-x-1': showButton },
                            { 'mt-1.5': !showButton }
                        )}>
                            <BiDollar size={18} />
                            <span>Tip</span>
                        </span>
                    </Button>
                :null }
            </div>
        </>
    )
}

export default Reactions