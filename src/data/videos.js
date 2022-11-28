
import usePersistStore from "@app/store/persist";
import { APP, BASE_URI } from "@app/utils/constants";
import { getShuffleArray } from "@app/utils/functions/getShuffleArray";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import axios from "axios";

export const GetHotFeed = async ({ queryKey }) => {
    const [_key, { reader }] = queryKey
    const limit = -1;
    const output = 40;
    const endpoint = 'get-hot-feed';
    const nLimit = (limit && limit !== -1) ? limit : 1500
    const response = await axios.post(`${BASE_URI}/${endpoint}`, {
        ReaderPublicKeyBase58Check: reader,
        SeenPosts: [],
        SortByNew: false,
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

export const GetLatestFeed = async (limit, reader, lastPost, output = 32) => {
    const endpoint = 'get-posts-stateless';
    const lastid = (lastPost !== 0 && lastPost !== undefined) ? `${lastPost}` : ``;
    const nLimit = (limit && limit !== -1) ? limit : 500
    const response = await axios.post(`${BASE_URI}/${endpoint}`, {
        ReaderPublicKeyBase58Check: reader,
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
    return useQuery(['latest-feed'], ({ pageParam = 1 }) => GetLatestFeed(limit, pageParam), {
        keepPreviousData: true,
    });
}

export const FetchHotFeed = (reader) => {
    return useQuery([['hot-feed'], { reader }], GetHotFeed,
        {
            enabled: !!reader,
            keepPreviousData: true,
        }
    );
}

export const FetchInfiniteHotFeed = (limit) => {
    return useInfiniteQuery(['infinite-hot-feed'], ({ pageParam = '' }) => GetHotFeed(limit, pageParam),
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

export const FetchInfiniteLatestFeed = (limit, reader) => {
    return useInfiniteQuery(['infinite-latest-feed'], ({ pageParam = 0 }) => GetLatestFeed(limit, reader, pageParam),
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

export const getSinglePost = async ({ queryKey }) => {
    const [_key, { id, reader }] = queryKey;
    const endpoint = 'get-single-post';
    const response = await axios.post(`${BASE_URI}/${endpoint}`, {
        ReaderPublicKeyBase58Check: reader,
        PostHashHex: id,
        CommentLimit: 10,
    });
    if (response === null) {
        return null
    } else {
        const post = response.data.PostFound;
        if (post.VideoURLs !== null && post.VideoURLs.length > 0) {
            return post
        } else {
            return null
        }
    }
}

export const FetchSinglePost = ({id}) => {
    const user = usePersistStore((state) => state.user)
    const isLoggedIn = usePersistStore((state) => state.isLoggedIn)
    const reader = isLoggedIn ? user.profile.PublicKeyBase58Check : APP.PublicKeyBase58Check;
    return useQuery([['single-post', id], { id, reader }], getSinglePost, {
        keepPreviousData: true,
    });
}