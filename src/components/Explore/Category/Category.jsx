import VideoCard from '@app/components/Common/VideoCard/VideoCard'
import { FetchHotFeed, FetchInfiniteHotFeed } from '@app/data/videos';
import { useInView } from 'react-intersection-observer'
import { useEffect } from 'react';
import Custom500 from '@app/pages/404';
import usePersistStore from '@app/store/persist';
import { NoDataFound } from '@app/components/UIElements/NoDataFound';
import MetaTags from '@app/components/Common/MetaTags';
import TimelineShimmer from '@app/components/Shimmers/TimelineShimmer';
import { APP } from '@app/utils/constants';
import { getShuffleArray } from '@app/utils/functions/getShuffleArray';
import { GetHotFeed } from '@app/data/hot';

function Category() {
    const { user, isLoggedIn } = usePersistStore();
    const { ref, inView } = useInView()
    const reader = user.profile ? user.profile.PublicKeyBase58Check : APP.PublicKeyBase58Check;
    const { isError, error, isLoading, isFetched, data:videos } = GetHotFeed( reader );
    
    if (videos?.length === 0) {
        return (
            <NoDataFound
                isCenter
                withImage
                text="We are unable to fetch the videos. Please try again later."
            />
        )
    }

    if (isError) {
        console.log(error)
        return <Custom500 />
    }

    if (isLoading) {
        return <div><TimelineShimmer cols={28} /></div>
    }

    if (isFetched) {
        return (
            <>
                <MetaTags title="Feed" />
                <div className="grid gap-x-4 lg:grid-cols-4 md:gap-y-4 gap-y-2 2xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 xs:grid-col-1">
                    {getShuffleArray(videos).map(video => {
                            return (
                                <VideoCard userProfile={video.ProfileEntryResponse} key={`${video.PostHashHex}`} video={video} />
                            )
                        })
                    }
                </div>
            </>
        )
    }
}

export default Category