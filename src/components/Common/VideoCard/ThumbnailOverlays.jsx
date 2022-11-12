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
      
      {data.Duration ? (
        <div>
          <span className="py-0.5 absolute bottom-2 right-2 text-xs px-1 text-white bg-black rounded">
            {getTimeFromSeconds(data.Duration)}
          </span>
        </div>
      ) : null}
    </>
  )
}

export default ThumbnailOverlays

