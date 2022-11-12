import 'tippy.js/dist/tippy.css'
import 'tippy.js/themes/light.css'
import 'tippy.js/themes/material.css'

import Tippy from '@tippyjs/react'
import clsx from 'clsx'
import { useTheme } from 'next-themes'
import React from 'react'

const Tooltip = ({
  children,
  content,
  visible = true,
  placement = 'bottom',
  ...props
}) => {
  const { resolvedTheme } = useTheme()
  return (
    <Tippy
      {...props}
      placement={placement}
      content={content}
      theme={resolvedTheme === 'dark' ? 'material' : 'light'}
      className={clsx(
        'hidden !font-normal !text-xs tracking-wide !rounded-md !px-0.5',
        {
          'sm:block': visible
        }
      )}
    >
      {children}
    </Tippy>
  )
}

export default Tooltip