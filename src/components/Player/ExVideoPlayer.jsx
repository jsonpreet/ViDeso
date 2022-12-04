
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

const PlayerInstance = ({ playerRef, source, ratio, type, poster }) => {
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

const ExVideoPlayer = ({
  source,
  poster,
  type,
  playerRef,
  ratio = '16:9',
  wrapperClassName
}) => {

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