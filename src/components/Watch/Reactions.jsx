import useAppStore from '@app/store/app'
import usePersistStore from '@app/store/persist'
import { formatNumber } from '@app/utils/functions'
import { Button } from '@components/UIElements/Button'
import clsx from 'clsx'
import Deso from 'deso-protocol'
import { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { BiLike } from 'react-icons/bi'
import { IoDiamondOutline } from 'react-icons/io5'
import party from "party-js"

const Reactions = ({ video, iconSize = '21', isVertical = false, showButton = true}) => {
    const {isLoggedIn, user } = usePersistStore((state) => state)
    const selectedChannel = useAppStore((state) => state.selectedChannel)
    const [showTipModal, setShowTipModal] = useState(false)
    const [postReader, setPostReader] = useState()
    const [liked, setLiked] = useState(false)
    const [diamondBestowed, setDiamondBestowed] = useState(0)
    const [likes, setLikes] = useState(0);
    const likeRef = useRef(null);
    const [deso, setDeso] = useState();

    useEffect(() => {
        if (video && video.PostEntryReaderState) {
            setLikes(video.PostEntryReaderState.LikeCount)
            setLiked(video.PostEntryReaderState.LikedByReader)
            setDiamondBestowed(video.PostEntryReaderState.DiamondLevelBestowed)
        }
    }, [video])

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const deso = new Deso();
            setDeso(deso);
        }
    }, []);

    const likeVideo = async (isLiked) => {
    if (!isLoggedIn) return toast.error('You must be logged in!')
        setLiked(!liked)
        const isUnlike = isLiked ? true : false;
        try {
            const request = {
                ReaderPublicKeyBase58Check: user.profile.PublicKeyBase58Check,
                LikedPostHashHex: post.PostHashHex,
                MinFeeRateNanosPerKB: 1000,
                IsUnlike: isUnlike,
            };
            const response = await deso.social.createLikeStateless(request);
            if (response && response.TxnHashHex !== null) {
                setLikes(!isUnlike ? likes + 1 : likes - 1);
                setLiked(!isUnlike);
                toast.success('Post liked');
                party.confetti(likeRef.current, {
                    count: party.variation.range(100, 100),
                    size: party.variation.range(0.5, 1.5),
                }); 
            }
        } catch (error) {
            toast.error("Something went wrong!");
        }
    }
    return (
        <div
            className={'flex items-center justify-end space-x-2.5 md:space-x-4'}
        >
            <Button ref={likeRef} variant={showButton ? "light" : "none"} size={showButton ? 'md' : 'small'} className={`group ${showButton ? `md:h-10` : `!p-0`}`} onClick={() => { likeVideo(liked) }}>
                <span className={clsx('flex items-center dark:group-hover:text-brand2-400 group-hover:text-brand2-500 space-x-2 outline-none', {
                        'text-brand2-500 dark:text-brand2-400 font-semibold': liked
                    },
                    { 'space-x-3': showButton },
                    { 'mt-1.5': !showButton }
                )}>
                    <BiLike size={iconSize}
                    className={clsx({
                        'text-brand2-500 dark:text-brand2-400': liked
                    })}
                    />
                    <span
                        className={clsx({
                        'text-brand2-500 dark:text-brand2-400': liked
                        })}
                    >
                        {video.LikeCount > 0
                        ? formatNumber(video.LikeCount)
                        : 'Like'}
                    </span>
                </span>
            </Button>
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
        </div>
    )
}

export default Reactions