import { FetchTrendingTags } from '@data/tags';
import Link from 'next/link';
import React, { useState } from 'react'
import { BsChevronDown, BsChevronUp } from 'react-icons/bs';

function TrendingTags() {
    const [showMore, setShowMore] = useState(false)
    const { isError, error, isSuccess, isLoading, isFetched, data: tags } = FetchTrendingTags();
    const isActivePath = (path) => router.pathname === path
    if (isFetched) {
        const loadCount = showMore ? tags.length : 6;
        return (
            <>
                <div className="flex flex-col space-y-1">
                    {Object.keys(tags.slice(0,loadCount)).map((allTags) => {
                    if (allTags !== 6) {
                        const tag = tags[allTags];
                        const link = tag.Hashtag.replace(/(#(?:[^\x00-\x7F]|\w)+)/g, (hashtags) => {
                            return hashtags.substring(1).toLowerCase()
                        })
                        return (
                        <Link key={link.toLowerCase()}
                            href={`/explore/${link.toLowerCase()}`}
                            className="rounded-lg px-3 py-2 group hover:bg-gray-100 dark:hover:bg-[#181818]"
                        >
                            <div className="flex items-center">
                                <p>{tag.Hashtag}</p>
                            </div>
                        </Link>
                        )
                    }
                    })}
                    
                    {
                        !showMore ?
                        <div key={`showMore`} onClick={() => setShowMore(!showMore)} className="cursor-pointer rounded-lg px-3 py-2 group hover:bg-gray-100 dark:hover:bg-[#181818]">
                            <div className="flex items-center">
                            <BsChevronDown size={20}/>
                            <p className='ml-6'>Show More</p>
                            </div>
                        </div>
                        :
                        <div key={`showMore`} onClick={() => setShowMore(!showMore)} className="cursor-pointer rounded-lg px-3 py-2 group hover:bg-gray-100 dark:hover:bg-[#181818]">
                            <div className="flex items-center">
                            <BsChevronUp size={20}/>
                            <p className='ml-6'>Show Less</p>
                            </div>
                        </div>
                    }
                </div>
            </>
        )
    }
}

export default TrendingTags