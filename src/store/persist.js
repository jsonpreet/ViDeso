import create from 'zustand'
import { persist } from 'zustand/middleware'

export const usePersistStore = create(
  persist(
    (set, get) => ({
      autoPlay: true,
      recentlyWatched: [],
      suggestedVideos: [],
      watchLater: [],
      user: [],
      selectedChannelId: null,
      isLoggedIn: false,
      notificationCount: 0,
      setAutoPlay: (autoPlay) => set(() => ({ autoPlay })),
      setLoggedIn: (isLoggedIn) => set(() => ({ isLoggedIn })),
      setUser: (user) => set(() => ({ user })),
      setNotificationCount: (notificationCount) => set(() => ({ notificationCount })),
      setSelectedChannelId: (id) => set(() => ({ selectedChannelId: id })),
      addToRecentlyWatched: (video) => {
        const alreadyExists = get().recentlyWatched.find(
          (el) => el.PostHashHex === video.PostHashHex
        )
        const newList = get().recentlyWatched?.slice(0, 15)
        set(() => ({
          recentlyWatched: alreadyExists
            ? get().recentlyWatched
            : [video, ...newList]
        }))
      },
      addSuggestedVideos: (videos) => {
        set(() => ({
          suggestedVideos: videos
        }))
      },
      addToWatchLater: (video) => {
        const alreadyExists = get().watchLater.find((el) => el.PostHashHex === video.PostHashHex)
        const newList = get().watchLater.splice(0, 7)
        set(() => ({
          watchLater: alreadyExists ? get().watchLater : [video, ...newList]
        }))
      },
      removeFromWatchLater: (video) => {
        const videos = get().watchLater.filter((el) => el.PostHashHex !== video.PostHashHex)
        set(() => ({
          watchLater: videos
        }))
      }
    }),
    {
      name: 'videso'
    }
  )
)

export default usePersistStore