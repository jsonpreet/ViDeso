import MetaTags from '@components/Common/MetaTags'
import Timeline from './Timeline'

const Home = () => {
    //const { data, isLoading, isFetching, isFetched, error, isError } = FetchLatestFeed({ limit: -1 });
    return (
        <>
            <MetaTags />
            {/* <FeedFilters /> */}
            <div className="px-20">
                <Timeline />
            </div>
        </>
    )
}

// export const getServerSideProps = withCSR(async (ctx) => {
//     let page = 1;
//     if (ctx.query.page) {
//         page = parseInt(ctx.query.page);
//     }

//     const queryClient = new QueryClient();

//     let isError = false;

//     try {
//         await queryClient.prefetchQuery(['hot-feed'], getLatestFeed({ limit: -1 }));
//     } catch (error) {
//         isError = true
//         ctx.res.statusCode = error.response.status;
//     }
//     return {
//         props: {
//             //also passing down isError state to show a custom error component.
//             isError,
//             dehydratedState: dehydrate(queryClient),
//         },
//     }
// })

export default Home