import { LinkifyOptions } from '@app/utils/functions/getLinkifyOptions'
import clsx from "clsx"
import Linkify from 'linkify-react'
import "linkify-plugin-hashtag"
import "linkify-plugin-mention"
import Link from 'next/link'
import { useEffect, useState } from "react"
import { BiChevronDown, BiChevronUp } from "react-icons/bi"
import { FaDiscord, FaGithub, FaGlobe, FaInstagram, FaLinkedin, FaTelegram, FaTwitter } from 'react-icons/fa'
import { IoDiamondOutline } from 'react-icons/io5'
import { FiFlag } from 'react-icons/fi'
import usePersistStore from '@app/store/persist'
import Tooltip from '@app/components/UIElements/Tooltip'
import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'

dayjs.extend(advancedFormat)

function About({ stats, channel }) {
    const { isLoggedIn, user } = usePersistStore();
    const reporterID = isLoggedIn ? user.profile.PublicKeyBase58Check : APP.PublicKeyBase58Check;
    const channelExtra = channel.ExtraData || {};
    const DiscordURL = channelExtra.DiscordURL !== null ? channelExtra.DiscordURL : null;
    const GithubURL = channelExtra.GithubURL !== null ? channelExtra.GithubURL : null;
    const InstagramURL = channelExtra.InstagramURL !== null ? channelExtra.InstagramURL : null;
    const LinkedinURL = channelExtra.LinkedinURL !== null ? channelExtra.LinkedinURL : null;
    const WebsiteURL = channelExtra.WebsiteURL !== null ? channelExtra.WebsiteURL : null;
    const TwitterURL = channelExtra.TwitterURL !== null ? channelExtra.TwitterURL : null;
    const TelegramURL = channelExtra.TelegramURL !== null ? channelExtra.TelegramURL : null;
    const [clamped, setClamped] = useState(false)
    const [showMore, setShowMore] = useState(false)

    useEffect(() => {
        if (channel.Description.trim().length > 400) {
            setClamped(true)
            setShowMore(true)
        }
    }, [channel])
    
    return (
        <>
            <div className='grid gap-4 md:grid-cols-4'>
                <div className='col-span-3'>
                    <div className="flex flex-col">
                        <h3 className='mb-5'>Description</h3>
                        <div className={clsx(
                            'overflow-hidden leading-6 text-sm break-words',
                            clamped ? 'line-clamp-2' : ''
                            )}>
                            <Linkify options={LinkifyOptions}>
                                {clamped ? channel.Description.trim().substring(0, 400) : channel.Description}
                            </Linkify>
                        </div>
                        {showMore && (
                            <div className="inline-flex mt-3">
                                <button
                                    type="button"
                                    onClick={() => setClamped(!clamped)}
                                    className="flex items-center mt-2 text-xs outline-none hover:opacity-100 opacity-60"
                                >
                                    {clamped ? (
                                        <>
                                            Show more <BiChevronDown className="text-sm" />
                                        </>
                                    ) : (
                                        <>
                                            Show less <BiChevronUp className="text-sm" />
                                        </>
                                    )}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
                <div className='col-span-1'>
                    <div className="flex flex-col">
                        {stats ? (
                            <>
                                <div className='pb-6 border-b theme-border'>
                                    <h3 className='mb-5'>Stats:</h3>
                                    <div className="flex flex-col space-y-2">
                                        <div>
                                            <span className='text-sm text-primary'>Joined: {dayjs.unix(stats.UserAge.Timestamp).format('MMM DD, YYYY')}</span>
                                        </div>
                                        <div>
                                            <span className='text-sm text-primary'>Location: {stats.UserGeo.geo_country}</span>
                                        </div>
                                        <div>
                                            <Tooltip placement='bottom' contentClass='text-[12px]' title='Report User'>
                                                <a
                                                    href={`https://desoreporting.aidaform.com/account?ReporterPublicKey=${reporterID}&ReportedAccountPublicKey=${channel.PublicKeyBase58Check}&ReportedAccountUsername=${channel.Username}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="-ml-2 flex h-10 w-10 justify-center items-center rounded-full hover-primary"
                                                >
                                                    <FiFlag size={18} />
                                                </a>
                                            </Tooltip>    
                                        </div>
                                    </div>
                                </div>
                            </>
                        ) : null}
                        <div className='mt-6'>
                            <h3 className='mb-5'>Links:</h3>
                            <div className="flex flex-col space-y-2">
                                <div>
                                    <Link
                                        href={`https://diamondapp.com/u/${channel.Username}`}
                                        target="_blank"
                                        rel="noreferer noreferrer"
                                        className='text-secondary inline-flex text-secondary-hover tracking-wide text-sm space-x-1.5 items-center'
                                    >
                                        <IoDiamondOutline size={17} />
                                        <span className='ml-2'>Diamond</span>
                                    </Link> 
                                </div>
                                {TwitterURL &&
                                    <div>
                                        <Link
                                            href={TwitterURL}
                                            target="_blank"
                                            rel="noreferer noreferrer"
                                            className='text-secondary text-secondary-hover tracking-wide text-sm inline-flex space-x-1.5 items-center'
                                        >
                                            <FaTwitter size={18} />
                                            <span className='ml-2'>Twitter</span>
                                        </Link> 
                                    </div>
                                }
                                {InstagramURL &&
                                    <div>
                                        <Link
                                            href={InstagramURL}
                                            target="_blank"
                                            rel="noreferer noreferrer"
                                            className='text-secondary text-secondary-hover tracking-wide text-sm inline-flex space-x-1.5 items-center'
                                        >
                                            <FaInstagram size={18} />
                                            <span className='ml-2'>Instagram</span>
                                        </Link>    
                                    </div>
                                }
                                {WebsiteURL &&
                                    <div>
                                        <Link
                                            href={WebsiteURL}
                                            target="_blank"
                                            rel="noreferer noreferrer"
                                            className='text-secondary text-secondary-hover tracking-wide text-sm inline-flex space-x-1.5 items-center'
                                        >
                                            <FaGlobe size={18} />
                                            <span className='ml-2'>Website</span>
                                        </Link>  
                                    </div>
                                }
                                {DiscordURL &&
                                    <div>
                                        <Link
                                            href={DiscordURL}
                                            target="_blank"
                                            rel="noreferer noreferrer"
                                            className='text-secondary text-secondary-hover tracking-wide text-sm inline-flex space-x-1.5 items-center'
                                        >
                                            <FaDiscord size={18} />
                                            <span className='ml-2'>Discord</span>
                                        </Link>
                                    </div>
                                }
                                {LinkedinURL &&
                                    <div>
                                        <Link
                                            href={LinkedinURL}
                                            target="_blank"
                                            rel="noreferer noreferrer"
                                            className='text-secondary text-secondary-hover tracking-wide text-sm inline-flex space-x-1.5 items-center'
                                        >
                                            <FaLinkedin size={17} />
                                            <span className='ml-2'>LinkedIn</span>
                                        </Link>
                                    </div>
                                }
                                {TelegramURL &&
                                    <div>
                                        <Link
                                            href={TelegramURL}
                                            target="_blank"
                                            rel="noreferer noreferrer"
                                            className='text-secondary text-secondary-hover tracking-wide text-sm inline-flex space-x-1.5 items-center'
                                        >
                                            <FaTelegram size={17} />
                                            <span className='ml-2'>Telegram</span>
                                        </Link> 
                                    </div>
                                }
                                {GithubURL &&
                                    <div>
                                        <Link
                                            href={GithubURL}
                                            target="_blank"
                                            rel="noreferer noreferrer"
                                            className='text-secondary text-secondary-hover tracking-wide text-sm inline-flex space-x-1.5 items-center'
                                        >
                                            <FaGithub size={18} />
                                            <span className='ml-2'>Github</span>
                                        </Link> 
                                    </div>
                                }
                                {!stats && 
                                    <div>
                                        <Link
                                            href={`https://desoreporting.aidaform.com/account?ReporterPublicKey=${reporterID}&ReportedAccountPublicKey=${channel.PublicKeyBase58Check}&ReportedAccountUsername=${channel.Username}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-secondary text-secondary-hover tracking-wide text-sm inline-flex space-x-1.5 items-center"
                                        >
                                            <FiFlag size={18} />
                                            <span className='ml-2'>Report User</span>
                                        </Link>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default About