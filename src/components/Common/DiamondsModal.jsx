import usePersistStore from '@store/persist'
import { APP, DESO_CONFIG } from '@utils/constants'
import { abbreviateNumber, formatUSD, nanosToUSDNumber } from '@utils/functions'
import { getProfileName } from '@utils/functions/getProfileName'
import { getProfilePicture } from '@utils/functions/getProfilePicture'
import Modal from '@components/UI/Modal'
import Deso from 'deso-protocol';
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { IoDiamondOutline } from 'react-icons/io5'
import { Slider } from 'rsuite'
import { Button } from '../UI/Button'

const DiamondModal = ({ diamonds, setDiamonds, diamondBestowed, setDiamondBestowed, rootRef, show, setShowTip, video }) => {
    const { user, isLoggedIn } = usePersistStore()
    const [diamondLevels, setDiamondLevels] = useState(0);
    const [loading, setLoading] = useState(false);
    const [deso, setDeso] = useState(null)
    const [exchange, setExchange] = useState(null)
    const [value, setValue] = useState(diamondBestowed+1);
    const tip = false;
    const labels = ['1', '2', '3', '4', '5', '6', '7'];

    useEffect(() => {
        const deso = new Deso()
        setDeso(deso)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    useEffect(() => {
        if (deso) {
            getExchange();
            getState();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [deso])

    const getState = async() => {
        const request = {
            "PublicKeyBase58Check": "BC1YLheA3NepQ8Zohcf5ApY6sYQee9aPJCPY6m3u6XxCL57Asix5peY"
        };
        const state = await deso.metaData.getAppState(request);
        setDiamondLevels(state.DiamondLevelMap)
    }
    const getExchange = async() => {
        const response = await deso.metaData.getExchangeRate();
        setExchange(response)
    }
    
    function diamondPrice(diamond) {
        const desoNanos = diamondLevels[diamond]
        const val = nanosToUSDNumber(desoNanos);
        const exchangeRate = exchange?.USDCentsPerDeSoCoinbase / 100
        const diamondCost = val * exchangeRate;
        if (val < 1) {
            return formatUSD(Math.max(diamondCost, 0.01), 2);
        }
        return abbreviateNumber(diamondCost, 0, true);
    }

    const sendDiamonds = async () => {
        setLoading(true);
        try {
            const request = {
                ReceiverPublicKeyBase58Check: video.ProfileEntryResponse.PublicKeyBase58Check,
                SenderPublicKeyBase58Check: user.profile.PublicKeyBase58Check,
                DiamondPostHashHex: video.PostHashHex,
                MinFeeRateNanosPerKB: 1000,
                DiamondLevel: value,
                InTutorial: false,
            };
            const response = await deso.social.sendDiamonds(request);
            if (response && response.TxnHashHex) {
                setDiamondBestowed(value)
                setLoading(false);
                setShowTip(false);
                setDiamonds(diamonds + value)
            } else {
                console.log(response)
                toast.error(`Oops! This Amount Diamonds Already Sent`);
            }
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <>{
            isLoggedIn ?
                <Modal
                    title="Send Diamonds"
                    onClose={() => setShowTip(false)}
                    show={show}
                    ref={rootRef}
                    panelClassName="w-full max-w-lg"
                >
                    <div className='md:-mt-5 mb-2'>
                        <p className='text-light text-sm'>Send Diamonds, which directly supports <span className='font-semibold text-primary'>{video.ProfileEntryResponse.Username}</span></p>
                    </div>
                    <div className='hidden md:flex md:flex-row flex-col border p-3 mt-5 justify-between items-start md:items-center theme-border rounded-md'>
                        <div className='flex items-center space-x-1.5'>
                            <img src={getProfilePicture(user.profile)} alt={user.profile.Username} className='w-10 h-10 rounded-full' />
                            <div className="truncate">
                                <div className="flex items-center space-x-1.5">
                                    <span className='text-xs font-medium text-light'>{getProfileName(user.profile)}</span>
                                    {/* {user.profile.IsVerified ? <IsVerified size="xs" /> : null} */}
                                </div>
                            </div>
                        </div>
                        <div className='flex md:w-auto w-full md:justify-start justify-end items-center space-x-2'>
                            <span className='font-semibold'>{value}</span>
                            <IoDiamondOutline size={18} />
                        </div>
                        <div className='flex items-center space-x-1.5'>
                            <img src={getProfilePicture(video.ProfileEntryResponse)} alt={video.ProfileEntryResponse} className='w-10 h-10 rounded-full' />
                            <div className="truncate">
                                <div className="flex items-center space-x-1.5">
                                    <span className='text-xs font-medium text-light'>{getProfileName(video.ProfileEntryResponse)}</span>
                                    {/* {video.ProfileEntryResponse.IsVerified ? <IsVerified size="xs" /> : null} */}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full pt-5 md:pt-8 pb-5">
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
                            defaultValue={diamondBestowed + 1}
                            tooltip={false}
                            min={1}
                            step={1}
                            max={6}
                            graduated
                            progress
                        />
                    </div>
                    <div className='text-light text-center text-sm'>
                        <span className='font-semibold'>{value}</span> {value > 1 ? `Diamonds` : `Diamond`} Cost <span className='font-semibold'>{diamondPrice(value)} USD</span>
                    </div>
                    <div className='flex items-center justify-center mt-4 flex-col'>
                        <div>
                            <Button variant='primary' onClick={sendDiamonds} loading={loading}>
                                Send
                            </Button>
                        </div>
                    </div>
                    {tip &&
                        <>
                            <div className="h-[1px] relative theme-border-bg" />
                            <div className='flex justify-between items-center my-4'>
                                <p className='text-lg font-medium leading-6'>Send Tip</p>
                                <span className='ml-1 font-normal text-sm text-light'>(By: SenDeso.money)</span>
                            </div>
                            <div className='flex flex-col space-y-4 mb-4'>
                                <div className='flex flex-col space-y-1'>
                                    <label className='text-sm text-light'>USD:</label>
                                    <input type='number' step="any" min="0" className='w-full h-10 rounded-full bg-secondary theme-border border px-3 focus:outline-none' placeholder="0.00" aria-describedby="price-currency" />
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
                                <p><span class="font-medium text-primary">Diamonds</span> are a way to reward great content by sending an amount of <br /><span class="font-medium text-primary">$DESO</span> as a tip.</p>
                            </div>
                        </>
                    }
                </Modal>
            : null
        }
        </>
    )
}

export default DiamondModal