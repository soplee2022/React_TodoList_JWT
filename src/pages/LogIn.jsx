import React from 'react'
import { useForm } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router-dom'
import { LogInApi } from '../helpers/API';
import { useAuth } from '../helpers/Context';
import swal from 'sweetalert';
import Logo from '../assets/images/Logo.svg'
import Banner from '../assets/images/Banner.png'

export default function LogIn() {
  const { setToken } = useAuth() 
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => {
    const { email, password } = data
    LogInBtn(email, password);
    console.log(data)
  }

  function LogInBtn (email, password){
      LogInApi(email, password)
      .then((res)=>{
        console.log(res)
        swal({
          title: "登入成功！", 
          text: "立刻進入 Todo List", 
          icon:"success",
          })
          .then(() =>{
            navigate('/TodoPage')
          });
        const { headers: { authorization }, data: { nickname } } = res;
        setToken(authorization); //登入拿token,App刷新,使接下來都可以使用token
        localStorage.setItem('token', authorization); 
        localStorage.setItem('nickName', nickname)
        
      })
      .catch((err)=>{
        console.log(err.message)
        swal("登入失敗", `${err.response.data.message}`, "error");
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
        <h1 className='text-[24px] font-bold text-brown'>Start Now</h1>

        <form className='flex flex-col space-y-4 w-[304px]' onSubmit={handleSubmit(onSubmit)}>
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
          <div className='w-full flex flex-col space-y-4 pt-4'>
            <input className='w-[140px] rounded-xl py-2 text-brown text-sm font-medium m-auto bg-primary tracking-widest hover:text-white'
              type="submit" value="登入" />
            <NavLink className='w-[140px] rounded-xl py-2 text-brown text-sm font-medium m-auto tracking-widest hover:text-white text-center' to="/signup">註冊</NavLink>
          </div>
        </form>
      </div>
    </div>
  )
}
