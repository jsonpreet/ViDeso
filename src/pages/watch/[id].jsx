
import { withCSR } from '@utils/functions';
import { WatchVideo } from '@components/Watch'
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { getSinglePost } from '@data/video'
import { APP } from '@utils/constants';

export default WatchVideo

export const getServerSideProps = async (ctx) => {

    const { id } = ctx.params;
    const reader = APP.PublicKeyBase58Check;
    let isError = false;
    try {
        const response = await getSinglePost(id, reader)
        isError = false
        return {
            props: {
                isError,
                video: response
            },
        }
    } catch (error) {
        isError = true
        ctx.res.statusCode = error.response.status;
        return {
            props: {
                isError,
                video: null
            },
        }
    }
}