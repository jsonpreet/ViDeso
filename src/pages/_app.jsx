import { ThemeProvider } from 'next-themes';
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import NextNProgress from 'nextjs-progressbar';
import { useEffect, useState } from 'react'
import MetaTags from '@app/components/Common/MetaTags';
import { Devtools } from '@app/components/DevTools';
import { queryConfig, queryConfigAuto } from '@app/utils/constants';
import { useRouter } from 'next/router';
import Layout from '@app/components/Common/Layout';
import '@vidstack/player/hydrate.js';
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import "react-multi-carousel/lib/styles.css";
import '@styles/globals.scss'

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
  return (
    <>
      <MetaTags/>
      <ThemeProvider enableSystem={false} attribute="class">
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            <NextNProgress color="#db2777" showOnShallow={true} />
            <SessionContextProvider
              supabaseClient={supabase}
              initialSession={pageProps.initialSession}
            >
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </SessionContextProvider>
            <Devtools />
          </Hydrate>
        </QueryClientProvider>
      </ThemeProvider>
    </>
  )
}

export default MyApp
