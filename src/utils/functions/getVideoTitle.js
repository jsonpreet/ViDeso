export const getVideoTitle = (video, profile = null) => {
    const videoProfile = video.ProfileEntryResponse;
    const payload = video.PostExtraData?.Videso ? JSON.parse(video.PostExtraData.Videso) : null;
    const title = (payload !== null && payload.Title !== '') ? payload.Title : profile !== null ? profile.Username : videoProfile.Username;
    return `Video by ${title}`;
}