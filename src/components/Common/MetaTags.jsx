import { APP } from '@utils/constants'
import Head from 'next/head'
import { useRouter } from 'next/router'

const MetaTags = (props) => {
  const { description, title, image } = props
  const router = useRouter()

  const meta = {
    title: title ? `${title} - ${APP.Name}` : APP.Name,
    description: description ?? APP.Description,
    image: image ?? `/images/seo/og.png`,
    type: 'website'
  }

  return (
    <Head>
      <title>{meta.title}</title>
      <meta name="robots" content="follow, index" />
      <meta content={meta.description} name="description" />
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      <link rel="icon" type="image/x-icon" href="/favicon.ico"/>
      <link rel="canonical" href={`${APP.URL}${router.asPath}`} />
      <meta property="og:url" content={`${APP.URL}${router.asPath}`}/>
      <meta property="og:type" content={meta.type} />
      <meta property="og:site_name" content={APP.Name} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:title" content={meta.title} />
      <meta property="og:image:width" content="1200"/>
      <meta property="og:image:height" content="630"/>
      <meta property="og:image:type" content="image/jpeg"/>
      <meta property="og:image:alt" content={meta.description}/>
    </Head>
  )
}

export default MetaTags