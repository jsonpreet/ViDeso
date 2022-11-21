import { APP } from '@app/utils/constants'
import Modal from '@components/UIElements/Modal'
import { useState } from 'react';
import toast from 'react-hot-toast'
import { IoDiamondOutline } from 'react-icons/io5'
import { Slider } from 'rsuite';
import { Button } from '../UIElements/Button';

const TipModal = ({ rootRef, show, setShowTip, video }) => {
    const [value, setValue] = useState(0);
    const labels = ['A', 'B', 'C', 'D', 'E'];
    return (
        <Modal
            title="Send Diamonds"
            onClose={() => setShowTip(false)}
            show={show}
            ref={rootRef}
            panelClassName="w-full max-w-lg"
        >
            <div className='-mt-5 mb-2'>
                <p className='text-light text-sm'>Send Diamonds, which directly supports <span className='font-medium text-primary'>{video.ProfileEntryResponse.Username}</span></p>
            </div>
            <div className="w-full py-8">
                <Slider
                    value={value}
                    onChange={value => {
                        setValue(value);
                    }}
                    className={`custom-slider value-${value}`}
                    handleStyle={{
                        borderRadius: 10,
                        color: '#fff',
                        fontSize: 12,
                        width: 32,
                        height: 22
                    }}
                    handleTitle={labels[value]}
                    defaultValue={1}
                    tooltip={false}
                    min={1}
                    step={1}
                    max={5}
                    graduated
                    progress
                />
            </div>
            <div className="h-[1px] relative theme-border-bg" />
            <div className='flex justify-between items-center my-4'>
                <p className='text-lg font-medium leading-6'>Send Tip</p>
                <span className='ml-1 font-normal text-sm text-light'>(By: SenDeso.money)</span>
            </div>
            <div className='flex flex-col space-y-4 mb-4'>
                <div className='flex flex-col space-y-1'>
                    <label className='text-sm text-light'>USD:</label>
                    <input type='number'step="any" min="0" className='w-full h-10 rounded-full bg-secondary theme-border border px-3 focus:outline-none' placeholder="0.00" aria-describedby="price-currency"/>
                </div>
                <div className='flex flex-col space-y-1'>
                    <label className='text-sm text-light'>Message:</label>
                    <input type='text' className='w-full h-10 rounded-full bg-secondary theme-border border px-3 focus:outline-none' />
                </div>
                <div className='flex mt-4 flex-col'>
                    <Button>
                        Send
                    </Button>
                </div>
            </div>
            <div className="h-[1px] relative theme-border-bg" />
            <div className='text-light text-[13px] mt-4'>
                <p><span class="font-medium text-primary">Diamonds</span> are a way to reward great content by sending an amount of <br/><span class="font-medium text-primary">$DESO</span> as a tip.</p>
            </div>
        </Modal>
    )
}

export default TipModal