import usePersistStore from '@app/store/persist';
import { NoDataFound } from '@app/components/UIElements/NoDataFound';
import MetaTags from '@app/components/Common/MetaTags';
import Timeline from './Timeline';

function History() {
    const isLoggedIn = usePersistStore((state) => state.isLoggedIn)

    return (
        <>
            <MetaTags title='History' />
            {isLoggedIn ?
                <>
                    <div className='px-0 md:px-16'><Timeline /></div>
                </>
                :
                <NoDataFound
                    isCenter
                    withImage
                    heading="Keep track of what you watch"
                    text="Watch history isn't viewable when signed out."
                    isLoginButton={true}
                    isHeading={true}
                />
            }
        </>
    )
    
}

export default History