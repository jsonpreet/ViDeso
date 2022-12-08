import { BASE_NODE_URI, BASE_URI } from "@utils/constants";
import axios from "axios";


export const getSinglePost = async (id, reader) => {
    const endpoint = 'get-single-post';
    const response = await axios.post(`${BASE_URI}/${endpoint}`, {
        ReaderPublicKeyBase58Check: reader,
        PostHashHex: id,
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

export const submitPost = async (request) => {
    const endpoint = 'submit-post';
    const response = await axios.post(`${BASE_NODE_URI}/${endpoint}`, request);
    if (response === null) {
        return null
    } else {
        const TransactionHex = response.data.TransactionHex;
        const { data } = await submitTransaction(TransactionHex)
        return data;
    }
}

