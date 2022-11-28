import { useEffect, useRef } from 'react'
import useAppStore from '@app/store/app'
import toast from 'react-hot-toast'
import logger from '@app/utils/logger'
import VideoThumbnails from './VideoThumbnails'
import formatBytes from '@app/utils/functions'
import { CardShimmer } from '../Shimmers/VideoCardShimmer'
import dynamic from 'next/dynamic'
import ProgressBar from '../UIElements/ProgressBar'
import { Loader2 } from '../UIElements/Loader'

const ExVideoPlayer = dynamic(() => import('../Player/ExVideoPlayer'), {
  loading: () => <CardShimmer />,
  ssr: false
})

function UploadVideo() {
    const uploadedVideo = useAppStore((state) => state.uploadedVideo)
    const setUploadedVideo = useAppStore((state) => state.setUploadedVideo)
    const videoRef = useRef(null)

    const analyseVideo = async (currentVideo) => {
        if (currentVideo && !uploadedVideo.isNSFW) {
            try {
                const model = await nsfwjs.load()
                const predictions = await model?.classify(currentVideo, 3)
                setUploadedVideo({
                    isNSFW: getIsNSFW(predictions)
                })
            } catch (error) {
                logger.error('[Error Analyse Video]', error)
            }
        }
    }

    const onDataLoaded = async (event) => {
        if (videoRef.current?.duration && videoRef.current?.duration !== Infinity) {
            setUploadedVideo({
                durationInSeconds: videoRef.current.duration.toFixed(2)
            })
        }
        if (event.target) {
            const currentVideo = document.getElementsByTagName('video')[0]
            await analyseVideo(currentVideo)
        }
    }

    useEffect(() => {
    if (videoRef.current) {
      videoRef.current.onloadeddata = onDataLoaded
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [videoRef])

    const onThumbnailUpload = (ipfsUrl, thumbnailType) => {
        setUploadedVideo({ thumbnail: ipfsUrl, thumbnailType })
    }
    return (
        <>
            <div className="flex flex-col w-full">
                <div className="overflow-hidden relative rounded-xl w-full">
                    <ExVideoPlayer
                        playerRef={videoRef}
                        poster={uploadedVideo.thumbnail}
                        source={uploadedVideo.preview}
                        type={uploadedVideo.videoType || 'video/mp4'}
                    />
                    <div className="py-0.5 absolute top-2 px-2 z-10 left-2 text-xs uppercase bg-brand-200 text-black rounded-full">
                        {uploadedVideo.file?.size && (
                            <span className="whitespace-nowrap font-semibold">
                            {formatBytes(uploadedVideo.file?.size)}
                            </span>
                        )}
                    </div>
                </div>
                
                {uploadedVideo.percent !== 0 ?
                    <>
                        
                            <div className=''>
                                <ProgressBar progress={uploadedVideo.percent} height={24} />
                            </div>
                    </>
                    : null
                    
                }
                
                <div className={`${uploadedVideo.percent === 0 ? `mt-4` : ``}`}>
                    <VideoThumbnails
                        label="Thumbnail"
                        file={uploadedVideo.file}
                        afterUpload={(ipfsUrl, thumbnailType) => {
                            if (!ipfsUrl?.length) {
                                return toast.error('Failed to upload thumbnail')
                            }
                            onThumbnailUpload(ipfsUrl, thumbnailType)
                        }}
                    />
                </div>
            </div>
        </>
    )
}

export default UploadVideo