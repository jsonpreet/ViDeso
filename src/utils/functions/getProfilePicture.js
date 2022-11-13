export const getProfilePicture = (channel) => {
  const url =
    channel.ExtraData?.FeaturedImageURL !== null ?
    channel.ExtraData?.FeaturedImageURL :
    channel.ExtraData?.LargeProfilePicURL !== null ?
    channel.ExtraData?.LargeProfilePicURL : undefined
  return (url !== undefined) ? url : `https://node.deso.org/api/v0/get-single-profile-picture/${channel.PublicKeyBase58Check}`;
}
