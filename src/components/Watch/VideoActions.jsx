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
import { BsThreeDots, BsThreeDotsVertical } from 'react-icons/bs'
import DropMenu from '../UIElements/DropMenu'
import clsx from 'clsx'
import usePersistStore from '@app/store/persist'
import { APP } from '@app/utils/constants'
import Tooltip from '@app/components/UIElements/Tooltip'

const VideoActions = ({ video }) => {
    const [showShare, setShowShare] = useState(false)
    const [showReport, setShowReport] = useState(false)
    const [showTip, setShowTip] = useState(false)
    const { isLoggedIn, user } = usePersistStore();
    const reporterID = isLoggedIn ? user.profile.PublicKeyBase58Check : APP.PublicKeyBase58Check;

    const closeShareModal = () => {
        setShowShare(false)
    }
    
    //const shareModalRef = useDetectClickOutside({ onTriggered: closeShareModal, triggerKeys: ['Escape', 'x'], });

    return (
        <div className="flex items-center md:justify-end mt-4 space-x-2.5 md:space-x-4 md:mt-0">
            {/* <TipModal show={showTip} setShowTip={setShowTip} video={video} />*/}
            <ShareModal video={video} show={showShare} setShowShare={setShowShare} />
            <Reactions video={video} />
            <Tooltip title="Share">
                <Button
                    variant="light"
                    onClick={() => setShowShare(true)}
                    className='md:h-10' 
                >
                    <span className="flex items-center space-x-3">
                        <RiShareForwardLine size={22} />
                        <span>Share</span>
                    </span>
                </Button>
            </Tooltip>    
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
                    // <div
                    // className={clsx(
                    //     'hover-primary rounded-full w-9 h-9 flex items-center justify-center md:text-inherit outline-none ring-0 group-hover:visible transition duration-150 ease-in-out focus:outline-none focus:ring-0'
                    // )}
                    // >
                    //     <BsThreeDots size={22} />
                    // </div>
                    <Button
                        variant="light"
                        className='!p-0 w-10 h-10' 
                    >
                        <span className="flex items-center space-x-3">
                            <BsThreeDots size={22} />
                        </span>
                    </Button>
                }
                >
                <div className="py-2 my-1 overflow-hidden rounded-lg dropdown-shadow bg-dropdown outline-none ring-0 focus:outline-none focus:ring-0 w-44">
                    <div className="flex flex-col text-[14px] transition duration-150 ease-in-out rounded-lg">
                        <a
                            href={`https://desoreporting.aidaform.com/content?ReporterPublicKey=${reporterID}&PostHash=${video.PostHashHex}&ReportedAccountPublicKey=${video.ProfileEntryResponse?.PublicKeyBase58Check}&ReportedAccountUsername=${video.ProfileEntryResponse?.Username}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-3 py-2 space-x-3 hover-primary"
                        >
                            <FiFlag size={18} className="ml-0.5" />
                            <span className="whitespace-nowrap">Report</span>
                        </a>
                    </div>
                </div>
            </DropMenu>
        </div>
    )
}

export default VideoActions