export const getVideoExtraData = (video) => {
    const payload = video?.PostExtraData?.Videso ? JSON.parse(video.PostExtraData.Videso) : null;
    return payload;
}