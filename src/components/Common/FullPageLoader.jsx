import React from 'react'

import MetaTags from './MetaTags'

const FullPageLoader = () => {
  return (
    <div className="grid h-screen place-items-center">
      <MetaTags />
      <div className="animate-pulse">
        Loading....
      </div>
    </div>
  )
}

export default FullPageLoader