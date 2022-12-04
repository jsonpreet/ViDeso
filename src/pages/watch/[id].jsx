
import { withCSR } from '@utils/functions';
import { WatchVideo } from '@components/Watch'
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { getSinglePost } from '@data/videos'
import { APP } from '@utils/constants';

export default WatchVideo

export const getServerSideProps = withCSR(async (ctx) => {

    const { id } = ctx.params;
    const queryClient = new QueryClient();
    const reader = APP.PublicKeyBase58Check;
    let isError = false;

    try {
        await queryClient.prefetchQuery([['single-post', id], { id: id, reader: reader }], getSinglePost, { enabled: !!id, })
    } catch (error) {
        isError = true
        ctx.res.statusCode = error.response.status;
    }
    return {
        props: {
            isError,
            dehydratedState: dehydrate(queryClient),
        },
    }
})