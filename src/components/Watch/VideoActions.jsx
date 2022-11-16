import React, { FC, useState } from 'react'
import { FiFlag } from 'react-icons/fi'
import { IoDiamondOutline } from 'react-icons/io5'
import { RiShareForwardLine } from 'react-icons/ri'
import { TbHeartHandshake } from 'react-icons/tb'
import ShareModal from '../Common/ShareModal'
import { Button } from '../UIElements/Button'
import Reactions from './Reactions'
import { useDetectClickOutside } from 'react-detect-click-outside'

const VideoActions = ({ video }) => {
    const [showShare, setShowShare] = useState(false)
    const [showReport, setShowReport] = useState(false)
    const [showTip, setShowTip] = useState(false)

    const closeShareModal = () => {
        setShowShare(false)
    }
    
    const shareModalRef = useDetectClickOutside({ onTriggered: closeShareModal, triggerKeys: ['Escape', 'x'], });

    return (
        <div className="flex items-center justify-end mt-4 space-x-2.5 md:space-x-4 md:mt-0">
            {/* <TipModal show={showTip} setShowTip={setShowTip} video={video} />*/}
            <ShareModal video={video} show={showShare} setShowShare={setShowShare} />
            {/*<ReportModal
            show={showReport}
            setShowReport={setShowReport}
            video={video}
            /> */}
            <Reactions video={video} />
            <Button
                variant="light"
                onClick={() => setShowShare(true)}
                className='h-10 '
                ref={shareModalRef} 
            >
                <span className="flex items-center space-x-3">
                    <RiShareForwardLine size={22} />
                    <span>Share</span>
                </span>
            </Button>
            <Button
                onClick={() => {
                    setShowReport(true)
                }}
                variant="light"
                className='h-10 '
                >
                <span className="flex items-center space-x-3">
                    <FiFlag size={18} />
                    <span>Report</span>
                </span>
            </Button>
        </div>
    )
}

export default VideoActions