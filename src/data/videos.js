
import { BASE_URI } from "@app/utils/constants";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const getLatestFeed = async ({limit}) => {
    const pins = [];
    const endpoint = 'get-posts-stateless';
    const response = await axios.post(`${BASE_URI}/${endpoint}`, {
        NumToFetch: limit ? limit : 150,
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

        console.log(filtered);

        return filtered
    }
}

export const FetchLatestFeed = ({limit}) => {
    return useQuery(['latest-feed', limit], ({limit}) => getLatestFeed({limit}), {
        keepPreviousData: true,
    });
}