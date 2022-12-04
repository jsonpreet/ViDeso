import { LinkifyOptions } from '@utils/functions/getLinkifyOptions'
import clsx from "clsx"
import Linkify from 'linkify-react'
import "linkify-plugin-hashtag"
import "linkify-plugin-mention"
import Link from 'next/link'
import { FaDiscord, FaExternalLinkAlt, FaGlobe, FaInstagram, FaLinkedin, FaTwitter, FaYoutube } from 'react-icons/fa'
import { IoDiamondOutline } from 'react-icons/io5'
import { FiFlag } from 'react-icons/fi'
import usePersistStore from '@store/persist'
import Tooltip from '@components/UI/Tooltip'
import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import { APP } from '@utils/constants'
import { getProfileExtraData } from '@utils/functions/getProfileExtraData'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { getProfileName } from '@utils/functions/getProfileName'

dayjs.extend(advancedFormat)

function About({ stats, channel }) {
    const router = useRouter()
    const { isLoggedIn, user } = usePersistStore();
    const reporterID = isLoggedIn ? user.profile.PublicKeyBase58Check : APP.PublicKeyBase58Check;
    const channelExtra = getProfileExtraData(channel);
    const DiscordURL = channelExtra !== null ? channelExtra.DiscordURL : null;
    const GithubURL = channelExtra !== null ? channelExtra.GithubURL : null;
    const InstagramURL = channelExtra !== null ? channelExtra.InstagramURL : null;
    const LinkedinURL = channelExtra !== null ? channelExtra.LinkedinURL : null;
    const TwitterURL = channelExtra !== null ? channelExtra.TwitterURL : null;
    const YoutubeURL = channelExtra !== null ? channelExtra.YoutubeURL : null;
    const WebsiteURL = channelExtra !== null ? channelExtra.WebsiteURL : null;
    const WebsiteTitle = channelExtra !== null ? channelExtra.WebsiteTitle : 'Website';
    const CustomTitle = channelExtra !== null ? channelExtra.CustomTitle : 'External Site';
    const CustomURL = channelExtra !== null ? channelExtra.CustomURL : null;
    
    return (
        <>
            <NextSeo
                title={channel ? `${getProfileName(channel)} - ${APP.Name}` : APP.Name}
                canonical={`${APP.URL}${router.asPath}`}
                openGraph={{
                    title: channel ? `${getProfileName(channel)} - ${APP.Name}` : APP.Name,
                    url: `${APP.URL}${router.asPath}`,
                }}
            />
            <div className='max-w-7xl mx-auto md:px-0 px-4'>
                <div className='grid gap-4 md:grid-cols-4'>
                    <div className='col-span-3'>
                        <div className="flex flex-col">
                            <h3 className='mb-5'>Description</h3>
                            <div className={clsx(
                                'overflow-hidden leading-6 text-sm break-words'
                                )}>
                                <Linkify options={LinkifyOptions}>
                                    {channelExtra !== null ? channelExtra.Description : channel.Description}
                                </Linkify>
                            </div>
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
                                            {channelExtra !== null && channelExtra.Location !== '' &&
                                                <div>
                                                    <span className='text-sm text-primary'>Location: {channelExtra.Location}</span>
                                                </div>
                                            }
                                            {channelExtra !== null && channelExtra.Languages !== '' &&
                                                <div>
                                                    <span className='text-sm text-primary'>Language: {channelExtra.Languages}</span>
                                                </div>
                                            }
                                            <div>
                                                <Tooltip placement='bottom' contentClass='text-[12px]' title='Report User'>
                                                    <Link
                                                        href={`https://desoreporting.aidaform.com/account?ReporterPublicKey=${reporterID}&ReportedAccountPublicKey=${channel.PublicKeyBase58Check}&ReportedAccountUsername=${channel.Username}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="-ml-2 flex h-10 w-10 justify-center items-center rounded-full hover-primary"
                                                    >
                                                        <FiFlag size={18} />
                                                    </Link>
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
                                    {YoutubeURL &&
                                        <div>
                                            <Link
                                                href={YoutubeURL}
                                                target="_blank"
                                                rel="noreferer noreferrer"
                                                className='text-secondary text-secondary-hover tracking-wide text-sm inline-flex space-x-1.5 items-center'
                                            >
                                                <FaYoutube size={18} />
                                                <span className='ml-2'>Youtube</span>
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
                                                <span className='ml-2'>{WebsiteTitle}</span>
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
                                    {CustomURL &&
                                        <div>
                                            <Link
                                                href={CustomURL}
                                                target="_blank"
                                                rel="noreferer noreferrer"
                                                className='text-secondary text-secondary-hover tracking-wide text-sm inline-flex space-x-1.5 items-center'
                                            >
                                                <FaExternalLinkAlt size={17} />
                                                <span className='ml-2'>{CustomTitle}</span>
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
            </div>    
        </>
    )
}

export default About