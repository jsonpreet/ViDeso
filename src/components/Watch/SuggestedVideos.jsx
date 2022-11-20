import { FetchInfiniteHotFeed, FetchSuggestedFeed, GetSuggestedFeed, getSuggestedFeed } from '@app/data/videos'
import useAppStore from '@app/store/app'
import usePersistStore from '@app/store/persist'
import { getShuffleArray } from '@app/utils/functions/getShuffleArray'
import logger from '@app/utils/logger'
import { Loader } from '@components/UIElements/Loader'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { SuggestedVideosShimmer } from '../Shimmers/WatchVideoShimmer'

import SuggestedVideoCard from './SuggestedVideoCard'

const SuggestedVideos = ({ currentVideoId }) => {
    const {query: { id }} = useRouter()
    const { ref, inView } = useInView()
    const setUpNextVideo = useAppStore((state) => state.setUpNextVideo)
    const recentlyWatched = usePersistStore((state) => state.recentlyWatched)
    const user = usePersistStore((state) => state.user)
    const isLoggedIn = usePersistStore((state) => state.isLoggedIn)
    const reader = isLoggedIn ? user.PublicKeyBase58Check : '';
    //const { isError, error, isSuccess, hasNextPage, isFetchingNextPage, fetchNextPage, data:videos } = FetchSuggestedFeed( -1, 15 );
    const { isSuccess, isLoading, isError, error, hasNextPage, isFetchingNextPage, fetchNextPage, data: videos } = useInfiniteQuery(['suggested-feed'], ({ pageParam = recentlyWatched }) => GetSuggestedFeed(-1, reader, 15, pageParam),
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
    }, [isSuccess, videos, currentVideoId, setUpNextVideo])

    return (
        <>
            {isSuccess ? (
                <div className="pt-3 md:pt-0 pb-3">
                    <div className="space-y-2 flex flex-col">
                        <div className='px-4 md:px-0'>
                            <h2 className="text-lg font-semibold">Up Next</h2>
                        </div>
                        <div className='space-y-1'>
                            {videos.pages.map(page => 
                                getShuffleArray(page).map(video => {
                                    if (video.PostHashHex !== currentVideoId) {
                                        return (
                                            !video.IsHidden && <SuggestedVideoCard video={video} key={video?.PostHashHex} />
                                        )
                                    }
                                })
                            )}
                        </div>
                    </div>
                    {isFetchingNextPage && <div><SuggestedVideosShimmer/></div>}
                </div>
            ): <SuggestedVideosShimmer />}
        </>
    )
}

export default SuggestedVideos