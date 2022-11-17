import usePersistStore from "@app/store/persist";
import { BASE_URI } from "@app/utils/constants";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import axios from "axios";

// export const GetProfileFeed = async ({ queryKey }) => {
//     const [_key, { username, reader, lastPost, limit, output }] = queryKey;
//     const endpoint = 'get-posts-for-public-key';
//     const lastid = (lastPost !== 0 && lastPost !== undefined) ? `${lastPost}` : ``;
//     const nLimit = (limit && limit !== -1) ? limit : 2500
//     const response = await axios.post(`${BASE_URI}/${endpoint}`, {
//         Username: username,
//         ReaderPublicKeyBase58Check: reader,
//         LastPostHashHex: lastid,
//         NumToFetch: nLimit,
//         MediaRequired: true,
//     });
//     if (response === null) {
//         return null
//     } else {
//         const posts = response.data.Posts;
//         const filtered = posts.filter(post => {
//             if (post.VideoURLs !== null && post.VideoURLs.length > 0 && post.VideoURLs[0] !== '') {
//                 return post
//             }
//         });

//         const filteredPosts = filtered.splice(0, output)
//     console.log(filtered)

//         return {posts:filteredPosts, LastPostHashHex: response.data.LastPostHashHex}
//     }
// }

export const GetProfileFeed = async ({queryKey}) => {
    const [_key, { publicKey, reader, lastPost, limit, output = 32 }] = queryKey;
    const endpoint = 'get-posts-for-public-key';
    const nLimit = (limit && limit !== -1) ? limit : 2500
    const response = await axios.post(`${BASE_URI}/${endpoint}`, {
        PublicKeyBase58Check: publicKey,
        ReaderPublicKeyBase58Check: reader,
        LastPostHashHex: lastPost,
        NumToFetch: nLimit,
        MediaRequired: true,
    });
    if (response === null) {
        return null
    } else {
        const posts = response.data.Posts;

        const filtered = posts.filter(post => {
            if (post.VideoURLs !== null && post.VideoURLs.length > 0 && post.VideoURLs[0] !== '') {
                return post
            }
        });

        const filteredPosts = filtered.splice(0, output)
        
        return filteredPosts
    }
}

export const FetchProfileFeed = (publicKey, reader) => {
    return useInfiniteQuery([['single-profile-feed', publicKey], ({ pageParam : '', publicKey : publicKey, reader : reader })], GetProfileFeed,
        {
            enabled: !!publicKey, 
            getNextPageParam: (lastPage, pages) => {
                if(lastPage === null) {
                    return null;
                } else {
                    console.log(lastPage);
                    return 0;
                }
            }
        }
    );
}

export const GetSingleProfile = async ({ queryKey }) => {
    const [_key, { username }] = queryKey;
    const endpoint = 'get-single-profile';
    const response = await axios.post(`${BASE_URI}/${endpoint}`, {
        Username: username,
    });
    if (response === null) {
        return null
    } else {
        const profile = response.data.Profile;
        return profile
    }
}

export const FetchProfile = (username) => {
    return useQuery([['single-profile', username], { username }], GetSingleProfile,
        {
            enabled: !!username,
            keepPreviousData: true,
        }
    );
}