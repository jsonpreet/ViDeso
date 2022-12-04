import { getTimeFromSeconds } from "@utils/functions"

const ThumbnailOverlays = ({ video, data }) => {
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

