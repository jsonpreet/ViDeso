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