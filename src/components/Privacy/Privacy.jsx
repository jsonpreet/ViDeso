import { NextSeo } from 'next-seo'
import React from 'react'

function Privacy() {
    return (
        <>
            <NextSeo
                title='Privacy Policy'
            />
            <div className='md:mx-16'>
                <div className='flex flex-col space-y-2'>
                    <h2 className='text-2xl font-bold'>Privacy Policy</h2>
                    <p className='font-semibold'>Last updated - Dec 5, 2022</p>
                </div>
                <div className='flex flex-col mt-5 space-y-5'>
                    <p>At <a className='gradientLink' rel="noreferrer" href='https://videso.xyz' target='_blank'>Videso.xyz</a>, we are committed to protecting the privacy of our users. We do not collect any personal information from our users. We believe that decentralized technology is the future of video sharing, and we are dedicated to providing our users with a platform that respects their privacy.</p>

                    <p>When you use Videso, you can be assured that your personal information is not being collected, stored, or shared with any third parties. We do not require our users to create accounts or provide any personal information in order to use our platform.</p>

                    <p>We do not track our user&apos;s activity on the platform, and we do not serve targeted ads based on user data. We believe that all users should be able to share and view videos freely, without having to worry about their personal information being collected or used without their consent.</p>

                    <p>In the event that we need to make any changes to this privacy policy, we will update it on this page and notify our users through the platform.</p>

                    <p>If you have any questions or concerns about our privacy policy, please contact us at <a className='gradientLink' rel="noreferrer" href='https://diamondapp.com/Videso' target='_blank'>DiamondApp/u/Videso</a>.</p>
                </div>
            </div>
        </>
    )
}

export default Privacy