// import Tooltip from '@components/UIElements/Tooltip'
// import useAppStore from '@lib/store'
// import { useRouter } from 'next/router'

import useAppStore from "@app/store/app"
import { getTimeFromSeconds } from "@app/utils/functions"
import { useRouter } from "next/router"

const ThumbnailOverlays = ({ video, data }) => {
  const selectedChannel = useAppStore((state) => state.selectedChannel)

  const { pathname } = useRouter()

  // const isVideoOwner = selectedChannel?.id === video?.profile?.id
  

  return (
    <>
        <div>
          {data && !data.ReadyToStream ? 
            <span className="py-0.5 absolute bottom-3 left-2 text-xs px-1 text-white bg-black rounded">
              Processing Video
            </span>
          : null}  
          {data && data.Duration ? (<span className="py-0.5 absolute bottom-3 right-2 text-xs px-1 text-white bg-black rounded">
            {getTimeFromSeconds(data.Duration)}
          </span>
          ) : null}
        </div>
    </>
  )
}

export default ThumbnailOverlays

