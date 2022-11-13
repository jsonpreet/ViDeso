export const getVideoUrl = (video) => {
  const url = video.VideoURLs[0].replace('iframe.', '')
  return url
}

export const getOriginalVideoUrl = (video) => {
  const url = video.VideoURLs[0]
  return url
}

export const getPlaybackIdFromUrl = (video) => {
  const url = video.VideoURLs[0]
  const playbackId = url.split('/').pop()
  return playbackId
}