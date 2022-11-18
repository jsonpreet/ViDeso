import { AspectRatio, Hls, MuteButton, MediaVisibility, SliderVideo, SliderValueText, VolumeSlider, TimeSlider, Video, Media, PlayButton } from '@vidstack/player-react'
import Hlsjs from 'hls.js';

function Player({ source, data, playerRef, poster, ratio, hls: hlsUrl }) {
    console.log('hlsUrl', hlsUrl)
    console.log('data', data)
    return (
        <>
            <div>
                <Media className='relative bg-black flex items-center justify-center aspect-w-16 aspect-h-9' ref={playerRef}>
                    {/* <MediaVisibility
                        enterViewport="play"
                        exitViewport="pause"
                        intersectionThreshold={1}
                        viewportEnterDelay={0}
                    >
                    </MediaVisibility> */}
                    <div className="media-buffering-container">
                        <svg className="media-buffering-icon" fill="none" viewBox="0 0 120 120" aria-hidden="true">
                            <circle
                                className="media-buffering-track"
                                cx="60"
                                cy="60"
                                r="54"
                                stroke="currentColor"
                                strokeWidth="8"
                            ></circle>
                            <circle
                                className="media-buffering-track-fill"
                                cx="60"
                                cy="60"
                                r="54"
                                stroke="currentColor"
                                strokeWidth="10"
                                pathLength="100"
                            ></circle>
                        </svg>
                    </div>
                    <div className='flex flex-col items-center justify-center'>
                        <Hls className='h-full' poster={poster}hlsLibrary={() => import('hls.js')} hlsConfig={{ lowLatencyMode: true }}>
                            <video className='h-full' poster={poster} src={hlsUrl} preload="none" data-video="0" />
                        </Hls>
                    <div className="media-controls">
                        <PlayButton>
                            <svg className="media-play-icon" aria-hidden="true" viewBox="0 0 24 24">
                                <path
                                    fill="currentColor"
                                    d="M19.376 12.416L8.777 19.482A.5.5 0 0 1 8 19.066V4.934a.5.5 0 0 1 .777-.416l10.599 7.066a.5.5 0 0 1 0 .832z"
                                />
                            </svg>
                            <svg className="media-pause-icon" aria-hidden="true" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M6 5h2v14H6V5zm10 0h2v14h-2V5z" />
                            </svg>
                        </PlayButton>
                        <TimeSlider>
                            <div className="slider-track"></div>
                            <div className="slider-track fill"></div>
                            <div className="slider-thumb-container">
                                <div className="slider-thumb"></div>
                            </div>
                            <div className="media-preview-container">
                                <SliderValueText type="pointer" format="time" />
                            </div>
                        </TimeSlider>
                        <MuteButton>
                            <svg className="media-mute-icon" aria-hidden="true" viewBox="0 0 24 24">
                                <path
                                fill="currentColor"
                                d="M5.889 16H2a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1h3.889l5.294-4.332a.5.5 0 0 1 .817.387v15.89a.5.5 0 0 1-.817.387L5.89 16zm14.525-4l3.536 3.536l-1.414 1.414L19 13.414l-3.536 3.536l-1.414-1.414L17.586 12L14.05 8.464l1.414-1.414L19 10.586l3.536-3.536l1.414 1.414L20.414 12z"
                                />
                            </svg>
                            <svg className="media-unmute-icon" aria-hidden="true" viewBox="0 0 24 24">
                                <path
                                fill="currentColor"
                                d="M5.889 16H2a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1h3.889l5.294-4.332a.5.5 0 0 1 .817.387v15.89a.5.5 0 0 1-.817.387L5.89 16zm13.517 4.134l-1.416-1.416A8.978 8.978 0 0 0 21 12a8.982 8.982 0 0 0-3.304-6.968l1.42-1.42A10.976 10.976 0 0 1 23 12c0 3.223-1.386 6.122-3.594 8.134zm-3.543-3.543l-1.422-1.422A3.993 3.993 0 0 0 16 12c0-1.43-.75-2.685-1.88-3.392l1.439-1.439A5.991 5.991 0 0 1 18 12c0 1.842-.83 3.49-2.137 4.591z"
                                />
                            </svg>
                        </MuteButton>
                        <VolumeSlider>
                            <div className="slider-track"></div>
                            <div className="slider-track fill"></div>
                            <div className="slider-thumb-container">
                                <div className="slider-thumb"></div>
                            </div>
                            <SliderValueText type="current" format="percent" />
                        </VolumeSlider>
                    </div>
                    </div>
                </Media>
            </div>
        </>
    )
}

export default Player