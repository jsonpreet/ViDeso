import { useEffect, useRef } from 'react'
import Hls from 'hls.js'

export default function VideoPlayer({setIsPlaying, videoRef, src, poster, onClickVideo }) {
    useEffect(() => {
        const video = videoRef.current
        if (!video) return
        video.controls = false
        if (video.canPlayType('application/vnd.apple.mpegurl')) {
            // This will run in safari, where HLS is supported natively
            video.src = src
        } else if (Hls.isSupported()) {
            // This will run in all other modern browsers
            const hls = new Hls()
            hls.attachMedia(video)
            hls.loadSource(src)
        } else {
            console.error(
                'This is an old browser that does not support MSE https://developer.mozilla.org/en-US/docs/Web/API/Media_Source_Extensions_API'
            )
        }
        video.play().then(() => setIsPlaying(true)).catch(() => {
            setIsPlaying(false)
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [src, videoRef])

    return (
        <>
            <video
                onContextMenu={(event) => event.preventDefault()}
                onClick={() => onClickVideo()}
                ref={videoRef}
                preload="none"
                width="345"
                poster={poster}
                className="rounded-xl min-w-[300px] w-screen md:w-[450px] ultrawide:w-[450px] h-screen bg-black md:h-[calc(100vh-145px)]"
                loop
            />
        </>
    )
}