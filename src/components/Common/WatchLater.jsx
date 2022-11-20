import { BsTrash } from 'react-icons/bs';
import { FiClock } from 'react-icons/fi';

function WatchLater({onClickWatchLater, alreadyAddedToWatchLater}) {

    return (
        <>
            <button
                type="button"
                onClick={() => onClickWatchLater()}
                className="inline-flex items-center px-3 py-2 space-x-3 hover-primary"
            >
                {!alreadyAddedToWatchLater ? <FiClock size={19} /> : <BsTrash size={18} />}
                <span className="whitespace-nowrap">
                {alreadyAddedToWatchLater
                    ? 'Remove from Watch Later'
                    : 'Save to Watch Later'}
                </span>
            </button>
        </>
    )
}

export default WatchLater