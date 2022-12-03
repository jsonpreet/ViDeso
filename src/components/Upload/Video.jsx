import { useRef } from 'react'
import useAppStore from '@app/store/app'
import toast from 'react-hot-toast'
import VideoThumbnails from './VideoThumbnails'
import formatBytes from '@app/utils/functions'
import { CardShimmer } from '../Shimmers/VideoCardShimmer'
import dynamic from 'next/dynamic'
import ProgressBar from '../UI/ProgressBar'

const ExVideoPlayer = dynamic(() => import('../Player/ExVideoPlayer'), {
  loading: () => <CardShimmer />,
  ssr: false
})

function UploadVideo() {
    const uploadedVideo = useAppStore((state) => state.uploadedVideo)
    const setUploadedVideo = useAppStore((state) => state.setUploadedVideo)
    const videoRef = useRef(null)

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