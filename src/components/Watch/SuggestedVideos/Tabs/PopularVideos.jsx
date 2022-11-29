import { SuggestedVideosShimmer } from '@app/components/Shimmers/WatchVideoShimmer'
import { GetSuggestedFeed } from '@app/data/suggested'
import useAppStore from '@app/store/app'
import usePersistStore from '@app/store/persist'
import { getShuffleArray } from '@app/utils/functions/getShuffleArray'
import logger from '@app/utils/logger'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import SuggestedVideoCard from '../VideosCard'

function PopularVideos({video, currentVideoId}) {
    const {query: { id }} = useRouter()
    const { ref, inView } = useInView()
    const setUpNextVideo = useAppStore((state) => state.setUpNextVideo)
    const recentlyWatched = usePersistStore((state) => state.recentlyWatched)
    const user = usePersistStore((state) => state.user)
    const isLoggedIn = usePersistStore((state) => state.isLoggedIn)
    const reader = isLoggedIn ? user.PublicKeyBase58Check : '';
    const { isSuccess, isLoading, isError, error, hasNextPage, isFetchingNextPage, fetchNextPage, data: videos } = useInfiniteQuery(['suggested-feed'], ({ pageParam = recentlyWatched }) => GetMostPopularFeed(-1, reader, 15, pageParam),
        {
            enabled: !!id,
            getNextPageParam: (lastPage, pages) => {
                if(lastPage === null) {
                    return null;
                } else {
                    //let last = lastPage[lastPage.length - 1];
                    //console.log({ pages: pages, watched: recentlyWatched })
                    return recentlyWatched;
                }
            }

        }
    );
    if (isError) {
        console.log('error', error)
        logger.error('error', error);
    }

    useEffect(() => {
        if (inView) {
            fetchNextPage()
        }
    }, [inView, fetchNextPage])

    useEffect(() => {
        if (isSuccess && videos) {
            const nextVideo = videos.pages[0].find((video) => video.PostHashHex !== currentVideoId)
            setUpNextVideo(nextVideo)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSuccess, videos, currentVideoId, setUpNextVideo])

    const channel = video.ProfileEntryResponse;

    return (
        <>
            {isSuccess ? (
                videos.pages.map(page => 
                    page.map(video => {
                        if (video.PostHashHex !== currentVideoId) {
                            return (
                                !video.IsHidden && <SuggestedVideoCard video={video} key={video?.PostHashHex} />
                            )
                        }
                    })
                )
            ): <SuggestedVideosShimmer />}
        
        </>
    )
}

export default PopularVideos