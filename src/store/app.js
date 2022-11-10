import { CREATOR_VIDEO_CATEGORIES } from '@app/data/categories'
import create from 'zustand'

export const UPLOADED_VIDEO_FORM_DEFAULTS = {
  stream: null,
  playbackId: '',
  loading: false,
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
  upNextVideo: null,
  selectedChannel: null,
  videoWatchTime: 0,
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