import { FetchProfileFeed, GetProfileFeed } from '@app/data/channel';
import usePersistStore from '@app/store/persist';
import { VideoCard } from '@app/components/Common/Cards';
import { useInfiniteQuery } from '@tanstack/react-query';
import TimelineShimmer from '@app/components/Shimmers/TimelineShimmer';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import { NoDataFound } from '@app/components/UI/NoDataFound';
import { Loader2 } from '@app/components/UI/Loader';
import { NextSeo } from 'next-seo';

function ChannelVideos({channel}) {
    const { ref, inView } = useInView()
    const user = usePersistStore((state) => state.user)
    const isLoggedIn = usePersistStore((state) => state.isLoggedIn)
    const reader = isLoggedIn ? user.profile.PublicKeyBase58Check : '';
    const profileID = channel?.PublicKeyBase58Check || null;
    const { isLoading, isError, error, fetchNextPage, isFetchingNextPage, hasNextPage, isFetched, data: videos } = useInfiniteQuery(['single-profile-feed', profileID], ({ pageParam = ''}) => GetProfileFeed(profileID, -1, reader, pageParam),
        {
            getNextPageParam: (lastPage, pages) => {
                if(lastPage === null) {
                    return null;
                } else {
                    let last = lastPage.length > 0 ? lastPage[lastPage.length - 1]: lastPage;
                    return last.PostHashHex;
                }
            }
        }
    );

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
    
    if (isLoading) return (
        <div className='max-w-7xl w-full mx-auto'><TimelineShimmer cols={28} /></div>
    )
    if (isFetched) {
        return (
            <>
                <NextSeo
                    title={channel ? `${getProfileName(channel)} - ${APP.Name}` : APP.Name}
                    canonical={`${APP.URL}${router.asPath}`}
                    openGraph={{
                        title: channel ? `${getProfileName(channel)} - ${APP.Name}` : APP.Name,
                        url: `${APP.URL}${router.asPath}`,
                    }}
                />
                <div className='max-w-7xl mx-auto'>
                    <div className="grid gap-x-4 lg:grid-cols-4 md:gap-y-4 gap-y-2 2xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 xs:grid-col-1">
                        {videos.pages.map(page =>
                            page.map(video => {
                                return (
                                    <VideoCard userProfile={channel} key={`${video.PostHashHex}`} video={video} />
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
                </div>    
            </>
        )
    }
}

export default ChannelVideos