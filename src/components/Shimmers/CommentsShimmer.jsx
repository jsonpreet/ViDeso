import React from 'react'

export const CommentItemShimmer = () => {
  return (
    <div className="flex flex-col space-x-2 animate-pulse">
      <div className="flex py-3 space-x-2">
        <div className="w-8 h-8 bg-gray-300 rounded-xl dark:bg-gray-700" />
        <div className="flex-1 py-1 space-y-2">
          <span className="space-y-2">
            <div className="w-1/4 h-2 bg-gray-300 rounded dark:bg-gray-700" />
            <div className="h-2 bg-gray-300 rounded dark:bg-gray-700" />
          </span>
        </div>
      </div>
    </div>
  )
}

const CommentsShimmer = () => {
  return (
    <div>
      <CommentItemShimmer />
      <CommentItemShimmer />
    </div>
  )
}

export default CommentsShimmer