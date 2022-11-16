import MetaTags from '@components/Common/MetaTags'
//import Timeline from './Timeline'
import dynamic from "next/dynamic";
import { Suspense } from 'react';
const Timeline = dynamic(() => import("./Timeline"), {
  suspense: true,
});
const Home = () => {
    return (
        <>
            <MetaTags />
            <div className="md:px-16">
                <Suspense fallback={<p>LOADING</p>}>
                    <Timeline />
                </Suspense>
            </div>
        </>
    )
}

export default Home