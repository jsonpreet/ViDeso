import clsx from 'clsx'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTheme } from 'next-themes'
import { BiMoon, BiSun } from 'react-icons/bi'
import { FiHome } from 'react-icons/fi'
import {
  MdOutlineSubscriptions,
  MdOutlineVideoLibrary,
  MdSlowMotionVideo,
  MdHistory,
  MdOutlineFeedback
} from 'react-icons/md'
import { RiLeafLine } from 'react-icons/ri'
import { SHORTS, HISTORY, FEED, HOME, LIBRARY } from '@utils/paths'
import { CREATOR_VIDEO_CATEGORIES } from '@data/categories'
import { FaDiscord } from "react-icons/fa";
import { IoDiamondOutline } from "react-icons/io5";
import { APP } from '@app/utils/constants'
import { Scrollbars } from 'react-custom-scrollbars-2';
import { useState } from 'react'
import { BsChevronDown, BsChevronUp } from 'react-icons/bs'
import usePersistStore from '@app/store/persist'
import { Button } from '../UIElements/Button'

// const MoreTrigger = dynamic(() => import('../../components/Common/MoreTrigger'))

const Sidebar = () => {
  const { isLoggedIn } = usePersistStore((state) => state.isLoggedIn) 
  const router = useRouter()
  const { theme, setTheme } = useTheme()
  const [top, setTop] = useState(0)
  const [showMore, setShowMore] = useState(false)
  const loadCount = showMore ? CREATOR_VIDEO_CATEGORIES.length : 6;


  const isActivePath = (path) => router.pathname === path

  const onToggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  const renderView = ({ style, ...props }) => {
    return (
      <div className="box" style={{ ...style }} {...props}/>
    );
  }

  const renderThumb = ({ style, ...props }) => {
    const thumbStyle = {
      borderRadius: `1.5rem`,
    };
    return (
        <div className='bg-gray-500 dark:bg-white' style={{ ...style, ...thumbStyle }} {...props}/>
    );
  }
  
  const handleUpdate = (values) => {
    const { top } = values;
    setTop(top);
  }


  return (
    <>
      {/* {!getShowFullScreen(router.pathname) && <MobileBottomNav />} */}
      <div className="flex flex-col w-64 primaryBg h-screen p-4 items-start justify-start overflow-hidden z-10 pt-16 text-[14px] font-light tracking-wide">
        <Scrollbars onUpdate={handleUpdate} renderView={renderView} renderThumbVertical={renderThumb} autoHeight autoHide autoHeightMax={`100%`}>
          <div className="flex flex-col w-full">
          <div className="flex flex-col w-full space-y-1">
            <Link
              href={HOME}
              className={clsx(
                'rounded-lg px-3 py-2 group',
                isActivePath(HOME)
                  ? 'bg-gray-100 font-bold dark:bg-[#181818]'
                  : 'hover:bg-gray-100 dark:hover:bg-[#181818]'
              )}
            >
              <div className="flex items-center">
                <FiHome size={21} />
                <p className='ml-6'>Home</p>
              </div>
            </Link>
            <Link
              href={FEED}
              className={clsx(
                'rounded-lg px-3 py-2 group',
                isActivePath(FEED)
                  ? 'bg-gray-100 font-bold dark:bg-[#181818]'
                  : 'hover:bg-gray-100 dark:hover:bg-[#181818]'
              )}
            >
              <div className="flex items-center">
                <MdOutlineSubscriptions size={20} />
                <p className='ml-6'>Subscriptions</p>
              </div>
            </Link>
            {/* <Link
              href={SHORTS}
              className={clsx('rounded-lg px-3 py-2 group', {
                'bg-gray-100 font-bold dark:bg-[#181818]':
                  isActivePath(SHORTS) || router.pathname === '/shorts/[id]',
                'hover:bg-gray-100 dark:hover:bg-[#181818]':
                  !isActivePath(SHORTS) && router.pathname !== '/shorts/[id]'
              })}
            >
              <div className="flex items-center">
                <MdSlowMotionVideo size={21} />
                <p className='ml-6'>Shorts</p>
              </div>
            </Link> */}
            <Link
              href={LIBRARY}
              className={clsx(
                'rounded-lg px-3 py-2 group',
                isActivePath(LIBRARY)
                  ? 'bg-gray-100 font-bold dark:bg-[#181818]'
                  : 'hover:bg-gray-100 dark:hover:bg-[#181818]'
              )}
            >
              <div className="flex items-center">
                <MdOutlineVideoLibrary size={21} />
                <p className='ml-6'>Library</p>
              </div>
            </Link>
            <Link
              href={HISTORY}
              className={clsx(
                'rounded-lg px-3 py-2 group',
                isActivePath(HISTORY)
                  ? 'bg-gray-100 font-bold dark:bg-[#181818]'
                  : 'hover:bg-gray-100 dark:hover:bg-[#181818]'
              )}
            >
              <div className="flex items-center">
                <MdHistory size={21} />
                <p className='ml-6'>History</p>
              </div>
            </Link>
          </div>
          {!isLoggedIn ? 
              <>
                <div className="h-[1px] mt-4 mb-6 relative bg-gray-300 dark:bg-gray-700" />
                <div className="flex flex-col w-full mb-3 space-y-3 px-3">
                  <div className='text-sm'>Sign in to like videos, comment, and subscribe.</div>
                  <div className='w-full'><Button>Log In</Button></div>
                </div>
              </>
          : null}  
          <div className="h-[1px] mt-4 mb-6 relative bg-gray-300 dark:bg-gray-700" />
          <div className="flex flex-col w-full mb-3 px-3">
            <div className='text-base'>Explore</div>
          </div>
          <div className="flex flex-col space-y-1">
              {Object.keys(CREATOR_VIDEO_CATEGORIES.slice(0,loadCount)).map((categories) => {
                if (categories !== 6) {
                  const category = CREATOR_VIDEO_CATEGORIES[categories];
                  return (
                    <Link key={category.tag.toLowerCase()}
                      href={`/explore/${category.tag.toLowerCase()}`}
                      className="rounded-lg px-3 py-2 group hover:bg-gray-100 dark:hover:bg-[#181818]"
                    >
                      <div className="flex items-center">
                        {category.icon}
                        <p className='ml-6'>{category.name}</p>
                      </div>
                    </Link>
                  )
                }
              // return Object.keys(allCategories).map((key, index) => {
              //   const category = allCategories[index];
              //   console.log(category);
              //   return (
              //     <Link key={category.tag.toLowerCase()}
              //       href={`/explore/${category.tag.toLowerCase()}`}
              //       className="rounded-lg px-3 py-2 group hover:bg-gray-100 dark:hover:bg-[#181818]"
              //     >
              //       <div className="flex items-center">
              //         {category.icon}
              //         <p className='ml-6'>{category.name}</p>
              //       </div>
              //     </Link>
              //   )
              // })
              })}
              
                {
                  !showMore ?
                    <div key={`showMore`} onClick={() => setShowMore(!showMore)} className="cursor-pointer rounded-lg px-3 py-2 group hover:bg-gray-100 dark:hover:bg-[#181818]">
                      <div className="flex items-center">
                        <BsChevronDown size={20}/>
                        <p className='ml-6'>Show More</p>
                      </div>
                    </div>
                    :
                    <div key={`showMore`} onClick={() => setShowMore(!showMore)} className="cursor-pointer rounded-lg px-3 py-2 group hover:bg-gray-100 dark:hover:bg-[#181818]">
                      <div className="flex items-center">
                        <BsChevronUp size={20}/>
                        <p className='ml-6'>Show Less</p>
                      </div>
                    </div>
                }
            {/* {CREATOR_VIDEO_CATEGORIES.map((category) => {
              return (
                <Link key={category.tag.toLowerCase()}
                  href={`/explore/${category.tag.toLowerCase()}`}
                  className="rounded-lg px-3 py-2 group hover:bg-gray-100 dark:hover:bg-[#181818]"
                >
                  <div className="flex items-center">
                    {category.icon}
                    <p className='ml-6'>{category.name}</p>
                  </div>
                </Link>
              )
            })} */}
          </div>
          <div className="h-[1px] mt-4 mb-6 relative bg-gray-300 dark:bg-gray-700" />
          <div className="flex flex-col space-y-1">
            <a
              href='#'
              className={'rounded-lg px-3 py-2 group hover:bg-gray-100 dark:hover:bg-[#181818]'}
            >
              <div className="flex items-center">
                <FaDiscord size={21} />
                <p className='ml-6'>Discord</p>
              </div>
            </a>
            <a
              href='#'
              className={'rounded-lg px-3 py-2 group hover:bg-gray-100 dark:hover:bg-[#181818]'}
            >
              <div className="flex items-center">
                <IoDiamondOutline size={21} />
                <p className='ml-6'>DiamondApp</p>
              </div>
            </a>
            <a
              href='#'
              className={'rounded-lg px-3 py-2 group hover:bg-gray-100 dark:hover:bg-[#181818]'}
            >
              <div className="flex items-center">
                <MdOutlineFeedback size={21} />
                <p className='ml-6'>Send Feedback</p>
              </div>
            </a>
          </div>
          <div className="h-[1px] mt-4 mb-6 relative bg-gray-300 dark:bg-gray-700" />
          <div className="flex space-x-2 px-3">
              <Link
                  href={`/about`}
                  className="text-gray-600 text-sm hover:text-zinc-800 font-medium"
              >
                <p>About</p>
              </Link>
              <Link
                  href={`/privacy`}
                  className="text-gray-600 text-sm hover:text-zinc-800 font-medium"
              >
                <p>Privacy</p>
              </Link>
              <Link
                  href={`/copyright`}
                  className="text-gray-600 text-sm hover:text-zinc-800 font-medium"
              >
                <p>Copyright</p>
              </Link>
          </div>
          <div className='flex flex-col px-3 text-sm text-gray-500 mt-4'>
            <p>© 2022 {APP.Name}</p>
          </div>
          <div className="flex w-full">
            {/* <button
              type="button"
              onClick={() => onToggleTheme()}
              className="flex p-3 py-4 justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-[#181818] focus:outline-none opacity-90 hover:opacity-100"
            >
              {theme === 'light' ? <BiMoon /> : <BiSun />}
            </button> */}
            {/* <MoreTrigger /> */}
          </div>
          </div>
        </Scrollbars>
      </div>
    </>
  )
}

export default Sidebar