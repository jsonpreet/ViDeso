import usePersistStore from '@app/store/persist'
import Modal from '@components/UIElements/Modal'
import { useState } from 'react'
import { Button } from '../UIElements/Button'
import InputMentions from '../UIElements/InputMentions'

const TipModal = ({ rootRef, show, setShowTip, video }) => {
    const { isLoggedIn } = usePersistStore()
    const [money, setMoney] = useState('0')
    const [note, setNote] = useState('')
    return (
        <>{
            isLoggedIn ?
                <Modal
                    title="Send Tip"
                    onClose={() => setShowTip(false)}
                    show={show}
                    ref={rootRef}
                    autoClose={true}
                    panelClassName="w-full max-w-lg"
                >
                    <div className='md:-mt-5 mb-2'>
                        <p className='text-light text-sm'>Send Tip, which directly supports <span className='font-semibold text-primary'>{video.ProfileEntryResponse.Username}</span></p>
                    </div>
                    <div className='flex flex-col space-y-6 my-4'>
                        <div className='flex flex-col space-y-1'>
                            <label className='font-medium text-sm'>USD:</label>
                            <input
                                type='number'
                                step="any"
                                min="0"
                                className='w-full h-10 rounded-lg bg-primary theme-border border px-3 text-sm focus:outline-none'
                                placeholder="0.00"
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
                            <Button> Send </Button>
                        </div>
                    </div>
                    <div className="h-[1px] relative theme-border-bg" />
                    <div className='text-light text-center text-[13px] mt-4'>
                        <p>(By: <a href='https://diamondapp.com/u/@senDeso' className='gradientLink text-secondary-hover' rel="noreferrer" target='_blank'>SenDeso.money</a>)</p>
                    </div>
                </Modal>
            : null
        }
        </>
    )
}

export default TipModal