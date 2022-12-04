import { getVideoThumbnail } from '@utils/functions/getVideoThumbnail'
import { getPlaybackIdFromUrl } from '@utils/functions/getVideoUrl'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import { useInView } from 'react-cool-inview'

import BottomOverlay from './BottomOverlay'
import StoriActions from './StoriActions'
import TopOverlay from './TopOverlay'
import VideoPlayer from './Player'


const StoriVideo = ({ video }) => {
    const router = useRouter()
    const videoRef = useRef(null)
    const [playing, setIsPlaying] = useState(true)
    const [isLoading, setLoading] = useState(true)
    const [videoUrl, setVideoUrl] = useState()
    const [videoData, setVideoData] = useState('')
    const [extraData, setExtraData] = useState('')
    const [thumbnailUrl, setThumbnailUrl] = useState('/default-black.jpg')
    const currentVideo = document.getElementsByTagName('video')[0]

    useEffect(() => {
        const getVideoData = async () => {
            const videoID = getPlaybackIdFromUrl(video);
            setVideoData({ id: videoID, hls: `https://customer-wgoygazehbn8yt5i.cloudflarestream.com/${videoID}/manifest/video.m3u8` })
            try {
                const thumb = getVideoThumbnail(video);
                if (thumb.processed) {
                    setThumbnailUrl(thumb.url)
                } else {
                    await axios.get(thumb.url, { responseType: 'blob' }).then((res) => {
                        setThumbnailUrl(URL.createObjectURL(res.data))
                    })
                }
                setLoading(false);
            } catch (error) {
                console.error(video.PostHashHex, error)
                setLoading(false);
            }
        }
        if (video.VideoURLs[0] !== null) {
            getVideoData()
        }
        setExtraData(video.ExtraData)
        //getViews()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [video])

    // useEffect(() => {
    //     if (Hlsjs.isSupported()) {
    //         const video = document.getElementById('video');
    //         const hls = new Hlsjs();
    //         hls.attachMedia(video);
    //         hls.on(Hlsjs.Events.MEDIA_ATTACHED, () => {
    //             hls.loadSource(videoData.hls);
    //         });
    //         video?.play();
    //     }
    // },[videoData])

    const onClickVideo = () => {
        try {
            if (videoRef.current?.paused) {
                videoRef.current?.play()
                setIsPlaying(true)
            } else {
                videoRef.current?.pause()
                setIsPlaying(false)
            }
        } catch {}
    }

    const { observe } = useInView({
        threshold: 1,
        onLeave: () => {
            videoRef.current?.pause()
            setIsPlaying(false)
        },
        onEnter: () => {
            router.push(`/stori/?id=${video?.PostHashHex}`, undefined, {
                shallow: true
            })
            videoRef.current?.play()
            .then(() => setIsPlaying(true))
            .catch(() => {
                setIsPlaying(false)
            })
        }
    })

    return (
        <div ref={observe} className="flex justify-center md:mt-6 snap-center">
            <div className="relative">
                {!isLoading ?
                    <>
                        <VideoPlayer setIsPlaying={setIsPlaying} onClickVideo={onClickVideo} videoRef={videoRef} poster={thumbnailUrl} src={videoData.hls}/>
                        {/* <video
                            id="video"
                            ref={videoRef}
                            preload="none"
                            width="345"
                            poster={thumbnailUrl}
                            className="rounded-xl min-w-[250px] w-screen md:w-[450px] ultrawide:w-[407px] h-screen bg-black md:h-[calc(100vh-145px)]"
                            loop
                            src={videoData.hls}
                        /> */}
                        <TopOverlay playing={playing} onClickPlayPause={onClickVideo} />
                        <BottomOverlay video={video} />
                        <div className="absolute md:hidden right-2 top-1/2">
                            <StoriActions video={video} />
                        </div>
                    </>
                    : null
                }
            </div>
            <div className="hidden md:flex">
                <StoriActions video={video} />
            </div>
        </div>
    )
}

export default StoriVideo