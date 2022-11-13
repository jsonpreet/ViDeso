export const getVideoThumbnail = (video, duration) => {
    const url = video.VideoURLs[0]
    const replacedUrl = url.replace('iframe.', '')
    const thumbnail = `${replacedUrl}/thumbnails/thumbnail.jpg?time=${duration}&height=1660`;
    return thumbnail;
}