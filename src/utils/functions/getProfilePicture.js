export const getProfilePicture = (channel) => {
  const channelExtra = channel.ExtraData || {};
  const largeImage = channelExtra.LargeProfilePicURL !== null ? channelExtra.LargeProfilePicURL  : null
  const url = largeImage ? largeImage : `https://diamondapp.com/api/v0/get-single-profile-picture/${channel.PublicKeyBase58Check}`
  return url;
}
