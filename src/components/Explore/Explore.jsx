import VideoCard from '@components/Common/Cards/Video'
import { FetchInfiniteLatestFeed } from '@data/videos';
import { useInView } from 'react-intersection-observer'
import { useEffect } from 'react';
import Custom500 from '@pages/404';
import usePersistStore from '@store/persist';
import { NoDataFound } from '@components/UI/NoDataFound';
import TimelineShimmer from '@components/Shimmers/TimelineShimmer';
import { Loader2 } from '../UI/Loader';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import { APP } from '@utils/constants';

function Explore() {
    const { user, isLoggedIn } = usePersistStore();
    const { ref, inView } = useInView()
    const router = useRouter()
    const { isError, error, isSuccess, hasNextPage, isFetchingNextPage, fetchNextPage, data:videos } = FetchInfiniteLatestFeed( -1 );

    useEffect(() => {
        if (inView && hasNextPage) {
            fetchNextPage()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
            <NextSeo
                title='Explore'
                canonical={`${APP.URL}${router.asPath}`}
                openGraph={{
                    title: 'Explore',
                    url: `${APP.URL}${router.asPath}`,
                }}
            />
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