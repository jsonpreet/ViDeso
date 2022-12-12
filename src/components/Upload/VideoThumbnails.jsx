import ThumbnailsShimmer from '@components/Shimmers/ThumbnailsShimmer'
import { Loader } from '@components/UI/Loader'
import clsx from 'clsx'
import { BiImageAdd } from 'react-icons/bi'
import { generateVideoThumbnails } from '@utils/functions/generateVideoThumbnails'
import { getFileFromDataURL } from '@utils/functions/getFileFromDataURL'
import useAppStore from '@store/app'
import { useEffect, useState } from 'react'
import Deso from 'deso-protocol';
import { UploadImage } from '@data/image'
import usePersistStore from '@store/persist'

const DEFAULT_THUMBNAIL_INDEX = 0
export const THUMBNAIL_GENERATE_COUNT = 3

const VideoThumbnails = ({ label, afterUpload, file }) => {
    const {user} = usePersistStore()
    const [thumbnails, setThumbnails] = useState([])
    const [selectedThumbnailIndex, setSelectedThumbnailIndex] = useState(-1)
    const setUploadedVideo = useAppStore((state) => state.setUploadedVideo)
    const uploadedVideo = useAppStore((state) => state.uploadedVideo)

    const uploadThumbnail = async (file) => {
        setUploadedVideo({ uploadingThumbnail: true })
        try {
            const deso = new Deso();
            const request = undefined;  
            const jwt = await deso.identity.getJwt(request);
            const response = await UploadImage(jwt, file, user.profile.PublicKeyBase58Check)
            afterUpload(response.data.ImageURL, file.type || 'image/jpeg')
            return response.data.ImageURL
        } catch (error) {
            console.log(error)
        } finally {
            setUploadedVideo({ uploadingThumbnail: false })
        }
    }

    const generateThumbnails = async (file) => {
        try {
            const thumbnailArray = await generateVideoThumbnails(
                file,
                THUMBNAIL_GENERATE_COUNT
            )
            const thumbnails = []
            thumbnailArray.forEach((t) => {
                thumbnails.push({ url: t, image: '',type: 'image/jpeg' })
            })
            setThumbnails(thumbnails)
        } catch (error) {
            console.log('[Error Generate Thumbnails]', error)
        }
    }

    useEffect(() => {
        if (file)
            generateThumbnails(file).catch((error) =>
                console.log('[Error Generate Thumbnails from File]', error)
            )
            return () => {
                setSelectedThumbnailIndex(-1)
                setThumbnails([])
            }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [file])

    const handleUpload = async (e) => {
        if (e.target.files?.length) {
            setSelectedThumbnailIndex(-1)
            const result = await uploadThumbnail(e.target.files[0])
            const preview = window.URL?.createObjectURL(e.target.files[0])
            setThumbnails([
                { url: preview, url: result },
                ...thumbnails
            ])
            setSelectedThumbnailIndex(0)
        }
    }

    const onSelectThumbnail = async (index) => {
        setSelectedThumbnailIndex(index)
        if (thumbnails[index].image === '') {
            const file = getFileFromDataURL(thumbnails[index].url, 'thumbnail.jpeg')
            const ipfsResult = await uploadThumbnail(file)
            setThumbnails(
                thumbnails.map((t, i) => {
                    if (i === index) t.image = ipfsResult
                    return t
                })
            )
        } else {
            afterUpload(thumbnails[index].image, 'image/jpeg')
        }
    }

    return (
        <div className="w-full">
        {label && (
            <div className="flex items-center mb-1 space-x-1.5">
                <div className="font-medium text-sm">
                    {label}
                </div>
            </div>
        )}
        <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 place-items-start py-0.5 gap-3">
            <label
                htmlFor="chooseThumbnail"
                className="flex flex-col items-center justify-center flex-none w-full h-20 border-2 border-dotted border-gray-300 cursor-pointer max-w-32 rounded-md opacity-80 focus:outline-none dark:border-gray-700"
            >
                <input 
                    id="chooseThumbnail"
                    type="file"
                    accept=".png, .jpg, .jpeg"
                    className="hidden w-full"
                    onChange={handleUpload}
                />
                    <BiImageAdd size={21} className="flex-none mb-1" />
                <span className="tracking-wide text-[13px]">Upload thumbnail</span>
            </label>
            {!thumbnails.length && <ThumbnailsShimmer />}
                {thumbnails.map((thumbnail, idx) => {
                return (
                    <button
                        key={idx}
                        type="button"
                        disabled={
                            uploadedVideo.uploadingThumbnail &&
                            selectedThumbnailIndex === idx
                        }
                        onClick={() => onSelectThumbnail(idx)}
                        className={clsx(
                            'rounded-md flex w-full relative cursor-grab flex-none focus:outline-none',
                            {
                            'drop-shadow-2xl ring ring-brand2-500': selectedThumbnailIndex === idx
                            }
                        )}
                    >
                    <img
                        className="object-cover w-full h-20 rounded-md"
                        src={thumbnail.url}
                        alt="thumbnail"
                        draggable={false}
                    />
                    {uploadedVideo.uploadingThumbnail &&
                        selectedThumbnailIndex === idx && (
                        <div className="absolute top-1 right-1">
                            <span>
                                <Loader size="sm" className="!text-white" />
                            </span>
                        </div>
                        )}
                    </button>
                )
            })}
        </div>
        {!uploadedVideo.thumbnail.length &&
        !uploadedVideo.uploadingThumbnail &&
        thumbnails.length ? (
            <p className="mt-2 text-xs font-medium text-red-500">
                Please choose a thumbnail
            </p>
        ) : null}
        </div>
    )
}

export default VideoThumbnails