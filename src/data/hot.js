
import { BASE_URI } from "@app/utils/constants";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

export const GetHotFeed = async (reader) => {
    const url = 'https://api.searchclout.net/trends/posts/hot/0?full=0&cache=1';
    const response = await axios.get(url);
    if (response === null) {
        return null
    } else {
        fetchPosts(response.data.posts, reader);
    }
}

const fetchPosts = async (posts, reader) => {
    try {
        const response = await axios.post('https://green.post2earndao.com/api/v0/get-posts-hashlist', {
            PostsHashList: posts,
            ReaderPublicKeyBase58Check: reader
        });
        if (response === null) {
            return null
        } else {
            console.log(response.data);
        }
    } catch (error) {
        console.log(error.message);
        console.log(error);
    }
}

export const FetchInfiniteFollowingFeed = (reader, limit) => {
    return useInfiniteQuery(['subscriptions-feed', reader], ({ pageParam = 0 }) => GetHotFeed(limit, reader, pageParam),
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