import usePersistStore from '@store/persist'
import Modal from '@components/UI/Modal'
import { useState } from 'react'
import { Button } from '../UI/Button'
import InputMentions from '../UI/InputMentions'

const TipModal = ({ rootRef, show, setShowTip, video }) => {
    const { isLoggedIn } = usePersistStore()
    const [money, setMoney] = useState('0')
    const [note, setNote] = useState('')
    const userName = video.ProfileEntryResponse.Username;

    const onSubmit = () => {
        const url = `https://sendeso.money/to/${userName}/${money}USD?note=${note}`
        if (typeof window !== "undefined") {
            const newWindow = window.open(url, '_blank', 'noopener,noreferrer')?.focus()
            if (newWindow) newWindow.opener = null
            setMoney('0')
            setNote('')
            setShowTip(false)
        }
    }
    return (
        <>
            <Modal
                title="Send Tip"
                onClose={() => setShowTip(false)}
                show={show}
                ref={rootRef}
                autoClose={true}
                panelClassName="w-full max-w-lg"
            >
                <div className='md:-mt-5 mb-2'>
                    <p className='text-light text-sm'>Send Tip, which directly supports <span className='font-semibold text-primary'>{userName}</span></p>
                </div>
                <div className='flex flex-col space-y-6 my-4'>
                    <div className='flex flex-col space-y-1'>
                        <label className='font-medium text-sm'>USD:</label>
                        <input
                            type='number'
                            step="any"
                            min="0"
                            value={money}
                            className='w-full h-10 rounded-lg bg-primary theme-border border px-3 text-sm focus:outline-none'
                            placeholder="0.00"
                            onChange={(e) => setMoney(e.target.value)}
                            aria-describedby="price-currency"
                        />
                    </div>
                    <div className='flex flex-col space-y-1'>
                        <InputMentions
                            label="Message"
                            placeholder="Note for user (type @ to mention a user)"
                            autoComplete="off"
                            value={note}
                            onContentChange={(value) => {
                                setNote(value)
                            }}
                            mentionsSelector="h-[60px] input-mentions-textarea"
                        />
                    </div>
                    <div className='flex flex-col'>
                        <Button
                            onClick={onSubmit}
                        >
                            Send
                        </Button>
                    </div>
                </div>
                <div className="h-[1px] relative theme-border-bg" />
                <div className='text-light text-center text-[13px] mt-4'>
                    <p><span className='font-semibold mr-1'>NOTE:</span>On Submit you will redirect to <a href='https://SenDeso.money' className='gradientLink text-secondary-hover' rel="noreferrer" target='_blank'>SenDeso.money</a> Website!</p>
                    <p>(By: <a href='https://diamondapp.com/u/@senDeso' className='gradientLink text-secondary-hover' rel="noreferrer" target='_blank'>SenDeso.money</a>)</p>
                </div>
            </Modal>
        </>
    )
}

export default TipModal