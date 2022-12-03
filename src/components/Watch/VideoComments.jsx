

import usePersistStore from '@app/store/persist'
import { APP, DESO_CONFIG } from '@app/utils/constants'
import CommentsShimmer from '@components/Shimmers/CommentsShimmer'
import { NoDataFound } from '@app/components/UI/NoDataFound'
import Deso from 'deso-protocol'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { BiComment } from 'react-icons/bi'

const Comment = dynamic(() => import('./Comment'))

const VideoComments = ({ video }) => {
    const {isLoggedIn, user } = usePersistStore((state) => state)
    const [loading, setLoading] = useState(true)
    const userPublicKey = isLoggedIn ? user.profile.PublicKeyBase58Check : APP.PublicKeyBase58Check;
    const [post, setPost] = useState([])

    useEffect(() => {
        async function fetchData() {
            const deso = new Deso(DESO_CONFIG);
            try {
                const request = {
                    ReaderPublicKeyBase58Check: userPublicKey,
                    PostHashHex: video.PostHashHex,
                    FetchParents: true,
                    CommentOffset: 0,
                    CommentLimit: 20,
                    AddGlobalFeedBool: false,
                    ThreadLevelLimit: 2,
                    ThreadLeafLimit: 1,
                    LoadAuthorThread: true,
                };
                    
                const response = await deso.posts.getSinglePost(request);
                if (response && response.PostFound) {
                    let post = response.PostFound;
                    setPost(post);
                    setLoading(false);
                }
                    
            } catch (error) {
                console.log(error);
                logger.error('error', error);
                toast.error("Something went wrong!");
                setLoading(false);
            }
        }
        fetchData();
    }, [video, userPublicKey])

    if (loading) return <CommentsShimmer />

    return (
        <div className="pb-4 md:px-0 px-3">
            <div className="flex items-center justify-between">
                <h1 className="flex items-center my-4 space-x-2">
                    <BiComment size={22} />
                    <span>
                        {post.CommentCount}
                    </span>
                    <span>Comments</span>
                    
                </h1>
            </div>
            {post.CommentCount === 0 && (
                <NoDataFound text="Be the first to comment." />
            )}
            {!loading && (
                <>
                    <div className=" space-y-4">
                        {post.Comments?.map((comment) => (
                            <Comment key={`${comment?.PostHashHex}`} comment={comment}
                        />
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}

export default VideoComments