import clsx from 'clsx'
import { useId } from 'react'
import { Mention, MentionsInput, SuggestionDataItem } from 'react-mentions'

const InputMentions = ({
    label,
    validationError,
    value,
    onContentChange,
    mentionsSelector,
    ...props
    }) => {
    const id = useId()
    // const [searchChannels] = useLazyQuery(SearchProfilesDocument)

    const fetchSuggestions = async (
        query,
        callback
    ) => {
        if (!query) return
        // try {
        //     const { data } = await searchChannels({
        //         variables: {
        //         request: {
        //             type: SearchRequestTypes.Profile,
        //             query,
        //             limit: 5,
        //             customFilters: LENS_CUSTOM_FILTERS
        //         }
        //         }
        //     })
        //     if (data?.search.__typename === 'ProfileSearchResult') {
        //             const profiles = data?.search?.items
        //             const channels = profiles?.map((channel) => ({
        //             id: channel.handle,
        //             display: channel.handle,
        //             picture: getProfilePicture(channel),
        //             followers: channel.stats.totalFollowers
        //         }))
        //         callback(channels)
        //     }
        // } catch (error) {
        //     callback([])
        //     console.error('[Error Failed to fetch channel suggestions]', error)
        // }
    }

    return (
        <label className="w-full" htmlFor={id}>
        {label && (
            <div className="flex items-center mb-1 space-x-1.5">
                <div className="text-[11px] font-semibold uppercase opacity-70">
                    {label}
                </div>
            </div>
        )}
        <div className="flex">
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
                    className={clsx('flex truncate px-1.5 py-1.5 space-x-1', {
                    'bg-indigo-50 rounded dark:bg-black': focused
                    })}
                >
                    <img
                    src={suggestion?.picture}
                    className="w-5 h-5 rounded"
                    alt="pfp"
                    draggable={false}
                    />
                    <div className="overflow-hidden">
                    <p className="font-medium leading-4 truncate">
                        {suggestion?.id}
                    </p>
                    <span className="text-xs opacity-80">
                        {suggestion?.followers} subscribers
                    </span>
                    </div>
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