import { CREATOR_VIDEO_CATEGORIES } from '@app/data/categories'
import create from 'zustand'

export const UPLOADED_VIDEO_FORM_DEFAULTS = {
  stream: null,
  preview: '',
  videoType: '',
  file: null,
  title: '',
  description: '',
  thumbnail: '',
  thumbnailType: '',
  videoSource: '',
  percent: 0,
  playbackId: '',
  isSensitiveContent: false,
  isUploadToIpfs: false,
  loading: false,
  uploadingThumbnail: false,
  buttonText: 'Post Video',
  durationInSeconds: null,
  videoCategory: CREATOR_VIDEO_CATEGORIES[0],
  isNSFW: false,
  isNSFWThumbnail: false
}

export const useAppStore = create((set) => ({
  channels: [],
  recommendedChannels: [],
  showCreateChannel: false,
  hasNewNotification: false,
  uploadedVideo: UPLOADED_VIDEO_FORM_DEFAULTS,
  upNextVideo: null,
  selectedChannel: null,
  videoWatchTime: 0,
  setVideoWatchTime: (videoWatchTime) => set(() => ({ videoWatchTime })),
  setSelectedChannel: (channel) => set(() => ({ selectedChannel: channel })),
  setUpNextVideo: (upNextVideo) => set(() => ({ upNextVideo })),
  setUploadedVideo: (videoData) =>
    set((state) => ({
      uploadedVideo: { ...state.uploadedVideo, ...videoData }
    })),
  setUserSigNonce: (userSigNonce) => set(() => ({ userSigNonce })),
  setHasNewNotification: (b) => set(() => ({ hasNewNotification: b })),
  setChannels: (channels) => set(() => ({ channels })),
  setRecommendedChannels: (recommendedChannels) =>
    set(() => ({ recommendedChannels })),
  setShowCreateChannel: (showCreateChannel) =>
    set(() => ({ showCreateChannel })),
}))

export default useAppStore