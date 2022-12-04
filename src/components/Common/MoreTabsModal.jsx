import Modal from '@components/UI/Modal'
import Link from 'next/link'

const MoreTabsModal = ({rootRef, show, setShowModal, username }) => {
  

    return (
        
        <Modal
            title="More"
            onClose={() => setShowModal(false)}
            show={show}
            ref={rootRef}
            panelClassName="w-full max-w-lg"
        >
            <div className="flex flex-col text-[14px]">
                <Link
                    href={`/@${username}/channels`}
                    onClick={() => setShowModal(false)}
                    shallow={true}
                    as={`/@${username}/channels`}
                    className="inline-flex items-center -ml-5 -mr-5 px-5 py-2 space-x-3 hover-primary"
                >
                    <span className="whitespace-nowrap">Channels</span>
                </Link>
                <Link
                    href={`/@${username}/about`}
                    onClick={() => setShowModal(false)}
                    shallow={true}
                    as={`/@${username}/about`}
                    className="inline-flex items-center -ml-5 -mr-5 px-5 py-2 space-x-3 hover-primary"
                >
                    <span className="whitespace-nowrap">About</span>
                </Link>
            </div>
        </Modal>
    )
}

export default MoreTabsModal