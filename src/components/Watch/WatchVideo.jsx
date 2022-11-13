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
    const { query: { id, t }} = useRouter()
    const addToRecentlyWatched = usePersistStore((state) => state.addToRecentlyWatched)
    const selectedChannel = useAppStore((state) => state.selectedChannel)
    const setVideoWatchTime = useAppStore((state) => state.setVideoWatchTime)
    const [video, setVideo] = useState()
    const [videoData, setVideoData] = useState()
    const [thumbnailUrl, setThumbnailUrl] = useState()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (id) {
            const deso = new Deso()
            const getVideo = async () => {
                try {
                    const request = {
                        PostHashHex: id
                    }
                    const response = await deso.posts.getSinglePost(request);  
                    console.log(response.PostFound)
                    setVideo(response.PostFound)
                } catch (error) {
                    console.log(error)
                }
            }
            getVideo();
        }
    }, [id])

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
                try {
                    const duration = getThumbDuration(videoData.data.Duration);
                    const url = getVideoThumbnail(video, duration);
                    await axios.get(url, { responseType: 'blob' }).then((res) => {
                        setThumbnailUrl(URL.createObjectURL(res.data))
                    })
                    
                    setLoading(false)
                } catch (error) {
                    console.log(video.PostHashHex, error)
                }
            } catch (error) {
                console.log(video.PostHashHex, error)
            }
        }
        if (video && video.VideoURLs[0] !== null) {
            getVideoData()
        }
    }, [video])
    


//   const fetchHls = async (currentVideo) => {
//     const playbackId = getPlaybackIdFromUrl(currentVideo)
//     if (!playbackId) {
//       setVideo(currentVideo)
//       return setLoading(false)
//     }
//     try {
//       const hls = await getHlsData(playbackId)
//       const videoObject = { ...currentVideo }
//       if (getIsHlsSupported() && hls) {
//         videoObject.hls = hls
//       }
//       setVideo(videoObject)
//     } catch (error) {
//       setVideo(currentVideo)
//     } finally {
//       setLoading(false)
//     }
//   }


    useEffect(() => {
        if (video) {
            addToRecentlyWatched(video)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [video])

    useEffect(() => {
        setVideoWatchTime(Number(t))
    }, [t, setVideoWatchTime])

//   if (error) return <Custom500 />
    // if (loading) return <WatchVideoShimmer />
//   if (!canWatch) return <Custom404 />

  return (
    <>
        <MetaTags title={!loading && video ? getVideoTitle(video) : 'Watch'} />
        <div className='px-20'>
        {!loading && video ? (
            <div className="grid grid-cols-1 gap-y-4 md:gap-4 xl:grid-cols-4">
                <div className="col-span-3 space-y-3 divide-y divide-gray-200 dark:divide-gray-900">
                    <Video video={video} />
                    {/* <AboutChannel video={video} /> */}
                    {/* <VideoComments video={video} /> */}
                </div>
                <div className="col-span-1">
                    {/* <SuggestedVideos currentVideoId={video?.id} /> */}
                </div>
            </div>
        ) : <WatchVideoShimmer />}
        </div>
    </>
  )
}

export default WatchVideo