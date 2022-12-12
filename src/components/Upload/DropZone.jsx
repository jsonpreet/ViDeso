import clsx from 'clsx'
import fileReaderStream from 'filereader-stream'
import toast from 'react-hot-toast'
import useDragAndDrop from '@utils/hooks/useDragAndDrop'
import { IoCloudUploadOutline } from 'react-icons/io5'
import {ALLOWED_VIDEO_TYPES, APP} from '@utils/constants'
import useAppStore from '@store/app'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'

const DropZone = () => {
    const router = useRouter()
    const setUploadedVideo = useAppStore((state) => state.setUploadedVideo)
    const { dragOver, setDragOver, onDragOver, onDragLeave, fileDropError, setFileDropError } = useDragAndDrop()

    const uploadVideo = (file) => {
        try {
            if (file) {
                const preview = URL.createObjectURL(file)
                setUploadedVideo({
                    stream: fileReaderStream(file),
                    preview,
                    videoType: file?.type || 'video/mp4',
                    file
                })
            }
        } catch (error) {
            toast.error('Error uploading file')
            console.log('[Error Upload Video]', error)
        }
    }

    const validateFile = (file) => {
        if (!ALLOWED_VIDEO_TYPES.includes(file?.type)) {
            const errorMessage = 'Video format not supported!'
            toast.error(errorMessage)
            return setFileDropError(errorMessage)
        }
        if (file.size > 1 * (1024 * 1024 * 1024)) {
            const errorMessage = 'File is too large. Please choose a file less than 1GB'
            toast.error(errorMessage);
            return setFileDropError(errorMessage)
        }
        uploadVideo(file)
    }

    const onDrop = (e) => {
        e.preventDefault()
        setDragOver(false)
        validateFile(e?.dataTransfer?.files[0])
    }

    const onChooseFile = (e) => {
        if (e.target.files?.length) validateFile(e?.target?.files[0])
    }

    return (
        <div>
            <NextSeo
                title='Upload Videos'
                canonical={`${APP.URL}/upload`}
                openGraph={{
                    title: 'Upload Videos',
                    url: `${APP.URL}/upload`,
                }}
            />
            <div className="relative flex flex-col max-w-7xl md:px-0 px-4 mx-auto my-10">
                <h3 className='mb-5 pb-5 text-2xl font-bold'>Upload videos</h3>
                <div className="relative flex flex-col items-center justify-center w-full">
                    <label
                        className={clsx(
                            'w-full p-10 md:p-20 focus:outline-none transition-all delay-75 duration-75 grid place-items-center text-center bg-secondary rounded-xl',
                            { '!bg-gray-200': dragOver }
                        )}
                        htmlFor="dropVideo"
                        onDragOver={onDragOver}
                        onDragLeave={onDragLeave}
                        onDrop={onDrop}
                        >
                        <input
                            type="file"
                            className="hidden"
                            onChange={onChooseFile}
                            id="dropVideo"
                            accept={ALLOWED_VIDEO_TYPES.join(',')}
                        />
                        <span className="flex justify-center mb-6 opacity-80">
                            <IoCloudUploadOutline className="w-14 h-14" />
                        </span>
                        <span className="space-y-10 md:space-y-14">
                            <div className='flex flex-col space-y-2'>
                                <span className="text-xl">
                                Drag and drop video files to upload
                                </span>
                                <span className="text-sm text-light">
                                Your video will be private until you publish them.
                                </span>
                            </div>
                            <div>
                                <label
                                    htmlFor="chooseVideo"
                                    className="px-8 py-4 text-lg primary-button cursor-pointer rounded-full"
                                >
                                    Select Files
                                    <input
                                        id="chooseVideo"
                                        onChange={onChooseFile}
                                        type="file"
                                        className="hidden"
                                        accept={ALLOWED_VIDEO_TYPES.join(',')}
                                    />
                                </label>
                            </div>
                            <div className='flex flex-col space-y-2'>
                                <span className="text-xs text-light">Max. File Size Supports 1GB</span>
                            </div>
                            {fileDropError && (
                                <div className="font-medium text-red-500">{fileDropError}</div>
                            )}
                        </span>
                    </label>
                </div>
            </div>
        </div>
    )
}

export default DropZone