
import { getThumbDuration, getTimeFromSeconds } from '@utils/functions'
import { generateVideoThumbnails } from '@utils/functions/generateVideoThumbnails'
import { getVideoThumbnail } from '@utils/functions/getVideoThumbnail'
import { getVideoTitle } from '@utils/functions/getVideoTitle'
import { getPlaybackIdFromUrl } from '@utils/functions/getVideoUrl'
import { Button } from '@components/UI/Button'
import Deso from 'deso-protocol'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import axios from 'axios'
import IsVerified from '../Common/IsVerified'
import { useRouter } from 'next/router'
import { isMobile } from 'react-device-detect'


const NextVideo = ({ video, playNext, cancelPlayNext }) => {
    const [timeLeft, setTimeLeft] = useState(isMobile ? 0 : 10) 
    const userProfile = video.ProfileEntryResponse;
    const [videoData, setVideoData] = useState('')
    const [thumbnailUrl, setThumbnailUrl] = useState('')
    const [duration, setDuration] = useState(0)

    useEffect((e) => {
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
    <div className="absolute top-0 z-[7] w-full text-white h-3/4 hidden md:block">
        <div className="flex items-center justify-center h-full">
            <div className="mx-auto w-72 mt-3 md:mt-5">
                <p className="text-sm md:text-base">Up next in {timeLeft} seconds</p>
                <div className="mt-1 md:mt-3">
                    <div className="flex flex-col justify-between space-y-2">
                        <div className="flex-none overflow-hidden rounded-lg">
                            <Link
                                href={`/watch/${video.PostHashHex}`}
                                className="rounded-lg cursor-pointer"
                            >
                                <div className="relative border bg-gray-600 border-gray-600">
                                    <img
                                        src={thumbnailUrl}
                                        alt={`${userProfile.Username} Video`}
                                        draggable={false}
                                        className="object-cover object-center w-24 h-12 lg:h-40 lg:w-72"
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
                                <div className="flex md:w-72 items-start overflow-hidden justify-between space-x-1.5">
                                <Link
                                    href={`/watch/${video.PostHashHex}`}
                                    className="overflow-hidden md:text-lg"
                                >
                                    <span className="flex md:font-medium line-clamp-2">
                                        {getVideoTitle(video, userProfile)}
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
                    <div className="flex justify-between mt-2 space-x-6 md:mt-4">
                        <Button
                            variant="light"
                            size="md"
                            className="w-full"
                            onClick={(e) => cancelPlayNext(e)}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={() => {
                                playNext()
                            }}
                            size="md"
                            className="w-full"
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