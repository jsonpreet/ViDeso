import { Loader2 } from './Loader'

import MetaTags from '../Common/MetaTags'

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