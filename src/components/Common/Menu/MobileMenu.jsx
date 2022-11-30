import usePersistStore from '@app/store/persist'
import { EXPLORE, FEED, HOME, LIBRARY, STORI } from '@app/utils/paths'
import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FiHome } from 'react-icons/fi'
import { MdOutlineSubscriptions, MdOutlineVideoLibrary, MdSlowMotionVideo } from 'react-icons/md'

const MobileMenu = () => {
  const router = useRouter()
  const { isLoggedIn } = usePersistStore()

  const isActivePath = (path) => router.pathname === path

  return (
    <div className="fixed inset-x-0 bottom-0 dropdown-shadow z-10 md:hidden">
      <div
        className={clsx(
          'grid py-2 bg-dropdown space-between',
          {
            'grid-cols-4': isLoggedIn,
            'grid-cols-3' : !isLoggedIn,
          }
        )}
      >
        <Link
          href={HOME}
          className="flex flex-col space-y-1 items-center justify-center w-full"
        >
          <FiHome size={21} 
            className={clsx({
              'active-secondary': isActivePath(HOME)
            })}
          />
          <span className="text-xs">Home</span>
        </Link>
        {/* <Link
          href={STORI}
          className="flex flex-col space-y-1 items-center justify-center w-full"
        >
          <MdSlowMotionVideo size={21}
            className={clsx({
              'active-secondary': isActivePath(STORI) || router.pathname === '/stori',
              'active-secondary': isActivePath(STORI) || router.pathname === '/stori/[id]',
            })}
          />
          <span className="text-xs">Stori</span>
        </Link> */}
        <Link
          href={FEED}
          className="flex flex-col space-y-1 items-center justify-center w-full"
        >
          <MdOutlineSubscriptions size={21}
            className={clsx({
              'active-secondary': isActivePath(FEED)
            })}
          />
          <span className="text-xs">Subscriptions</span>
        </Link>
        <Link
          href={EXPLORE}
          className="flex flex-col space-y-1 items-center justify-center w-full"
        >
          <MdOutlineSubscriptions size={21}
            className={clsx({
              'active-secondary': isActivePath(EXPLORE)
            })}
          />
          <span className="text-xs">Explore</span>
        </Link>
        {isLoggedIn ?
          <Link
            href={LIBRARY}
            className="flex flex-col space-y-1 items-center justify-center w-full"
          >
            <MdOutlineVideoLibrary size={21}
              className={clsx({
                'active-secondary': isActivePath(LIBRARY)
              })}
            />
            <span className="text-xs">Library</span>
          </Link>
          : null}
      </div>
    </div>
  )
}

export default MobileMenu