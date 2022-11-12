import Modal from '@components/UIElements/Modal'
// import useCopyToClipboard from '@utils/hooks/useCopyToClipboard'
// import Link from 'next/link'
// import toast from 'react-hot-toast'
// import { AiOutlineRetweet } from 'react-icons/ai'
// import { IoCopyOutline } from 'react-icons/io5'

const ShareModal = ({ show, setShowShare, video }) => {
  // const [copy] = useCopyToClipboard()

  // const onCopyVideoUrl = async () => {
  //   await copy(`${LENSTUBE_URL}/watch/${video.id}`)
  //   toast.success('Link copied to clipboard')
  // }

  return (
    <Modal
      title="Share"
      onClose={() => setShowShare(false)}
      show={show}
      panelClassName="max-w-md"
    >
      <div className="mt-2">
        <div className="flex items-center mb-4 space-x-2 overflow-x-auto flex-nowrap no-scrollbar">
        </div>
      </div>
    </Modal>
  )
}

export default ShareModal