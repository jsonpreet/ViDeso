import { BASE_URI } from "@app/utils/constants";
import axios from "axios";

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