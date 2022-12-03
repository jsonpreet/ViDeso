import VideoCard from '@app/components/Common/Cards/Video'
import { useInView } from 'react-intersection-observer'
import { useEffect } from 'react';
import Custom500 from '@app/pages/404';
import usePersistStore from '@app/store/persist';
import { NoDataFound } from '@app/components/UI/NoDataFound';
import MetaTags from '@app/components/Common/MetaTags';
import TimelineShimmer from '@app/components/Shimmers/TimelineShimmer';
import { APP } from '@app/utils/constants';
import { getShuffleArray } from '@app/utils/functions/getShuffleArray';
import { FetchInfiniteHotFeed, GetHotFeed } from '@app/data/hot';
import { Loader2 } from '@app/components/UI/Loader';
import { NextSeo } from 'next-seo';

function Category() {
    const { ref, inView } = useInView()
    const user = usePersistStore((state) => state.user)
    const isLoggedIn = usePersistStore((state) => state.isLoggedIn)
    const reader = isLoggedIn ? user.profile.PublicKeyBase58Check : APP.PublicKeyBase58Check;
    const { isError, error, isSuccess, hasNextPage, isFetchingNextPage, fetchNextPage, data } = FetchInfiniteHotFeed(reader);  

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
                {data.pages.map(page =>
                    getShuffleArray(page.posts).map(video => {
                    return (
                        <VideoCard userProfile={video.ProfileEntryResponse} key={`${video.PostHashHex}`} video={video} />
                    )
                    }))}
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

export default Category