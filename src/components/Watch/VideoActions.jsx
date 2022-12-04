import { useRef, useState } from 'react'
import { FiFlag } from 'react-icons/fi'
import { RiShareForwardLine } from 'react-icons/ri'
import ShareModal from '../Common/ShareModal'
import { Button } from '../UI/Button'
import Reactions from './Reactions'
import { BsThreeDots } from 'react-icons/bs'
import DropMenu from '../UI/DropMenu'
import usePersistStore from '@store/persist'
import { APP } from '@utils/constants'
import Tooltip from '@components/UI/Tooltip'
import { isBrowser } from 'react-device-detect'
import Carousel from "react-multi-carousel"

const VideoActions = ({ video }) => {
    const [showShare, setShowShare] = useState(false)
    const { isLoggedIn, user } = usePersistStore();
    const reporterID = isLoggedIn ? user.profile.PublicKeyBase58Check : APP.PublicKeyBase58Check;
    const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 4,
        slidesToSlide: 4 // optional, default to 1.
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 3,
        slidesToSlide: 2 // optional, default to 1.
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 3,
        slidesToSlide: 1 // optional, default to 1.
    }
    };
    return (
        <>
            <ShareModal video={video} show={showShare} setShowShare={setShowShare} />
            <div className="flex items-center md:justify-end mt-4 space-x-2.5 md:space-x-4 md:mt-0">
                {/* <Carousel
                    swipeable={true}
                    draggable={true}
                    showDots={false}
                    responsive={responsive}
                    ssr={true} // means to render carousel on server-side.
                    infinite={false}
                    autoPlay={false}
                    keyBoardControl={false}
                    customTransition="all .5"
                    transitionDuration={500}
                    containerClass="carousel-container"
                    removeArrowOnDeviceType={["tablet", "mobile"]}
                    dotListClass="custom-dot-list-style"
                    itemClass="carousel-item-padding-40-px"
                > */}
                    <Reactions video={video} />
                    <Button
                        variant="light"
                        onClick={() => setShowShare(true)}
                        className='h-10'
                    >
                        <span className="flex items-center space-x-2 md:space-x-3">
                            <RiShareForwardLine size={22} />
                            <span>Share</span>
                        </span>
                    </Button>
                    <DropMenu
                        trigger={
                            <Button
                                variant="light"
                                className='md:!p-0 md:w-10 max-w-[40px] w-auto h-10' 
                            >
                                <span className="flex items-center space-x-2 md:space-x-3">
                                    <BsThreeDots size={22} />
                                </span>
                            </Button>
                        }
                        >
                        <div className="py-2 my-1 overflow-hidden rounded-lg dropdown-shadow bg-dropdown outline-none ring-0 focus:outline-none focus:ring-0 w-44">
                            <div className="flex flex-col text-[14px] transition duration-150 ease-in-out rounded-lg">
                                <a
                                    href={`https://desoreporting.aidaform.com/content?ReporterPublicKey=${reporterID}&PostHash=${video.PostHashHex}&ReportedAccountPublicKey=${video?.ProfileEntryResponse?.PublicKeyBase58Check}&ReportedAccountUsername=${video?.ProfileEntryResponse?.Username}`}
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
                {/* </Carousel> */}
            </div>
        </>
    )
}

export default VideoActions