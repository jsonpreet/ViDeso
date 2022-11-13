import { FetchInfiniteHotFeed } from '@app/data/videos'
import useAppStore from '@app/store/app'
import { Loader } from '@components/UIElements/Loader'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { SuggestedVideosShimmer } from '../Shimmers/WatchVideoShimmer'

import SuggestedVideoCard from './SuggestedVideoCard'

const SuggestedVideos = ({ currentVideoId }) => {
    const {query: { id }} = useRouter()
    const { ref, inView } = useInView()
    const setUpNextVideo = useAppStore((state) => state.setUpNextVideo)
    const { isError, error, isSuccess, hasNextPage, isFetchingNextPage, fetchNextPage, data:videos } = FetchInfiniteHotFeed( -1, 15 );
    if (isError) {
        console.log('error', error)
    }

    useEffect(() => {
        if (inView) {
            fetchNextPage()
        }
    }, [inView])

    useEffect(() => {
        if (isSuccess && videos) {
            const nextVideo = videos.pages[0].find((video) => video.PostHashHex !== currentVideoId)
            setUpNextVideo(nextVideo)
        }
    }, [isSuccess, videos, currentVideoId])

    return (
        <>
            {isSuccess ? (
                <div className="pb-3">
                    <div className="space-y-1 flex flex-col">
                        {videos.pages.map(page => 
                            page.map(video => {
                                return (
                                    !video.IsHidden && <SuggestedVideoCard video={video} key={video?.PostHashHex} />
                                )
                            })
                        )}
                    </div>
                    {isFetchingNextPage && hasNextPage && <div><SuggestedVideosShimmer/></div>}
                    {/* <div className='loadMore'>
                        <div className='loadMoreButton'>
                            <button ref={ref} onClick={fetchNextPage} disabled={!hasNextPage || isFetchingNextPage}  className='btn'>
                                {isFetchingNextPage
                                ? 'Loading more...'
                                : hasNextPage
                                ? 'Load More'
                                : 'Nothing more to load'}
                            </button>
                        </div>
                    </div> */}
                </div>
            ): <SuggestedVideosShimmer />}
        </>
    )
}

export default SuggestedVideos