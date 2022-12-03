import usePersistStore from '@app/store/persist'
import { APP } from '@app/utils/constants'
import DropMenu from '@app/components/UI/DropMenu'
import clsx from 'clsx'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { FiFlag } from 'react-icons/fi'
import { RiShareForwardLine } from 'react-icons/ri'
import WatchLater from '@app/components/Common/WatchLater'
import { useEffect, useState } from 'react'
import { useSupabaseClient } from '@supabase/auth-helpers-react'

const VideoOptions = ({
  video,
  setShowShare,
  isSuggested = false,
  showOnHover = true
}) => {
  const { isLoggedIn, user } = usePersistStore();
  const supabase = useSupabaseClient();
  const reporterID = isLoggedIn ? user.profile.PublicKeyBase58Check : APP.PublicKeyBase58Check;
  const isVideoOwner = isLoggedIn ? user.profile.PublicKeyBase58Check === video?.ProfileEntryResponse?.PublicKeyBase58Check : false
  const [alreadyAddedToWatchLater, setAlreadyAddedToWatchLater] = useState(false)
  const reader = isLoggedIn ? user.profile.PublicKeyBase58Check : APP.PublicKeyBase58Check;

  useEffect(() => {
    if (video) {
      isAlreadyAddedToWatchLater();
    }
  }, [video])

  const isAlreadyAddedToWatchLater = () => {
    supabase.from('watchlater').select('*').eq('user', reporterID).eq('posthash', video.PostHashHex).then((res) => {
      if (res.data.length > 0) {
          setAlreadyAddedToWatchLater(true)
      } else {
          setAlreadyAddedToWatchLater(false)
      }
      if (res.error) {
          logger.error(video.PostHashHex, 'watched', res.error);
      }
    })
  }

  const addToWatchLater = () => {
    supabase.from('watchlater').insert([{ user: reporterID, posthash: video.PostHashHex }]).then((res) => {
      if (res.error) {
          logger.error(video.PostHashHex, 'watched', res.error);
      } else {
          setAlreadyAddedToWatchLater(true)
      }
    })
  }

  const removeFromWatchLater = () => {
    supabase.from('watchlater').delete().eq('user', reporterID).eq('posthash', video.PostHashHex).then((res) => {
      if (res.error) {
          logger.error(video.PostHashHex, 'watched', res.error);
      } else {
          setAlreadyAddedToWatchLater(false)
      }
    })
  }

  const onClickWatchLater = () => {
    alreadyAddedToWatchLater
    ? removeFromWatchLater()
    : addToWatchLater()
  }

  return (
    <DropMenu
      trigger={
        <div
          className={clsx(
            'hover-primary rounded-full w-9 h-9 flex items-center justify-center md:text-inherit outline-none ring-0 group-hover:visible transition duration-150 ease-in-out md:-mr-4 focus:outline-none focus:ring-0',
            {
              'lg:invisible': showOnHover
            }
          )}
        >
          <BsThreeDotsVertical size={17} />
        </div>
      }
    >
      <div className="py-2 my-1 overflow-hidden rounded-lg dropdown-shadow bg-dropdown outline-none ring-0 focus:outline-none focus:ring-0 w-56">
        <div className="flex flex-col text-[14px] transition duration-150 ease-in-out rounded-lg">
          <button
            type="button"
            onClick={() => setShowShare(true)}
            className="inline-flex items-center px-3 py-2 space-x-3 hover-primary"
          >
            <RiShareForwardLine size={22} />
            <span className="whitespace-nowrap">Share</span>
          </button>
          {isLoggedIn ? <WatchLater onClickWatchLater={onClickWatchLater} alreadyAddedToWatchLater={alreadyAddedToWatchLater} /> : null}
          <a
            href={`https://desoreporting.aidaform.com/content?ReporterPublicKey=${reporterID}&PostHash=${video.PostHashHex}&ReportedAccountPublicKey=${video.ProfileEntryResponse?.PublicKeyBase58Check}&ReportedAccountUsername=${video.ProfileEntryResponse?.Username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-3 py-2 space-x-3 hover-primary"
          >
              <FiFlag size={18} className="ml-0.5" />
              <span className="whitespace-nowrap">Report</span>
          </a>
        </div>
      </div>
    </DropMenu>
  )
}

export default VideoOptions