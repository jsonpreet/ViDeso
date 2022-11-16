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
import Deso from 'deso-protocol'
import { getThumbDuration } from '@app/utils/functions'
import { generateVideoThumbnails } from '@app/utils/functions/generateVideoThumbnails'
import ChannelInfo from './ChannelInfo'

// import VideoActions from './VideoActions'
// import VideoMeta from './VideoMeta'

const VideoPlayer = dynamic(() => import('../Player/VideoPlayer'), {
  loading: () => <CardShimmer />,
  ssr: false
})

const Video = ({ videoData, video, poster }) => {
  const userProfile = video.ProfileEntryResponse;
  const [videoUrl, setVideoUrl] = useState(getVideoUrl(video))
  const videoTitle = getVideoTitle(video)
//   const isSensitiveContent = getIsSensitiveContent(video.metadata, video.id)

  return (
    <>
      <VideoPlayer
        source={videoUrl}
        videoData={videoData.data}
        hls={`https://customer-wgoygazehbn8yt5i.cloudflarestream.com/${videoData.id}/manifest/video.m3u8`}
        poster={poster}
      // isSensitiveContent={isSensitiveContent}
      />
      <div className="flex flex-col">
        <div>
            <h1 className="mt-4 text-lg md:text-2xl font-medium line-clamp-2">
              <Linkify options={LinkifyOptions}>
                {videoTitle}
              </Linkify>
            </h1>
          {/* <VideoMeta video={video} /> */}
        </div>
        <div className='flex md:flex-row flex-col justify-between md:items-center mt-3'>
          <ChannelInfo channel={userProfile} video={video}/>
          <div>
            <VideoActions video={video} />
          </div>
        </div>
      </div>
    </>
  )
}

export default Video