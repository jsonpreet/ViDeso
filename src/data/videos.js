
import { BASE_URI } from "@app/utils/constants";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import axios from "axios";

export const getHotFeed = async (limit, lastPost, output) => {
    const pins = [];
    const endpoint = 'get-hot-feed';
    const lastid = (lastPost !== 0 && lastPost !== undefined) ? `${lastPost}` : ``;
    const nLimit = (limit && limit !== -1) ? limit : 500
    const response = await axios.post(`${BASE_URI}/${endpoint}`, {
        SeenPosts: [lastid],
        SortByNew: true,
        ResponseLimit: nLimit,
    });
    if (response === null) {
        return null
    } else {
        const posts = response.data.HotFeedPage;

        const filtered = posts.filter(post => {
            if (post.VideoURLs !== null && post.VideoURLs.length > 0 && post.VideoURLs[0] !== '' && post.ProfileEntryResponse !== null) {
                return post
            }
        });

        return filtered.splice(0, output)
    }
}

export const getLatestFeed = async (limit, lastPost, output = 32) => {
    const pins = [];
    const endpoint = 'get-posts-stateless';
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
            if (post.VideoURLs !== null && post.VideoURLs.length > 0 && post.VideoURLs[0] !== '' && post.ProfileEntryResponse !== null) {
                return post
            }
        });

        return filtered.splice(0, output)
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

export const FetchInfiniteHotFeed = (limit, output) => {
    return useInfiniteQuery(['infinite-hot-feed'], ({ pageParam = 0 }) => getHotFeed(limit, pageParam, output),
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