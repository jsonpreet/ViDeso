import { BASE_NODE_URI } from "@utils/constants";
import axios from "axios";

export const fetchAllPosts = async (reader, list) => {
    let url = 'https://node.deso.org/api/v0/get-posts-hashhexlist'
    const response = await axios.post(url, {
        PostsHashHexList: list,
        ReaderPublicKeyBase58Check: reader,
        OrderBy: 'newest'
    });
    if (response && response.data.PostsFound) {
        return response.data.PostsFound
    }
    return null;
}

export const submitTransaction = async (hex) => {
    const endpoint = 'submit-transaction';
    const response = await axios.post(`${BASE_NODE_URI}/${endpoint}`, { TransactionHex: hex });
    return response.data;
}