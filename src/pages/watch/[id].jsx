
import { withCSR } from '@utils/functions';
import { WatchVideo } from '@components/Watch'
import { QueryClient } from '@tanstack/react-query';
import { getSinglePost } from '@data/videos'
import usePersistStore from '@store/persist';
import { APP } from '@utils/constants';

export default WatchVideo

export const getServerSideProps = withCSR(async (ctx) => {

    const { id } = ctx.params;
    const queryClient = new QueryClient();
    const {isLoggedIn, user} = usePersistStore()
    const reader = isLoggedIn ? user.profile.PublicKeyBase58Check : APP.PublicKeyBase58Check;
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
            basePath,
            dehydratedState: dehydrate(queryClient),
        },
    }
})