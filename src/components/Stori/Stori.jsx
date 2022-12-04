import { Loader2 } from '@components/UI/Loader';
import { NoDataFound } from '@components/UI/NoDataFound';
import { FetchInfiniteStoriFeed } from '@data/stori';
import usePersistStore from '@store/persist';
import { APP } from '@utils/constants';
import Head from 'next/head';
import { useInView } from 'react-intersection-observer';
import StoriVideo from './StoriVideo';

function Stori() {
    const { ref, inView } = useInView()
    const user = usePersistStore((state) => state.user)
    const isLoggedIn = usePersistStore((state) => state.isLoggedIn)
    const reader = isLoggedIn ? user.profile.PublicKeyBase58Check : APP.PublicKeyBase58Check;
    const { isError, error, isSuccess, hasNextPage, isFetchingNextPage, fetchNextPage, data: videos } = FetchInfiniteStoriFeed(reader);  

    // useEffect(() => {
    //     if (inView && hasNextPage) {
    //         fetchNextPage()
    //     }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [inView, hasNextPage])

    if (isError) {
        return (
        <div className="grid h-[80vh] place-items-center">
            <NoDataFound isCenter withImage text="No stori found" />
        </div>
        )
    }

    return (
        <>
            <div className="overflow-y-hidden">
                <Head>
                    <meta name="theme-color" content="#000000" />
                </Head>
                <div className="md:h-[calc(100vh-70px)] h-screen overflow-y-scroll no-scrollbar snap-y snap-mandatory scroll-smooth">
                    {
                        isSuccess ? (
                        <>
                            {videos.pages.map(page => 
                                page.map(video => {
                                return (
                                    <StoriVideo userProfile={video.ProfileEntryResponse} key={`${video.PostHashHex}`} video={video} />
                                )
                                })
                            )}
                            
                            <div ref={ref} onClick={fetchNextPage} disabled={!hasNextPage || isFetchingNextPage} className='btn'>
                            {isFetchingNextPage
                                ? <Loader2 />
                                : hasNextPage
                                ? 'Load More'
                                : 'Nothing more to load'}
                            </div>
                        </>
                        )
                        : (
                            <div><Loader2 /></div>
                        )
                    }
                </div>
            </div>
        </>
    )
}

export default Stori