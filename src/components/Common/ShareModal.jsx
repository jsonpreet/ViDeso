import { APP } from '@app/utils/constants'
import Modal from '@components/UIElements/Modal'
import useCopyToClipboard from '@utils/hooks/useCopyToClipboard'
import toast from 'react-hot-toast'
import SimpleBar from 'simplebar-react';
import {
  FacebookShareButton,
  FacebookIcon,
  PinterestShareButton,
  PinterestIcon,
  RedditShareButton,
  RedditIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
  EmailShareButton,
  EmailIcon,
  LinkedinShareButton,
  LinkedinIcon,
  TelegramShareButton,
  TelegramIcon,
  TumblrShareButton,
  TumblrIcon,
} from 'next-share';
// import { AiOutlineRetweet } from 'react-icons/ai'
import { useDetectClickOutside } from 'react-detect-click-outside'

const ShareModal = ({ rootRef, show, setShowShare, video }) => {
  const [copy] = useCopyToClipboard()

  const onCopyVideoUrl = async () => {
    await copy(`${APP.URL}/watch/${video.PostHashHex}`)
    toast.success('Link copied to clipboard')
  }

  return (
    <Modal
      title="Share"
      onClose={() => setShowShare(false)}
      show={show}
      ref={rootRef}
      panelClassName="w-full max-w-lg"
    >
      <div className="w-full mt-2">
        <SimpleBar style={{ height: `60px`, width: `100%` }}>
        <div className="flex items-center pb-4 space-x-4 flex-nowrap max-w-md">
          <WhatsappShareButton
            url={`${APP.URL}/watch/${video.PostHashHex}`}
            title={video.Body ? video.Body : APP.Description}
            separator=":: "
            blankTarget={true}
          >
            <WhatsappIcon size={44} round />
          </WhatsappShareButton>
          <TwitterShareButton
            url={`${APP.URL}/watch/${video.PostHashHex}`}
            title={`${video.Body ? video.Body : APP.Description}`}
            via={APP.Twitter}
            blankTarget={true}
          >
            <TwitterIcon size={44} round />
          </TwitterShareButton>
          <FacebookShareButton
            url={`${APP.URL}/watch/${video.PostHashHex}`}
            quote={`${video.Body ? video.Body : APP.Description} via ${APP.Twitter}`}
            hashtag={'#Videso'}
            blankTarget={true}
          >
            <FacebookIcon size={44} round />
          </FacebookShareButton>
          <EmailShareButton
            url={`${APP.URL}/watch/${video.PostHashHex}`}
            subject={APP.Name}
            body={video.Body ? video.Body : APP.Description}
            blankTarget={true}
          >
            <EmailIcon size={44} round />
          </EmailShareButton>
          <PinterestShareButton
            url={`${APP.URL}/watch/${video.PostHashHex}`}
            quote={`${video.Body ? video.Body : APP.Description} via ${APP.Twitter}`}
            blankTarget={true}
          >
            <PinterestIcon size={44} round />
          </PinterestShareButton>
          <RedditShareButton
            url={`${APP.URL}/watch/${video.PostHashHex}`}
            quote={`${video.Body ? video.Body : APP.Description} via ${APP.Twitter}`}
            blankTarget={true}
          >
            <RedditIcon size={44} round />
          </RedditShareButton>
          <LinkedinShareButton url={`${APP.URL}/watch/${video.PostHashHex}`}>
            <LinkedinIcon size={44} round />
          </LinkedinShareButton>
          <TelegramShareButton
            url={`${APP.URL}/watch/${video.PostHashHex}`}
            quote={`${video.Body ? video.Body : APP.Description} via ${APP.Twitter}`}
            blankTarget={true}
          >
            <TelegramIcon size={44} round />
          </TelegramShareButton>
          <TumblrShareButton
            url={`${APP.URL}/watch/${video.PostHashHex}`}
            quote={`${video.Body ? video.Body : APP.Description} via ${APP.Twitter}`}
            blankTarget={true}
          >
            <TumblrIcon size={44} round />
          </TumblrShareButton>
        </div>
        </SimpleBar>  
        <div className="flex items-center justify-between p-3 py-3 border shadow-inner customBorder bg-primary dark:border-gray-800 rounded-xl">
          <div className="text-sm truncate select-all pr-2">
            {APP.URL}/watch/{video.PostHashHex}
          </div>
          <button
            className="ml-2 focus:outline-none primary-button py-2 px-4 font-semibold text-sm rounded-full"
            onClick={() => onCopyVideoUrl()}
            type="button"
          >
            Copy
          </button>
        </div>
      </div>
      </Modal>
  )
}

export default ShareModal