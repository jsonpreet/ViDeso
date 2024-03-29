
import { BASE_URI } from "@app/utils/constants";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

export const GetFollowingFeed = async (limit, reader, lastPost, output = 32) => {
    const endpoint = 'get-posts-stateless';
    const lastid = (lastPost !== 0 && lastPost !== undefined) ? `${lastPost}` : ``;
    const nLimit = (limit && limit !== -1) ? limit : 5000
    const response = await axios.post(`${BASE_URI}/${endpoint}`, {
        ReaderPublicKeyBase58Check: reader,
        PostHashHex: lastid,
        NumToFetch: nLimit,
        GetPostsForFollowFeed: true,
        MediaRequired: true,
    });
    if (response === null) {
        return null
    } else {
        const posts = response.data.PostsFound;

        if (posts !== null) {
            const filtered = posts.filter(post => {
                if (post.VideoURLs !== null && post.VideoURLs.length > 0 && post.VideoURLs[0] !== '') {
                    return post
                }
            });

            const filteredPosts = filtered.splice(0, output)
            
            return filteredPosts
        }
        return []
    }
}

export const FetchInfiniteFollowingFeed = (reader, limit) => {
    return useInfiniteQuery(['subscriptions-feed', reader], ({ pageParam = 0 }) => GetFollowingFeed(limit, reader, pageParam),
        {
            enabled: !!reader,
            getNextPageParam: (lastPage, pages) => {
                if(lastPage === null) {
                    return null;
                } else {
                    let last = lastPage.length > 0 ? lastPage[lastPage.length - 1]: lastPage;
                    return last.PostHashHex;
                }
            }
        }
    );
}