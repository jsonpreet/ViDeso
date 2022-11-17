import { FetchProfile, FetchProfileFeed, GetProfileFeed } from '@app/data/channel';
import usePersistStore from '@app/store/persist';
import { useRouter } from 'next/router'
import { VideoCard } from '@app/components/Common/VideoCard';
import ChannelShimmer from '@app/components/Shimmers/ChannelShimmer';
import { useInfiniteQuery } from '@tanstack/react-query';
import TimelineShimmer from '../Shimmers/TimelineShimmer';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';

function Channel() {
    const { query } = useRouter();
    const username = query.channel;
    const { ref, inView } = useInView()
    const user = usePersistStore((state) => state.user)
    const isLoggedIn = usePersistStore((state) => state.isLoggedIn)
    const reader = isLoggedIn ? user.profile.PublicKeyBase58Check : '';
    const { data: profile } = FetchProfile(username);
    const profileID = profile?.PublicKeyBase58Check || null;
    const { isLoading, isError, error, fetchNextPage, isFetchingNextPage, hasNextPage, isFetched, data: videos } = useInfiniteQuery([['single-profile-feed', profileID], ({ pageParam : '', publicKey : profileID, reader : reader })], GetProfileFeed,
        {
            enabled: !!profileID, 
            getNextPageParam: (lastPage, pages) => {
                if(lastPage === null) {
                    return null;
                } else {
                    console.log(lastPage);
                    return 0;
                }
            }
        }
    );


    useEffect(() => {
        if (inView && hasNextPage) {
            fetchNextPage()
        }
    }, [inView, hasNextPage])

    


    if(isLoading) return <ChannelShimmer />
    if (isFetched) {
        return (
            <>
                <div className="grid gap-x-4 lg:grid-cols-4 md:gap-y-4 gap-y-2 2xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 xs:grid-col-1">
                    {videos.pages.map(page => 
                        page.map(video => {
                            return (
                                <VideoCard userProfile={profile} key={`${video.PostHashHex}`} video={video} />
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
    }
    
}

export default Channel