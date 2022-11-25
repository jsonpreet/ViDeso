import MetaTags from '@app/components/Common/MetaTags'
import clsx from 'clsx'
import fileReaderStream from 'filereader-stream'
import toast from 'react-hot-toast'
import useDragAndDrop from '@app/utils/hooks/useDragAndDrop'
import logger from '@app/utils/logger'
import { IoCloudUploadOutline } from 'react-icons/io5'
import {ALLOWED_VIDEO_TYPES} from '@app/utils/constants'
import useAppStore from '@app/store/app'

const DropZone = () => {
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
            logger.error('[Error Upload Video]', error)
        }
    }

    const validateFile = (file) => {
        if (!ALLOWED_VIDEO_TYPES.includes(file?.type)) {
            const errorMessage = 'Video format not supported!'
            toast.error(errorMessage)
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
            <MetaTags title="Select Video" />
            <div className="relative flex flex-col items-center justify-center flex-1 my-20">
                <label
                    className={clsx(
                        'w-full p-10 md:p-20 md:w-2/3 focus:outline-none border-gray-500 grid place-items-center text-center border border-dashed rounded-3xl',
                        { '!border-green-500': dragOver }
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
                        <div className="text-2xl font-semibold md:text-4xl">
                            <span>
                                Drag and drop <br /> video to upload
                            </span>
                        </div>
                        <div>
                            <label
                                htmlFor="chooseVideo"
                                className="px-8 py-4 text-lg text-white bg-indigo-500 cursor-pointer rounded-full"
                            >
                                or choose video
                                <input
                                    id="chooseVideo"
                                    onChange={onChooseFile}
                                    type="file"
                                    className="hidden"
                                    accept={ALLOWED_VIDEO_TYPES.join(',')}
                                />
                            </label>
                        </div>
                        {fileDropError && (
                            <div className="font-medium text-red-500">{fileDropError}</div>
                        )}
                    </span>
                </label>
            </div>
        </div>
    )
}

export default DropZone