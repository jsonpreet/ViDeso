export const getProfilePicture = (channel) => {
  // const url =
  //   (channel.ExtraData.FeaturedImageURL !== null && channel.ExtraData.FeaturedImageURL !== undefined) ?
  //   channel.ExtraData.FeaturedImageURL : `https://diamondapp.com/api/v0/get-single-profile-picture/${channel.PublicKeyBase58Check}`
  return `https://diamondapp.com/api/v0/get-single-profile-picture/${channel.PublicKeyBase58Check}?fallback=https://diamondapp.com/assets/img/default_profile_pic.png`;
}
