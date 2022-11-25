import useAppStore, { UPLOADED_VIDEO_FORM_DEFAULTS } from '@app/store/app'
import usePersistStore from '@app/store/persist'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import DropZone from './DropZone'
import UploadForm from './Form'
import * as tus from "tus-js-client"
import Deso from 'deso-protocol'
import toast from 'react-hot-toast'

function Upload() {
    const {isLoggedIn, user} = usePersistStore()
    const uploadedVideo = useAppStore((state) => state.uploadedVideo)
    const setUploadedVideo = useAppStore((state) => state.setUploadedVideo)
    const setResetUploadedVideo = useAppStore((state) => state.setResetUploadedVideo)
    const router = useRouter();
    console.log(uploadedVideo)
    const [deso, setDeso] = useState(null)
    const [file, setFile] = useState(null)
    const [mediaID, setMediaId] = useState(null)
    const [newPost, setNewPost] = useState(null)
    const [uploadProgress, setUploadProgress] = useState(0)
    const videoStreamInterval = null


    useEffect(() => {
        if (!isLoggedIn) {
            router.push('/')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoggedIn])


    useEffect(() => {
        const deso = new Deso();
        setDeso(deso)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    useEffect(() => {
        if (uploadedVideo.readyToPost) {
            submitPost();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [uploadedVideo])

    const submitPost = async () => {
        try {
            const body = `${uploadedVideo.description} \n ${uploadedVideo.tags.map(tag => `#${tag}`)} \n Posted on @Videso in @${uploadedVideo.videoCategory.tag}`
            const extraData = {
                Title: uploadedVideo.title,
                Tags: uploadedVideo.tags,
                Category: uploadedVideo.videoCategory.tag,
                Language: uploadedVideo.language,
                Thumbnail: uploadedVideo.thumbnail,
                isSensitiveContent: uploadedVideo.isSensitiveContent,
                isNSFW: uploadedVideo.isNSFW,
                isNSFWThumbnail: uploadedVideo.isNSFWThumbnail,
                videoData: uploadedVideo.videoData,
            }
            const payload = {
                UpdaterPublicKeyBase58Check: user.profile.PublicKeyBase58Check,
                BodyObj: {
                    Body: body,
                    VideoURLs: [uploadedVideo.videoURL]
                },
                PostExtraData: {
                    Videso: JSON.stringify(extraData),
                }
            }
            const result = await deso.posts.submitPost(payload);
            if (result && result.constructedTransactionResponse.PostHashHex) {
                setTimeout(() => {
                    router.push(`/@${user.profile.Username}`)
                }, 500)
                toast.success('Congratulations! Post Created.');
                setResetUploadedVideo()
            }
        } catch (error) {
            console.log(error)
            toast.error(`Error: ${error.message}`);
        }
    }
    

    const onUpload = () => {
        const file = uploadedVideo.file
        return new Promise((resolve, reject) => {
        if (file.size > 4 * (1024 * 1024 * 1024)) {
            this.globalVars._alertError("File is too large. Please choose a file less than 4GB");
            return;
        }
        let upload;
        let mediaId = "";
        const options = {
                endpoint: 'https://node.deso.org/api/v0/upload-video',
                chunkSize: 50 * 1024 * 1024, // Required a minimum chunk size of 5MB, here we use 50MB.
                uploadSize: file.size,
                onError: (error) => {
                    toast.error(error.message)
                    upload.abort(true).then(() => {
                        throw error;
                    }).finally(reject);
                },
                onProgress: (bytesUploaded, bytesTotal) => {
                    setUploadedVideo({buttonText: 'Uploading Video...', loading: true, percent: ((bytesUploaded / bytesTotal) * 100).toFixed(2) });
            },
            onSuccess: () => {
                //setUploadedVideo({ buttonText: 'Processing Video...', isProcessing: true, videoURL: `https://iframe.videodelivery.net/${mediaId}`, percent: 100 })
                setUploadedVideo({buttonText: 'Posting video...', readyToPost: true, isProcessing: true, videoURL:`https://iframe.videodelivery.net/${mediaId}`, percent: 100 })
                pollForReadyToStream(resolve, mediaId);
            },
            onAfterResponse: (req, res) => {
                // The stream-media-id header is the video Id in Cloudflare's system that we'll need to locate the video for streaming.
                let mediaIdHeader = res.getHeader("stream-media-id");
                if (mediaIdHeader) {
                    mediaId = mediaIdHeader;
                    setMediaId(mediaIdHeader)
                }
            },
        };
        // Clear the interval used for polling cloudflare to check if a video is ready to stream.
        if (videoStreamInterval != null) {
            clearInterval(videoStreamInterval);
        }
            // Create and start the upload.
            upload = new tus.Upload(file, options);
            upload.start();
        });
    }


    const pollForReadyToStream = (onReadyToStream, mediaId) => {
        let attempts = 0;
        let numTries = 1200;
        let timeoutMillis = 500;
        const videoStreamInterval = setInterval(async () => {
        if (attempts >= numTries) {
            clearInterval(videoStreamInterval);
            return;
        }
        const request = {
            "videoId": mediaId
        };
        const response = await deso.media.getVideoStatus(request);
        if (response.status === 200 && response.data !== undefined){
            if (response.data.ReadyToStream) {
                console.log("Video is ready to stream");
                setUploadedVideo({isProcessing: false})
                //setUploadedVideo({buttonText: 'Posting video...', videoData: response.data, readyToPost: true, isProcessing: false})
                onReadyToStream();
                clearInterval(videoStreamInterval);
                return;
            }
            if (response.data.exitPolling) {
                console.log("Video is not ready to stream");
                clearInterval(videoStreamInterval);
                return;
            }
        }
        attempts++;
        }, timeoutMillis);
    }

    return uploadedVideo?.file ? <UploadForm onUpload={onUpload} /> : <DropZone />
}

export default Upload