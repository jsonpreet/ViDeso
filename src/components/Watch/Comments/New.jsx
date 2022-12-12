import { getProfilePicture } from '@utils/functions/getProfilePicture'
import { Button } from '@components/UI/Button'
import { useEffect, useState } from 'react'
import InputMentions from '../../UI/InputMentions'
import { getProfileName } from '@utils/functions/getProfileName'
import usePersistStore from '@store/persist'
import { toast } from 'react-hot-toast'
import { DESO_CONFIG } from '@utils/constants'
import Deso from 'deso-protocol'


const NewComment = ({ video, refetch }) => {
    const { isLoggedIn, user } = usePersistStore()
    const [loading, setLoading] = useState(false)
    const [showButtons, setShowButtons] = useState(false)
    const [comment, setComment] = useState('')
    const channel = video.ProfileEntryResponse


    const submitComment = async () => {
        setLoading(true);
        const deso = new Deso(DESO_CONFIG)
        if (comment.trim().length > 0) {
            const request = {
                BodyObj: {
                    Body: comment,
                    ImageURLs: [],
                },
                ParentStakeID: video.PostHashHex,
                UpdaterPublicKeyBase58Check: user.profile.PublicKeyBase58Check,
            };
            try {
                const response = await deso.posts.submitPost(request);
                console.log(response)
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
            finally {
                refetch()
                setComment('');
                setLoading(false);
                setShowButtons(false);
                toast.success('Congratulations! Comment Posted.');
            }
        } else {
            setLoading(false);
            toast.error('Please write something to post.');
        }
    }

    const cancel = () => {
        setShowButtons(false)
        setComment('')
    }

    const onFocus = (e) => {
        setShowButtons(true)
    }

    return (
        <div className="mt-1 mb-5 flex space-x-3">
            <div className="flex-none">
                <img
                    src={getProfilePicture(user.profile)}
                    alt={getProfileName(user.profile)}
                    className="w-9 h-9 rounded-full"
                />
            </div>
            <div className="flex flex-col flex-1 space-y-2 md:space-y-3">
                <div>
                    <InputMentions
                        placeholder="Tell about video (type @ to mention a channel) or add #Hashtags"
                        autoComplete="off"
                        value={comment}
                        onFocus={onFocus}
                        onContentChange={(value) => {
                            setComment(value)
                        }}
                        mentionsSelector="input-mentions-textarea-small h-20 md:h-10"
                    />
                </div>
                {showButtons ?
                    <div className='flex justify-end space-x-3'>
                        <Button variant='light' onClick={cancel} disabled={loading}>Cancel</Button>
                        <Button onClick={submitComment} disabled={loading}>Comment</Button>
                    </div>
                : null}    
            </div>
        </div>
    )
}

export default NewComment