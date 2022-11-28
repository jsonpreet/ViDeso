
import usePersistStore from "@app/store/persist";
import { APP, BASE_URI } from "@app/utils/constants";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import axios from "axios";

export const GetSuggestedFeed = async (limit, reader, output = 32, seenPosts) => {
    const url = 'https://api-staging.searchclout.net/trends/posts/hot/0?full=1&type=video&cache=1';
    const response = await axios.get(url);
    if (response === null) {
        return null
    } else {
        const posts = response.data.posts;

        const filtered = posts.filter(post => {
            if (post.videos !== null && post.videos.length > 0 && post.videos[0] !== '') {
                return post
            }
        });

        const postsList = filtered.map((post) => {
            return post.postHash
        })

        const fullPosts = await fetchAllPosts(postsList);
        
        return fullPosts.splice(0, output)
    }
}

export const fetchAllPosts = async (list) => {
    let url = 'https://green.post2earndao.com/api/v0/get-posts-hashlist'
    const response = await axios.post(url, {
        PostsHashList: list,
        OrderBy: 'newest'
    });
    if (response && response.data.PostsFound) {
        return response.data.PostsFound
    }
    return null;
}

export const FetchSuggestedFeed = (limit, output) => {
    const user = usePersistStore((state) => state.user)
    const isLoggedIn = usePersistStore((state) => state.isLoggedIn)
    const reader = isLoggedIn ? user.profile.PublicKeyBase58Check : APP.PublicKeyBase58Check;
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