
import useAppStore from '@app/store/app'
import usePersistStore from '@app/store/persist'
import CommentsShimmer from '@components/Shimmers/CommentsShimmer'
import { Loader } from '@components/UIElements/Loader'
import { NoDataFound } from '@components/UIElements/NoDataFound'
import Deso from 'deso-protocol'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { AiOutlineComment } from 'react-icons/ai'
import { BiComment } from 'react-icons/bi'
import Alert from '../UIElements/Alert'

// import NewComment from './NewComment'

const Comment = dynamic(() => import('./Comment'))

const VideoComments = ({ video }) => {
    const { query: { id } } = useRouter()
    const selectedChannelId = usePersistStore((state) => state.selectedChannelId)
    const selectedChannel = useAppStore((state) => state.selectedChannel)
    const isLoggedIn = useAppStore((state) => state.isLoggedIn)
    const user = useAppStore((state) => state.user)
    const [loading, setLoading] = useState(true)
    const userPublicKey = isLoggedIn
    ? user.profile.PublicKeyBase58Check
    : "BC1YLhBLE1834FBJbQ9JU23JbPanNYMkUsdpJZrFVqNGsCe7YadYiUg";
    const [post, setPost] = useState([])

    useEffect(() => {
        async function fetchData() {
            const deso = new Deso();
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
                toast.error("Something went wrong!", toastOptions);
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
                {/* {!isLoggedIn && (
                    <span className="text-xs">(Sign in required to comment)</span>
                )} */}
            </div>
            {post.CommentCount === 0 && (
                <NoDataFound text="Be the first to comment." />
            )}
            {/* {video?.canComment.result ? (
                <NewComment video={video} refetchComments={() => refetchComments()} />
            ) : (
                <Alert variant="warning">
                <span className="text-sm">
                    {isFollowerOnlyReferenceModule
                    ? 'Only subscribers can comment on this publication'
                    : `Only subscribers within ${video.profile.handle}'s preferred network can comment`}
                </span>
                </Alert>
            )} */}
            {!loading && (
                <>
                    <div className=" space-y-4">
                        {post.Comments?.map((comment) => (
                            <Comment key={`${comment?.PostHashHex}`} comment={comment}
                        />
                        ))}
                    </div>
                    {/* {pageInfo?.next && comments.length !== pageInfo?.totalCount && (
                        <span ref={observe} className="flex justify-center p-10">
                        <Loader />
                        </span>
                    )} */}
                </>
            )}
        </div>
    )
}

export default VideoComments