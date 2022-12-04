import { LinkifyOptions } from '@utils/functions/getLinkifyOptions'
import Linkify from 'linkify-react'
import "linkify-plugin-hashtag"
import "linkify-plugin-mention"
import { useEffect, useState } from 'react'
import { BiChevronDown, BiChevronUp } from 'react-icons/bi'
import { timeNow } from '@utils/functions'
import VideoMeta from './VideoMeta'

const AboutChannel = ({views, video }) => {
  const channel = video.ProfileEntryResponse
  const [clamped, setClamped] = useState(false)
  const [showMore, setShowMore] = useState(false)

  useEffect(() => {
    if (video.Body.trim().length > 200) {
      setClamped(true)
      setShowMore(true)
    }
  }, [video])

  return (
    <div className="flex items-start justify-between w-full bg-secondary p-4 rounded-none md:rounded-xl">
      <div className="flex flex-col flex-1 overflow-hidden break-words">
        <div className='text-[14px] flex space-x-1 items-center font-medium mb-3'>
          <span>{views > 1 ? `${views} views` : `${views} view`}</span>
          <span className='middot'></span>
          {/* <span>{timeNow(video.TimestampNanos)}</span> */}
          <VideoMeta video={video} />
        </div>
        {video.Body !== null && (
          <div className="text-sm md:text-sm">
          <Linkify options={LinkifyOptions}>
            {clamped ? video.Body.trim().substring(0, 200) : video.Body}
            </Linkify>
          </div>
        )}
        {showMore && (
          <div className="inline-flex mt-3">
            <button
              type="button"
              onClick={() => setClamped(!clamped)}
              className="flex items-center text-sm outline-none hover:opacity-100 opacity-80"
            >
              {clamped ? (
                <>
                  Show more <BiChevronDown size={20} className='-mt-[2px]' />
                </>
              ) : (
                <>
                  Show less <BiChevronUp size={20} className='-mt-[2px]' />
                </>
              )}
            </button>
          </div>
        )}
        {/* <div className="flex justify-end mt-4">
          <MetaInfo video={video} />
        </div> */}
      </div>
    </div>
  )
}

export default AboutChannel