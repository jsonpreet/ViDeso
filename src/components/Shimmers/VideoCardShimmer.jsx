import React from 'react'

export const CardShimmer = () => {
  return (
    <div className="w-full">
      <div className="flex flex-col space-x-2 animate-pulse">
        <div className="bg-gray-300 aspect-w-16 aspect-h-9 dark:bg-gray-700" />
      </div>
    </div>
  )
}

const VideoCardShimmer = () => {
  return (
    <div className="w-full rounded-xl">
      <div className="flex flex-col space-x-2 animate-pulse">
        <div className="bg-gray-300 md:rounded-xl aspect-w-16 aspect-h-9 dark:bg-gray-700" />
        <div className="flex py-3 space-x-2">
          <div className="w-9 h-9 bg-gray-300 rounded-full dark:bg-gray-700" />
          <div className="flex-1 py-1 px-2 space-y-2">
            <span className="space-y-2">
              <div className="h-2 bg-gray-300 rounded dark:bg-gray-700" />
              <div className="h-3 w-1/2 bg-gray-300 rounded dark:bg-gray-700" />
              <div className="h-3 w-1/2 bg-gray-300 rounded dark:bg-gray-700" />
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VideoCardShimmer