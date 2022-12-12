import { ThemeProvider } from 'next-themes';
import { useRouter } from 'next/router';
import { DefaultSeo } from 'next-seo';
import NextNProgress from 'nextjs-progressbar';
import { useEffect, useMemo, useState } from 'react'
import { Devtools } from '@components/DevTools';
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { DEFAULT_SEO, queryConfig, queryConfigAuto } from '@utils/constants';
import Layout from '@components/Common/Layout';
import VideoMetaTags from '@components/Common/VideoMetaTags';
import { LivepeerConfig, createReactClient, studioProvider } from '@livepeer/react';
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider } from '@supabase/auth-helpers-react'

import "react-multi-carousel/lib/styles.css";
import '@styles/globals.scss'
import '@vidstack/player/hydrate.js';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [config, setConfig] = useState(queryConfig);
  const [supabase] = useState(() => createBrowserSupabaseClient())

  useEffect(() => {
    if (router.pathname === '/watch/[id]') {
      setConfig(queryConfig);
    } else {
      setConfig(queryConfigAuto);
    }
  }, [router]);

  const [queryClient] = useState(() => new QueryClient(config))

  const livepeerClient = useMemo(() => {
    return createReactClient({
      provider: studioProvider({
        apiKey: process.env.NEXT_PUBLIC_LIVEPEER_KEY,
      }),
    });
  }, []);

  return (
    <>
      <VideoMetaTags/>
      <ThemeProvider enableSystem={false} attribute="class">
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            <NextNProgress color="#db2777" showOnShallow={true} />
            <SessionContextProvider
              supabaseClient={supabase}
              initialSession={pageProps.initialSession}
            >
              <LivepeerConfig dehydratedState={pageProps?.dehydratedState} client={livepeerClient}>
                <DefaultSeo {...DEFAULT_SEO}/>
                <Layout>
                  <Component {...pageProps} />
                </Layout>
              </LivepeerConfig>
            </SessionContextProvider>
            <Devtools />
          </Hydrate>
        </QueryClientProvider>
      </ThemeProvider>
    </>
  )
}

export default MyApp
