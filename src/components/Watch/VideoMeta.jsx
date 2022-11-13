
import { dateFormat, timeNow } from '@app/utils/functions'
import React, { FC, useState } from 'react'
import { FiClock, FiRepeat } from 'react-icons/fi'
import { IoDiamondOutline } from 'react-icons/io5'

const VideoMeta = ({ video }) => {

    return (
    <div className="flex flex-wrap items-center text-sm opacity-80">
        <div className="flex items-center">
            <button
                type="button"
                className="flex items-center space-x-1 outline-none"
            >
                <IoDiamondOutline size={15} />
                <span>{video.DiamondCount} diamonds</span>
            </button>
        <span className="px-1 middot" />
            <button
                type="button"
                className="flex items-center space-x-1 outline-none"
            >
                <FiRepeat size={14} />
                <span>{video.RepostCount + video.QuoteRepostCount} reposts</span>
            </button>
        </div>
        <span className="px-1 middot" />
        <span className="flex items-center space-x-1 outline-none" title={dateFormat(video.TimestampNanos)}>
            <FiClock size={16} />
            <span>{timeNow(video.TimestampNanos)}</span>
        </span>
    </div>
    )
}

export default VideoMeta