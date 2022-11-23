import IsVerified from '@app/components/Common/IsVerified';
import { Button } from '@app/components/UIElements/Button';
import usePersistStore from '@app/store/persist';
import { APP } from '@app/utils/constants';
import { getCoverPicture } from '@app/utils/functions/getCoverPicture';
import { getProfileExtraData } from '@app/utils/functions/getProfileExtraData';
import { getProfilePicture } from '@app/utils/functions/getProfilePicture';
import Deso from 'deso-protocol';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react'
import toast from 'react-hot-toast';
import { BiUpload } from 'react-icons/bi';
import party from "party-js"

function Settings() {
    const router = useRouter();
    const { query } = router;
    const { user, setUser } = usePersistStore();
    const [newCover, setCover] = useState(null)
    const [newAvatar, setAvatar] = useState(null)
    const [loading, setLoading] = useState(false)
    const [uploadingCover, setUploadingCover] = useState(false)
    const [uploadingAvatar, setUploadingAvatar] = useState(false)
    const channel = user.profile;
    const extraData = getProfileExtraData(user.profile);
    const [displayName, setDisplayName] = useState(extraData?.DisplayName || '')
    const [description, setDescription] = useState(extraData?.Description || '')
    const [location, setLocation] = useState(extraData?.Location || '')
    const [languages, setLanguages] = useState(extraData?.Languages || '')
    const [twitterLink, setTwitterLink] = useState(extraData?.TwitterURL || '')
    const [instagramLink, setInstagramLink] = useState(extraData?.InstagramURL || '')
    const [youtubeLink, setYoutubeLink] = useState(extraData?.YoutubeURL || '')
    const [linkedinLink, setLinkedInLink] = useState(extraData?.LinkedInURL || '')
    const [githubLink, setGithubLink] = useState(extraData?.GithubURL || '')
    const [discordLink, setDiscordLink] = useState(extraData?.DiscordURL || '')
    const [websiteTitle, setWebsiteTitle] = useState(extraData?.WebsiteTitle || '')
    const [websiteLink, setWebsiteLink] = useState(extraData?.WebsiteURL || '')
    const [customTitle, setCustomTitle] = useState(extraData?.CustomTitle || '')
    const [customLink, setCustomLink] = useState(extraData?.CustomURL || '')

    const rootRef = useRef(null)

    const handleCover = async () => {
        setUploadingCover(true);
        const deso = new Deso();
        try {
            const request = {
                UserPublicKeyBase58Check: user.profile.PublicKeyBase58Check
            };
            const response = await deso.media.uploadImage(request);
            if (response.ImageURL !== "") {
                setCover(response.ImageURL);
                const payload = {
                    ProfileImage: extraData.ProfileImage,
                    CoverImage: response.ImageURL,
                    DisplayName: displayName,
                    Description: description,
                    Location: location,
                    Languages: languages,
                    TwitterURL: twitterLink,
                    InstagramURL: instagramLink,
                    YoutubeURL: youtubeLink,
                    LinkedInURL: linkedinLink,
                    GithubURL: githubLink,
                    DiscordURL: discordLink,
                    CustomTitle: customTitle,
                    CustomURL: customLink,
                    WebsiteTitle: websiteTitle,
                    WebsiteURL: websiteLink,
                }
                const profileReq = {
                    UpdaterPublicKeyBase58Check: user.profile.PublicKeyBase58Check,
                    ExtraData: {
                        Videso: JSON.stringify(payload)
                    },
                    NewStakeMultipleBasisPoints: 12500,
                    MinFeeRateNanosPerKB: 1000,
                    NewCreatorBasisPoints: user.profile.CoinEntry.CreatorBasisPoints,
                }
                try {
                    const response = await deso.social.updateProfile(profileReq);
                    if (response.TransactionHex !== undefined) {
                        try {
                            const profile = await deso.user.getSingleProfile({PublicKeyBase58Check: user.profile.PublicKeyBase58Check});
                            if(profile && profile.Profile !== undefined) {
                                setUser({ profile: profile.Profile });
                                party.confetti(rootRef.current, {
                                    count: party.variation.range(100, 2000),
                                    size: party.variation.range(0.2, 1.5),
                                });
                                toast.success("Cover Image Updated");
                            }
                        } catch (error) {
                            toast.error("Something went wrong");
                            console.log(error);
                        } finally {
                            setUploadingCover(false);
                        }
                    }
                } catch (error) {
                    console.log(error);
                    toast.error("Something went wrong");
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleAvatar = async () => {
        setUploadingAvatar(true);
        const deso = new Deso();
        try {
            const request = {
                UserPublicKeyBase58Check: user.profile.PublicKeyBase58Check
            };
            const response = await deso.media.uploadImage(request);
            if (response.ImageURL !== "") {
                setAvatar(response.ImageURL);
                const payload = {
                    ProfileImage: response.ImageURL,
                    CoverImage: extraData.CoverImage,
                    DisplayName: displayName,
                    Description: description,
                    Location: location,
                    Languages: languages,
                    TwitterURL: twitterLink,
                    InstagramURL: instagramLink,
                    YoutubeURL: youtubeLink,
                    LinkedInURL: linkedinLink,
                    GithubURL: githubLink,
                    DiscordURL: discordLink,
                    CustomTitle: customTitle,
                    CustomURL: customLink,
                    WebsiteTitle: websiteTitle,
                    WebsiteURL: websiteLink,
                }
                const profileReq = {
                    UpdaterPublicKeyBase58Check: user.profile.PublicKeyBase58Check,
                    ExtraData: {
                        Videso: JSON.stringify(payload)
                    },
                    NewStakeMultipleBasisPoints: 12500,
                    MinFeeRateNanosPerKB: 1000,
                    NewCreatorBasisPoints: user.profile.CoinEntry.CreatorBasisPoints,
                }
                try {
                    const response = await deso.social.updateProfile(profileReq);
                    if (response.TransactionHex !== undefined) {
                        try {
                            const profile = await deso.user.getSingleProfile({PublicKeyBase58Check: user.profile.PublicKeyBase58Check});
                            if(profile && profile.Profile !== undefined) {
                                setUser({ profile: profile.Profile });
                                party.confetti(rootRef.current, {
                                    count: party.variation.range(100, 2000),
                                    size: party.variation.range(0.2, 1.5),
                                });
                                toast.success("Profile Image Updated");
                            }
                        } catch (error) {
                            toast.error("Something went wrong");
                            console.log(error);
                        } finally {
                            setUploadingAvatar(false);
                        }
                    }
                } catch (error) {
                    console.log(error);
                    toast.error("Something went wrong");
                }
            }
        } catch (error) {
            console.log(error)
        }
    }
    
    const updateChannel = async () => {
        setLoading(true);
        const deso = new Deso();
        const payload = {
            ProfileImage: extraData.ProfileImage,
            CoverImage: extraData.CoverImage,
            DisplayName: displayName,
            Description: description,
            Location: location,
            Languages: languages,
            TwitterURL: twitterLink,
            InstagramURL: instagramLink,
            YoutubeURL: youtubeLink,
            LinkedInURL: linkedinLink,
            GithubURL: githubLink,
            DiscordURL: discordLink,
            CustomTitle: customTitle,
            CustomURL: customLink,
            WebsiteTitle: websiteTitle,
            WebsiteURL: websiteLink,
        }
        const profileReq = {
            UpdaterPublicKeyBase58Check: user.profile.PublicKeyBase58Check,
            ExtraData: {
                Videso: JSON.stringify(payload)
            },
            NewStakeMultipleBasisPoints: 12500,
            MinFeeRateNanosPerKB: 1000,
            NewCreatorBasisPoints: user.profile.CoinEntry.CreatorBasisPoints,
        }
        try {
            const response = await deso.social.updateProfile(profileReq);
            if (response.TransactionHex !== undefined) {
                try {
                    const profile = await deso.user.getSingleProfile({PublicKeyBase58Check: user.profile.PublicKeyBase58Check});
                    if(profile && profile.Profile !== undefined) {
                        setUser({ profile: profile.Profile });
                        
                        party.confetti(rootRef.current, {
                            count: party.variation.range(100, 2000),
                            size: party.variation.range(0.2, 1.5),
                        });
                    }
                } catch (error) {
                    toast.error("Something went wrong");
                    console.log(error);
                } finally {
                    setLoading(false);
                }
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    }

    const cover = getCoverPicture(channel);
    const avatar = getProfilePicture(channel);
    return (
        <>
            <div ref={rootRef} className=''>
                <div className='flex flex-col'>
                    <div className='flex rounded-md flex-col'>
                        <div
                            style={{
                                backgroundImage: `url(${newCover ? newCover : cover})`,
                                backgroundPosition: "center",
                                backgroundSize: "cover",
                                backgroundRepeat: "no-repeat",
                            }}
                            className=' w-full md:h-72 h-28 relative flex justify-center items-center dark:border-[#2D2D33] border-gray-100 border '>
                            <div className='flex w-full md:h-72 h-28 justify-end items-end pb-3 pr-3 relative group z-10'>
                                <div className='flex items-center space-x-3'>
                                    <Button onClick={handleCover} loading={uploadingCover} variant='light'>
                                        Change Cover
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <div className='max-w-7xl w-full mx-auto'>
                            <div className='flex -mt-20 space-x-3 items-center'>
                                <div
                                    className={`${uploadingAvatar ? `animate-pulse` : ``} w-36 h-36 my-2 group rounded-full relative z-20 flex items-center justify-center dark:border-[#2D2D33] border-white border-4`}
                                    style={{
                                    backgroundImage: `url(${newAvatar ? newAvatar : avatar})`,
                                    backgroundPosition: "center",
                                    backgroundSize: "cover",
                                    backgroundRepeat: "no-repeat",
                                }}>
                                    <button onClick={handleAvatar} className='bg-white/[.7] hidden group-hover:flex rounded-full px-2 py-2 hover:bg-white/[.9]'>
                                        <BiUpload size={24} />
                                    </button>
                                </div>
                            </div>
                            <div className='flex w-full space-x-10 mt-5'>
                                <div className='flex w-full flex-col'>
                                    <div className='mb-4 flex flex-col space-y-2'>
                                        <label className='font-bold text-sm'>Name</label>
                                        <input
                                            type='text'
                                            placeholder='Display Name'
                                            value={displayName}
                                            onChange={(e) => setDisplayName(e.target.value)}
                                            className="w-full text-sm py-2.5 px-3 bg-white border theme-border rounded-md focus:outline-none"
                                        />
                                    </div>
                                    <div className='mb-4 flex flex-col space-y-2'>
                                        <label className='font-bold text-sm'>Handle</label>
                                        <input
                                            type='text'
                                            readOnly
                                            defaultValue={channel?.Username}
                                            placeholder='Set your handle'
                                            className="w-full text-sm py-2.5 px-3 bg-gray-50 border theme-border rounded-md focus:outline-none"
                                        />
                                    </div>
                                    <div className='mb-4 flex flex-col space-y-2'>
                                        <label className='font-bold text-sm'>Description</label>
                                        <textarea
                                            type='text'
                                            onChange={(e) => setDescription(e.target.value)}
                                            value={description ? description : channel?.Description}
                                            placeholder='Tell viewers about your channel. Your description will appear in the About section of your channel and search results, among other places.'
                                            className="w-full text-sm py-2.5 px-3 resize-none h-36 bg-white border theme-border rounded-md focus:outline-none"
                                        >
                                        </textarea>
                                    </div>
                                    <div className='mb-4 flex flex-col space-y-2'>
                                        <label className='font-bold text-sm'>Language</label>
                                        <input
                                            type='text'
                                            value={languages}
                                            onChange={(e) => setLanguages(e.target.value)}
                                            placeholder='Add Language'
                                            className="w-full text-sm py-2.5 px-3 bg-white border theme-border rounded-md focus:outline-none"
                                        />
                                    </div>
                                    <div className='mb-6 flex flex-col space-y-2'>
                                        <label className='font-bold text-sm'>Location</label>
                                        <input
                                            type='text'
                                            value={location}
                                            onChange={(e) => setLocation(e.target.value)}
                                            placeholder='Add Location'
                                            className="w-full text-sm py-2.5 px-3 bg-white border theme-border rounded-md focus:outline-none"
                                        />
                                    </div>
                                    <div>
                                        <Button
                                            variant='primary'
                                            size='md'
                                                loading = { loading }
                                            onClick={updateChannel}
                                        >
                                            Update
                                        </Button>
                                    </div>
                                </div>
                                <div className='flex w-full flex-col'>
                                    <div className='mb-4 flex flex-col space-y-2'>
                                        <label className='font-bold text-sm'>Channel URL</label>
                                        <input
                                            type='text'
                                            placeholder='Channel URL'
                                            readOnly
                                            defaultValue={`${APP.URL}/@${channel?.Username}`}
                                            className="w-full text-sm py-2.5 px-3 bg-gray-50 border theme-border rounded-md focus:outline-none"
                                        />
                                    </div>
                                    <div className='mb-4 flex flex-col space-y-2'>
                                        <label className='font-bold text-sm'>Twitter</label>
                                        <div className='flex'>
                                            <input
                                                type='text'
                                                value={twitterLink}
                                                onChange={(e) => setTwitterLink(e.target.value)}
                                                placeholder='Set your twitter username'
                                                className="w-full text-sm py-2.5 px-3 bg-white border theme-border rounded-md focus:outline-none"
                                            />
                                        </div>
                                    </div>
                                    <div className='mb-4 flex flex-col space-y-2'>
                                        <label className='font-bold text-sm'>Instagram</label>
                                        <div className='flex'>
                                            <input
                                                type='text'
                                                onChange={(e) => setInstagramLink(e.target.value)}
                                                value={instagramLink}
                                                placeholder='Set your instagram username'
                                                className="w-full text-sm py-2.5 px-3 bg-white border theme-border rounded-md focus:outline-none"
                                            />
                                        </div>
                                    </div>
                                    <div className='mb-4 flex flex-col space-y-2'>
                                        <label className='font-bold text-sm'>Youtube</label>
                                        <div className='flex'>
                                            <input
                                                type='text'
                                                value={youtubeLink}
                                                onChange={(e) => setYoutubeLink(e.target.value)}
                                                placeholder='Set your youtube url'
                                                className="w-full text-sm py-2.5 px-3 bg-white border theme-border rounded-md focus:outline-none"
                                            />
                                        </div>
                                    </div>
                                    <div className='mb-4 flex flex-col space-y-2'>
                                        <label className='font-bold text-sm'>Discord</label>
                                        <div className='flex'>
                                            <input
                                                type='text'
                                                value={discordLink}
                                                onChange={(e) => setDiscordLink(e.target.value)}
                                                placeholder='Set your discord url'
                                                className="w-full flex-1 text-sm py-2.5 px-3 bg-white border theme-border rounded-md focus:outline-none"
                                            />
                                        </div>
                                    </div>
                                    <div className='mb-4 flex flex-col space-y-2'>
                                        <label className='font-bold text-sm'>Website</label>
                                        <div className='flex space-x-3'>
                                            <div className='max-w-[200px]'>
                                                <input
                                                    type='text'
                                                    value={websiteTitle}
                                                    onChange={(e) => setWebsiteTitle(e.target.value)}
                                                    placeholder='Set title'
                                                    className="w-full text-sm py-2.5 px-3 bg-white border theme-border rounded-md focus:outline-none"
                                                />
                                            </div>
                                            <div className='flex flex-1'>
                                                <input
                                                    type='text'
                                                    value={websiteLink}
                                                    onChange={(e) => setWebsiteLink(e.target.value)}
                                                    placeholder='Set your website url'
                                                    className="w-full text-sm py-2.5 px-3 bg-white border theme-border rounded-md focus:outline-none"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className='mb-4 flex flex-col space-y-2'>
                                        <label className='font-bold text-sm'>Custom</label>
                                        <div className='flex space-x-3'>
                                            <div className='max-w-[200px]'>
                                                <input
                                                    type='text'
                                                    value={customTitle}
                                                    onChange={(e) => setCustomTitle(e.target.value)}
                                                    placeholder='Set title'
                                                    className="w-full text-sm py-2.5 px-3 bg-white border theme-border rounded-md focus:outline-none"
                                                />
                                            </div>
                                            <div className='flex flex-1'>
                                                <input
                                                    type='text'
                                                    value={customLink}
                                                    onChange={(e) => setCustomLink(e.target.value)}
                                                    placeholder='Set your custom url'
                                                    className="w-full text-sm py-2.5 px-3 bg-white border theme-border rounded-md focus:outline-none"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Settings