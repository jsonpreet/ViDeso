import { APP } from '@app/utils/constants'
import Modal from '@app/components/UI/Modal'
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
import { BiCopy } from 'react-icons/bi';

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
        <SimpleBar className='md:h-[70px] h-auto w-full'>
          <div className="md:flex grid grid-cols-5 md:grid-cols-1 md:items-center pb-4 md:gap-0 gap-3 flex-nowrap max-w-md">
            <div className='md:hidden inline-flex'>
              <button
                type="button"
                onClick={onCopyVideoUrl}
                className="flex items-center justify-center rounded-full w-[43px] h-[43px] bg-secondary hover-primary"
              >
                <BiCopy size={23} round />
              </button>
            </div>
            <div className='md:mr-4 mr-0'>
              <WhatsappShareButton
                url={`${APP.URL}/watch/${video.PostHashHex}`}
                title={video.Body ? video.Body : APP.Description}
                separator=":: "
                blankTarget={true}
              >
                <WhatsappIcon size={44} round />
              </WhatsappShareButton>
            </div>
            <div className='md:mr-4 mr-0'>
              <TwitterShareButton
                url={`${APP.URL}/watch/${video.PostHashHex}`}
                title={`${video.Body ? video.Body : APP.Description}`}
                via={APP.Twitter}
                blankTarget={true}
              >
                <TwitterIcon size={44} round />
              </TwitterShareButton>
            </div>
            <div className='md:mr-4 mr-0'>
              <FacebookShareButton
                url={`${APP.URL}/watch/${video.PostHashHex}`}
                quote={`${video.Body ? video.Body : APP.Description} via ${APP.Twitter}`}
                hashtag={'#Videso'}
                blankTarget={true}
              >
                <FacebookIcon size={44} round />
              </FacebookShareButton>
            </div>
            <div className='md:mr-4 mr-0'>
              <EmailShareButton
                url={`${APP.URL}/watch/${video.PostHashHex}`}
                subject={APP.Name}
                body={video.Body ? video.Body : APP.Description}
                blankTarget={true}
              >
                <EmailIcon size={44} round />
              </EmailShareButton>
            </div>
            <div className='md:mr-4 mr-0'>
              <PinterestShareButton
                url={`${APP.URL}/watch/${video.PostHashHex}`}
                quote={`${video.Body ? video.Body : APP.Description} via ${APP.Twitter}`}
                blankTarget={true}
              >
                <PinterestIcon size={44} round />
              </PinterestShareButton>
            </div>
            <div className='md:mr-4 mr-0'>
              <RedditShareButton
                url={`${APP.URL}/watch/${video.PostHashHex}`}
                quote={`${video.Body ? video.Body : APP.Description} via ${APP.Twitter}`}
                blankTarget={true}
              >
                <RedditIcon size={44} round />
              </RedditShareButton>
            </div>
            <div className='md:mr-4 mr-0'>
              <LinkedinShareButton url={`${APP.URL}/watch/${video.PostHashHex}`}>
                <LinkedinIcon size={44} round />
              </LinkedinShareButton>
            </div>
            <div className='md:mr-4 mr-0'>
              <TelegramShareButton
                url={`${APP.URL}/watch/${video.PostHashHex}`}
                quote={`${video.Body ? video.Body : APP.Description} via ${APP.Twitter}`}
                blankTarget={true}
              >
                <TelegramIcon size={44} round />
              </TelegramShareButton>
            </div>
            <div className='md:mr-4 mr-0'>
              <TumblrShareButton
                url={`${APP.URL}/watch/${video.PostHashHex}`}
                quote={`${video.Body ? video.Body : APP.Description} via ${APP.Twitter}`}
                blankTarget={true}
              >
                <TumblrIcon size={44} round />
              </TumblrShareButton>
            </div>
          </div>
        </SimpleBar>  
        <div className="items-center justify-between p-3 py-3 border shadow-inner customBorder bg-primary dark:border-gray-800 rounded-xl hidden md:flex">
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