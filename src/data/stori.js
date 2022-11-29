
import { BASE_URI } from "@app/utils/constants";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

export const GetStoriFeed = async (reader, pageParam) => {
    const limit = -1;
    const output = 40;
    const endpoint = 'get-hot-feed';
    const nLimit = (limit && limit !== -1) ? limit : 1500
    const response = await axios.post(`${BASE_URI}/${endpoint}`, {
        ReaderPublicKeyBase58Check: reader,
        SeenPosts: [],
        SortByNew: true,
        Tag: `@stori`,
        ResponseLimit: 50,
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

export const FetchInfiniteStoriFeed = (reader) => {
    return useInfiniteQuery(['infinite-stori-feed'], ({ pageParam = 0 }) => GetStoriFeed(reader, pageParam),
        {
            getNextPageParam: (lastPage, pages) => {
                if(lastPage === null) {
                    return null;
                } else {
                    return 0;
                }
            }
        }
    );
}