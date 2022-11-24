import { CardShimmer } from '@components/Shimmers/VideoCardShimmer'
import { getVideoUrl } from '@utils/functions/getVideoUrl'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import Linkify from 'linkify-react'
import "linkify-plugin-hashtag"
import "linkify-plugin-mention"
import { LinkifyOptions } from '@app/utils/functions/getLinkifyOptions'
import { getVideoTitle } from '@app/utils/functions/getVideoTitle'
import VideoMeta from './VideoMeta'
import VideoActions from './VideoActions'
import ChannelInfo from './ChannelInfo'

const VideoPlayer = dynamic(() => import('../Player/VideoPlayer'), {
  loading: () => <CardShimmer />,
  ssr: false
})

const Video = ({ views, videoData, video, poster }) => {
  const userProfile = video.ProfileEntryResponse;
  const [videoUrl, setVideoUrl] = useState(getVideoUrl(video))
  const videoTitle = getVideoTitle(video)

  return (
    <>
      <VideoPlayer
        source={videoUrl}
        videoData={videoData}
        hls={videoData.hls}
        video={video}
        poster={poster}
      />
      <div className="md:px-0 px-3 flex flex-col">
        <div>
            <h1 className="text-lg md:text-2xl font-medium line-clamp-2">
              <Linkify options={LinkifyOptions}>
                {videoTitle}
              </Linkify>
            </h1>
          {/* <VideoMeta video={video} /> */}
        </div>
        <div className='flex md:flex-row flex-col justify-between md:items-center mt-3'>
          <ChannelInfo views={views} channel={userProfile} video={video}/>
          <div>
            <VideoActions video={video} />
          </div>
        </div>
      </div>
    </>
  )
}

export default Video