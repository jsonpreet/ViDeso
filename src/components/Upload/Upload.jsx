import useAppStore from '@store/app'
import usePersistStore from '@store/persist'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import DropZone from './DropZone'
import Deso from 'deso-protocol'
import UploadForm from './Form'
import toast from 'react-hot-toast'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { useCreateAsset } from '@livepeer/react';

function Upload() {
    const {isLoggedIn, user} = usePersistStore()
    const uploadedVideo = useAppStore((state) => state.uploadedVideo)
    const setUploadedVideo = useAppStore((state) => state.setUploadedVideo)
    const setResetUploadedVideo = useAppStore((state) => state.setResetUploadedVideo)
    const router = useRouter();
    const [deso, setDeso] = useState(null)
    const supabase = useSupabaseClient()
    const [newPostHash, setNewPostHash] = useState(null)
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        const deso = new Deso();
        setDeso(deso)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (!isLoggedIn) {
            router.push('/')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const { mutate: createAsset, data: assets, status, progress, error } = useCreateAsset(
        // we use a `const` assertion here to provide better Typescript types
        // for the returned data
        uploadedVideo.file
        ? { sources: [{ name: uploadedVideo.file.name, file: uploadedVideo.file }] }
        : null,
    );

    useEffect(() => {
        if (newPostHash !== null) {
            //saveToDB()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[newPostHash])

    useEffect(() => {
        progress?.[0].phase === 'failed'
            ? toast.error('Failed to process video.')
            : progress?.[0].phase === 'waiting'
                ? setUploadedVideo({ buttonText: 'Waiting', percentText: 'Waiting', loading: true, percent: 0 })
                : progress?.[0].phase === 'uploading'
                    ? setUploadedVideo({ buttonText: 'Uploading Video...', loading: true, percentText: 'Uploading', percent: Math.round(progress?.[0]?.progress * 100) })
                    : progress?.[0].phase === 'processing'
                        ? setUploadedVideo({ buttonText: 'Processing Video...', loading: true, percentText: 'Processing', percent: Math.round(progress?.[0]?.progress * 100) })
                        : progress?.[0].phase === 'ready'
                            ? setUploadedVideo({ buttonText: 'Posting Video...', loading: true, readyToPost: true, percentText: 'Ready', percent: Math.round(progress?.[0]?.progress * 100) })
                            : setUploadedVideo({ buttonText: 'Submit Video', loading: false, percent: 0 });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [progress])

    useEffect(() => {
        if (status === 'loading' || (assets?.[0] && assets[0].status?.phase !== 'ready')) {
            setLoading(true);
        } else {
            setLoading(false);
        }
        if (assets && assets[0] && assets[0].status?.phase === 'ready') {
            setUploadedVideo({ videoURL: assets[0]?.playbackUrl })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [status, assets])


    useEffect(() => {
        if (uploadedVideo.readyToPost) {
            post();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [uploadedVideo])

    const onCancel = () => {
        setResetUploadedVideo()
    }

    const post = async () => {
        try {
            const body = `${uploadedVideo.description} \n ${uploadedVideo.tags.map(tag => `#${tag}`)} \n\n Posted on @Videso`
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
                videoURL: uploadedVideo.videoURL,
                isLivePeer: true,
                Duration: uploadedVideo.durationInSeconds
            }
            const payload = {
                UpdaterPublicKeyBase58Check: user.profile.PublicKeyBase58Check,
                BodyObj: {
                    Body: body,
                    ImageURLs: [],
                    VideoURLs: []
                },
                PostExtraData: {
                    Videso: JSON.stringify(extraData),
                }
            }
            const result = await deso.posts.submitPost(payload);
            if (result && result.submittedTransactionResponse.PostEntryResponse.PostHashHex) {
                const newPost = result.submittedTransactionResponse.PostEntryResponse.PostHashHex
                console.log('new post hash', newPost);
                try {
                    const payload2 = {
                        PostHashHexToModify: newPost,
                        UpdaterPublicKeyBase58Check: user.profile.PublicKeyBase58Check,
                        BodyObj: {
                            Body: body,
                            VideoURLs: [],
                            ImageURLs: []
                        },
                        PostExtraData: {
                            EmbedVideoURL: `https://embed.videso.xyz/${newPost}`,
                        }
                    }
                    const result2 = await deso.posts.submitPost(payload2);
                    if (result2 && result2.submittedTransactionResponse.PostEntryResponse.PostHashHex) {
                        setNewPostHash(newPost)
                        setUploadedVideo({ videoHash: newPost })
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
        } catch (error) {
            console.log(error)
            toast.error(`Error: ${error.message}`);
        }
    }
    
    const saveToDB = async () => {
        try {
            const { data: post, error } = await supabase.from('uploads').select('*').eq('posthash', newPostHash).eq('user', user.profile.PublicKeyBase58Check);
            if (post.length > 0) {
               
            } else {
                const request = { user: user.profile.PublicKeyBase58Check, posthash: newPostHash, category: uploadedVideo.videoCategory.tag }
                supabase.from('uploads').insert([request]).then((res) => {
                    if (res.error) {
                        logger.error(video.PostHashHex, 'watched', res.error);
                    }
                })
            }
            
        } catch (error) {
            logger.error(video.PostHashHex, 'watched', error);
        }
    }

    const checkFieldsData = () => {
        if (uploadedVideo.title !== '' || uploadedVideo.description !== '' || uploadedVideo.language !== '' || uploadedVideo.tags.length > 0) {
            return true;
        }
        return false
    }

    const onUpload = () => {
        if (!checkFieldsData()) {
            return toast.error('All fields required!')
        }
        const file = uploadedVideo.file
        if (file.size > 1 * (1024 * 1024 * 1024)) {
            toast.error('File is too large. Please choose a file less than 1GB');
            return;
        }
        createAsset();
    }

    return uploadedVideo?.file ? <UploadForm onCancel={onCancel} onUpload={onUpload} /> : <DropZone />
}

export default Upload