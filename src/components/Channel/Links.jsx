import { getProfileExtraData } from '@utils/functions/getProfileExtraData';
import Link from 'next/link'
import { FaDiscord, FaExternalLinkSquareAlt, FaGithub, FaGlobe, FaInstagram, FaLinkedin, FaLinkedinIn, FaTelegram, FaTwitter, FaYoutube } from 'react-icons/fa';
import { HiOutlineGlobe } from 'react-icons/hi'
import { IoDiamondOutline } from 'react-icons/io5';
import { RiTwitterLine } from 'react-icons/ri'
import Tooltip from '../UI/Tooltip';

function ChannelLinks({channel}) {
    const channelExtra = getProfileExtraData(channel);
    const DiscordURL = channelExtra?.DiscordURL !== null ? channelExtra?.DiscordURL : null;
    const GithubURL = channelExtra?.GithubURL !== null ? channelExtra?.GithubURL : null;
    const InstagramURL = channelExtra?.InstagramURL !== null ? channelExtra?.InstagramURL : null;
    const LinkedinURL = channelExtra?.LinkedinURL !== null ? channelExtra?.LinkedinURL : null;
    const TwitterURL = channelExtra?.TwitterURL !== null ? channelExtra?.TwitterURL : null;
    const YoutubeURL = channelExtra?.YoutubeURL !== null ? channelExtra?.YoutubeURL : null;
    const WebsiteURL = channelExtra?.WebsiteURL !== null ? channelExtra?.WebsiteURL : null;
    const WebsiteTitle = channelExtra?.WebsiteTitle !== null ? channelExtra?.WebsiteTitle : 'Website';
    const CustomTitle = channelExtra?.CustomTitle !== null ? channelExtra?.CustomTitle : 'External Site';
    const CustomURL = channelExtra?.CustomURL !== null ? channelExtra?.CustomURL : null;
    return (
        <>
            <div className="absolute bottom-4 right-4 md:block hidden">
                <div className="flex space-x-2 p-2 rounded-lg text-white bg-white bg-opacity-70">
                    <div>
                        <Link
                            href={`https://diamondapp.com/u/${channel.Username}`}
                            target="_blank"
                            rel="noreferer noreferrer"
                            className='text-[#005bff]'
                            title='Diamond App'
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
                                title='Twitter'
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
                                title='Instagram'
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
                                title={WebsiteTitle}
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
                                title='Discord'
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
                                title='Linkedin'
                            >
                                <FaLinkedin size={21} />
                            </Link>
                        </div>
                    }
                    {YoutubeURL &&
                        <div>
                            <Link
                                href={YoutubeURL}
                                target="_blank"
                                rel="noreferer noreferrer"
                                className='text-[#ff0000]'
                                title='Youtube'
                            >
                                <FaYoutube size={21} />
                            </Link> 
                        </div>
                    }
                    {CustomURL &&
                        <div>
                            <Link
                                href={CustomURL}
                                target="_blank"
                                rel="noreferer noreferrer"
                                className='text-[#333]'
                                title={CustomTitle}
                            >
                                <FaExternalLinkSquareAlt size={21} />
                            </Link> 
                        </div>
                    }
                </div>
            </div>
        </>
    )
}

export default ChannelLinks