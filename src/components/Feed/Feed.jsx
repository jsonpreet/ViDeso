import usePersistStore from '@app/store/persist';
import MetaTags from '@components/Common/MetaTags'
import dynamic from "next/dynamic";
import { Suspense } from 'react';
import { NoDataFound } from '@components/UIElements/NoDataFound';
import FullPageLoader from '../Common/FullPageLoader';
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
            <MetaTags />
            <div className="md:px-16">
                <Suspense fallback={<FullPageLoader/>}>
                    <Timeline />
                </Suspense>
            </div>
        </>
    )
}

export default Feed