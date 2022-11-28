
import { GetSuggestedFeed } from '@app/data/suggested'
import useAppStore from '@app/store/app'
import usePersistStore from '@app/store/persist'
import { getShuffleArray } from '@app/utils/functions/getShuffleArray'
import logger from '@app/utils/logger'
import { Loader } from '@components/UIElements/Loader'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import Carousel from 'react-multi-carousel'
import { SuggestedVideosShimmer } from '../Shimmers/WatchVideoShimmer'
import { Button } from '../UIElements/Button'

import SuggestedVideoCard from './SuggestedVideoCard'

const SuggestedVideos = ({ video, currentVideoId }) => {
    const {query: { id }} = useRouter()
    const { ref, inView } = useInView()
    const [selectedTab, setSelectedTab] = useState('all');
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

    const channel = video.ProfileEntryResponse;

    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 3,
            slidesToSlide: 1
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3,
            slidesToSlide: 1
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2,
            slidesToSlide: 1
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 2,
            slidesToSlide: 1
        }
    };

    const Tab = ({ isSelected, tab, children }) => {
        return (
            <>
                <Button
                    onClick={() => setSelectedTab(tab)}
                    variant={`${isSelected ? `dark` : `light`}`}
                >
                    {children}
                </Button>
            </>
        )
    }

    return (
        <>
            {isSuccess ? (
                <div className="pt-3 md:pt-0 md:-mt-3 pb-3">
                    <div className="space-y-2 flex flex-col">
                        <div className='px-4 md:px-0'>
                            <Carousel
                                responsive={responsive}
                                swipeable={true}
                                draggable={true}
                                showDots={false}
                                infinite={false}
                                containerClass='suggested-videos-container'
                                itemClass='suggested-videos'
                            >
                                <Tab isSelected={selectedTab === 'all'} tab='all'>All</Tab>
                                <Tab isSelected={selectedTab === 'user'} tab='user'>From {channel.Username}</Tab>
                                <Tab isSelected={selectedTab === 'recent'} tab='recent'>Recently Uploaded</Tab>
                                <Tab isSelected={selectedTab === 'popular'} tab='popular'>Popular</Tab>
                            </Carousel>
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