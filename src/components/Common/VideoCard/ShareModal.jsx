import { APP } from '@app/utils/constants'
import Modal from '@components/UIElements/Modal'
import Link from 'next/link'
import { IoCopyOutline } from 'react-icons/io5'
import useCopyToClipboard from '@utils/hooks/useCopyToClipboard'
import toast from 'react-hot-toast'
import {
  FacebookShareButton,
  FacebookIcon,
  PinterestShareButton,
  PinterestIcon,
  RedditShareButton,
  RedditIcon,
  TwitterShareButton,
  TwitterIcon,
} from 'next-share';
// import { AiOutlineRetweet } from 'react-icons/ai'

const ShareModal = ({ show, setShowShare, video }) => {
  const [copy] = useCopyToClipboard()

  const onCopyVideoUrl = async () => {
    await copy(`${LENSTUBE_URL}/watch/${video.id}`)
    toast.success('Link copied to clipboard')
  }

  return (
    <Modal
      title="Share"
      onClose={() => setShowShare(false)}
      show={show}
      panelClassName="max-w-md"
    >
      <div className="mt-2">
        <div className="flex items-center mb-4 space-x-2 overflow-x-auto flex-nowrap no-scrollbar">
          <TwitterShareButton
            url={`${APP.URL}/watch/{video.PostHashHex}`}
            title={APP.Description}
          >
            <TwitterIcon size={32} round />
          </TwitterShareButton>
          <FacebookShareButton
            url={`${APP.URL}/watch/{video.PostHashHex}`}
            quote={APP.Description}
            hashtag={'#Videso'}
            blankTarget={true}
          >
            <FacebookIcon size={32} round />
          </FacebookShareButton>
          <PinterestShareButton
            url={`${APP.URL}/watch/{video.PostHashHex}`}
            media={APP.Description}
            blankTarget={true}
          >
            <PinterestIcon size={32} round />
          </PinterestShareButton>
          <RedditShareButton
            url={`${APP.URL}/watch/{video.PostHashHex}`}
            title={APP.Description}
            blankTarget={true}
          >
            <RedditIcon size={32} round />
          </RedditShareButton>
        </div>
        <div className="flex items-center justify-between p-2 border border-gray-200 rounded-lg dark:border-gray-800">
          <div className="text-sm truncate select-all">
            {APP.Name}/watch/{video.PostHashHex}
          </div>
          <button
            className="ml-2 hover:opacity-60 focus:outline-none"
            onClick={() => onCopyVideoUrl()}
            type="button"
          >
            <IoCopyOutline />
          </button>
        </div>
      </div>
    </Modal>
  )
}

export default ShareModal