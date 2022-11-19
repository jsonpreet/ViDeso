import Link from 'next/link'
import { FaDiscord, FaGithub, FaGlobe, FaInstagram, FaLinkedin, FaLinkedinIn, FaTelegram, FaTwitter } from 'react-icons/fa';
import { HiOutlineGlobe } from 'react-icons/hi'
import { IoDiamondOutline } from 'react-icons/io5';
import { RiTwitterLine } from 'react-icons/ri'
import Tooltip from '../UIElements/Tooltip';

function ChannelLinks({channel}) {
    const channelExtra = channel.ExtraData || {};
    const DiscordURL = channelExtra.DiscordURL !== null ? channelExtra.DiscordURL : null;
    const GithubURL = channelExtra.GithubURL !== null ? channelExtra.GithubURL : null;
    const InstagramURL = channelExtra.InstagramURL !== null ? channelExtra.InstagramURL : null;
    const LinkedinURL = channelExtra.LinkedinURL !== null ? channelExtra.LinkedinURL : null;
    const WebsiteURL = channelExtra.WebsiteURL !== null ? channelExtra.WebsiteURL : null;
    const TwitterURL = channelExtra.TwitterURL !== null ? channelExtra.TwitterURL : null;
    const TelegramURL = channelExtra.TelegramURL !== null ? channelExtra.TelegramURL : null;
    return (
        <>
            <div className="absolute bottom-4 right-4">
                <div className="flex space-x-2 p-2 rounded-lg text-white bg-white bg-opacity-70">
                    <div>
                        <Link
                            href={`https://diamondapp.com/u/${channel.Username}`}
                            target="_blank"
                            rel="noreferer noreferrer"
                            className='text-[#005bff]'
                        >
                            <IoDiamondOutline size={21} />
                        </Link> 
                    </div>
                    {TwitterURL &&
                        <div>
                            <Link
                                href={TwitterURL}
                                target="_blank"
                                rel="noreferer noreferrer"
                                className='text-[#1da1f2]'
                            >
                                <FaTwitter size={21} />
                            </Link> 
                        </div>
                    }
                    {InstagramURL &&
                        <div>
                            <Link
                                href={InstagramURL}
                                target="_blank"
                                rel="noreferer noreferrer"
                                className='text-[#e1306c]'
                            >
                                <FaInstagram size={21} />
                            </Link>    
                        </div>
                    }
                    {WebsiteURL &&
                        <div>
                            <Link
                                href={WebsiteURL}
                                target="_blank"
                                rel="noreferer noreferrer"
                                className='text-[#405de6]'
                            >
                                <FaGlobe size={21} />
                            </Link>  
                        </div>
                    }
                    {DiscordURL &&
                        <div>
                            <Link
                                href={DiscordURL}
                                target="_blank"
                                rel="noreferer noreferrer"
                                className='text-[#5865f2]'
                            >
                                <FaDiscord size={21} />
                            </Link>
                        </div>
                    }
                    {LinkedinURL &&
                        <div>
                            <Link
                                href={LinkedinURL}
                                target="_blank"
                                rel="noreferer noreferrer"
                                className='text-[#0077b5]'
                            >
                                <FaLinkedin size={21} />
                            </Link>
                        </div>
                    }
                    {TelegramURL &&
                        <div>
                            <Link
                                href={TelegramURL}
                                target="_blank"
                                rel="noreferer noreferrer"
                                className='text-[#0088cc]'
                            >
                                <FaTelegram size={21} />
                            </Link> 
                        </div>
                    }
                    {GithubURL &&
                        <div>
                            <Link
                                href={GithubURL}
                                target="_blank"
                                rel="noreferer noreferrer"
                                className='text-[#333]'
                            >
                                <FaGithub size={21} />
                            </Link> 
                        </div>
                    }
                </div>
            </div>
        </>
    )
}

export default ChannelLinks