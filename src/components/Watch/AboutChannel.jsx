import { LinkifyOptions } from '@app/utils/functions/getLinkifyOptions'
import { getProfilePicture } from '@app/utils/functions/getProfilePicture'
// import InterweaveContent from '@components/Common/InterweaveContent'
import IsVerified from '@components/Common/IsVerified'
// import SubscribeActions from '@components/Common/SubscribeActions'
import { Button } from '@components/UIElements/Button'
import clsx from 'clsx'
import Linkify from 'linkify-react'
import "linkify-plugin-hashtag"
import "linkify-plugin-mention"
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { AiOutlineRetweet } from 'react-icons/ai'
import { BiChevronDown, BiChevronUp } from 'react-icons/bi'
import { timeNow } from '@app/utils/functions'

// import CollectVideo from './CollectVideo'
// import MetaInfo from './MetaInfo'

const AboutChannel = ({ video }) => {
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
    <div className="flex items-start justify-between w-full bg-secondary p-4 rounded-xl">
      <div className="flex flex-col flex-1 overflow-hidden break-words">
        <div className='text-sm mb-3'>
          <span>Uploaded {timeNow(video.TimestampNanos)}</span>
        </div>
        {video.Body !== null && (
          <div className="text-sm md:text-base">
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