import VideoCard from '@app/components/Common/Cards/Video'
import { FetchInfiniteLatestFeed } from '@app/data/videos';
import { useInView } from 'react-intersection-observer'
import { useEffect } from 'react';
import Custom500 from '@app/pages/404';
import usePersistStore from '@app/store/persist';
import { NoDataFound } from '@app/components/UI/NoDataFound';
import MetaTags from '@components/Common/MetaTags';
import TimelineShimmer from '@components/Shimmers/TimelineShimmer';
import { Loader2 } from '../UI/Loader';

function Explore() {
    const { user, isLoggedIn } = usePersistStore();
    const { ref, inView } = useInView()
    const { isError, error, isSuccess, hasNextPage, isFetchingNextPage, fetchNextPage, data:videos } = FetchInfiniteLatestFeed( -1 );

    useEffect(() => {
        if (inView && hasNextPage) {
        fetchNextPage()
        }
    }, [inView, hasNextPage])
    
    if (videos?.length === 0) {
        return (
            <NoDataFound
                isCenter
                withImage
                text="No videos found"
            />
        )
    }

    if (isError) {
        return <Custom500 />
    }

    return (
        <>
            <MetaTags title="Feed" />
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

export default Explore