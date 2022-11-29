import { getVideoExtraData } from "./getVideoExtraData";

export const getVideoThumbnail = (video, duration = 0) => {
    const extraData = getVideoExtraData(video);
    const url = video.VideoURLs[0]
    const replacedUrl = url.replace('iframe.', '')
    const thumbnail = extraData?.Thumbnail ? { url: extraData.Thumbnail, processed: true } : { url: `${replacedUrl}/thumbnails/thumbnail.jpg?time=${duration}&height=1080`, processed: false };
    return thumbnail;
}