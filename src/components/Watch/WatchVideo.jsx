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
import { FetchSinglePost, getSinglePost } from '@app/data/videos'
import { useQuery } from '@tanstack/react-query'
import { getIsHlsSupported } from '@app/utils/functions/getIsHlsSupported'
import Hlsjs from 'hls.js';

const WatchVideo = () => {
    const router = useRouter()
    const { id, t } = router.query
    const addToRecentlyWatched = usePersistStore((state) => state.addToRecentlyWatched)
    const selectedChannel = useAppStore((state) => state.selectedChannel)
    const setVideoWatchTime = useAppStore((state) => state.setVideoWatchTime)
    const user = usePersistStore((state) => state.user)
    const isLoggedIn = usePersistStore((state) => state.isLoggedIn)
    const reader = isLoggedIn ? user.profile.PublicKeyBase58Check : '';
    const [videoData, setVideoData] = useState(null)
    const [thumbnailUrl, setThumbnailUrl] = useState('')
    const [loading, setLoading] = useState(true)
    const [posthash, setPosthash] = useState('')
    
    ///const { data: video, isLoading, isFetching, isFetched, error, isError } = FetchSinglePost({ id });

    const { isSuccess, isLoading, isError, error, refetch, isFetching, status, fetchStatus, data: video } = useQuery([['single-post', posthash], { id: posthash, reader: reader }], getSinglePost, { enabled: !!posthash, })

    useEffect(() => {
        const { id, t } = router.query
        if (id) {
            setPosthash(id)
        }
        if (t) {
            setVideoWatchTime(Number(t))
        }
        if (!video) {
            setVideoData(null)
        }
    }, [router, video])

    //console.log({isSuccess: isSuccess, isLoading: isLoading, isFetching: isFetching, isError: isError, 'video': id})

    useEffect(() => {
        const deso = new Deso()
        const getVideo = async () => {
            const videoID = getPlaybackIdFromUrl(video);
            const request = {
                "videoId": videoID
            };
            const videoData = await deso.media.getVideoStatus(request)
            //setVideoData({ id: videoID, data: videoData.data })
            setVideoData({ id: videoID, data: videoData.data, hls: `https://customer-wgoygazehbn8yt5i.cloudflarestream.com/${videoID}/manifest/video.m3u8` })
            try {
                //const duration = getThumbDuration(videoData.data.Duration);
                const url = getVideoThumbnail(video);
                await axios.get(url, { responseType: 'blob' }).then((res) => {
                    setThumbnailUrl(URL.createObjectURL(res.data))
                    setLoading(false)
                })
                // if (Hlsjs.isSupported() && videoData.id) {
                //     setVideoData({ id: videoID, data: videoData.data, hls: `https://customer-wgoygazehbn8yt5i.cloudflarestream.com/${videoData.id}/manifest/video.m3u8` })
                // }
            } catch (error) {
                setLoading(false)
                console.log(video.PostHashHex, 'thumbnail', error)
            }
        }
        if (video && isSuccess) {
            addToRecentlyWatched(video)
            getVideo()
        }
    }, [video, isSuccess, addToRecentlyWatched])

    // useEffect(() => {
    //     setVideoWatchTime(Number(t))
    // }, [t, setVideoWatchTime])

    if (isError) {
        return <Custom500 />
    }
    if (loading || isFetching || !video || !videoData) return <WatchVideoShimmer />
    return (
        <>
            <MetaTags title={video ? getVideoTitle(video) : 'Watch'} />
            {!isFetching && !loading && !isError && videoData && video ? (
                <div className="w-full flex md:flex-row flex-col">
                    <div className="flex md:pr-6 md:flex-1 flex-col space-y-4">
                        <Video videoData={videoData} video={video} poster={thumbnailUrl} />
                        <AboutChannel video={video} />
                        <VideoComments video={video} />
                    </div>
                    <div className="w-full md:min-w-[300px] md:max-w-[400px]">
                        <SuggestedVideos currentVideoId={video?.PostHashHex} />
                    </div>
                </div>
            ) : null}
        </>
    )
}

export default WatchVideo