export const getProfileExtraData = (profile) => {
    const payload = profile?.ExtraData?.Videso ? JSON.parse(profile.ExtraData.Videso) : null;
    return payload;
}