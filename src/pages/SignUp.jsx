import React from 'react'
import { useForm } from 'react-hook-form';
import Logo from '../assets/images/Logo.svg'
import Banner from '../assets/images/Banner.png'
import LogIn from './LogIn';




export default function SignUp() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);
  // console.log(errors);

  return (
    <div className='container h-screen flex justify-center items-center space-x-[103px]'>
      <div className='flex flex-col items-center space-y-6'>
        <img src={Logo} alt="Logo" className='w-[300px]'/>
        <img src={Banner} alt="Banner" className='w-[300px]'/>
      </div>
      <div className='flex flex-col items-center space-y-6'>
        <h1 className='text-[24px] font-bold text-brown'>Sign Up Now !</h1>

        <form className='flex flex-col space-y-4 w-[304px]' onSubmit={handleSubmit(onSubmit)}>
          <div className='w-full'>
            <p className='text-brown font-medium w-full'>Name</p>
            <input className='py-3 pl-4 text-sm rounded-xl w-full' 
              type="text" placeholder="請輸入您的暱稱"
              {...register("您的暱稱", {required: true, min: 2, maxLength: 20})} />
          </div>
          <div className='w-full'>
          <p className=' text-brown font-medium w-full'>Email</p>
          <input className='py-3 pl-4 text-sm rounded-xl w-full'
            type="text" placeholder="請輸入 Email" 
            {...register("Email", {required: true, pattern: /^\S+@\S+$/i})} />
          </div>
          <div className='w-full'>
            <p className='text-brown font-medium w-full'>Password</p>
            <input className='py-3 pl-4 text-sm rounded-xl w-full'
              type="password" placeholder="請輸入密碼" 
              {...register("密碼", {required: true, maxLength: 20})} />
          </div>
          <div className='w-full'>
            <p className='text-brown font-medium w-full'>Check Password</p>
            <input className='py-3 pl-4 text-sm rounded-xl w-full'
              type="password" placeholder="請再次輸入密碼" 
              {...register("再次輸入密碼", {required: true, maxLength: 17})} />
          </div>
          <div className='w-full flex flex-col space-y-4 pt-4'>
            <input className='w-[140px] rounded-xl py-2 text-brown text-sm font-medium m-auto bg-primary tracking-widest hover:text-white'
              type="submit" value="註冊"/>
            <input className='w-[140px] rounded-xl py-2 text-brown text-sm font-medium m-auto tracking-widest hover:text-white'
              type="button" value="登入" onClick={() => window.location.href='./login'} />
          </div>
        </form>
      </div>
    </div>
  )
}
