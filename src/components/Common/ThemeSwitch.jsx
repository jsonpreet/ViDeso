import clsx from "clsx"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { FiMoon, FiSun } from "react-icons/fi"


function ThemeSwitch({isMenu = false}) {
    const [mounted, setMounted] = useState(false)
    const { theme, setTheme } = useTheme()

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return null
    }

    const onToggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark')
    }

    return (
        <>
            <button onClick={() => onToggleTheme()} className={clsx({
                'w-10 h-10 text-secondary hover-primary flex items-center justify-center rounded-full': !isMenu,
                'inline-flex w-full items-center px-3 py-2 space-x-3 hover-primary': isMenu
            })}>
                {theme === 'dark' ? <FiSun size={isMenu ? 20 : 23} /> : <FiMoon size={isMenu ? 21 : 26} />}
                {isMenu ? <span className="truncate whitespace-nowrap">
                  {theme === 'light' ? 'Switch to Dark' : 'Switch to Light'}
                </span>: null}
            </button>
        </>
    )
}

export default ThemeSwitch