import useAppStore from '@app/store/app'
import React, { useState } from 'react'
import { AiFillCloseCircle } from 'react-icons/ai'
import Alert from '../UIElements/Alert'
import { Button } from '../UIElements/Button'
import InputMentions from '../UIElements/InputMentions'
import Category from './Category'
import UploadVideo from './Video'

const ContentAlert = ({ message }) => (
  <div className="mt-6">
    <Alert variant="danger">
      <span className="inline-flex items-center text-sm">
        <AiFillCloseCircle className="mr-3 text-xl text-red-500" />
        {message}
      </span>
    </Alert>
  </div>
)


function UploadForm() {
    const uploadedVideo = useAppStore((state) => state.uploadedVideo)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [location, setLocation] = useState('')
    const [languages, setLanguages] = useState('')
    return (
        <>
            <div className='md:px-16 px-4 max-w-7xl mx-auto mt-5'>
                <div className="grid h-full gap-5 md:grid-cols-2">
                    <div className="flex flex-col justify-between">
                        <div>
                            <div className='mb-4'>
                                <InputMentions
                                    label="Title"
                                    placeholder="Title that describes your video"
                                    autoComplete="off"
                                    value={title}
                                    onContentChange={(value) => {
                                        setTitle(value)
                                    }}
                                    autoFocus
                                    mentionsSelector="input-mentions-single"
                                />
                                {/* <input
                                    type='text'
                                    placeholder='Title'
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="w-full text-sm py-2.5 px-3 bg-primary border theme-border rounded-md focus:outline-none"
                                /> */}
                            </div>
                            <div className='mb-4 flex flex-col space-y-2'>
                                <InputMentions
                                    label="Description"
                                    placeholder="Tell viewers about your video (type @ to mention a channel)"
                                    autoComplete="off"
                                    value={description}
                                    onContentChange={(value) => {
                                        setDescription(value)
                                    }}
                                    rows={5}
                                    mentionsSelector="input-mentions-textarea"
                                />
                                {/* <textarea
                                    type='text'
                                    onChange={(e) => setDescription(e.target.value)}
                                    value={description}
                                    placeholder='Tell viewers about your video (type @ to mention a channel)'
                                    className="w-full text-sm py-2.5 px-3 resize-none h-36 bg-primary border theme-border rounded-md focus:outline-none"
                                >
                                </textarea> */}
                            </div>
                            <div className="mb-4 ">
                                <Category />
                            </div>
                            <div className='mb-4 flex flex-col space-y-2'>
                                <label className='font-medium text-sm'>Language</label>
                                <input
                                    type='text'
                                    value={languages}
                                    onChange={(e) => setLanguages(e.target.value)}
                                    placeholder='Add Language'
                                    className="w-full text-sm py-2.5 px-3 bg-primary border theme-border rounded-md focus:outline-none"
                                />
                            </div>
                            <div className='mb-4 flex flex-col space-y-2'>
                                <label className='font-medium text-sm'>Location</label>
                                <input
                                    type='text'
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    placeholder='Add Location'
                                    className="w-full text-sm py-2.5 px-3 bg-primary border theme-border rounded-md focus:outline-none"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col items-start justify-between">
                        <UploadVideo />
                    </div>
                </div>
                {uploadedVideo.isNSFWThumbnail ? (
                    <ContentAlert
                    message={
                        <span>
                        Sorry! <b className="px-0.5">Selected thumbnail</b> image has
                        tripped some content warnings. It contains NSFW content, choose
                        different image to post.
                        </span>
                    }
                    />
                ) : uploadedVideo.isNSFW ? (
                    <ContentAlert
                    message={
                        <span>
                        Sorry! Something about this video has tripped some content
                        warnings. It contains NSFW content in some frames, and so the
                        video is not allowed to post on Lenstube!
                        </span>
                    }
                    />
                ) : (
                    <div className="flex items-center justify-end mt-4">
                    <Button variant="secondary" onClick={() => onCancel()} type="button">
                        Cancel
                    </Button>
                    <Button
                        loading={uploadedVideo.loading || uploadedVideo.uploadingThumbnail}
                        disabled={uploadedVideo.loading || uploadedVideo.uploadingThumbnail}
                        type="submit"
                    >
                        {uploadedVideo.uploadingThumbnail
                        ? 'Uploading thumbnail'
                        : uploadedVideo.buttonText}
                    </Button>
                    </div>
                )}
            </div>
        </>
    )
}

export default UploadForm