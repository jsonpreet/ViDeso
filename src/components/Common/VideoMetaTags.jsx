import { APP } from '@utils/constants';
import Head from 'next/head'
import { useRouter } from 'next/router'
import React from 'react'

function VideoMetaTags() {
    const router = useRouter();
    if (router.pathname === '/watch/[id]' && router.query.id !== null) {
        return (
            <>
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
                        title={APP.Name}
                    />
                    <link
                        rel="alternate"
                        type="application/json+oembed"
                        href={`${APP.API_URL}/oembed?format=json&id=${router.query?.id}`}
                        title={APP.Name}
                    />
                </Head>
            </>
        )
    }
    return null
}

export default VideoMetaTags