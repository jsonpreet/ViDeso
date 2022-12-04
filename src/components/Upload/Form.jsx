import useAppStore from '@store/app'
import { APP } from '@utils/constants'
import { NextSeo } from 'next-seo'
import { useState } from 'react'
import { BiX } from 'react-icons/bi'
import { Button } from '../UI/Button'
import InputMentions from '../UI/InputMentions'
import Category from './Category'
import UploadVideo from './Video'


function UploadForm({onUpload, onCancel}) {
    const setUploadedVideo = useAppStore((state) => state.setUploadedVideo)
    const uploadedVideo = useAppStore((state) => state.uploadedVideo)
    const [tags, setTags] = useState([])
    const [currentTag, setCurrentTag] = useState('')
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [language, setLanguage] = useState('')

    const handleTags = (e) => {
        if (e.target.value !== "" && e.key === "Enter") {
            let tag = e.target.value.replace(/\s/g, "")
            setCurrentTag('');
            setTags([...tags, tag]); 
            setUploadedVideo({tags: [...tags, tag]})
        } else {
            setCurrentTag(e.target.value);
        }
    };
    
    return (
        <>
            <NextSeo
                title='Upload Videos'
                canonical={`${APP.URL}/upload`}
                openGraph={{
                    title: 'Upload Videos',
                    url: `${APP.URL}/upload`,
                }}
            />
            <div className='md:px-16 px-4 max-w-7xl mx-auto mt-5'>
                <h3 className='mb-5 text-2xl font-bold'>Upload videos</h3>
                <div className="grid h-full gap-5 md:grid-cols-2">
                    <div className="flex flex-col rounded-lg p-5 bg-secondary justify-between">
                        <div>
                            <div className='mb-4'>
                                <InputMentions
                                    label="Title"
                                    placeholder="Title that describes your video"
                                    autoComplete="off"
                                    value={title}
                                    onFocus={() => null}
                                    onContentChange={(value) => {
                                        setTitle(value)
                                        setUploadedVideo({title: value})
                                    }}
                                    autoFocus
                                    mentionsSelector="input-mentions-single"
                                />
                            </div>
                            <div className='mb-4 flex flex-col space-y-2'>
                                <InputMentions
                                    label="Description"
                                    placeholder="Tell viewers about your video (type @ to mention a channel) or add #Hashtags"
                                    autoComplete="off"
                                    value={description}
                                    onFocus={() => null}
                                    onContentChange={(value) => {
                                        setDescription(value)
                                        setUploadedVideo({description: value})
                                    }}
                                    mentionsSelector="input-mentions-textarea"
                                />
                            </div>
                            <div className="mb-4 ">
                                <Category />
                            </div>
                            <div className='mb-4 flex flex-col space-y-2'>
                                <label className='font-medium text-sm'>Language</label>
                                <input
                                    type='text'
                                    value={language}
                                    onChange={(e) => {
                                        setLanguage(e.target.value)
                                        setUploadedVideo({language: e.target.value})
                                    }}
                                    placeholder='Add Language'
                                    className="w-full text-sm py-2.5 px-3 bg-primary border theme-border rounded-md focus:outline-none"
                                />
                            </div>
                            <div className='flex flex-col space-y-2'>
                                <label className='font-medium text-sm'>Tags</label>
                                <input
                                    type='text'
                                    value={currentTag}
                                    onChange={handleTags}
                                    onKeyDown={handleTags}
                                    placeholder='Add Tags'
                                    className="w-full text-sm py-2.5 px-3 bg-primary border theme-border rounded-md focus:outline-none"
                                />
                                
                                <div className='flex my-2 w-3/4 flex-auto flex-wrap'>
                                    {tags.map((word, index) => (
                                    <div
                                        className='bg-primary hover-primary rounded-full text-sm pr-2 px-3 py-1 mx-1 my-1 flex items-center'
                                        key={index}>
                                        <p>{word}</p>
                                        <button
                                        className=' text-red-500 hover:text-red-700'
                                        onClick={() => {
                                                setTags(tags.filter((w) => w !== word))
                                                setUploadedVideo({tags: tags.filter((w) => w !== word)})
                                            }
                                        }
                                        >
                                        {" "}
                                        <BiX size={17} />
                                        </button>
                                    </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col items-start justify-between">
                        <UploadVideo />
                    </div>
                </div>
                <div className="flex items-center space-x-4 justify-start mt-5">
                    <Button
                        loading={uploadedVideo.loading || uploadedVideo.uploadingThumbnail}
                        disabled={uploadedVideo.loading || uploadedVideo.uploadingThumbnail}
                        onClick={() => onUpload()}
                    >
                        {uploadedVideo.uploadingThumbnail
                        ? 'Uploading thumbnail'
                        : uploadedVideo.buttonText}
                    </Button>
                    <Button variant="light" onClick={() => onCancel()} type="button">
                        Cancel
                    </Button>
                </div>
            </div>
        </>
    )
}

export default UploadForm