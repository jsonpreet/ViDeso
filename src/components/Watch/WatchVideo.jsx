import MetaTags from '@components/Common/MetaTags'
import { useRouter } from 'next/router'
import Custom500 from 'pages/404'
import Custom404 from 'pages/500'
import React, { useEffect, useState } from 'react'
import { WatchVideoShimmer } from '@components/Shimmers/WatchVideoShimmer'
import usePersistStore from '@app/store/persist'
import useAppStore from '@app/store/app'
import { getPlaybackIdFromUrl } from '@app/utils/functions/getVideoUrl'
import axios from 'axios'
import AboutChannel from './AboutChannel'
import SuggestedVideos from './SuggestedVideos'
import Video from './Video'
import VideoComments from './VideoComments'
import Deso from 'deso-protocol'
import { getThumbDuration } from '@app/utils/functions'
import { getVideoThumbnail } from '@app/utils/functions/getVideoThumbnail'
import { getVideoTitle } from '@app/utils/functions/getVideoTitle'

const WatchVideo = () => {
    const router = useRouter()
    const { id, t } = router.query
    const addToRecentlyWatched = usePersistStore((state) => state.addToRecentlyWatched)
    const selectedChannel = useAppStore((state) => state.selectedChannel)
    const setVideoWatchTime = useAppStore((state) => state.setVideoWatchTime)
    const [video, setVideo] = useState()
    const [videoData, setVideoData] = useState()
    const [thumbnailUrl, setThumbnailUrl] = useState()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
        const deso = new Deso()
        const getVideo = async () => {
            try {
                const request = {
                    PostHashHex: id
                }
                const response = await deso.posts.getSinglePost(request);  
                if (response.PostFound && response.PostFound !== null) {
                    setVideo(response.PostFound)
                    addToRecentlyWatched(response.PostFound)
                    try {
                        const videoID = getPlaybackIdFromUrl(response.PostFound);
                        const request = {
                            "videoId": videoID
                        };
                        const videoData = await deso.media.getVideoStatus(request)
                        setVideoData({ id: videoID, data: videoData.data })
                        try {
                            const duration = getThumbDuration(videoData.data.Duration);
                            const url = getVideoThumbnail(response.PostFound, duration);
                            await axios.get(url, { responseType: 'blob' }).then((res) => {
                                setThumbnailUrl(URL.createObjectURL(res.data))
                            })
                            setLoading(false)
                        } catch (error) {
                            setError(true)
                            setLoading(false)
                            console.log(response.PostFound.PostHashHex, error)
                        }
                    } catch (error) {
                        setError(true)
                        setLoading(false)
                        console.log(response.PostFound.PostHashHex, error)
                    }
                } else {
                    setError(true)
                    setLoading(false)
                }
            } catch (error) {
                setError(true)
                console.log(error)
                setLoading(false)
            }
        }
        if (id) {
            getVideo()
        }
    }, [id])

    useEffect(() => {
        setVideoWatchTime(Number(t))
    }, [t, setVideoWatchTime])

    if (error) {
        return <Custom404 />
    }
    console.log(video)

    return (
        <>
            <MetaTags title={!loading && video ? getVideoTitle(video) : 'Watch'} />
            <div className=''>
            {!loading && !error && video ? (
                <div className="flex">
                    <div className="flex pr-6 flex-1 flex-col space-y-4">
                        <Video videoData={videoData} video={video} poster={thumbnailUrl} />
                        <AboutChannel video={video} />
                        <VideoComments video={video} />
                    </div>
                    <div className="w-full min-w-[300px] max-w-[400px]">
                        <SuggestedVideos currentVideoId={video?.PostHashHex} />
                    </div>
                </div>
            ) : <WatchVideoShimmer />}
            </div>
        </>
    )
}

export default WatchVideo