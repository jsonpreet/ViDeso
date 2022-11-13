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

// import CollectVideo from './CollectVideo'
// import MetaInfo from './MetaInfo'

const AboutChannel = ({ video }) => {
  const channel = video.ProfileEntryResponse
  const [clamped, setClamped] = useState(false)
  const [showMore, setShowMore] = useState(false)

  useEffect(() => {
    if (video.Body.trim().length > 300) {
      setClamped(true)
      setShowMore(true)
    }
  }, [video])

  return (
    <div className="flex items-start justify-between w-full bg-gray-100 p-4 rounded-xl">
      <div className="flex flex-col flex-1 overflow-hidden break-words">
        {video.Body !== null && (
          
            <Linkify options={LinkifyOptions}>
              {video.Body}
            </Linkify>
        )}
        {showMore && (
          <div className="inline-flex mt-3">
            <button
              type="button"
              onClick={() => setClamped(!clamped)}
              className="flex items-center text-xs outline-none hover:opacity-100 opacity-60"
            >
              {clamped ? (
                <>
                  Show more <BiChevronDown className="text-sm" />
                </>
              ) : (
                <>
                  Show less <BiChevronUp className="text-sm" />
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