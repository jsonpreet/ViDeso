import { timeNow } from '@utils/functions'
import { LinkifyOptions } from '@utils/functions/getLinkifyOptions'
import { getProfilePicture } from '@utils/functions/getProfilePicture'
import clsx from 'clsx'
import Linkify from 'linkify-react'
import Link from 'next/link'
import "linkify-plugin-hashtag"
import "linkify-plugin-mention"
import { useEffect, useState } from 'react'
import { AiOutlinePlayCircle } from 'react-icons/ai'
import { BiChevronDown, BiChevronUp } from 'react-icons/bi'
import IsVerified from '../../Common/IsVerified'
import Reactions from '../Reactions'
import { getProfileName } from '@utils/functions/getProfileName'
import VideoMeta from '../VideoMeta'

const Comment = ({ comment }) => {
    const [clamped, setClamped] = useState(false)
    const [showMore, setShowMore] = useState(false)
    const userProfile = comment.ProfileEntryResponse;

    useEffect(() => {
        if (comment.Body.trim().length > 300) {
            setClamped(true)
            setShowMore(true)
        }
    }, [comment])

    return (
        <div className="flex items-start justify-between">
            <div className="flex items-start justify-between">
                <Link
                href={`/@${userProfile.Username}`}
                className="flex-none mr-3 mt-0.5"
                >
                <img
                  className="w-9 h-9 rounded-full"
                  src={getProfilePicture(userProfile)}
                  alt={getProfileName(userProfile)}
                  draggable={false}
                />
                </Link>
                <div className="flex flex-col items-start mr-2">
                    <span className="flex items-center mb-1 space-x-1">
                        <Link
                        href={`/@${userProfile.Username}`}
                        className="flex items-center space-x-1.5 text-sm font-medium"
                        >
                            
                            <span>{getProfileName(userProfile)}</span>
                            {userProfile.IsVerified ? <IsVerified size="xs" /> : null}
                        </Link>
                        <span className="middot" />
                        <span className="inline-flex items-center opacity-70 space-x-1 text-xs">
                            {timeNow(comment.TimestampNanos)}
                        </span>
                    </span>
                    <div
                        className={clsx(
                        'text-sm overflow-hidden break-words',
                        clamped ? 'line-clamp-3' : ''
                        )}
                    >
                        {comment.IsHidden ? (
                        <span className="text-xs italic">
                            Comment deleted by user!
                        </span>
                        ) : 
                        <Linkify options={LinkifyOptions}>
                            {clamped ? comment.Body.trim().substring(0, 300) : comment.Body}
                        </Linkify>
                        }
                    </div>
                    {showMore && (
                        <div className="inline-flex mt-3">
                        <button
                            type="button"
                            onClick={() => setClamped(!clamped)}
                            className="flex items-center mt-2 text-xs outline-none"
                        >
                            {clamped ? (
                            <>
                                Show more <BiChevronDown className="text-sm" />
                            </>
                            ) : (
                            <>
                                Show less <BiChevronUp className="text-sm" />
                            </>
                            )}
                        </button>
                        </div>
                    )}
                    <div className="mt-1 flex items-center space-x-1">
                        <Reactions iconSize={14} showTipButton={false} showButton={false} video={comment} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Comment