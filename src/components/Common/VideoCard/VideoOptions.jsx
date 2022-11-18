
import useAppStore from '@app/store/app'
import usePersistStore from '@app/store/persist'
import { APP } from '@app/utils/constants'
import { isAlreadyAddedToWatchLater } from '@app/utils/functions'
import DropMenu, { NextLink } from '@components/UIElements/DropMenu'
import { Menu } from '@vime/react'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'
import { AiOutlineDelete } from 'react-icons/ai'
import { BsClock, BsThreeDotsVertical } from 'react-icons/bs'
import { FiClock, FiExternalLink, FiFlag } from 'react-icons/fi'
import { HiOutlineDotsVertical } from 'react-icons/hi'
import { MdOutlineWatchLater } from 'react-icons/md'
import { RiShareForwardLine } from 'react-icons/ri'

const VideoOptions = ({
  video,
  setShowShare,
  setShowReport,
  isSuggested = false,
  showOnHover = true
}) => {
  const { addToWatchLater, removeFromWatchLater, watchLater, isLoggedIn, user } = usePersistStore();
  const reporterID = isLoggedIn ? user.profile.PublicKeyBase58Check : APP.PublicKeyBase58Check;

  const ownerID = isLoggedIn ? user.profile.PublicKeyBase58Check : null;

  const router = useRouter()
  const isVideoOwner = isLoggedIn ? user.profile.PublicKeyBase58Check === video?.ProfileEntryResponse?.PublicKeyBase58Check : false

  // const [hideVideo] = useMutation(HidePublicationDocument, {
  //   onCompleted: () => {
  //     toast.success('Video deleted')
  //     Analytics.track(TRACK.DELETE_VIDEO)
  //     router.reload()
  //   }
  // })

  const onHideVideo = () => {
    if (
      confirm(
        'This can’t be undone. The post will be removed from your profile, from search results, and from the feeds of anyone who follows you.'
      )
    ) {
      // hideVideo({ variables: { request: { publicationId: video?.id } } })
    }
  }

  const onClickWatchLater = () => {
    isAlreadyAddedToWatchLater(video, watchLater)
      ? removeFromWatchLater(video)
      : addToWatchLater(video)
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
          <BsThreeDotsVertical size={isSuggested ? 17 : 22} />
        </div>
      }
    >
      <div className="py-2 my-1 overflow-hidden rounded-lg dropdown-shadow bg-dropdown outline-none ring-0 focus:outline-none focus:ring-0 w-44">
        <div className="flex flex-col text-[14px] transition duration-150 ease-in-out rounded-lg">
          <button
            type="button"
            onClick={() => setShowShare(true)}
            className="inline-flex items-center px-3 py-2 space-x-3 hover-primary"
          >
            <RiShareForwardLine size={22} />
            <span className="whitespace-nowrap">Share</span>
          </button>
          <button
            type="button"
            onClick={() => onClickWatchLater()}
            className="inline-flex items-center px-3 py-2 space-x-3 hover-primary"
          >
            <FiClock size={19} />
            <span className="whitespace-nowrap">
              {isAlreadyAddedToWatchLater(video, watchLater)
                ? 'Remove from Watch Later'
                : 'Watch Later'}
            </span>
          </button>
          {isVideoOwner && (
            <>
              <button
                type="button"
                onClick={() => onHideVideo()}
                className="inline-flex items-center px-3 py-2 space-x-3 text-red-500 opacity-100 hover:bg-red-100 dark:hover:bg-red-900"
              >
                <AiOutlineDelete size={19} className="ml-0.5" />
                <span className="whitespace-nowrap">Delete</span>
              </button>
            </>
          )}
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