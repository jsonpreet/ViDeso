import 'tippy.js/dist/tippy.css'
import 'tippy.js/themes/light.css'
import 'tippy.js/themes/material.css'

//import Tippy from '@tippyjs/react'
import Tippy from '@tippyjs/react/headless'
import clsx from 'clsx'
import { useTheme } from 'next-themes'
import React from 'react'

const Tooltip = ({
  render,
  title,
  visible = true,
  placement = 'bottom',
  contentClass = '',
  ...props
}) => {
  const { resolvedTheme } = useTheme()
  return (
    <Tippy
      {...props}
      placement={placement}
      theme='material'
      className={clsx(
        'hidden !font-normal tracking-wide !rounded-md !px-0.5',
        {
          'sm:block': visible
        }
      )}
      render={(attrs, content) => (
        <div className={clsx(
            "bg-gray-700 px-3 py-2 rounded-md text-gray-200 tracking-wide text-[13px] font-medium",
            contentClass,
          )}
        tabIndex="-1" {...attrs} >
          {title}
        </div>
      )}
    />
  )
}

export default Tooltip