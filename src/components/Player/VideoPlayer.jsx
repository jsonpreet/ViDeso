
import useAppStore from '@app/store/app'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'

import NextVideo from './NextVideo'
import PlayerContextMenu from './PlayerContextMenu'

import dynamic from 'next/dynamic'
// const VimePlayer = dynamic(() => import('./PlayerInstance'), {
//   ssr: false,
// })

import {
  DefaultControls,
  DefaultSettings,
  DefaultUi,
  Hls,
  Player,
  Scrim,
  Controls,
  ControlSpacer,
  MuteControl,
  PlaybackControl,
  TimeProgress,
  Poster,
} from '@vime/react'

// import VimePlayer from './PlayerInstance'

const PlayerInstance = ({ videoData, source, ratio, hls, poster }) => {
  const router = useRouter()
  const playerRef = useRef()
  const [showContextMenu, setShowContextMenu] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isVideoLoop, setIsVideoLoop] = useState(false)
  const { pathname } = useRouter()
  const upNextVideo = useAppStore((state) => state.upNextVideo)
  const videoWatchTime = useAppStore((state) => state.videoWatchTime)
  const [showNext, setShowNext] = useState(false)
  const currentVideo = document.getElementsByTagName('video')[0]

  const handleKeyboardShortcuts = () => {
    if (!playerRef.current) return
    playerRef.current.focus()

    // prevent default actions
    playerRef.current.addEventListener('keydown', (e) => {
        e.preventDefault()
    })

    playerRef.current.onfullscreenchange = () => {
        if (playerRef.current) playerRef.current.focus()
    }

    // Enable keyboard shortcuts in fullscreen
    document.addEventListener('keydown', (e) => {
      if (
        playerRef.current &&
        playerRef.current.isFullscreenActive &&
        e.target !== playerRef.current
      ) {
        // Create a new keyboard event
        const keyboardEvent = new KeyboardEvent('keydown', {
            key: e.key,
            code: e.code,
            shiftKey: e.shiftKey,
            ctrlKey: e.ctrlKey,
            metaKey: e.metaKey
        })

        // dispatch it to the videoplayer
        playerRef.current.dispatchEvent(keyboardEvent)
      }
    })
  }

  useEffect(() => {
    if (!playerRef.current) return
    playerRef.current.currentTime = Number(videoWatchTime || 0)
  }, [playerRef, videoWatchTime])

  useEffect(() => {
    if (!currentVideo) return
    currentVideo.onplaying = () => {
        currentVideo.style.display = 'block'
        setShowNext(false)
    }
    currentVideo.onended = () => {
        if (upNextVideo) {
            currentVideo.style.display = 'none'
            setShowNext(true)
        }
    }
    currentVideo.onloadedmetadata = () => {
        currentVideo.currentTime = Number(videoWatchTime || 0)
    }
    if (playerRef.current) handleKeyboardShortcuts()
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

  const playNext = () => {
    currentVideo.style.display = 'block'
    setShowNext(false)
    router.push(`/watch/${upNextVideo?.PostHashHex}`, null, { shallow: false })
  }

  const cancelPlayNext = (e) => {
    e.preventDefault()
    currentVideo.style.display = 'block'
    setShowNext(false)
  }

  return (
    <div  data-video={`${videoData.id}`} data-src={`${videoData.hls}`}
      onContextMenu={onContextClick}
      className={clsx({
        relative: showNext
      })}
    >
      <div className="relative z-[5]">
        {/* <VimePlayer playerRef={playerRef} ratio={ratio} hls={hls} poster={poster} /> */}
        <Player
            tabIndex={1}
            ref={playerRef}
            aspectRatio={ratio}
            autopause
            autoplay
            icons="material"
        >
            <Hls version="latest" poster={poster}>
                <source data-src={hls} type="application/x-mpegURL"/>
            </Hls>
          <DefaultUi noControls noPoster>
              <Poster fit='contain' />
              <DefaultControls hideOnMouseLeave activeDuration={2000} />
              <DefaultSettings />
          </DefaultUi>
                
        </Player>
      </div>
      {showNext && (
        <NextVideo
          video={upNextVideo}
          playNext={playNext}
          cancelPlayNext={cancelPlayNext}
        />
      )}
      {showContextMenu && pathname === '/watch/[id]' && !showNext && (
        <PlayerContextMenu
          position={position}
          ref={playerRef}
          hideContextMenu={() => setShowContextMenu(false)}
          isVideoLoop={isVideoLoop}
          setIsVideoLoop={setIsVideoLoop}
        />
      )}
    </div>
  )
}

const VideoPlayer = ({
  videoData,
  source,
  poster,
  ratio = '16:9',
  wrapperClassName,
  hls
}) => {

  return (
    <div className={clsx('overflow-hidden', wrapperClassName)}>
      <PlayerInstance
        videoData={videoData}
        source={source}
        ratio={ratio}
        poster={poster}
        hls={hls}
      />
    </div>
  )
}

export default VideoPlayer