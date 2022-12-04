
import { APP } from '@utils/constants'
import useCopyToClipboard from '@utils/hooks/useCopyToClipboard'
import useOutsideClick from '@utils/hooks/useOutsideClick'
import { useRouter } from 'next/router'
import { forwardRef, useRef } from 'react'
import toast from 'react-hot-toast'
import { BiCheck, BiRepost } from 'react-icons/bi'
import { BsLink, BsCode } from "react-icons/bs";

const PlayerContextMenu = forwardRef(({ position, hideContextMenu, isVideoLoop, setIsVideoLoop }, ref) => {
    const { query } = useRouter()
    const [copy] = useCopyToClipboard()
    const contextMenuRef = useRef(null)
    useOutsideClick(contextMenuRef, () => hideContextMenu())

    const toggleLoop = () => {
      const { current } = ref
      if (!current) return
      const isLooped = current.loop
      current.loop = !isLooped
      setIsVideoLoop(!isLooped)
      hideContextMenu()
    }

    const onCopyVideoUrl = async () => {
      await copy(`${APP.URL}/watch/${query.id}`)
      toast.success('Video link copied')
      hideContextMenu()
    }

    const onCopyVideoEmbed = async () => {
      await copy(`${APP.EMBED_URL}/${query.id}`)
      toast.success('Video embed code copied')
      hideContextMenu()
    }

    const onCopyAtCurrentTime = async () => {
      const { current } = ref
      if (!current) return
      const selectedTime = Math.trunc(current.currentTime)
      await copy(`${APP.URL}/watch/${query.id}?t=${selectedTime}`)
      toast.success(`Video link copied`)
      hideContextMenu()
  }

    return (
      <div
        className="absolute z-10 py-2 text-sm text-white bg-gray-900 bg-opacity-70 rounded-xl"
        style={{ top: position.y, left: (position.x - `280`) }}
        ref={contextMenuRef}
      >
        <div
            className="px-3 py-2 cursor-pointer hover:bg-gray-700"
            onClick={toggleLoop}
            role="button"
            >
                <div className="flex items-center justify-between">
                    <div className="flex text-[13px] font-semibold items-center space-x-2">
                        <BiRepost size={20} />
                        <p className="flex-none">Loop</p>
                    </div>
                    {isVideoLoop && <BiCheck size={20} />}
                </div>
            </div>
            <div
            className="px-3 py-2 cursor-pointer hover:bg-gray-700"
            onClick={onCopyVideoUrl}
            role="button"
            >
                <div className="flex text-[13px] font-semibold items-center space-x-2">
                    <BsLink size={20} />
                    <p className="flex-none">Copy video URL</p>
                </div>
            </div>
            <div
            className="px-3 py-2 cursor-pointer hover:bg-gray-700"
            onClick={onCopyAtCurrentTime}
            role="button"
            >
                <div className="flex text-[13px] font-semibold items-center space-x-2">
                    <BsLink size={20} />
                    <p className="flex-none">Copy video URL at current time</p>
                </div>
            </div>
            <div
            className="px-3 py-2 cursor-pointer hover:bg-gray-700"
            onClick={onCopyVideoEmbed}
            role="button"
            >
                <div className="flex text-[13px] font-semibold items-center space-x-2">
                    <BsCode size={20} />
                    <p className="flex-none">Copy embed code</p>
                </div>
            </div>
      </div>
    )
  }
)

PlayerContextMenu.displayName = 'PlayerContextMenu'

export default PlayerContextMenu