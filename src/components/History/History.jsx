import usePersistStore from '@store/persist';
import { NoDataFound } from '@components/UI/NoDataFound';
import Timeline from './Timeline';
import { NextSeo } from 'next-seo';
import { APP } from '@utils/constants';

function History() {
    const isLoggedIn = usePersistStore((state) => state.isLoggedIn)

    return (
        <>
            <NextSeo
                title='History'
                canonical={`${APP.URL}/history`}
                openGraph={{
                    title: 'History',
                    url: `${APP.URL}/history`,
                }}
            />
            {isLoggedIn ?
                <>
                    <div className='px-0 md:px-16'><Timeline /></div>
                </>
                :
                <NoDataFound
                    isCenter
                    withImage
                    heading="Keep track of what you watch"
                    text="Watch history isn't viewable when signed out."
                    isLoginButton={true}
                    isHeading={true}
                />
            }
        </>
    )
    
}

export default History