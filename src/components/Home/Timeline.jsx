import VideoCard from '@app/components/Common/VideoCard/VideoCard'
// import CommentedVideoCard from '@components/Library/CommentedVideoCard'
// import MirroredVideoCard from '@components/Library/MirroredVideoCard'


const Timeline = ({ videos, videoType = 'Post' }) => {
  const isComment = videoType === 'Comment'
  const isMirror = videoType === 'Mirror'
  return (
    <div className="grid gap-x-8 lg:grid-cols-4 md:gap-y-8 gap-y-2 2xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 xs:grid-col-1">
      {videos?.map((video) => {
        return <VideoCard key={`${video?.PostHashHex}`} video={video} />
      })}
    </div>
  )
}

export default Timeline