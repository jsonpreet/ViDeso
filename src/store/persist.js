import create from 'zustand'
import { persist } from 'zustand/middleware'

export const usePersistStore = create(
  persist(
    (set, get) => ({
      autoPlay: true,
      recentlyWatched: [],
      watchLater: [],
      user: [],
      selectedChannelId: null,
      isLoggedIn: false,
      notificationCount: 0,
      setAutoPlay: (autoPlay) => set(() => ({ autoPlay })),
      setLoggedIn: (isLoggedIn) => set(() => ({ isLoggedIn })),
      setUser: (user) => set(() => ({ user })),
      setNotificationCount: (notificationCount) =>
        set(() => ({ notificationCount })),
      setSelectedChannelId: (id) => set(() => ({ selectedChannelId: id })),
      addToRecentlyWatched: (video) => {
        const alreadyExists = get().recentlyWatched.find(
          (el) => el.id === video.id
        )
        const newList = get().recentlyWatched?.slice(0, 7)
        set(() => ({
          recentlyWatched: alreadyExists
            ? get().recentlyWatched
            : [video, ...newList]
        }))
      },
      addToWatchLater: (video) => {
        const alreadyExists = get().watchLater.find((el) => el.id === video.id)
        const newList = get().watchLater.splice(0, 7)
        set(() => ({
          watchLater: alreadyExists ? get().watchLater : [video, ...newList]
        }))
      },
      removeFromWatchLater: (video) => {
        const videos = get().watchLater.filter((el) => el.id !== video.id)
        set(() => ({
          watchLater: videos
        }))
      }
    }),
    {
      name: 'videso.store'
    }
  )
)

export default usePersistStore