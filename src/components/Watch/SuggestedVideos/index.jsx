import { useState } from 'react'
import Carousel from 'react-multi-carousel'
import { Button } from '../../UI/Button'
import AllVideos from './Tabs/AllVideos'
import PopularVideos from './Tabs/PopularVideos'
import RecentVideos from './Tabs/RecentVideos'
import UserVideos from './Tabs/UserVideos'

const SuggestedVideos = ({ video, currentVideoId }) => {
    const [selectedTab, setSelectedTab] = useState('all');

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
            <div className="pt-3 md:pt-0 md:-mt-3 pb-3">
                <div className="space-y-2 w-full md:w-auto flex flex-col">
                    <div className='px-2 md:px-0 overflow-hidden md:max-w-full max-w-[360px]'>
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
                            <Tab isSelected={selectedTab === 'user'} tab='user'>{channel.Username}</Tab>
                            <Tab isSelected={selectedTab === 'recent'} tab='recent'>Recently Uploaded</Tab>
                            {/* <Tab isSelected={selectedTab === 'popular'} tab='popular'>Most Popular</Tab> */}
                        </Carousel>
                    </div>
                    <div className='space-y-1'>
                        {selectedTab === 'all' ?
                            <AllVideos video={video} currentVideoId={currentVideoId} />
                            : 
                            selectedTab === 'user' ?
                                <UserVideos video={video} currentVideoId={currentVideoId} />
                            : selectedTab === 'recent' ?
                                <RecentVideos video={video} currentVideoId={currentVideoId} />
                            // :  selectedTab === 'popular' ?
                            //     <PopularVideos video={video} currentVideoId={currentVideoId} />
                            : <AllVideos video={video} currentVideoId={currentVideoId} />
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default SuggestedVideos