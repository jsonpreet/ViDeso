import React from 'react'
import { Loader2 } from '../UIElements/Loader'

import MetaTags from './MetaTags'

const FullPageLoader = () => {
  return (
    <div className="grid h-screen place-items-center">
      <MetaTags />
      <div>
        <Loader2/>
      </div>
    </div>
  )
}

export default FullPageLoader