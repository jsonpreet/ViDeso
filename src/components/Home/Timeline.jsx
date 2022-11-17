import VideoCard from '@app/components/Common/VideoCard/VideoCard'
import TimelineShimmer from '../Shimmers/TimelineShimmer';
import { FetchInfiniteLatestFeed } from '@app/data/videos';
import { useInView } from 'react-intersection-observer'
import { useEffect } from 'react';


const Timeline = () => {
  const { ref, inView } = useInView()
  const { isError, error, isSuccess, hasNextPage, isFetchingNextPage, fetchNextPage, data:videos } = FetchInfiniteLatestFeed( -1 );
  if (isError) {
      console.log('error', error)
      //return ( <ErrorLoader error={error}/>  )
  }
  // const splicedVideos = videos.splice(0, 24);
  // console.log('spliced videos', splicedVideos);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage()
    }
  }, [inView, hasNextPage])

  return (
    <>
      {
        isSuccess ? (
          <>
            <div className="grid gap-x-4 lg:grid-cols-4 md:gap-y-4 gap-y-2 2xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 xs:grid-col-1">
              {videos.pages.map(page => 
                page.map(video => {
                  return (
                    <VideoCard userProfile={video.ProfileEntryResponse} key={`${video.PostHashHex}`} video={video} />
                  )
                })
              )}
            </div>
            {isFetchingNextPage && hasNextPage && <div><TimelineShimmer cols={28} /></div>}
            <div className='loadMore'>
              <div className='loadMoreButton'>
                <button ref={ref} onClick={fetchNextPage} disabled={!hasNextPage || isFetchingNextPage}  className='btn'>
                  {isFetchingNextPage
                  ? 'Loading more...'
                  : hasNextPage
                  ? 'Load More'
                  : 'Nothing more to load'}
                </button>
              </div>
            </div>
          </>
        )
        : (
          <div><TimelineShimmer cols={28} /></div>
        )
      }
    </>
    
  )
 
}

export default Timeline