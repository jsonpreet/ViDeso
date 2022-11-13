import { getThumbDuration } from '@app/utils/functions'
import { getVideoThumbnail } from '@app/utils/functions/getVideoThumbnail'
import { getVideoTitle } from '@app/utils/functions/getVideoTitle'
import { getPlaybackIdFromUrl } from '@app/utils/functions/getVideoUrl'
import { Button } from '@components/UIElements/Button'
import Deso from 'deso-protocol'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import IsVerified from '../Common/IsVerified'


const NextVideo = ({ video, playNext, cancelPlayNext }) => {
    const [timeLeft, setTimeLeft] = useState(5)
    const userProfile = video.ProfileEntryResponse;
    const [videoData, setVideoData] = useState('')
    const [thumbnailUrl, setThumbnailUrl] = useState('')
    const [duration, setDuration] = useState(0)

    useEffect(() => {
        if (timeLeft === 0) playNext()
        if (!timeLeft) return
        const intervalId = setInterval(() => {
            setTimeLeft(timeLeft - 1)
        }, 1000)

        return () => clearInterval(intervalId)
    }, [timeLeft, playNext])

    

    useEffect(() => {
        const deso = new Deso()
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
                    setDuration(duration)
                    const url = getVideoThumbnail(video, duration);
                    await axios.get(url, { responseType: 'blob' }).then((res) => {
                        setThumbnailUrl(URL.createObjectURL(res.data))
                    })
                } catch (error) {
                    console.log(video.PostHashHex, error)
                }
            } catch (error) {
                console.log(video.PostHashHex, error)
            }
        }
        if (video.VideoURLs[0] !== null) {
            getVideoData()
        }
    }, [video])

    if (!video) return null

    // const isSensitiveContent = getIsSensitiveContent(video.metadata, video.id)
    

    return (
    <div className="absolute top-0 z-[7] w-full text-white h-3/4">
        <div className="flex items-center justify-center h-full">
            <div className="px-2 mt-3 md:mt-5">
                <p className="text-sm md:text-base">Up next in {timeLeft} seconds</p>
                <div className="mt-1 md:mt-3">
                    <div className="flex justify-between space-x-2">
                        <div className="flex-none overflow-hidden rounded-lg">
                        <Link
                            href={`/watch/${video.PostHashHex}`}
                            className="rounded-lg cursor-pointer"
                        >
                            <div className="relative">
                            <img
                                src={thumbnailUrl}
                                alt="thumbnail"
                                draggable={false}
                                className="object-cover object-center w-24 h-12 lg:h-32 lg:w-56 "
                            />
                            {duration ? (
                                <div>
                                <span className="absolute bottom-1 right-1 text-[10px] px-1 text-white bg-black rounded">
                                    {getTimeFromSeconds(duration)}
                                </span>
                                </div>
                            ) : null}
                            </div>
                        </Link>
                        </div>
                        <div className="overflow-hidden">
                        <div className="flex flex-col items-start">
                            <div className="flex md:w-48 items-start overflow-hidden justify-between space-x-1.5">
                            <Link
                                href={`/watch/${video.PostHashHex}`}
                                className="overflow-hidden md:text-lg"
                            >
                                <span className="flex md:font-medium line-clamp-2">
                                    {getVideoTitle(video)}
                                </span>
                            </Link>
                            </div>
                            <div className="flex items-center space-x-1 text-[13px] truncate md:text-sm opacity-80">
                                <span>{userProfile.Username}</span>
                                {userProfile.IsVerified ? (
                                    <IsVerified size="xs" />
                                ) : null}
                            </div>
                        </div>
                        </div>
                    </div>
                    <div className="flex mt-2 space-x-4 md:mt-5">
                        <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => cancelPlayNext()}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={() => {
                                playNext()
                            }}
                            size="sm"
                        >
                            Play Now
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default NextVideo