import usePersistStore from '@store/persist';
import { useState } from 'react';
import Carousel from 'react-multi-carousel';
import { Button } from '../UI/Button';
import HistoryVideos from './Tabs/HistoryVideos';
import PopularVideos from './Tabs/PopularVideos';
import RecentVideos from './Tabs/RecentVideos';
import WatchedVideos from './Tabs/WatchedVideos';

const Home = () => {
    const isLoggedIn = usePersistStore((state)=> state.isLoggedIn)
    const [selectedTab, setSelectedTab] = useState('all');

    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 5,
            slidesToSlide: 1
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 4,
            slidesToSlide: 1
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 3,
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
            <div className="md:px-16">
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
                            <Tab isSelected={selectedTab === 'all'} tab='all'>Popular</Tab>
                            <Tab isSelected={selectedTab === 'recent'} tab='recent'>Recently Uploaded</Tab>
                            {isLoggedIn && <Tab isSelected={selectedTab === 'watched'} tab='watched'>Watch Later</Tab>}
                            {isLoggedIn && <Tab isSelected={selectedTab === 'history'} tab='history'>History</Tab>}
                        </Carousel>
                    </div>
                    <div className='space-y-1'>
                        {selectedTab === 'all' ?
                            <PopularVideos />
                            : 
                            selectedTab === 'watched' ?
                                <WatchedVideos />
                            : selectedTab === 'recent' ?
                                <RecentVideos />
                            :  selectedTab === 'history' ?
                                <HistoryVideos />
                            : <PopularVideos />
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home