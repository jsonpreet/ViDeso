import { NextSeo } from 'next-seo'
import React from 'react'

function About() {
    return (
        <>
            <NextSeo
                title='About Videso'
            />
            <div className='md:mx-16'>
                <div className='flex flex-col space-y-2'>
                    <h2 className='text-2xl font-bold'>About Videso</h2>
                </div>
                <div className='flex flex-col mt-5 space-y-5'>
                    <p>Videso is a decentralized video-sharing social media platform built on top of the DeSo blockchain. This means that Videso is a platform that is not controlled by any central authority, allowing users to have full control over their content and data.</p>

                    <p>With Videso, users can share videos with their friends and followers in a secure and decentralized manner. Since the platform is built on the DeSo blockchain, users can be confident that their data is safe and cannot be accessed or tampered with by any third parties.</p>

                    <p>In addition to providing a secure platform for video sharing, Videso also allows users to earn rewards for their contributions to the platform. This can include sharing videos, engaging with content, and contributing to the community. These rewards are paid in the form of the platform&apos;s native token, which can be used to access additional features and services on the platform.</p>

                    <p>In the event that we need to make any changes to this privacy policy, we will update it on this page and notify our users through the platform.</p>

                    <p>Overall, Videso is a unique and exciting platform that offers users a decentralized and secure way to share videos and connect with others. With its focus on user control and rewards, Videso is poised to become a leading destination for video sharing on the DeSo blockchain.</p>
                </div>
            </div>
        </>
    )
}

export default About