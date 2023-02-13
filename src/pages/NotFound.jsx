import React from 'react'
import Page404 from '../assets/images/404.svg'

export default function NotFound() {
  return (
    <div className='flex flex-col justify-center items-center h-screen space-y-14'>
      <img src={Page404} alt="" />
      <input type="button" value="回到登入頁" className='w-[140px] rounded-xl py-3 text-white text-sm font-medium bg-brown tracking-widest' onClick={() => window.location.href='./login'} />
    </div>
  )
}
