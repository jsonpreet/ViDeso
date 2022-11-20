export const getProfilePicture = (channel) => {
  const channelExtra = channel.ExtraData || {};
  const largeImage = channelExtra.LargeProfilePicURL !== null ? channelExtra.LargeProfilePicURL  : null
  const url = largeImage ? largeImage : channel.PublicKeyBase58Check ? `https://diamondapp.com/api/v0/get-single-profile-picture/${channel.PublicKeyBase58Check}?fallback=https://diamondapp.com/assets/img/default_profile_pic.png` : `https://diamondapp.com/assets/img/default_profile_pic.png`;
  console.log('profilePic', url);
  return url;
}
