import VideoCard from '@components/Common/Cards/Video'
import TimelineShimmer from '@components/Shimmers/TimelineShimmer';
import { useInView } from 'react-intersection-observer'
import { useEffect, useState } from 'react';
import usePersistStore from '@store/persist';
import { NoDataFound } from '@components/UI/NoDataFound';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { getFeed } from '@data/history';


const WatchedVideos = () => {
  const { ref, inView } = useInView()
  const { isLoggedIn, user } = usePersistStore()
  const supabase = useSupabaseClient()
  const [videos, setVideos] = useState([])
  const [isLoading, setLoading] = useState(true)
  const [isError, setError] = useState(false)
  const [isFetched, setFetched] = useState(false)
  const [noData, setNoDataFound] = useState(false)
  const reader = user.profile.PublicKeyBase58Check;

  useEffect(() => {
    async function getWatchLater() {
      try {
        const { data, error } = await supabase.from('watchlater').select('*').limit(32).eq('user', reader).order('id', { ascending: false } );
        if (data.length > 0) {
          const feed = await getFeed(data, reader);
          setVideos(feed)
          setLoading(false)
          setFetched(true)
        } else {
          setLoading(false)
          setNoDataFound(true)
        }
          
      } catch (error) {
        setLoading(false)
        setError(true)
        console.log(`User ${reader} History`, error);
      }
    }
    getWatchLater()
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reader])

  if (isError) {
    return <NoDataFound 
      isCenter
      withImage
      title="Something went wrong"
      description="We are unable to fetch the videos. Please try again later."
    />
  } 

  if (isFetched && (videos.length === 0 || noData)) {
    return <NoDataFound 
      isCenter
      withImage
      title="Something went wrong"
      description="We are unable to fetch the  videos. Please try again later."
    />
  } 

  if (isLoading) {
    return (
      <div><TimelineShimmer cols={8} /></div>
    )
  }

  if (isFetched) {
    return (
      <>
        <div className="grid gap-x-4 lg:grid-cols-4 md:gap-y-4 gap-y-2 2xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 xs:grid-col-1">
          {videos.length > 0 && videos.map((video) => {
            return (
              <VideoCard userProfile={video.ProfileEntryResponse} key={`${video.PostHashHex}`} video={video} />
            )
          })}
        </div>
      </>
    )
  }
 
}

export default WatchedVideos