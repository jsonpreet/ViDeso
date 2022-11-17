export const getVideoTitle = (video, profile = null) => {
    const videoProfile = video.ProfileEntryResponse;
    const payload = video.PostExtraData?.Videso ? JSON.parse(video.PostExtraData.Videso) : null;
    const title = (payload !== null && payload.Title !== '') ? payload.Title : `Video by ${profile?.Username}`;
    return title;
}