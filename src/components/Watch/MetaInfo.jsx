
import { AiOutlineTag } from 'react-icons/ai'
import { BiLinkExternal } from 'react-icons/bi'


const MetaInfo = ({ video }) => {

    return (
    <div className="flex flex-wrap items-center space-x-1 opacity-80">
        {/* {video?.metadata?.tags[0] && (
        <div className="flex items-center space-x-1 text-sm">
            <AiOutlineTag />
            <span className="whitespace-nowrap">
            {getCategoryName(video.metadata.tags[0])}
            </span>
        </div>
        )} */}
        <div className="flex items-center space-x-1 text-sm">
            <AiOutlineTag />
            <span className="whitespace-nowrap">
                {/* {getCategoryName(video.metadata.tags[0])} */}
            </span>
        </div>
        <span className="middot" />

        <div className="flex items-center space-x-1">
            <div className="text-sm whitespace-nowrap">View Metadata</div>
            <BiLinkExternal className="text-sm" />
        </div>
    </div>
    )
}

export default MetaInfo