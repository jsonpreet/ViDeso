export const getVideoTitle = (video) => {
    const profile = video.ProfileEntryResponse;
    const payload = video.PostExtraData?.Videso ? JSON.parse(video.PostExtraData.Videso) : null;
    const title = (payload !== null && payload.Title !== '') ? payload.Title : `Video by ${profile?.Username}`;
    return title;
}