import { getProfileExtraData } from "./getProfileExtraData";

export const getVideoTitle = (video, profile = null) => {
    const videoProfile = video.ProfileEntryResponse !== null ? video.ProfileEntryResponse : profile;
    const extraData = profile !== null ? getProfileExtraData(profile) : null;
    const payload = video.PostExtraData?.Videso ? JSON.parse(video.PostExtraData.Videso) : null;
    const title = (payload !== null && payload.Title !== '') ? payload.Title : extraData !== null ? extraData.DisplayName : `Video by ${videoProfile.Username}`;
    return title;
}