export const getCoverPicture = (channel) => {
  const channelExtra = channel.ExtraData || {};
    const largeImage = channelExtra.FeaturedImageURL !== null ? channelExtra.FeaturedImageURL : null
    const url = largeImage ? largeImage : `/backgrounds/4.jpg`
    return url
}