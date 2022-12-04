import { getProfileName } from '@utils/functions/getProfileName'
import { getProfilePicture } from '@utils/functions/getProfilePicture'
import { getVideoTitle } from '@utils/functions/getVideoTitle'
import Link from 'next/link'
import { isBrowser } from 'react-device-detect'
import IsVerified from '../Common/IsVerified'
import Tooltip from '../UI/Tooltip'

const BottomOverlay = ({ video }) => {
    const userProfile = video.ProfileEntryResponse
    return (
        <div className="absolute rounded-br-xl rounded-bl-xl bottom-0 left-0 right-0 px-3 pt-5 pb-3 bg-gradient-to-t from-gray-900 to-transparent">
            <div className="pb-2">
                <h1 className="text-white line-clamp-2">{getVideoTitle(video, userProfile)}</h1>
            </div>
            <div className="flex items-center justify-between">
                <div className="min-w-0">
                    <Link
                        href={`/@${userProfile?.Username}`}
                        className="flex items-center flex-none space-x-2 cursor-pointer"
                    >
                        <img
                            src={getProfilePicture(userProfile)}
                            className="w-9 h-9 rounded-xl"
                            draggable={false}
                            alt={getProfileName(userProfile)}
                        />
                        <div className="flex flex-col items-start text-white min-w-0">
                            <h6 className="flex items-center space-x-1 max-w-full">
                                {isBrowser ?
                                    <Tooltip placement='top' contentClass='text-[12px]' title={getProfileName(userProfile)}>
                                        <span>{getProfileName(userProfile)}</span>
                                    </Tooltip>
                                    :
                                    <span>{getProfileName(userProfile)}</span>
                                }
                                {userProfile.IsVerified ?
                                    <Tooltip placement='top' contentClass='text-[12px]' title='Verified'>
                                        <span><IsVerified color="text-gray-300 dark:text-gray-300"  size="xs" /></span>
                                    </Tooltip>
                                    : null
                                }
                            </h6>
                            <span className="inline-flex items-center space-x-1 text-xs">
                                subscribers
                            </span>
                        </div>
                    </Link>
                </div>
                <div className="flex items-center space-x-2">
                
                </div>
            </div>
        </div>
    )
}

export default BottomOverlay