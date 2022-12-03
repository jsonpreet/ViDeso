
import { useState } from 'react'
import ShareModal from '../Common/ShareModal'
import VideoOptions from '../Common/Cards/Options'

const StoriActions = ({ video }) => {
    const [showShare, setShowShare] = useState(false)
    const [showReport, setShowReport] = useState(false)

    return (
        <div className="flex-col items-center justify-between w-12 md:w-14 md:flex">
            <div className="flex justify-center p-2 space-y-4 md:flex-col">
                <VideoOptions
                    video={video}
                    setShowShare={setShowShare}
                    setShowReport={setShowReport}
                    showOnHover={false}
                />
            </div>
            <div className="items-center py-2.5 space-y-1.5 md:flex md:flex-col">
                <ShareModal video={video} show={showShare} setShowShare={setShowShare} />
            </div>
        </div>
    )
}

export default StoriActions