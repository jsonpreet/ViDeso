import useAppStore from '@app/store/app'
import usePersistStore from '@app/store/persist'
import { formatNumber } from '@app/utils/functions'
import { Button } from '@components/UIElements/Button'
import clsx from 'clsx'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { AiOutlineDislike, AiOutlineLike } from 'react-icons/ai'
import { BiLike } from 'react-icons/bi'
import { IoDiamondOutline } from 'react-icons/io5'

const Reactions = ({ video, iconSize = 'sm', textSize = 'sm', isVertical = false, showLabel = true}) => {
    const selectedChannelId = usePersistStore((state) => state.selectedChannelId)
    const selectedChannel = useAppStore((state) => state.selectedChannel)

    const [reaction, setReaction] = useState({
        isLiked: video.reaction === 'UPVOTE',
        likeCount: video.LikeCount
    })

    const likeVideo = () => {
    if (!selectedChannelId) return toast.error(SIGN_IN_REQUIRED_MESSAGE)
        setReaction((reaction) => ({
            likeCount: reaction.isLiked
            ? reaction.likeCount - 1
            : reaction.likeCount + 1,
            isLiked: !reaction.isLiked
        }))
        if (reaction.isLiked) {
            
        } else {
            
        }
    }

    return (
        <div
            className={clsx('flex items-center justify-end', {
            'flex-col space-y-2.5 md:space-y-4 p-1 px-3': isVertical,
            'space-x-2.5 md:space-x-4': !isVertical
            })}
        >
            <Button variant="light" className="h-10" onClick={() => likeVideo()}>
                <span
                    className={clsx('flex items-center space-x-2 outline-none', {
                    'text-indigo-500 font-semibold': reaction.isLiked,
                    'flex-col space-y-1': isVertical
                    })}
                >
                    <BiLike size={21}
                    className={clsx({
                        'text-indigo-500': reaction.isLiked
                    })}
                    />
                    {showLabel && (
                    <span
                        className={clsx({
                        'text-indigo-500': reaction.isLiked
                        })}
                    >
                        {reaction.likeCount > 0
                        ? formatNumber(reaction.likeCount)
                        : 'Like'}
                    </span>
                    )}
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
            
            <Button variant="light" className="h-10" onClick={() => { setShowTip(true) }}>
                <span className="flex items-center space-x-3">
                    <IoDiamondOutline size={20} />
                    <span>{video.DiamondCount}</span>
                </span>
            </Button>
        </div>
    )
}

export default Reactions