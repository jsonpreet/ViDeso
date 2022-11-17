import React, { FC, useState } from 'react'
import { FiFlag } from 'react-icons/fi'
import { IoDiamondOutline } from 'react-icons/io5'
import { RiShareForwardLine } from 'react-icons/ri'
import { TbHeartHandshake } from 'react-icons/tb'
import ShareModal from '../Common/ShareModal'
import { Button } from '../UIElements/Button'
import Reactions from './Reactions'
import { useDetectClickOutside } from 'react-detect-click-outside'
import VideoOptions from '../Common/VideoCard/VideoOptions'
import { BsThreeDotsVertical } from 'react-icons/bs'
import DropMenu from '../UIElements/DropMenu'
import clsx from 'clsx'

const VideoActions = ({ video }) => {
    const [showShare, setShowShare] = useState(false)
    const [showReport, setShowReport] = useState(false)
    const [showTip, setShowTip] = useState(false)

    const closeShareModal = () => {
        setShowShare(false)
    }
    
    const shareModalRef = useDetectClickOutside({ onTriggered: closeShareModal, triggerKeys: ['Escape', 'x'], });

    return (
        <div className="flex items-center md:justify-end mt-4 space-x-2.5 md:space-x-4 md:mt-0">
            {/* <TipModal show={showTip} setShowTip={setShowTip} video={video} />*/}
            <ShareModal rootRef={shareModalRef} video={video} show={showShare} setShowShare={setShowShare} />
            {/*<ReportModal
            show={showReport}
            setShowReport={setShowReport}
            video={video}
            /> */}
            <Reactions video={video} />
            <Button
                variant="light"
                onClick={() => setShowShare(true)}
                className='md:h-10'
                ref={shareModalRef} 
            >
                <span className="flex items-center space-x-3">
                    <RiShareForwardLine size={22} />
                    <span>Share</span>
                </span>
            </Button>
            {/* <Button
                onClick={() => {
                    setShowReport(true)
                }}
                variant="light"
                className='h-10 hidden md:block'
                >
                <span className="flex items-center space-x-3">
                    <FiFlag size={18} />
                    <span>Report</span>
                </span>
            </Button> */}
            <DropMenu
                trigger={
                    <div
                    className={clsx(
                        'hover-primary rounded-full w-9 h-9 flex items-center justify-center md:text-inherit outline-none ring-0 group-hover:visible transition duration-150 ease-in-out -mr-4 focus:outline-none focus:ring-0'
                    )}
                    >
                    <BsThreeDotsVertical size={22} />
                    </div>
                }
                >
                <div className="py-2 my-1 overflow-hidden rounded-lg dropdown-shadow bg-dropdown outline-none ring-0 focus:outline-none focus:ring-0 w-44">
                    <div className="flex flex-col text-[14px] transition duration-150 ease-in-out rounded-lg">
                    <button
                        type="button"
                        onClick={() => setShowReport(true)}
                        className="inline-flex items-center px-3 py-2 space-x-3 hover-primary"
                    >
                        <FiFlag size={18} className="ml-0.5" />
                        <span className="whitespace-nowrap">Report</span>
                    </button>
                    </div>
                </div>
            </DropMenu>
        </div>
    )
}

export default VideoActions