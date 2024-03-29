import clsx from 'clsx'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Deso from 'deso-protocol'
import ThumbnailOverlays from '../ThumbnailOverlays'
import IsVerified from '../IsVerified'
import { getThumbDuration, timeNow } from '@utils/functions'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import VideoOptions from './Options'
import axios from 'axios'
import { getPlaybackIdFromUrl } from '@utils/functions/getVideoUrl'
import { getVideoThumbnail } from '@utils/functions/getVideoThumbnail'
import { getProfilePicture } from '@utils/functions/getProfilePicture'
import { getVideoTitle } from '@utils/functions/getVideoTitle'
import ShareModal from '../ShareModal'
import { DESO_CONFIG } from '@utils/constants'
import Tooltip from '@components/UI/Tooltip'
import logger from '@utils/logger'
import { isBrowser } from 'react-device-detect'
import { getProfileName } from '@utils/functions/getProfileName'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import useAppStore from '@store/app'


const VideoCardSmall = ({ video, userProfile }) => {
    const [showShare, setShowShare] = useState(false)
    const [showReport, setShowReport] = useState(false)
    const uploadedVideo = useAppStore((state) => state.uploadedVideo)
    const [videoData, setVideoData] = useState('')
    const [thumbnailUrl, setThumbnailUrl] = useState('/default-black.jpg')
    const [extraData, setExtraData] = useState('')
    const supabase = useSupabaseClient()
    const [views, setViews] = useState(0)

    useEffect(() => {
        const getVideoData = async () => {
            const deso = new Deso()
            try {
                const videoID = getPlaybackIdFromUrl(video);
                const request = {
                    "videoId": videoID
                };
                const videoData = await deso.media.getVideoStatus(request)
                setVideoData(videoData.data)
            } catch (error) {
                logger.error(video.PostHashHex, error)
            }
        }
        if (video.VideoURLs[0] !== null) {
            getVideoData()
        }
        setExtraData(video.ExtraData)
        getViews()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [video])

    useEffect(() => {
        const getThumbnail = async () => {
            try {
                const duration = getThumbDuration(videoData.Duration);
                const thumb = getVideoThumbnail(video, duration);
                if (thumb.processed) {
                    setThumbnailUrl(thumb.url)
                } else {
                    await axios.get(thumb.url, { responseType: 'blob' }).then((res) => {
                        setThumbnailUrl(URL.createObjectURL(res.data))
                    })
                }
            } catch (error) {
                logger.error(video.PostHashHex, error)
            }
        }
        if (videoData) {
            getThumbnail()
        }
    }, [videoData, video])


    function getViews() {
        supabase.from('views').select('*', { count: 'exact' }).eq('posthash', video.PostHashHex).then((res) => {
            setViews(res.count)
            if (res.error) {
                logger.error(video.PostHashHex, 'views', res.error);
            }
        })
    }

    return (
    <div className="group px-2">
        {video.IsHidden ? (
        <div className="grid h-full place-items-center">
            <span className="text-xs">Video Hidden by User</span>
        </div>
        ) : (
            <>
            <ShareModal video={video} show={showShare} setShowShare={setShowShare} />
            <Link href={`/watch/${video.PostHashHex}`}>
                <div className="relative rounded-lg aspect-w-16 overflow-hidden aspect-h-9">
                    <LazyLoadImage
                        delayTime={1000}
                        className={clsx(
                        'object-center bg-gray-100 dark:bg-gray-900 w-full h-full rounded-lg lg:w-full lg:h-full object-cover'
                        )}
                        alt={`Video by @${userProfile.Username}`}
                        wrapperClassName='w-full'
                        effect="blur"
                        placeholderSrc='https://placekitten.com/360/220'
                        src={thumbnailUrl}
                    />
                    <ThumbnailOverlays video={video} data={videoData} />
                </div>
            </Link>
            <div className="p-2">
                <div className="flex items-start space-x-2.5">
                {isBrowser ? <Link href={`/@${userProfile.Username}`} className="flex-none mt-0.5">
                    <img
                        className="w-9 h-9 rounded-full"
                        src={getProfilePicture(userProfile)}
                        alt={getProfileName(userProfile)}
                        draggable={false}
                    />
                </Link> : null}
                    <div className="grid flex-1">
                        <div className='flex w-full items-start justify-between '>
                            <div className="flex flex-col w-full items-start pr-2 justify-between min-w-0">
                                <Link
                                    href={`/watch/${video.PostHashHex}`}
                                    className="text-[13px] font-medium line-clamp-2 break-words"
                                    >
                                    {getVideoTitle(video, userProfile)}
                                </Link>
                                <Link
                                    href={`/@${userProfile.Username}`}
                                    className="flex w-fit items-center space-x-1.5 text-[14px] text-light"
                                >
                                    {isBrowser ?
                                        <Tooltip placement='top' contentClass='text-[12px]' title={getProfileName(userProfile)}><span>{getProfileName(userProfile)}</span></Tooltip> :
                                        <span>{getProfileName(userProfile)}</span>
                                    }
                                    {userProfile.IsVerified ? <Tooltip placement='top' contentClass='text-[12px]' title='Verified'><span><IsVerified size="xs" /></span></Tooltip> : null}
                                </Link>
                                <div className="flex overflow-hidden text-[13px] text-light">
                                    <span className="whitespace-nowrap">
                                    {views > 1 ? `${views} views` : `${views} view`}
                                    </span>
                                    {/* <span className="middot" />
                                    <span className="whitespace-nowrap">
                                    {video.LikeCount > 1 ? `${video.LikeCount} likes` : `${video.LikeCount} like`}
                                    </span> */}
                                    <span className="middot" />
                                    <span className="whitespace-nowrap">
                                        {timeNow(video.TimestampNanos)}
                                    </span>
                                </div>
                            </div>
                            <VideoOptions
                                video={video}
                                setShowShare={setShowShare}
                                setShowReport={setShowReport}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
        )}
    </div>
    )
}

export default VideoCardSmall
