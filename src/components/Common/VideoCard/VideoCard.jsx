import clsx from 'clsx'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Deso from 'deso-protocol'
import ThumbnailOverlays from './ThumbnailOverlays'
import IsVerified from '../IsVerified'
import { timeNow } from '@app/utils/functions'

// import IsVerified from '../IsVerified'
// import ReportModal from './ReportModal'
// import ShareModal from './ShareModal'
// import ThumbnailOverlays from './ThumbnailOverlays'
// import VideoOptions from './VideoOptions'



const VideoCard = ({ video }) => {
  const [showShare, setShowShare] = useState(false)
  const [showReport, setShowReport] = useState(false)
  const [videoData, setVideoData] = useState('')

  const userProfile = video.ProfileEntryResponse;
  const extraData = video.PostExtraData

  useEffect(() => {
    const deso = new Deso()
    const getVideoData = async () => {
      try {
        const videoID = video.VideoURLs[0].split('/').pop();
        const request = {
          "videoId": videoID
        };
        const videoData = await deso.media.getVideoStatus(request)
        setVideoData(videoData.data)
      } catch (error) {
        console.log(video.PostHashHex, error)
      }
    }
    if (video.VideoURLs[0] !== null) {
      getVideoData()
    }
  }, [video])


  const thumbnailUrl = video.VideoURLs[0] !== null ? `${video.VideoURLs[0].replace('iframe.', '')}/thumbnails/thumbnail.jpg?time=1s&height=1660` : ``;

  return (
    <div className="group">
      {video.IsHidden ? (
        <div className="grid h-full place-items-center">
          <span className="text-xs">Video Hidden by User</span>
        </div>
      ) : (
        <>
          {/* <ShareModal
            video={video}
            show={showShare}
            setShowShare={setShowShare}
          />
          <ReportModal
            video={video}
            show={showReport}
            setShowReport={setShowReport}
          /> */}
          <Link href={`/watch/${video.PostHashHex}`}>
            <div className="relative rounded-xl aspect-w-16 aspect-h-9">
              <img
                src={thumbnailUrl}
                draggable={false}
                className={clsx(
                  'object-center bg-gray-100 dark:bg-gray-900 w-full h-full rounded-xl lg:w-full lg:h-full object-cover'
                )}
                alt="thumbnail"
              />
              <ThumbnailOverlays video={video} data={videoData} />
            </div>
          </Link>
          <div className="p-2">
            <div className="flex items-start space-x-2.5">
              <Link href={`/watch/${video.id}`} className="flex-none mt-0.5">
                <img
                  className="w-8 h-8 rounded-full"
                  src={userProfile.ExtraData?.LargeProfilePicURL || `https://node.deso.org/api/v0/get-single-profile-picture/${userProfile.PublicKeyBase58Check}`}
                  alt="channel picture"
                  draggable={false}
                />
              </Link>
              <div className="grid flex-1 pb-1">
                <div className="flex w-full items-start justify-between space-x-1.5 min-w-0">
                  <Link
                    href={`/watch/${video.PostHashHex}`}
                    className="text-[15px] font-medium line-clamp-2 break-words"
                    >
                      Video by @{userProfile.Username}
                    {/* {userProfile.Username} */}
                  </Link>
                  {/* <VideoOptions
                    video={video}
                    setShowShare={setShowShare}
                    setShowReport={setShowReport}
                  /> */}
                </div>
                <Link
                  href={`/${userProfile.Username}`}
                  className="flex w-fit items-center space-x-0.5 text-[14px] hover:opacity-100 opacity-70"
                >
                  <span>{userProfile.Username}</span>
                  {userProfile.IsVerified ? <IsVerified size="xs" /> : null}
                </Link>
                <div className="flex overflow-hidden items-center text-[11px] opacity-70">
                  {/* <span className="whitespace-nowrap">
                    {video.stats?.totalUpvotes} likes
                  </span> */}
                  <span className="middot" />
                    <span className="whitespace-nowrap">
                      {timeNow(video.TimestampNanos)}
                    </span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default VideoCard