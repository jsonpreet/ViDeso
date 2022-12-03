import { Button } from '@app/components/UI/Button'
import InputMentions from '@app/components/UI/InputMentions'
import React, { FC, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { v4 as uuidv4 } from 'uuid'
import { z } from 'zod'

const formSchema = z.object({
  comment: z
    .string({ required_error: 'Enter valid comment' })
    .trim()
    .min(1, { message: 'Enter valid comment' })
    .max(5000, { message: 'Comment should not exceed 5000 characters' })
})

const NewComment = ({ video, refetchComments }) => {
    const [loading, setLoading] = useState(false)
    const [buttonText, setButtonText] = useState('Comment')
    const selectedChannel = useAppStore((state) => state.selectedChannel)
    const selectedChannelId = usePersistStore((state) => state.selectedChannelId)
    const userSigNonce = useAppStore((state) => state.userSigNonce)
    const setUserSigNonce = useAppStore((state) => state.setUserSigNonce)

    const {
        clearErrors,
        handleSubmit,
        formState: { errors },
        reset,
        watch,
        setValue
    } = useForm({
        defaultValues: {
        comment: ''
        },
        resolver: zodResolver(formSchema)
    })

    const onError = (error) => {
        toast.error(error?.data?.message ?? error?.message ?? ERROR_MESSAGE)
        setButtonText('Comment')
        setLoading(false)
    }

    useEffect(() => {
        if (indexed) {
            setLoading(false)
            refetchComments()
            setButtonText('Comment')
            reset()
            toast.success('Commented successfully.')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [indexed])

    const submitComment = async (data) => {
        // try {
        //     setButtonText('Uploading...')
        //     setLoading(true)

        //     const textNftImageUrl = await getTextNftUrl(
        //         trimify(data.comment),
        //         selectedChannel?.handle,
        //         new Date().toLocaleString()
        //     )

        //     const { url } = await uploadToAr({
        //         version: '2.0.0',
        //         metadata_id: uuidv4(),
        //         description: trimify(data.comment),
        //         content: trimify(data.comment),
        //         locale: getUserLocale(),
        //         mainContentFocus: PublicationMainFocus.TextOnly,
        //         external_url: `${LENSTUBE_URL}/watch/${video?.id}`,
        //         image: textNftImageUrl,
        //         imageMimeType: 'image/svg+xml',
        //         name: `${selectedChannel?.handle}'s comment on video ${video.metadata.name}`,
        //         attributes: [
        //         {
        //             displayType: PublicationMetadataDisplayTypes.String,
        //             traitType: 'publication',
        //             value: 'comment'
        //         },
        //         {
        //             displayType: PublicationMetadataDisplayTypes.String,
        //             traitType: 'app',
        //             value: LENSTUBE_APP_ID
        //         }
        //         ],
        //         media: [],
        //         appId: LENSTUBE_APP_ID
        //     })
        //     setButtonText('Commenting...')
        //     const request = {
        //         profileId: selectedChannel?.id,
        //         publicationId: video?.id,
        //         contentURI: url,
        //         collectModule: {
        //         freeCollectModule: {
        //             followerOnly: false
        //         }
        //         },
        //         referenceModule: {
        //         followerOnlyReferenceModule: false
        //         }
        //     }
        //     const canUseDispatcher = selectedChannel?.dispatcher?.canUseRelay
        //     if (!canUseDispatcher) {
        //         return signTypedData(request)
        //     }
        //     await createViaDispatcher(request)
        // } catch (error) {
        //     logger.error('[Error Store & Post Comment]', error)
        // }
    }

    if (!selectedChannel || !selectedChannelId) return null

    return (
        <div className="my-1">
            <form
                onSubmit={handleSubmit(submitComment)}
                className="flex items-start mb-2 space-x-1 md:space-x-3"
            >
                <div className="flex-none">
                <img
                    src={getProfilePicture(selectedChannel, 'avatar')}
                    className="w-8 h-8 md:w-9 md:h-9 rounded-xl"
                    draggable={false}
                    alt="channel picture"
                />
                </div>
                {/* <InputMentions
                placeholder="How's this video?"
                autoComplete="off"
                validationError={errors.comment?.message}
                value={watch('comment')}
                onContentChange={(value) => {
                    setValue('comment', value)
                    clearErrors('comment')
                }}
                mentionsSelector="input-mentions-single"
                /> */}
                <Button disabled={loading}>{buttonText}</Button>
            </form>
        </div>
    )
}

export default NewComment