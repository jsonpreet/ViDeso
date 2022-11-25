
import { DESO_CONFIG } from '@app/utils/constants'
import { getProfileName } from '@app/utils/functions/getProfileName'
import { getProfilePicture } from '@app/utils/functions/getProfilePicture'
import clsx from 'clsx'
import Deso from 'deso-protocol'
import { useId } from 'react'
import { Mention, MentionsInput } from 'react-mentions'
import IsVerified from '../Common/IsVerified'

const InputMentions = ({ label, validationError, value, onContentChange, mentionsSelector, ...props }) => {
    const id = useId()

    const fetchSuggestions = async ( query, callback ) => {
        if (!query) return
        try {
            const deso = new Deso(DESO_CONFIG)
            const request = {
                "UsernamePrefix": query,
            }
            const profiles = await deso.user.getProfiles(request);
            if (profiles && profiles.ProfilesFound !== null) {
                const channels = profiles.ProfilesFound.map((channel) => ({
                    id: channel.Username,
                    display: getProfileName(channel),
                    isVerified: channel.IsVerified,
                    picture: getProfilePicture(channel),
                }))
                callback(channels)
            }
        } catch {
            callback([])
        }
    }

    return (
        <label className="w-full" htmlFor={id}>
        {label && (
            <div className="flex items-center mb-1 space-x-1.5">
                <div className="font-medium text-sm">
                    {label}
                </div>
            </div>
        )}
        <div className="flex flex-col w-full">
            <MentionsInput
            id={id}
            className={mentionsSelector}
            value={value}
            placeholder={props.placeholder}
            onChange={(e) => onContentChange(e.target.value)}
            >
            <Mention
                trigger="@"
                displayTransform={(handle) => `@${handle} `}
                markup="@__id__ "
                renderSuggestion={(
                suggestion,
                _search,
                _highlightedDisplay,
                _index,
                focused
                ) => (
                <div
                    className={clsx('max-h-52 flex w-full items-center truncate px-3 py-2 space-x-1 hover-primary', {
                    'dark:bg-[#fff]/[0.1] bg-gray-200': focused
                    })}
                >
                    <img
                        src={suggestion?.picture}
                        className="w-7 h-7 rounded-full"
                        alt={suggestion?.display ? suggestion?.display : 'pfp'}
                        draggable={false}
                    />
                    <div className="overflow-hidden">
                        <p className="leading-4 truncate">
                            {suggestion?.display ? suggestion?.display : suggestion?.id}
                        </p>
                    </div>
                    {suggestion?.isVerified ? <IsVerified size="sm" /> : null}    
                </div>
                )}
                data={fetchSuggestions}
            />
            </MentionsInput>
        </div>
        {validationError && (
            <div className="mx-1 mt-1 text-xs font-medium text-red-500">
            {validationError}
            </div>
        )}
        </label>
    )
}

export default InputMentions