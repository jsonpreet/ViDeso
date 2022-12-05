import { getThumbDuration, timeNow } from '@utils/functions'
import { getVideoThumbnail } from '@utils/functions/getVideoThumbnail'
import { getVideoTitle } from '@utils/functions/getVideoTitle'
import { getPlaybackIdFromUrl } from '@utils/functions/getVideoUrl'
import IsVerified from '@components/Common/IsVerified'
import clsx from 'clsx'
import Deso from 'deso-protocol'
import Link from 'next/link'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import ThumbnailOverlays from '../../Common/ThumbnailOverlays'
import VideoOptions from '../../Common/Cards/Options'
import { DESO_CONFIG } from '@utils/constants'
import Tooltip from '../../UI/Tooltip'
import { getProfilePicture } from '@utils/functions/getProfilePicture'
import { isBrowser } from 'react-device-detect'
import { getProfileName } from '@utils/functions/getProfileName'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import logger from '@utils/logger'
import ShareModal from '@components/Common/ShareModal'

const SuggestedVideoCard = ({ video, channel }) => {
    const [showShare, setShowShare] = useState(false)
    const [showReport, setShowReport] = useState(false)
    const [videoData, setVideoData] = useState('')
    const [thumbnailUrl, setThumbnailUrl] = useState('')
    const [userProfile, setUserProfile] = useState('')
    const [extraData, setExtraData] = useState('')
    const [error, setError] = useState(false)
    const supabase = useSupabaseClient()
    const [views, setViews] = useState(0)

    useEffect(() => {
        const deso = new Deso(DESO_CONFIG)
        const getVideoData = async () => {
            try {
                const videoID = getPlaybackIdFromUrl(video);
                const request = {
                    "videoId": videoID
                };
                const videoData = await deso.media.getVideoStatus(request)
                setVideoData(videoData.data)
                try {
                    const duration = getThumbDuration(videoData.data.Duration);
                    const thumb = getVideoThumbnail(video, duration);
                    if (thumb.processed) {
                        setThumbnailUrl(thumb.url)
                    } else {
                        await axios.get(thumb.url, { responseType: 'blob' }).then((res) => {
                            setThumbnailUrl(URL.createObjectURL(res.data))
                        })
                    }
                } catch (error) {
                    setError(true)
                }
            } catch (error) {
                setError(true)
                logger.error(video.PostHashHex, 'Video Status:', error.message);
            }
        }
        if (video.VideoURLs[0] !== null) {
            getVideoData()
        }
        setUserProfile(video.ProfileEntryResponse || channel)
        setExtraData(video.ExtraData)
        getViews()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [video])   

    
  
    function getViews() {
        supabase.from('views').select('*', { count: 'exact' }).eq('posthash', video.PostHashHex).then((res) => {
            setViews(res.count)
            if (res.error) {
                logger.error(video.PostHashHex, 'views', res.error);
            }
        })
    }
  
    return (
        <>
            <ShareModal video={video} show={showShare} setShowShare={setShowShare} />
            <div className="flex w-full justify-between group" data-id={video.PostHashHex} data-duration={videoData.Duration}>
                <div className="flex md:flex-row flex-col w-full">
                    <div className="flex-none overflow-hidden rounded-none md:rounded-xl w-full md:w-44">
                        <Link
                            href={`/watch/${video.PostHashHex}`}
                            className="rounded-xl cursor-pointer"
                        >
                            <div className="relative">
                                <LazyLoadImage
                                    delayTime={1000}
                                    className={clsx(
                                    'bg-gray-100 rounded-none md:rounded-xl dark:bg-gray-900 object-cover object-center h-52 md:h-24 w-full'
                                    )}
                                    alt={`Video by @${userProfile.Username}`}
                                    wrapperClassName='w-full'
                                    effect="blur"
                                    placeholderSrc='https://placekitten.com/144/80'
                                    src={thumbnailUrl}
                                />
                                <ThumbnailOverlays video={video} data={videoData} />
                            </div>
                        </Link>
                    </div>
                    <div className="px-3 py-3 md:py-0 md:px-2.5 flex flex-row justify-between w-full">
                        <div className='flex space-x-2.5 md:space-x-0'>
                            <div className="md:hidden flex flex-col">
                                <Link href={`/@${userProfile.Username}`} className="mt-0.5">
                                    <img
                                    className="w-9 h-9 rounded-full"
                                    src={getProfilePicture(userProfile)}
                                    alt={`${userProfile.Username} Picture`}
                                    draggable={false}
                                    />
                                </Link>
                            </div>
                            <div className="flex md:space-y-1 space-y-0 flex-col md:w-auto items-start">
                                <div className="break-words w-full md:mb-0 overflow-hidden">
                                    <Link
                                        href={`/watch/${video.PostHashHex}`}
                                        className="text-sm font-medium line-clamp-1"
                                    >
                                        <span className="flex line-clamp-2">
                                            {getVideoTitle(video, channel)}
                                        </span>
                                    </Link>
                                </div>
                                <div className='flex md:space-y-1 space-y-0 flex-col items-start'>
                                    <div className="truncate">
                                        <Link
                                            href={`/@${userProfile.Username}`}
                                            className="text-sm truncate text-light"
                                        >
                                            <div className="flex items-center space-x-1.5">
                                                {isBrowser ? <Tooltip placement='top' contentClass='text-[12px]' title={getProfileName(userProfile)}><span>{getProfileName(userProfile)}</span></Tooltip> : <span>{userProfile.Username}</span>}
                                                {userProfile.IsVerified ? <Tooltip placement='top' contentClass='text-[12px]' title='Verified'><span><IsVerified size="xs" /></span></Tooltip> : null}
                                            </div>
                                        </Link>
                                    </div>
                                    <div>
                                        <div className="flex truncate items-center text-xs text-light">
                                            {/* <span className="whitespace-nowrap">
                                                {views > 1 ? `${views} views` : `${views} view`}
                                            </span>
                                            <span className="middot" /> */}
                                            <span className="whitespace-nowrap">
                                                {video.LikeCount} likes
                                            </span>
                                            <span className="middot" />
                                            <span>{timeNow(video.TimestampNanos)}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <VideoOptions
                            setShowReport={setShowReport}
                            video={video}
                            isSuggested={true}
                            setShowShare={setShowShare}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default SuggestedVideoCard