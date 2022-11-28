import { CREATOR_VIDEO_CATEGORIES } from '@app/data/categories'
import create from 'zustand'

export const UPLOADED_VIDEO_FORM_DEFAULTS = {
  stream: null,
  preview: '',
  videoType: '',
  videoURL: '',
  videoHash: '',
  isProcessing: false,
  file: null,
  title: '',
  description: '',
  language: '',
  tags: [],
  videoData: [],
  thumbnail: '',
  thumbnailType: '',
  videoSource: '',
  percent: 0,
  isSensitiveContent: false,
  readyToPost: false,
  loading: false,
  uploadingThumbnail: false,
  buttonText: 'Submit Video',
  videoCategory: CREATOR_VIDEO_CATEGORIES[0],
  isNSFW: false,
  isNSFWThumbnail: false
}

export const useAppStore = create((set) => ({
  channels: [],
  recommendedChannels: [],
  showCreateChannel: false,
  hasNewNotification: false,
  upNextVideo: null,
  selectedChannel: null,
  uploadedVideo: UPLOADED_VIDEO_FORM_DEFAULTS,
  videoWatchTime: 0,
  setUploadedVideo: (videoData) =>
    set((state) => ({
      uploadedVideo: { ...state.uploadedVideo, ...videoData }
    })),
  setResetUploadedVideo: () =>
    set((state) => ({
      uploadedVideo: UPLOADED_VIDEO_FORM_DEFAULTS
    })),
  setVideoWatchTime: (videoWatchTime) => set(() => ({ videoWatchTime })),
  setSelectedChannel: (channel) => set(() => ({ selectedChannel: channel })),
  setUpNextVideo: (upNextVideo) => set(() => ({ upNextVideo })),
  setUserSigNonce: (userSigNonce) => set(() => ({ userSigNonce })),
  setHasNewNotification: (b) => set(() => ({ hasNewNotification: b })),
  setChannels: (channels) => set(() => ({ channels })),
  setRecommendedChannels: (recommendedChannels) =>
    set(() => ({ recommendedChannels })),
  setShowCreateChannel: (showCreateChannel) =>
    set(() => ({ showCreateChannel })),
}))

export default useAppStore