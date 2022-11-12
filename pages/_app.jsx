import { ThemeProvider } from 'next-themes';
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import NextNProgress from 'nextjs-progressbar';
import Head from 'next/head';
import { lazy, Suspense, useEffect, useState } from 'react'
import '@styles/globals.scss'
import FullPageLoader from '@components/Common/FullPageLoader';
// import Layout from '@components/Common/Layout';
import MetaTags from '@app/components/Common/MetaTags';

const Layout = lazy(() => import('../src/components/Common/Layout'))

function MyApp({ Component, pageProps }) {
  const [queryClient] = useState(() => new QueryClient())
  return (
    <>
      <MetaTags/>
      <NextNProgress color="#5634ee" showOnShallow={true} />
      <QueryClientProvider client={queryClient}>
        <Suspense fallback={<FullPageLoader />}>
          <ThemeProvider enableSystem={false} attribute="class">
            <Hydrate state={pageProps.dehydratedState}>
                <Layout>
                  <Component {...pageProps} />
                </Layout>
            </Hydrate>
          </ThemeProvider>
        </Suspense>
      </QueryClientProvider>
    </>
  )
}

export default MyApp
