
import useAppStore from '@store/app'
import clsx from 'clsx'
import { useEffect, useRef, useState } from 'react'
import {
  DefaultControls,
  DefaultSettings,
  DefaultUi,
  Hls,
  Player,
  Poster,
  Video,
} from '@vime/react'
import * as tf from '@tensorflow/tfjs'
import * as nsfwjs from 'nsfwjs'
import { getIsNSFW } from '@utils/functions/getIsNSFW'

const PlayerInstance = ({ playerRef, source, ratio, type, poster }) => {
  const uploadedVideo = useAppStore((state) => state.uploadedVideo)
  const setUploadedVideo = useAppStore((state) => state.setUploadedVideo)
  const currentVideo = document.getElementsByTagName('video')[0]

  const analyseVideo = async () => {
    if (currentVideo && !uploadedVideo.isNSFW) {
      try {
        const model = await nsfwjs.load()
        const predictions = await model?.classify(currentVideo, 3)
        setUploadedVideo({
          isNSFW: getIsNSFW(predictions)
        })
      } catch (error) {
        console.log('[Error Analyse Video]', error)
      }
    }
  }

  const onDataLoaded = async () => {
    await analyseVideo(currentVideo)
  }

  useEffect(() => {
    if (!currentVideo) return
    if (currentVideo.duration !== Infinity) {
      setUploadedVideo({
        durationInSeconds: currentVideo.duration.toFixed(2)
      })
    }
    onDataLoaded();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentVideo])
  return (
    <div>
      <div className={`md:relative z-[5] aspect-[16/9]`}>
        <Player
            tabIndex={1}
            ref={playerRef}
            aspectRatio={ratio}
            icons="material"
        >
          <Video
              preload="metadata"
              crossOrigin="anonymous"
              poster={poster}
            >
              <source data-src={source} type={type} />
          </Video>
          <DefaultUi noControls noPoster>
              <Poster fit='contain' />
              <DefaultControls hideOnMouseLeave activeDuration={2000} />
              <DefaultSettings />
          </DefaultUi>
        </Player>
      </div>
    </div>
  )
}

const ExVideoPlayer = ({ source, poster, type, playerRef, ratio = '16:9', wrapperClassName }) => {
  return (
    <div className={clsx('overflow-hidden', wrapperClassName)}>
      <PlayerInstance
        source={source}
        ratio={ratio}
        playerRef={playerRef}
        type={type}
        poster={poster}
      />
    </div>
  )
}

export default ExVideoPlayer