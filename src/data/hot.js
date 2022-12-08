
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { fetchAllPosts } from "./api";

export const GetHotFeed = async (reader, pageParam = 0, output = 32) => {
    const url = `https://api.searchclout.net/trends/posts/week/${pageParam}?full=1&cache=1&type=video`;
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

        const fullPosts = await fetchAllPosts(reader, postsList);

        const result = { posts: fullPosts.splice(0, output), page: response.data.page, pages: response.data.pages }
        
        return result
    }
}

export const FetchInfiniteHotFeed = (reader) => {
    return useInfiniteQuery(['infinite-popular-feed', reader], ({ pageParam = 0 }) => GetHotFeed(reader, pageParam),
        {
            enabled: !!reader,
            getNextPageParam: (lastPage, pages) => {
                if(lastPage === null || lastPage.page === lastPage.pages) {
                    return null;
                } else {
                    return lastPage.page + 1
                }
            }
        }
    );
}