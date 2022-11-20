import { timeNow } from '@app/utils/functions'
import { LinkifyOptions } from '@app/utils/functions/getLinkifyOptions'
import { getProfilePicture } from '@app/utils/functions/getProfilePicture'
import clsx from 'clsx'
import Linkify from 'linkify-react'
import Link from 'next/link'
import "linkify-plugin-hashtag"
import "linkify-plugin-mention"
import { useEffect, useState } from 'react'
import { AiOutlinePlayCircle } from 'react-icons/ai'
import { BiChevronDown, BiChevronUp } from 'react-icons/bi'
import IsVerified from '../Common/IsVerified'
import Reactions from './Reactions'

// const CommentOptions = dynamic(() => import('./CommentOptions'))
// const Reactions = dynamic(() => import('./Reactions'))


const VideoComment = ({ comment }) => {
  return (
    <div className="my-2 py-3 px-4 border dark:border-gray-700 rounded-xl">
      <Link
        href={`/watch/${comment.PostHashHex}`}
        className="flex items-center space-x-2.5"
      >
        <AiOutlinePlayCircle className="w-5 h-5" />
        <span>Watch Video</span>
      </Link>
    </div>
  )
}

const Comment = ({ comment }) => {
    const [clamped, setClamped] = useState(false)
    const [showMore, setShowMore] = useState(false)
    const [showReport, setShowReport] = useState(false)
    const userProfile = comment.ProfileEntryResponse;

    useEffect(() => {
        if (comment.Body.trim().length > 200) {
            setClamped(true)
            setShowMore(true)
        }
    }, [comment])

    // const getIsVideoComment = () => {
    //     return comment.metadata.mainContentFocus === PublicationMainFocus.Video
    // }

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
                  alt={`${userProfile.Username} Picture`}
                  draggable={false}
                />
                </Link>
                <div className="flex flex-col items-start mr-2">
                    <span className="flex items-center mb-1 space-x-1">
                        <Link
                        href={`/@${userProfile.Username}`}
                        className="flex items-center space-x-1.5 text-sm font-medium"
                        >
                            
                            <span>{userProfile.Username}</span>
                            {userProfile.IsVerified ? <IsVerified size="xs" /> : null}
                        </Link>
                        <span className="middot" />
                        <span className="inline-flex items-center opacity-70 space-x-1 text-xs">
                            {timeNow(comment.TimestampNanos)}
                        </span>
                    </span>
                    <div
                        className={clsx(
                        'opacity-80 text-base overflow-hidden break-words',
                        clamped ? 'line-clamp-2' : ''
                        )}
                    >
                        {comment.IsHidden ? (
                        <span className="text-xs italic opacity-80">
                            Comment deleted by user!
                        </span>
                        ) : 
                        <Linkify options={LinkifyOptions}>
                            {clamped ? comment.Body.trim().substring(0, 200) : comment.Body}
                        </Linkify>
                        }
                    </div>
                    {showMore && (
                        <div className="inline-flex mt-3">
                        <button
                            type="button"
                            onClick={() => setClamped(!clamped)}
                            className="flex items-center mt-2 text-xs outline-none hover:opacity-100 opacity-60"
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
                    <div className="mt-1">
                        <Reactions iconSize="17" showButton={false} video={comment} />
                    </div>
                </div>
            </div>
            <div>
                {/* <ReportModal
                    video={comment}
                    show={showReport}
                    setShowReport={setShowReport}
                />
                <CommentOptions comment={comment} setShowReport={setShowReport} /> */}
            </div>
        </div>
    )
}

export default Comment