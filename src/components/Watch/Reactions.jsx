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

const Reactions = ({ video, iconSize = '21', isVertical = false, showButton = true}) => {
    const {isLoggedIn, user } = usePersistStore((state) => state)
    const selectedChannel = useAppStore((state) => state.selectedChannel)
    const [showTipModal, setShowTipModal] = useState(false)
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
            <Tooltip title={`${liked ? `Unlike` : `I like this`}`}>
                <Button ref={likeRef} variant={showButton ? "light" : "none"} size={showButton ? 'md' : 'small'} className={`group ${showButton ? `md:h-10` : `!p-0`}`} onClick={() => { likeVideo(liked) }}>
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
                            {likes > 0
                            ? formatNumber(likes)
                            : 'Like'}
                        </span>
                    </span>
                </Button>
            </Tooltip>
            {/* <Button variant="secondary" className="!p-0">
                <span
                    className={clsx('flex items-center space-x-1 outline-none', {
                    'flex-col space-y-1': isVertical
                    })}
                >
                    <AiOutlineDislike
                    className={clsx({
                        'text-xs': iconSize === 'xs',
                        'text-xl': iconSize === 'xl',
                        'text-2xl': iconSize === '2xl',
                    })}
                    />
                    {showLabel && (
                    <span
                        className={clsx({'text-xs': textSize === 'xs'})}
                    >
                        {'Dislike'}
                    </span>
                    )}
                </span>
            </Button> */}
            
            <Tooltip title="Diamonds">
                <Button variant={showButton ? "light" : "none"} size={showButton ? 'md' : 'small'} className={`group ${showButton ? `md:h-10` : `!p-0`}`} onClick={() => { setShowTipModal(!showTipModal) }}>
                    <span className={clsx('flex items-center group-hover:text-brand2-500 dark:group-hover:text-brand2-400 space-x-2 outline-none', {
                            'text-brand2-500 dark:text-brand2-400 font-semibold': diamondBestowed > 0
                        },
                        { 'space-x-3': showButton },
                        { 'mt-1.5': !showButton }
                    )}>
                        <IoDiamondOutline size={iconSize} />
                        <span>{video.DiamondCount}</span>
                    </span>
                </Button>
            </Tooltip>    
        </div>
    )
}

export default Reactions