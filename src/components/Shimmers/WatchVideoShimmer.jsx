import React from 'react'
import { useMemo } from 'react'

import SuggestedShimmer from './SuggestedShimmer'
import { CardShimmer } from './VideoCardShimmer'

export const SuggestedVideosShimmer = () => {
  const cards = useMemo(() => Array(15).fill(1), [])

  return (
    <div className="col-span-1 space-y-2">
      {cards.map((i, idx) => (
        <SuggestedShimmer key={`${i}_${idx}`} />
      ))}
    </div>
  )
}

export const WatchVideoShimmer = () => {
  return (
    <div className="grid grid-cols-1 gap-y-4 md:gap-4 xl:grid-cols-4">
      <div className="col-span-3">
        <CardShimmer />
        <div className="flex flex-col flex-1 mt-4 md:px-0 px-4 animate-pulse">
          <div className="w-full h-4 my-2 bg-gray-300 rounded-md dark:bg-gray-700" />
          <div className="flex items-center space-x-3">
            <div className="w-1/2 h-3 bg-gray-300 rounded-md dark:bg-gray-700" />
          </div>
          <div className="flex items-center justify-between mt-4 w-full">
            <span className="flex items-center justify-start w-1/2 space-x-2">
              <div className="bg-gray-300 rounded-full w-10 h-10 dark:bg-gray-700" />
              <div className="flex flex-col md:w-40 space-y-1">
                <div className="h-3 w-full bg-gray-300 rounded-md dark:bg-gray-700" />
                <div className="w-1/2 h-2 bg-gray-300 rounded-md  dark:bg-gray-700" />
              </div>
              <div className="w-1/2 h-10 bg-gray-300 rounded-full dark:bg-gray-700" />
            </span>
            <span className="flex items-center justify-end flex-1 space-x-2">
              <div className="w-16 h-10 hidden md:block bg-gray-300 rounded-full dark:bg-gray-700" />
              <div className="w-16 h-10 bg-gray-300 rounded-full dark:bg-gray-700" />
              <div className="w-16 h-10 bg-gray-300 rounded-full dark:bg-gray-700" />
              <div className="w-16 h-10 bg-gray-300 rounded-full dark:bg-gray-700" />
            </span>
          </div>
          <div className="mt-4 md:-ml-0 md:-mr-0 -ml-4 -mr-4">
            <div className="h-40 bg-gray-300 rounded-none md:rounded-xl dark:bg-gray-700" />
          </div>
        </div>
      </div>
      <SuggestedVideosShimmer />
    </div>
  )
}