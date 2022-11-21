import React from 'react'
import { NoDataFound } from '../UIElements/NoDataFound'

function Stori() {
    return (
        <>
            <NoDataFound
                isCenter
                withImage
                heading="Enjoy your Stori videos"
                text="Stori is a new way to watch videos on the Deso network"
                isLoginButton={false}
                isHeading={true}
                image='/stori.jpg'
                imageSize='md:w-20 w-20'
            />
        </>
    )
}

export default Stori