import { ThemeProvider } from 'next-themes';
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import NextNProgress from 'nextjs-progressbar';
import Head from 'next/head';
import { lazy, Suspense, useEffect, useState } from 'react'
import FullPageLoader from '@components/Common/FullPageLoader';
// import Layout from '@components/Common/Layout';
import MetaTags from '@app/components/Common/MetaTags';
import { Devtools } from '@app/components/DevTools';
import { queryConfig } from '@app/utils/constants';

import '@styles/globals.scss'

const Layout = lazy(() => import('../src/components/Common/Layout'))

function MyApp({ Component, pageProps }) {
  const [queryClient] = useState(() => new QueryClient(queryConfig))
  return (
    <>
      <MetaTags/>
      <NextNProgress color="#db2777" showOnShallow={true} />
      <QueryClientProvider client={queryClient}>
        <Suspense fallback={<FullPageLoader />}>
          <ThemeProvider enableSystem={false} attribute="class">
            <Hydrate state={pageProps.dehydratedState}>
              <Layout>
                <Component {...pageProps} />
              </Layout>
              <Devtools />
            </Hydrate>
          </ThemeProvider>
        </Suspense>
      </QueryClientProvider>
    </>
  )
}

export default MyApp
