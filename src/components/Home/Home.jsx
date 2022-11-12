import { FetchLatestFeed, getLatestFeed } from '@app/data/videos';
import { withCSR } from '@app/utils/functions';
import MetaTags from '@components/Common/MetaTags'
import { dehydrate, QueryClient } from '@tanstack/react-query'
import Timeline from './Timeline'

const Home = () => {
    const { data: videos, isLoading, isFetching, isFetched, error, isError } = FetchLatestFeed({ limit: 200 });
    if (isError) {
        console.log('error', error)
        //return ( <ErrorLoader error={error}/>  )
    }
    if (isLoading) {
        console.log('Loading')
        //return ( <LoadingLoader/> )
    }
    // if (isFetching) {
    //     return ( <FetchingLoader /> )
    // }
    if (isFetched) {
        return (
            <>
                <MetaTags />
                {/* <FeedFilters /> */}
                <div className="md:my-2">
                    <Timeline videos={videos} />
                </div>
            </>
        )
    }
}

export const getServerSideProps = withCSR(async (ctx) => {
    let page = 1;
    if (ctx.query.page) {
        page = parseInt(ctx.query.page);
    }

    const queryClient = new QueryClient();

    let isError = false;

    try {
        await queryClient.prefetchQuery(['latest-feed'], getLatestFeed({ limit: 200 }));
    } catch (error) {
        isError = true
        ctx.res.statusCode = error.response.status;
    }
    return {
        props: {
            //also passing down isError state to show a custom error component.
            isError,
            dehydratedState: dehydrate(queryClient),
        },
    }
})

export default Home