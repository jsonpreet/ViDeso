import { THUMBNAIL_GENERATE_COUNT } from '@app/components/Upload/VideoThumbnails'
import { useMemo } from 'react'

const ThumbnailsShimmer = () => {
  const thumbnails = useMemo(() => Array(THUMBNAIL_GENERATE_COUNT).fill(1), [])

  return (
    <>
      {thumbnails.map((e, i) => (
        <div key={`${e}_${i}`} className="w-full h-20 rounded-lg animate-pulse">
          <div className="h-20 bg-gray-300 rounded-lg dark:bg-gray-700" />
        </div>
      ))}
    </>
  )
}

export default ThumbnailsShimmer