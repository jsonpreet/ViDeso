import useAppStore from '@app/store/app'
import usePersistStore from '@app/store/persist'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import MetaTags from '../Common/MetaTags'
import DropZone from './DropZone'
import UploadForm from './Form'
import UploadVideo from './Video'

function Upload() {
    const isLoggedIn = usePersistStore((state) => state.isLoggedIn)
    const uploadedVideo = useAppStore((state) => state.uploadedVideo)
    const router = useRouter();
    useEffect(() => {
        if (!isLoggedIn) {
            router.push('/')
        }
    }, [isLoggedIn])

    return uploadedVideo?.file ? <UploadForm /> : <DropZone />
}

export default Upload