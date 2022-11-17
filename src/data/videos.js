
import usePersistStore from "@app/store/persist";
import { BASE_URI } from "@app/utils/constants";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import axios from "axios";

export const GetHotFeed = async (limit, reader, lastPost, output) => {
    const endpoint = 'get-hot-feed';
    const lastid = (lastPost !== 0 && lastPost !== undefined) ? `${lastPost}` : ``;
    const nLimit = (limit && limit !== -1) ? limit : 500
    const response = await axios.post(`${BASE_URI}/${endpoint}`, {
        ReaderPublicKeyBase58Check: reader,
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

export const GetSuggestedFeed = async (limit, reader, output = 32, seenPosts) => {
    const endpoint = 'get-hot-feed';
    //const lastid = (lastPost !== 0 && lastPost !== undefined) ? `${lastPost}` : ``;
    const seenPostLists = seenPosts.map(
        (post) => post.PostHashHex
    );
    const nLimit = (limit && limit !== -1) ? limit : 2500
    const response = await axios.post(`${BASE_URI}/${endpoint}`, {
        ReaderPublicKeyBase58Check: reader,
        SeenPosts: seenPostLists,
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
        
        let offset = seenPostLists.length > 0 ? seenPostLists.length : 0;
        //const random = filtered[Math.floor(Math.random() * filtered.length)];
        return filtered.splice(0, output)
    }
}

export const FetchLatestFeed = ({limit}) => {
    return useQuery(['latest-feed', limit], ({limit}) => GetLatestFeed({limit}), {
        keepPreviousData: true,
    });
}

export const FetchHotFeed = ({limit}) => {
    return useQuery(['hot-feed', limit], ({limit}) => GetHotFeed({limit}), {
        keepPreviousData: true,
    });
}

export const FetchInfiniteHotFeed = (limit, output) => {
    return useInfiniteQuery(['infinite-hot-feed'], ({ pageParam = 0 }) => GetHotFeed(limit, pageParam, output),
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
    const user = usePersistStore((state) => state.user)
    const isLoggedIn = usePersistStore((state) => state.isLoggedIn)
    const reader = isLoggedIn ? user.PublicKeyBase58Check : '';
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

export const FetchSuggestedFeed = (limit, output) => {
    const user = usePersistStore((state) => state.user)
    const isLoggedIn = usePersistStore((state) => state.isLoggedIn)
    const reader = isLoggedIn ? user.PublicKeyBase58Check : '';
    const recentlyWatched = usePersistStore((state) => state.recentlyWatched)
    return useInfiniteQuery(['suggested-feed'], ({ pageParam = recentlyWatched }) => GetSuggestedFeed(limit, reader, output, pageParam),
        {
            getNextPageParam: (lastPage, pages) => {
                if(lastPage === null) {
                    return null;
                } else {
                    //let last = lastPage[lastPage.length - 1];
                    //console.log({ pages: pages, watched: recentlyWatched })
                    return recentlyWatched;
                }
            }
        }
    );
}

export const getSinglePost = async ({ queryKey }) => {
    const [_key, { id, reader }] = queryKey;
    console.log(queryKey)
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
        return post
    }
}

export const FetchSinglePost = ({id}) => {
    const user = usePersistStore((state) => state.user)
    const isLoggedIn = usePersistStore((state) => state.isLoggedIn)
    const reader = isLoggedIn ? user.PublicKeyBase58Check : '';
    return useQuery([['single-post', id], { id, reader }], getSinglePost, {
        keepPreviousData: true,
    });
}