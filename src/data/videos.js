
import { BASE_URI } from "@app/utils/constants";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import axios from "axios";

export const getHotFeed = async ({ limit }) => {
    const pins = [];
    const endpoint = 'get-hot-feed';
    const nLimit = (limit && limit !== -1) ? limit : 300
    const response = await axios.post(`${BASE_URI}/${endpoint}`, {
        SeenPosts: [],
        SortByNew: true,
        ResponseLimit: nLimit,
    });
    if (response === null) {
        return null
    } else {
        const posts = response.data.HotFeedPage;

        const filtered = posts.filter(post => {
            if (post.VideoURLs !== null && post.VideoURLs.length > 0 && post.VideoURLs[0] !== '') {
                return post
            }
        });

        console.log(filtered);

        return filtered
    }
}

export const getLatestFeed = async (limit, lastPost) => {
    const pins = [];
    const endpoint = 'get-posts-stateless';
    console.log(limit, lastPost);
    const lastid = (lastPost !== 0 && lastPost !== undefined) ? `${lastPost}` : ``;
    const nLimit = (limit && limit !== -1) ? limit : 500
    const response = await axios.post(`${BASE_URI}/${endpoint}`, {
        PostHashHex: lastid,
        NumToFetch: nLimit,
        MediaRequired: true,
    });
    if (response === null) {
        return null
    } else {
        const posts = response.data.PostsFound;

        const filtered = posts.filter(post => {
            if (post.VideoURLs !== null && post.VideoURLs.length > 0 && post.VideoURLs[0] !== '') {
                return post
            }
        });

        return filtered.splice(0, 32)
    }
}

export const FetchLatestFeed = ({limit}) => {
    return useQuery(['latest-feed', limit], ({limit}) => getLatestFeed({limit}), {
        keepPreviousData: true,
    });
}

export const FetchHotFeed = ({limit}) => {
    return useQuery(['hot-feed', limit], ({limit}) => getHotFeed({limit}), {
        keepPreviousData: true,
    });
}

export const FetchInfiniteLatestFeed = (limit) => {
    return useInfiniteQuery(['infinite-latest-feed'], ({ pageParam = 0 }) => getLatestFeed(limit, pageParam),
        {
            getNextPageParam: (lastPage, pages) => {
                if(lastPage === null) {
                    return null;
                } else {
                    let last = lastPage[lastPage.length - 1];
                    return last.PostHashHex;
                }
            }
        }
    );
}