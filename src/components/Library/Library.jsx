import usePersistStore from '@store/persist';
import { NoDataFound } from '@components/UI/NoDataFound';
import WatchLater from './WatchLater';
import History from './History';
import { NextSeo } from 'next-seo';
import { APP } from '@utils/constants';

function Library() {
    const isLoggedIn = usePersistStore((state) => state.isLoggedIn)

    return (
        <>
            <NextSeo
                title='Library'
                canonical={`${APP.URL}/library`}
                openGraph={{
                    title: 'Library',
                    url: `${APP.URL}/library`,
                }}
            />
            {isLoggedIn ?
                <>
                    <div className='flex flex-col space-y-4 px-0 md:px-16'>
                        <div className='space-y-4'>
                            <h3 className="text-xl md:text-2xl px-4 font-bold">History</h3>
                            <History />
                        </div>
                        <div className='space-y-4'>
                            <h3 className="text-xl md:text-2xl px-4 font-bold">Watch Later</h3>
                            <WatchLater />
                        </div>
                    </div>
                </>
                :
                <NoDataFound
                    isCenter
                    withImage
                    heading="Enjoy your favorite videos"
                    text="Sign in to access videos that you’ve liked or saved"
                    isLoginButton={true}
                    isHeading={true}
                />
            }
        </>
    )
}

export default Library