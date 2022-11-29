import axios from "axios";

export const fetchAllPosts = async (reader, list) => {
    let url = 'https://green.post2earndao.com/api/v0/get-posts-hashlist'
    const response = await axios.post(url, {
        PostsHashList: list,
        ReaderPublicKeyBase58Check: reader,
        OrderBy: 'newest'
    });
    if (response && response.data.PostsFound) {
        return response.data.PostsFound
    }
    return null;
}