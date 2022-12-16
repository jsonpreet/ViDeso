export const ALLOWED_VIDEO_TYPES = [
  'video/mp4',
  'video/mpeg',
  'video/ogg',
  'video/webm',
  'video/quicktime'
]

export const APP = {
  Name: 'Videso',
  URL: 'https://videso.xyz',
  EMBED_URL: 'https://embed.videso.xyz',
  API_URL: 'https://api.videso.xyz',
  Description: 'Videso is a decentralized video-sharing social media platform built with DeSo.',
  Twitter: 'VidesoApp',
  PublicKeyBase58Check: 'BC1YLiHYuaqQc1r5UFvJ3G8eMYawk693wVGiTHmBQtr9DK8NQXt14oJ',
  Meta: {
    image: `/meta.png`,
    type: 'website',
  }
}

export const DEFAULT_SEO = {
  title: "Videso",
  description: "Videso is a decentralized video-sharing social media platform built with DeSo.",
  canonical: "https://videso.xyz",
  openGraph: {
    type: 'website',
    locale: 'en_IE',
    url: 'https://videso.xyz',
    siteName: 'Videso',
    title: "Videso",
    description: "Videso is a decentralized video-sharing social media platform built with DeSo.",
    images: [
      {
        url: 'https://videso.xyz/meta.png',
        width: 1200,
        height: 630,
        alt: 'Videso',
      },
    ],
  },
  twitter: {
    handle: '@VidesoApp',
    site: '@VidesoApp',
    cardType: 'summary_large_image',
    title: "Videso",
    description: "Videso is a decentralized video-sharing social media platform built with DeSo.",
    images: [
      {
        url: 'https://videso.xyz/meta.png',
        width: 1200,
        height: 630,
        alt: 'Videso',
      },
    ],
  },
};

export const BASE_URI = process.env.NEXT_PUBLIC_NODE_API_URL || 'https://diamondapp.com/api/v0'; //'https://node.deso.org/api/v0';
export const BASE_NODE_URI = 'https://node.deso.org/api/v0';
export const BASE_IDENTITY_URI = process.env.NEXT_PUBLIC_NODE_IDENTITY_URL || 'https://identity.deso.org';
export const EXTERNAL_LINK = process.env.NEXT_PUBLIC_EXTERNAL_URL || 'https://diamondapp.com';
export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://videso.xyz';
export const VIDEO_CDN_URL = 'https://cdn.livepeer.com'

export const DESO_CONFIG = {
  nodeUri: BASE_URI
}

export const queryConfig = {
  defaultOptions: {
    queries: {
      staleTime: 60 * 1 * 1000,
      // cacheTime: 0,
      refetchOnWindowFocus: false,
    }
  }
}
export const queryConfigAuto = {
  defaultOptions: {
    queries: {
      staleTime: 60 * 1 * 1000,
      // cacheTime: 0,
      refetchOnWindowFocus: true,
    }
  }
}