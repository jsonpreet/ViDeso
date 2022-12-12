import usePersistStore from '@store/persist';
import toast from 'react-hot-toast'
import Deso from 'deso-protocol'
import { useEffect, useState } from 'react'
import { Button } from '../../UI/Button';
import { Menu } from '@headlessui/react';
import Link from 'next/link';
import DropMenu, { NextLink } from '../../UI/DropMenu';
import { FaRegUserCircle } from 'react-icons/fa';
import { HiOutlineCog } from 'react-icons/hi';
import { MdExitToApp } from 'react-icons/md';
import { SETTINGS } from '@utils/paths';
import { BASE_URI, DESO_CONFIG } from '@utils/constants';
import IsVerified from '../IsVerified';
import ThemeSwitch from '../ThemeSwitch';
import { useRouter } from 'next/router';
import { getProfileName } from '@utils/functions/getProfileName';
import { getProfilePicture } from '@utils/functions/getProfilePicture';

function UserMenu() {
    const router = useRouter()
    const { setLoggedIn, isLoggedIn, user, setUser } = usePersistStore()
    const [loading, setLoading] = useState(false)
    const [deso, setDeso] = useState(null)

    useEffect(() => {
        const deso = new Deso(DESO_CONFIG);
        setDeso(deso)
    }, [])

    const loginWithDeso = async () => {
        setLoading(true)
        try {
            const request = 3;
            const response = await deso.identity.login(request);
            if (response) {
                const request = {
                    PublicKeyBase58Check: response.key,
                };
                try {
                    const data = await deso.user.getSingleProfile(request);
                    setUser({ profile: data.Profile });
                    setLoggedIn(true);
                    setLoading(false)
                } catch (error) {
                    toast.error(error.message);
                    console.log(error);
                    setLoading(false)

                }
            } else {
                console.log(response);
                setLoading(false)
            }
        } catch (error) {
            toast.error(error.message);
            console.log(error);
            setLoading(false)
        }
    }

    const logout = async () => {
        const request = user.profile.PublicKeyBase58Check;
        try {
            const response = await deso.identity.logout(request);
            if (response) {
                toast.success("Logout Successfully!");
                setUser({});
                setLoggedIn(false);
                router.push('/');
        } else {
            console.log(response);
        }
        } catch (error) {
            toast.error("Something went wrong");
            console.log(error);
        }
    };


    return (
        <>
            {isLoggedIn ? (
                <DropMenu
                    trigger={
                        <Button
                        className="!p-0 ml-1.5 flex-none"
                        >
                        <img
                            src={getProfilePicture(user.profile)}
                            alt={getProfileName(user.profile)}
                            className='object-cover rounded-full bg-dropdown w-8 h-8 md:w-9 md:h-9'
                        />
                        </Button>
                    }
                    >
                    <div className="py-2 my-1 overflow-hidden rounded-lg dropdown-shadow bg-dropdown outline-none ring-0 focus:outline-none focus:ring-0 divide-y dropdown-shadow max-h-96 bg-dropdown theme-divider border theme-border w-56">
                        <>
                            <div className="flex flex-col space-y-1 text-sm transition duration-150 ease-in-out rounded-lg">
                                <div className="inline-flex items-center p-2 py-3 space-x-2 rounded-lg">
                                    <img
                                        src={getProfilePicture(user.profile)}
                                        alt={getProfileName(user.profile)}
                                        className='object-cover bg-dropdown rounded-full w-9 md:h-9'
                                    />
                                    <div className='flex items-center space-x-1'>
                                        <h3
                                            title={getProfileName(user.profile)}
                                            className="text-base truncate leading-4"
                                        >
                                            {getProfileName(user.profile)}
                                        </h3>
                                        {user.profile.IsVerified ? <IsVerified size="xs" /> : null}
                                    </div>
                                </div>
                            </div>
                            <div className="pt-2 text-sm">
                                <Menu.Item
                                    as={NextLink}
                                    href={`/@${user.profile.Username}`}
                                    className="inline-flex w-full items-center px-3 py-2 space-x-3 hover-primary"
                                >
                                    <FaRegUserCircle size="20" />
                                    <span className="truncate whitespace-nowrap">
                                    Your Channel
                                    </span>
                                </Menu.Item>
                                
                                <Link
                                    href={`/@${user.profile.Username}/${SETTINGS}`}
                                    className="inline-flex w-full items-center px-3 py-2 space-x-3 hover-primary"
                                >
                                    <HiOutlineCog size="20" />
                                    <span className="truncate whitespace-nowrap">
                                    Channel Settings
                                    </span>
                                </Link>
                                <ThemeSwitch isMenu={true} />
                                <button
                                    type="button"
                                    className="inline-flex w-full items-center px-3 py-2 space-x-3 hover-primary"
                                    onClick={() => logout()}
                                >
                                    <MdExitToApp size="20" />
                                    <span className="truncate whitespace-nowrap">Sign Out</span>
                                </button>
                            </div>
                        </>
                    </div>
                </DropMenu>
            ): (
                <Button onClick = { () => loginWithDeso() } loading = { loading }>
                        Sign In{' '}
                        <span className="hidden md:inline-block">with DeSo</span>
                </Button>
            )
        }
        </>
    )
}

export default UserMenu