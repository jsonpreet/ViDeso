import { ThemeProvider } from 'next-themes';
import NextNProgress from 'nextjs-progressbar';
import Head from 'next/head';
import { lazy, Suspense, useEffect } from 'react'
import '@styles/globals.scss'
import FullPageLoader from '@components/Common/FullPageLoader';
import Layout from '@components/Common/Layout';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
          <title>Pineso</title>
      </Head>
      <NextNProgress color="#5634ee" showOnShallow={true} />
      <Suspense fallback={<FullPageLoader />}>
        <ThemeProvider enableSystem={false} attribute="class">
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
       </Suspense>
    </>
  )
}

export default MyApp
