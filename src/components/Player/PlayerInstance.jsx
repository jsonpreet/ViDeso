import {
  DefaultControls,
  DefaultSettings,
  DefaultUi,
  Hls,
  Player
} from '@vime/react'

const VimePlayer = ({ playerRef, source, ratio, hls, poster }) => {

  return (
    <Player
        tabIndex={1}
        ref={playerRef}
        aspectRatio={ratio}
        autopause
        autoplay
        icons="vime"
    >
        <Hls version="latest" poster={poster}>
            <source data-src={hls} type="application/x-mpegURL" />
        </Hls>
        <DefaultUi noControls>
            <DefaultControls hideOnMouseLeave activeDuration={2000} />
            <DefaultSettings />
        </DefaultUi>
    </Player>
  )
}

export default VimePlayer