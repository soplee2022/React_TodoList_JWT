import React from 'react'
import { useForm } from 'react-hook-form';
import { Route, Routes, BrowserRouter, NavLink, Outlet, useNavigate } from 'react-router-dom'
import { SignUpApi } from '../helpers/API';
import Logo from '../assets/images/Logo.svg'
import Banner from '../assets/images/Banner.png'
import { message } from 'antd';

export default function SignUp() {
  
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = data => {
    const { nickname, email, password, CheckPassword } = data
    SignUpBtn(nickname, email, password);
    console.log(data)
  }

  const navigate = useNavigate();

  function SignUpBtn (nickname, email, password){
    SignUpApi(nickname, email, password)
    .then((res)=>{
      console.log(res)
      swal({
        title: "註冊成功！", 
        text: "為您跳轉至登入頁面", 
        icon:"success",
        })
        .then(() =>{
          navigate('/login')
        });
    })
    .catch((err)=>{
      console.log("err",err)
      swal("註冊失敗", `${(err.response.data.error).toString()}`, "error");
      return
    })
  }

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
          <label className=' text-brown font-medium w-full' htmlFor="nickname">Name</label>
            <input className='py-3 pl-4 text-sm rounded-xl w-full' 
              type="text" placeholder="請輸入您的暱稱" id='nickname'
              {...register("nickname", {
                required: {
                  value: true,
                  message: "此欄位不可空白"
                }, 
                minLength: {
                  value: 2,
                  message: "暱稱長度至少 2 字元"
                }, 
                maxLength: {
                  value: 20,
                  message: "暱稱長度不得超出 20 字元"
                }
                }
                )} />
            <p className=' text-red-600 font-normal text-sm mt-1 w-full'>{errors.nickname?.message}</p>
          </div>
          <div className='w-full'>
            <label className=' text-brown font-medium w-full' htmlFor="email">Email</label>
            <input className='py-3 pl-4 text-sm rounded-xl w-full'
              type="text" placeholder="請輸入 Email" id='email'
              {...register("email", 
              {
                required: {
                  value: true, 
                  message: "此欄位不可空白"},
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "信箱格式有誤"}
              })}/>
            <p className=' text-red-600 font-normal text-sm mt-1 w-full'>{errors.email?.message}</p>
          </div>
          <div className='w-full'>
            <label className='text-brown font-medium w-full' htmlFor="pwd">Password</label>
            <input className='py-3 pl-4 text-sm rounded-xl w-full'
              type="password" placeholder="請輸入密碼" id='pwd' 
              {...register("password", 
              {
                required: {
                  value:true,
                  message: "此欄位不可空白"}, 
                minLength: {
                  value: 6,
                  message: "密碼長度至少 6 字元"
                }
              }
              )}/>
            <p className=' text-red-600 font-normal text-sm mt-1 w-full'>{errors.password?.message}</p>
          </div>
          <div className='w-full'>
            <label className='text-brown font-medium w-full' htmlFor="checkPwd">Password</label>
            <input className='py-3 pl-4 text-sm rounded-xl w-full'
              type="password" placeholder="請輸入密碼" id='checkPwd' 
              {...register("CheckPassword", 
              {
                required: {
                  value:true,
                  message: "此欄位不可空白"}, 
                minLength: {
                  value: 6,
                  message: "密碼長度至少 6 字元"
                },
                validate: (val) => {
                  if (watch('password') !== val) {
                    return "密碼不一致";
                  }
                }
              }
              )}/>
            <p className=' text-red-600 font-normal text-sm mt-1 w-full'>{errors.CheckPassword?.message}</p>
          </div>
          <div className='w-full flex flex-col space-y-4 pt-4'>
            <input className='w-[140px] rounded-xl py-2 text-brown text-sm font-medium m-auto bg-primary tracking-widest hover:text-white'
              type="submit" value="註冊"/>
            <NavLink className='w-[140px] rounded-xl py-2 text-brown text-sm font-medium m-auto tracking-widest hover:text-white text-center' to="/login">登入</NavLink>
          </div>
        </form>
      </div>
    </div>
  )
}
