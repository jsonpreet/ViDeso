import MetaTags from '@components/Common/MetaTags'
import Timeline from './Timeline'

const Home = () => {
    return (
        <>
            <MetaTags />
            <div className="px-16">
                <Timeline />
            </div>
        </>
    )
}

export default Home