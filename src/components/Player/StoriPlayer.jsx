
import useAppStore from '@store/app'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import NextVideo from './NextVideo'
import PlayerContextMenu from './PlayerContextMenu'

import {
    ClickToPlay,
  Controls,
  ControlSpacer,
  DefaultControls,
  DefaultSettings,
  DefaultUi,
  Hls,
  MuteControl,
  PlaybackControl,
  Player,
  Poster,
  Spinner,
  Ui,
} from '@vime/react'
import { getCurrentDuration } from '@utils/functions/getCurrentDuration'
import usePersistStore from '@store/persist'
import { APP } from '@utils/constants'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { data } from 'autoprefixer'
import { current } from 'tailwindcss/colors'

const PlayerInstance = ({ videoData, videoRef, video, source, ratio, hls, poster }) => {
    const router = useRouter()
    const supabase = useSupabaseClient()
    const user = usePersistStore((state) => state.user)
    const isLoggedIn = usePersistStore((state) => state.isLoggedIn)
    const [showContextMenu, setShowContextMenu] = useState(false)
    const [position, setPosition] = useState({ x: 0, y: 0 })
    const [isVideoLoop, setIsVideoLoop] = useState(false)
    const [isStarted, setisStarted] = useState(false)
    const { pathname } = useRouter()
    const videoWatchTime = useAppStore((state) => state.videoWatchTime)
    const currentVideo = document.getElementsByTagName('video')[0]
    const currentDuration = getCurrentDuration(videoData.data.Duration);
    const reader = isLoggedIn ? user.profile.PublicKeyBase58Check : APP.PublicKeyBase58Check;

    useEffect(() => {
        if (!isStarted) return
        setNewView();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isStarted])

    useEffect(() => {
        if (!videoRef.current) return
        videoRef.current.currentTime = Number(videoWatchTime || 0)
    }, [videoRef, videoWatchTime])

    useEffect(() => {
        if (!currentVideo) return
            currentVideo.onloadedmetadata = () => {
            currentVideo.currentTime = Number(videoWatchTime || 0)
            }
    })

    const onContextClick = (event) => {
        event.preventDefault()
        setShowContextMenu(false)
        const newPosition = {
            x: event.pageX,
            y: event.pageY
        }
        setPosition(newPosition)
        setShowContextMenu(true)
    }

    const onTimeUpdate = (event) => {
        const seconds = Math.round(event.detail)
        //console.log(seconds, currentDuration)
        if (seconds === currentDuration) {
        setisStarted(true);
        }
    };

    const setNewView = () => {
        const req = {
            posthash: video.PostHashHex,
            channel: video.ProfileEntryResponse.Username,
            user: reader,
            lastwatched: new Date()
        }
        supabase.from('views').insert([req]).then((response) => {
            if (response.error) {
                logger.error(video.PostHashHex, 'views', response.error);
            }
            return
        })
    }


    return (
        <div className={`md:rounded-xl aspect-[9/16] bg-black flex items-center z-[5]`} onContextMenu={onContextClick}>
            <Player
                tabIndex={1}
                ratio={ratio}
                playsinline
                ref={videoRef}
                onVmCurrentTimeChange={onTimeUpdate}
                icons="material"
            >
                <Hls autoPiP={false} version="latest" poster={poster}>
                    <source data-src={hls} type="application/x-mpegURL"/>
                </Hls>
                <DefaultUi noControls noPoster>
                    <Poster fit='cover' />
                    <ClickToPlay />
                    <Spinner />
                    <Controls fullWidth pin="topLeft">
                        <ControlSpacer />
                        <MuteControl />
                    </Controls>
                    <Controls pin="topLeft">
                        <PlaybackControl hideTooltip style={{ '--vm-control-scale': 1.0 }} />
                    </Controls>
                </DefaultUi>
            </Player>
            {showContextMenu && pathname === '/watch/[id]' && !showNext && (
                <PlayerContextMenu
                position={position}
                ref={videoRef}
                hideContextMenu={() => setShowContextMenu(false)}
                isVideoLoop={isVideoLoop}
                setIsVideoLoop={setIsVideoLoop}
                />
            )}
        </div>
    )
}

const StoriPlayer = ({videoData, videoRef, video, source, poster, ratio = '9:16', wrapperClassName, hls }) => {
    return (
        <div className={clsx(wrapperClassName)}>
            <PlayerInstance
                videoRef={videoRef}
                videoData={videoData}
                source={source}
                video={video}
                ratio={ratio}
                poster={poster}
                hls={hls}
            />
        </div>
    )
}

export default StoriPlayer