import { EXPLORE, HOME, STORI } from '@app/utils/paths'
import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FiHome } from 'react-icons/fi'
import { GiFilmSpool } from 'react-icons/gi'
import { MdOutlineSubscriptions, MdSlowMotionVideo } from 'react-icons/md'

const MobileMenu = () => {
  const router = useRouter()

  const isActivePath = (path) => router.pathname === path

  return (
    <div className="fixed inset-x-0 bottom-0 dropdown-shadow z-10 md:hidden">
      <div
        className={clsx(
          'grid grid-cols-4 py-2 bg-dropdown space-between'
        )}
      >
        <Link
          href={HOME}
          className="flex flex-col space-y-1 items-center justify-center w-full"
        >
          <FiHome size={21} 
            className={clsx({
              'active-secondary': isActivePath('/')
            })}
          />
          <span className="text-xs">Home</span>
        </Link>
        <Link
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
        </Link>
        <Link
          href={EXPLORE}
          className="flex flex-col space-y-1 items-center justify-center w-full"
        >
          <GiFilmSpool size={21}
            className={clsx({
              'active-secondary': isActivePath('/explore')
            })}
          />
          <span className="text-xs">Explore</span>
        </Link>
        <Link
          href="/feed"
          className="flex flex-col space-y-1 items-center justify-center w-full"
        >
          <MdOutlineSubscriptions size={21}
            className={clsx({
              'active-secondary': isActivePath('/feed')
            })}
          />
          <span className="text-xs">Subscriptions</span>
        </Link>
      </div>
    </div>
  )
}

export default MobileMenu