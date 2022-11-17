import VideoCard from '@app/components/Common/VideoCard/VideoCard'
import TimelineShimmer from '../Shimmers/TimelineShimmer';
import { FetchInfiniteLatestFeed } from '@app/data/videos';
import { useInView } from 'react-intersection-observer'
import { useEffect } from 'react';
import Custom500 from 'pages/404';
import { NoDataFound } from '../UIElements/NoDataFound';
import usePersistStore from '@app/store/persist';
import MetaTags from '../Common/MetaTags';
import { Button } from '../UIElements/Button';

function Feed() {
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
                text="No videos found, Please Subscribe to channels to see their videos."
            />
        )
    }

    if (!isLoggedIn) {
        return (
            <NoDataFound
                isCenter
                withImage
                heading="Don’t miss new videos"
                text="Sign in to see updates from your favorite YouTube channels"
                isLoginButton={true}
                isHeading={true}
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

export default Feed