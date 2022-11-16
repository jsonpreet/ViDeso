import Report from '@components/common/Report'
import Modal from '@components/UIElements/Modal'

const ReportModal = ({ show, setShowReport, video }) => {
  return (
    <Modal
      title="Report Publication"
      onClose={() => setShowReport(false)}
      show={show}
      panelClassName="max-w-md"
    >
      <div className="mt-2">
        <Report
          postid={video}
          onSuccess={() => setShowReport(false)}
        />
      </div>
    </Modal>
  )
}

export default ReportModal