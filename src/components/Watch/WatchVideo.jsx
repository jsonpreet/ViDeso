import { useRouter } from 'next/router'
import Custom500 from '@app/pages/404'
import Custom404 from '@app/pages/500'
import { useEffect, useState } from 'react'
import { WatchVideoShimmer } from '@components/Shimmers/WatchVideoShimmer'
import usePersistStore from '@app/store/persist'
import useAppStore from '@app/store/app'
import { getPlaybackIdFromUrl } from '@app/utils/functions/getVideoUrl'
import axios from 'axios'
import AboutChannel from './AboutChannel'
import SuggestedVideos from './SuggestedVideos'
import Video from './Video'
import VideoComments from './VideoComments'
import Deso from 'deso-protocol'
import { getVideoThumbnail } from '@app/utils/functions/getVideoThumbnail'
import { getVideoTitle } from '@app/utils/functions/getVideoTitle'
import { getSinglePost } from '@app/data/videos'
import { useQuery } from '@tanstack/react-query'
import logger from '@app/utils/logger'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { APP } from '@app/utils/constants'
import { getThumbDuration } from '@app/utils/functions'
import { NextSeo } from 'next-seo'
import Head from 'next/head'

const WatchVideo = () => {
    const router = useRouter()
    const supabase = useSupabaseClient()
    const addToRecentlyWatched = usePersistStore((state) => state.addToRecentlyWatched)
    const setVideoWatchTime = useAppStore((state) => state.setVideoWatchTime)
    const user = usePersistStore((state) => state.user)
    const isLoggedIn = usePersistStore((state) => state.isLoggedIn)
    const reader = isLoggedIn ? user.profile.PublicKeyBase58Check : APP.PublicKeyBase58Check;
    const [videoData, setVideoData] = useState(null)
    const [views, setViews] = useState(0)
    const [thumbnailUrl, setThumbnailUrl] = useState('')
    const [defaultThumbnailUrl, setDefaultThumbnailUrl] = useState('')
    const [loading, setLoading] = useState(true)
    const [posthash, setPosthash] = useState('')

    const { isLoading, isError, error, isFetched, data: video } = useQuery([['single-post', posthash], { id: posthash, reader: reader }], getSinglePost, { enabled: !!posthash, })

    useEffect(() => {
        const { id, t } = router.query
        if (id) {
            setPosthash(id)
        }
        if (t) {
            setVideoWatchTime(Number(t))
        }
        if (!video) {
            setVideoData(null)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [router, video])

    //console.log({isSuccess: isSuccess, isLoading: isLoading, isFetching: isFetching, isError: isError, 'video': id})

    useEffect(() => {
        const deso = new Deso()
        const getVideo = async () => {
            const videoID = getPlaybackIdFromUrl(video);
            const request = {
                "videoId": videoID
            };
            const videoData = await deso.media.getVideoStatus(request)
            //setVideoData({ id: videoID, data: videoData.data })
            setVideoData({ id: videoID, data: videoData.data, hls: `https://customer-wgoygazehbn8yt5i.cloudflarestream.com/${videoID}/manifest/video.m3u8` })
            try {
                const duration = getThumbDuration(videoData.data.Duration);
                const thumb = getVideoThumbnail(video, duration);
                setDefaultThumbnailUrl(thumb.url)
                if (thumb.processed) {
                    setThumbnailUrl(thumb.url)
                } else {
                    await axios.get(thumb.url, { responseType: 'blob' }).then((res) => {
                        setThumbnailUrl(URL.createObjectURL(res.data))
                    })
                }
                setLoading(false)
            } catch (error) {
                setLoading(false)
                console.error(video.PostHashHex, 'thumbnail', error);
            }
        }
        if (video && isFetched) {
            addToRecentlyWatched(video)
            getVideo()
            getViews()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [router, video, isFetched, addToRecentlyWatched])

    function getViews() {
        supabase.from('views').select('*', { count: 'exact' }).eq('posthash', video.PostHashHex).then((res) => {
            setViews(res.count)
            if (res.error) {
                logger.error(video.PostHashHex, 'views', res.error);
            }
        })
    }
    
    useEffect(() => {
        if (isLoggedIn && video && video.VideoURLs !== null) {
            async function addToHistory() {
                try {
                    const { data: post, error } = await supabase.from('history').select('*').eq('posthash', video.PostHashHex).eq('user', reader);
                    if (post.length > 0) {
                        await supabase.from('history').update({ lastwatched: new Date() }).eq('posthash', video.PostHashHex).eq('user', reader);
                    } else {
                        const request = { user: reader, posthash: video.PostHashHex, lastwatched: new Date() }

                        supabase.from('history').insert([request]).then((res) => {
                            if (res.error) {
                                logger.error(video.PostHashHex, 'watched', res.error);
                            }
                        })
                    }
                    
                } catch (error) {
                    logger.error(video.PostHashHex, 'watched', error);
                }
            }
            addToHistory()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [video, isLoggedIn, reader])

    if (isError) {
        return <Custom500 />
    }

    if (isFetched && !video) {
        return <Custom404 />
    }

    if (loading || !videoData) return <WatchVideoShimmer />
    
    return (
        <>
            <NextSeo
                title={video ? getVideoTitle(video) : 'Watch'}
                description={video ? getVideoTitle(video) : 'Watch'}
                canonical={`${APP.URL}/watch/${video.PostHashHex}`}
                openGraph={{
                    title: video ? getVideoTitle(video) : 'Watch',
                    description: video ? getVideoTitle(video) : 'Watch',
                    url: `${APP.URL}/watch/${router.asPath}`,
                    images: [
                        {
                            url: video ? defaultThumbnailUrl : '',
                            alt: video ? getVideoTitle(video) : 'Watch',
                        },
                    ],
                }}
            />
            <Head>
                <link
                    rel="iframely player"
                    type="text/html"
                    href={`${APP.EMBED_URL}/${router.query?.id}`}
                    media="(aspect-ratio: 1280/720)"
                />
                <link
                    rel="alternate"
                    type="text/xml+oembed"
                    href={`${APP.API_URL}/oembed?format=xml&id=${router.query?.id}`}
                    title={video ? getVideoTitle(video) : 'Watch'}
                />
                <link
                    rel="alternate"
                    type="application/json+oembed"
                    href={`${APP.API_URL}/oembed?format=json&id=${router.query?.id}`}
                    title={video ? getVideoTitle(video) : 'Watch'}
                />
            </Head>
            {isFetched && !loading && !isError && videoData && video ? (
                <div className="w-full flex md:flex-row flex-col">
                    <div className="flex md:pr-6 md:flex-1 flex-col space-y-4">
                        <Video views={views} videoData={videoData} video={video} poster={thumbnailUrl} />
                        <AboutChannel views={views} video={video} />
                        <VideoComments video={video} />
                    </div>
                    <div className="w-full md:min-w-[300px] md:max-w-[400px]">
                        <SuggestedVideos video={video} currentVideoId={video?.PostHashHex} />
                    </div>
                </div>
            ) : null}
        </>
    )
}

export default WatchVideo