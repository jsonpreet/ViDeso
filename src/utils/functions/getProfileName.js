import { getProfileExtraData } from "./getProfileExtraData";

export const getProfileName = (profile) => {
    const channelExtra = getProfileExtraData(profile);
    const displayName = channelExtra !== null ? channelExtra.DisplayName !== null ? channelExtra.DisplayName : profile.Username : profile.Username
    return displayName
}