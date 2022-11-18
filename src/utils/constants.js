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
  Description: 'Videso is a decentralized video-sharing social media platform built with DeSo.',
  Twitter: 'VidesoApp',
  PublicKeyBase58Check: 'BC1YLiHYuaqQc1r5UFvJ3G8eMYawk693wVGiTHmBQtr9DK8NQXt14oJ'
}

export const BASE_URI = process.env.NEXT_PUBLIC_NODE_API_URL || 'https://diamondapp.com/api/v0'; //'https://node.deso.org/api/v0';
export const BASE_IDENTITY_URI = process.env.NEXT_PUBLIC_NODE_IDENTITY_URL || 'https://identity.deso.org';
export const EXTERNAL_LINK = process.env.NEXT_PUBLIC_EXTERNAL_URL || 'https://diamondapp.com';
export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://videso.xyz';

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