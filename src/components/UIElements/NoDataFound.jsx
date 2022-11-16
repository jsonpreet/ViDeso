import clsx from 'clsx'
import React from 'react'
import { Button } from './Button'

export const NoDataFound = ({ text = 'No data found', heading = 'No data found', withImage = false, isCenter = false, isHeading = false, button, isLoginButton = false, isButton = false }) => {
  const loginWithDeso = () => {
    console.log('loginWithDeso')
  }
  return (
    <div
      className={clsx('flex flex-col p-1', {
        'items-center justify-center': isCenter
      })}
    >
      {withImage && (
        <img
          src={`/videso.png`}
          className="mt-20 mb-6 md:w-20"
          alt="Videso Logo"
          draggable={false}
        />
      )}
      {isHeading && (
        <div
          className={clsx('text-2xl mb-4 font-medium', {
            'text-center': isCenter
          })}
        >
          {heading}
        </div>
      )}
      <div
        className={clsx('text-sm mb-2 font-normal', {
          'text-center': isCenter
        })}
      >
        {text}
      </div>
      {isLoginButton && <div className='my-4'><Button variant="primary" size="md" onClick={() => loginWithDeso()}>Sign in</Button></div>}
      {isButton && <div className='my-4'>{button}</div>}
    </div>
  )
}