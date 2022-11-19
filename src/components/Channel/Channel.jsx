import clsx from 'clsx';
import { Suspense, useEffect, useState } from 'react';
import dynamic from "next/dynamic";
import { useRouter } from 'next/router';
import Custom404 from 'pages/500';
import { Tab } from '@headlessui/react';
import { FetchProfile } from '@app/data/channel';
import MetaTags from '@app/components/Common/MetaTags'
import ChannelShimmer from '@app/components/Shimmers/ChannelShimmer';
import { Loader2 } from '@app/components/UIElements/Loader';
import { NoDataFound } from '@app/components/UIElements/NoDataFound';
import ChannelInfo from './Info';
import axios from 'axios';
import toast from 'react-hot-toast';
import usePersistStore from '@app/store/persist';
import Deso from 'deso-protocol';
import { DESO_CONFIG } from '@app/utils/constants';

const ChannelVideos = dynamic(() => import("./Tabs/Videos"), {
  suspense: true,
});

const Stori = dynamic(() => import("./Tabs/Stori"), {
  suspense: true,
});

const Community = dynamic(() => import("./Community/Community"), {
  suspense: true,
});

const Channels = dynamic(() => import("./Tabs/Channels"), {
  suspense: true,
});

const About = dynamic(() => import("./Tabs/About"), {
  suspense: true,
});

const Channel = () => {
    const { query } = useRouter();
    const { isLoggedIn, user } = usePersistStore();
    const [channelStats, setChannelStats] = useState(false)
    const [isLoading, setisLoading] = useState(true)
    const [follow, setFollow] = useState(false)
    const [followers, setFollowers] = useState(0)
    const username = query.channel;
    const { data: channel, isError, error, isFetched } = FetchProfile(username);

    const getDefaultTab = () => {
        switch (query.tab) {
        case 'stori':
            return 1
        case 'community':
            return 2
        case 'channels':
            return 3
        case 'about':
            return 4
        default:
            return 0
        }
    }
    const reader = isLoggedIn ? user.profile.PublicKeyBase58Check : '';

    useEffect(() => {
        const deso = new Deso(DESO_CONFIG);
        async function getFollowers() {
            try {
                const request = {
                    PublicKeyBase58Check: channel.PublicKeyBase58Check,
                    GetEntriesFollowingUsername: true
                };
                const response = await deso.social.getFollowsStateless(request);
                if (response && response.NumFollowers) {
                    setFollowers(response.NumFollowers);
                    setisLoading(false)
                }
                    
            } catch (error) {
                console.log(error);
                toast.error("Something went wrong!");
            }
        }
        
        async function checkFollowing() {
            const request = {
                PublicKeyBase58Check: reader,
                IsFollowingPublicKeyBase58Check: channel.PublicKeyBase58Check
            };
            try {
                const response = await deso.social.isFollowingPublicKey(request);
                setFollow(response.data.IsFollowing);
                setisLoading(false)

            } catch (error) {
                console.log(error);
                toast.error("Something went wrong!");
            }
        }
        if (isFetched) {
            getFollowers()
            if (isLoggedIn) {
                checkFollowing()
            }
        }
    }, [isFetched, channel, isLoggedIn, reader])

    useEffect(() => {
        if (isFetched) {
            FetchProfileStats(channel.Username);
        }
    }, [isFetched, channel])

    
    const FetchProfileStats = async (username) => {
        const requestURL = 'https://desocialworld.com/microservice-enriched/v1/get-single-profile';
        try {
            await axios.post(requestURL, {
                Username: username,
            }).then(response => {
                const UserAge = response.data.Profile.UserAge;
                const UserGeo = response.data.Profile.UserGeo;
                const UserLanguages = response.data.Profile.UserLanguages;
                setChannelStats({ UserAge, UserGeo, UserLanguages })
            });
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong');
        }
    }

    if (isError) {
        return <NoDataFound 
            isCenter
            withImage
            title="Something went wrong"
            description="We are unable to fetch the latest videos. Please try again later."
          />
    } 

    if(isFetched && !channel) return <Custom404 />

    if (isLoading) return <ChannelShimmer />

    const Loader = () => {
        return (
            <div className="flex items-center mt-20 justify-center">
                <Loader2 />
            </div>
        )
    }

    const TabItem = ({title}) => {
        return (
            <Tab
                className={({ selected }) =>
                    clsx(
                        'px-8 py-3 flex items-center tracking-wider text-sm space-x-2 border-b-[3px] uppercase font-medium focus:outline-none',
                        selected
                        ? 'border-gray-700 dark:border-gray-500 opacity-100'
                        : 'border-transparent hover:text-brand2-500 dark:hover:text-brand-500'
                    )
                }
            >
                <span>{title}</span>
            </Tab>
        )
    }
    
    if (isFetched) {
        return (
            <>
                <MetaTags />
                <div className="">
                    <ChannelInfo followers={followers} following={follow} channel={channel}/>
                    <Tab.Group as="div" className="w-full" defaultIndex={getDefaultTab()}>
                        <Tab.List className="flex border-b theme-border px-16 overflow-x-auto no-scrollbar mb-5">
                            <TabItem title="Videos" />
                            <TabItem title="Stori" />
                            <TabItem title="Community" />
                            <TabItem title="Channels" />
                            <TabItem title="About" />
                        </Tab.List>
                        <Tab.Panels>
                            <Tab.Panel className="py-3 px-16 focus:outline-none">
                                <Suspense fallback={<Loader/>}>
                                    <ChannelVideos channel={channel} />
                                </Suspense>
                            </Tab.Panel>
                            <Tab.Panel className="py-3 px-16 focus:outline-none">
                                <Suspense fallback={<Loader/>}>
                                    <Stori channel={channel} />
                                </Suspense>
                            </Tab.Panel>
                            <Tab.Panel className="py-3 px-16 focus:outline-none">
                                <Suspense fallback={<Loader/>}>
                                    <Community channel={channel} />
                                </Suspense>
                            </Tab.Panel>
                            <Tab.Panel className="py-3 px-16 focus:outline-none">
                                <Suspense fallback={<Loader/>}>
                                    <Channels channel={channel} />
                                </Suspense>
                            </Tab.Panel>
                            <Tab.Panel className="py-3 px-16 focus:outline-none">
                                <Suspense fallback={<Loader/>}>
                                    <About stats={channelStats} channel={channel} />
                                </Suspense>
                            </Tab.Panel>
                        </Tab.Panels>
                    </Tab.Group>
                </div>
            </>
        )
    }
}

export default Channel