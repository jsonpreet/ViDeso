import FullPageLoader from '@app/components/Common/FullPageLoader'
import dynamic from 'next/dynamic'
import { Home } from '@app/components/Home'
import { Suspense } from 'react'

// const Home = dynamic(() => import('../src/components/Home/Home'), {
//     loading: () => <FullPageLoader />,
//     ssr: false
// })


// const HomePage = () => {
//     return (
//         <>
            
//             <Suspense Suspense fallback={<FullPageLoader />}>
//                 <Home />
//             </Suspense>
//         </>
//     )
// }

export default Home