import VideoCard from '@components/Common/Cards/Video'
import TimelineShimmer from '@components/Shimmers/TimelineShimmer';
import { useInView } from 'react-intersection-observer'
import { useEffect, useState } from 'react';
import usePersistStore from '@store/persist';
import { NoDataFound } from '@components/UI/NoDataFound';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { GetHistoryFeed } from '@data/history';
import { useInfiniteQuery } from '@tanstack/react-query';


const HistoryVideos = ({isLibrary = false}) => {
  const { ref, inView } = useInView()
  const { isLoggedIn, user } = usePersistStore()
  const supabase = useSupabaseClient()
  const [noData, setNoDataFound] = useState(false)
  const [historyPosts, setHistoryPosts] = useState([])
  const reader = user.profile.PublicKeyBase58Check;
  const { isLoading, isError, error, fetchNextPage, isFetchingNextPage, hasNextPage, isFetched, data: videos } = useInfiniteQuery(['user-history-feed', reader], ({ pageParam = ''}) => GetHistoryFeed(historyPosts, reader, pageParam),
    {
      enabled: !!historyPosts.length > 0,
      getNextPageParam: (lastPage, pages) => {
        if(lastPage === null) {
          return null;
        } else {
          return 0;
        }
      }
    }
  );
  
  useEffect(() => {
    async function getHistory() {
      try {
        const { data, error } = await supabase.from('history').select('*').limit(32).eq('user', reader).order('id', { ascending: false } );
        if (data.length > 0) {
          const postsList = data.map((post) => post.posthash);
          setHistoryPosts(postsList)
        } else {
          setNoDataFound(true)
        }
      } catch (error) {
        console.log(`User ${reader} History`, error);
      }
    }
    getHistory()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reader])

  if (isError) {
    return <NoDataFound 
      isCenter
      withImage
      title="Something went wrong"
      description="We are unable to fetch the latest videos. Please try again later."
    />
  } 

  if (isFetched && (videos.length === 0 || noData)) {
    return <NoDataFound 
      isCenter
      withImage
      title="Something went wrong"
      description="We are unable to fetch the latest videos. Please try again later."
    />
  } 

  if (isLoading) {
    return (
      <div><TimelineShimmer cols={isLibrary ? 8 : 28} /></div>
    )
  }

  if (isFetched) {
    return (
      <>
        <div className="grid gap-x-4 lg:grid-cols-4 md:gap-y-4 gap-y-2 2xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 xs:grid-col-1">
          {videos.pages.map(page => 
            page.map(video => {
              return (
                <VideoCard userProfile={video.ProfileEntryResponse} key={`${video.PostHashHex}`} video={video} />
              )
            })
          )}
        </div>
      </>
    )
  }
 
}

export default HistoryVideos