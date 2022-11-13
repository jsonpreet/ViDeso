import { getVideoThumbnail } from '@app/utils/functions/getVideoThumbnail'
import { CardShimmer } from '@components/Shimmers/VideoCardShimmer'
import { getOriginalVideoUrl, getPermanentVideoUrl, getVideoUrl, getPlaybackIdFromUrl } from '@utils/functions/getVideoUrl'
import axios from 'axios'
import dynamic from 'next/dynamic'
import React, { FC, useEffect, useState } from 'react'
import Linkify from 'linkify-react'
import "linkify-plugin-hashtag"
import "linkify-plugin-mention"
import { LinkifyOptions } from '@app/utils/functions/getLinkifyOptions'
import { getVideoTitle } from '@app/utils/functions/getVideoTitle'
import VideoMeta from './VideoMeta'
import VideoActions from './VideoActions'
import Link from 'next/link'
import IsVerified from '../Common/IsVerified'
import { getProfilePicture } from '@app/utils/functions/getProfilePicture'
import { Button } from '../UIElements/Button'

// import VideoActions from './VideoActions'
// import VideoMeta from './VideoMeta'

const VideoPlayer = dynamic(() => import('../Players/VideoPlayer'), {
  loading: () => <CardShimmer />,
  ssr: false
})

const Video = ({ video }) => {
  const userProfile = video.ProfileEntryResponse;
  const [videoUrl, setVideoUrl] = useState(getVideoUrl(video))
  const [videoID, setVideoID] = useState(getPlaybackIdFromUrl(video))
  const videoTitle = getVideoTitle(video)
//   const isSensitiveContent = getIsSensitiveContent(video.metadata, video.id)

  return (
    <div className="overflow-hidden">
      <VideoPlayer
        source={videoUrl}
        hls={`https://customer-wgoygazehbn8yt5i.cloudflarestream.com/${videoID}/manifest/video.m3u8`}
        poster={getVideoThumbnail(video, '0s')}
        // isSensitiveContent={isSensitiveContent}
      />
      <div className="flex flex-col">
        <div>
            <h1 className="mt-4 text-2xl font-medium line-clamp-2">
              <Linkify options={LinkifyOptions}>
                  {videoTitle}
              </Linkify>
            </h1>
          {/* <VideoMeta video={video} /> */}
        </div>
        <div className='flex justify-between items-center mt-3'>
          <div className='flex items-start space-x-3'>
            <Link href={`/${userProfile.Username}`} className="flex-none">
              <img
                className="w-10 h-10 rounded-full"
                src={getProfilePicture(userProfile)}
                alt={`${userProfile.Username} Picture`}
                draggable={false}
              />
            </Link>
            <div className='flex flex-col'>
              <Link
                href={`/${userProfile.Username}`}
                className="flex w-fit space-x-0.5 font-medium"
              >
                <span>{userProfile.Username}</span>
                {userProfile.IsVerified ? <IsVerified size="xs" /> : null}
              </Link>
              <span className="text-xs text-gray-500">
                200k subscribers
              </span>
            </div>
            <div>
              <Button variant="dark">
                <span>Subcribe</span>
              </Button>
            </div>
          </div>
          <div>
            <VideoActions video={video} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Video