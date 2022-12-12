

import usePersistStore from '@store/persist'
import { APP, DESO_CONFIG } from '@utils/constants'
import CommentsShimmer from '@components/Shimmers/CommentsShimmer'
import { NoDataFound } from '@components/UI/NoDataFound'
import Deso from 'deso-protocol'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { BiComment } from 'react-icons/bi'
import New from './New'

const Comment = dynamic(() => import('./Comment'))

const Comments = ({ video }) => {
    const {isLoggedIn, user } = usePersistStore((state) => state)
    const [loading, setLoading] = useState(true)
    const userPublicKey = isLoggedIn ? user.profile.PublicKeyBase58Check : APP.PublicKeyBase58Check;
    const [post, setPost] = useState([])

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [video, userPublicKey])
    
    const fetchData = async () => {
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
            toast.error("Something went wrong!");
            setLoading(false);
        }
    }

    const refetchComments = async () => {
        fetchData();
    }

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
            {isLoggedIn ? (
                <New video={video} refetch={refetchComments} />
            ) : null}
            
            {!loading ? (
                <>
                    <div className=" space-y-4">
                        {post.Comments?.map((comment) => (
                            <Comment key={`${comment?.PostHashHex}`} comment={comment}
                        />
                        ))}
                    </div>
                </>
            ) : null}
        </div>
    )
}

export default Comments