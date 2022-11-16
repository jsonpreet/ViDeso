import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { FiMoon, FiSun } from "react-icons/fi"


function ThemeSwitch() {
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
            <button onClick={() => onToggleTheme()} className='w-10 h-10 text-secondary hover-primary flex items-center justify-center rounded-full'>
                {theme === 'dark' ? <FiSun size={23} /> : <FiMoon size={26} />}
            </button>
        </>
    )
}

export default ThemeSwitch