import VideoCard from '@components/Common/Cards/Video'
import TimelineShimmer from '@components/Shimmers/TimelineShimmer';
import { useInView } from 'react-intersection-observer'
import { useEffect } from 'react';
import { FetchInfiniteFollowingFeed } from '@data/feed';
import usePersistStore from '@store/persist';
import { NoDataFound } from '@components/UI/NoDataFound';
import { Loader2 } from '../UI/Loader';


const Timeline = () => {
    const { ref, inView } = useInView()
    const { isLoggedIn, user } = usePersistStore()
    const reader = user.profile.PublicKeyBase58Check;
    const { isError, error, isSuccess, hasNextPage, isFetchingNextPage, fetchNextPage, data:videos } = FetchInfiniteFollowingFeed(reader, -1 );

    useEffect(() => {
        if (inView && hasNextPage) {
            fetchNextPage()
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inView, hasNextPage])

    if (isError) {
        return <NoDataFound 
            isCenter
            withImage
            title="Something went wrong"
            description="We are unable to fetch the latest videos. Please try again later."
          />
    } 

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
                {/* {isFetchingNextPage && hasNextPage && <div><TimelineShimmer cols={28} /></div>} */}
                
                <div className='loadMore flex items-center justify-center mt-10'>
                    <div className='loadMoreButton'>
                        <div ref={ref} onClick={fetchNextPage} disabled={!hasNextPage || isFetchingNextPage} className='btn'>
                            {isFetchingNextPage
                                ? <Loader2 />
                                : hasNextPage
                                    ? 'Load More'
                                    : 'Nothing more to load'}
                        </div>
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