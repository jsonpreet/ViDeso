import usePersistStore from '@store/persist';
import dynamic from "next/dynamic";
import { Suspense } from 'react';
import { NoDataFound } from '@components/UI/NoDataFound';
import FullPageLoader from '../UI/FullPageLoader';
import { NextSeo } from 'next-seo';
// import Timeline from './Timeline';
const Timeline = dynamic(() => import("./Timeline"), {
    suspense: true,
});
const Feed = () => {
    const { isLoggedIn } = usePersistStore()
    if (!isLoggedIn) {
        return (
            <NoDataFound
                isCenter
                withImage
                heading="Keep track of what you watch"
                text="Watch history isn't viewable when signed out."
                isLoginButton={true}
                isHeading={true}
            />
        )
    }
    return (
        <>
            <NextSeo
                title='Subscriptions'
                canonical={`${APP.URL}/feed`}
                openGraph={{
                    title: 'Subscriptions',
                    url: `${APP.URL}/feed`,
                }}
            />
            <div className="md:px-16">
                <Suspense fallback={<FullPageLoader/>}>
                    <Timeline />
                </Suspense>
            </div>
        </>
    )
}

export default Feed