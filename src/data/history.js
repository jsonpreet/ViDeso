import { BASE_URI } from "@app/utils/constants";
import axios from "axios";
import { fetchAllPosts } from "./fetchList";

export const getFeed = async (data, reader) => {
    const endpoint = 'get-single-post';
    const posts = [];
    for (let i = 0; i < data.length; i++) {
        const response = await axios.post(`${BASE_URI}/${endpoint}`, {
            ReaderPublicKeyBase58Check: reader,
            PostHashHex: data[i].posthash
        });
        if (response === null) {
            return null
        } else {
            const post = response.data.PostFound;
            if (!post.IsHidden) {
                posts.push(post);
            }
        }
    }
    return posts
}

export const GetHistoryFeed = async (list, reader, pageParam = 0, output = 32) => {
    const fullPosts = await fetchAllPosts(reader, list);
    
    console.log(fullPosts)
    return fullPosts.splice(0, output)
}