import React from 'react'
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import Logo from '../assets/images/Logo.svg'
import Banner from '../assets/images/Banner.png'
import { api, Test } from '../components/API';


export default function LogIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);
  // console.log(errors);

  const url = 'https://todoo.5xcamp.us/users'

  useEffect(() =>{
    
  },[])


  const LogInApi = (email, password) =>{
      axios
      .post(`${url}/sign_in`,{
        "user": {
          "email": `${email}`,
          "password": `${password}`
        }
      })
      .then((res)=>{
        console.log(res)
        swal("登入成功！", "立刻進入 Todo List", "success");
        const { headers: { authorization }, data: { nickname } } = res;
        localStorage.setItem('token', authorization); 
        localStorage.setItem('nickName', nickname)
        window.location.href='./' // 跳轉 Todo -> 跳轉太快
      })
      .catch((err)=>{
        console.log(err.message)
        swal("登入失敗", "請確認是否正確輸入", "error");
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
            <p className=' text-brown font-medium w-full'>Email</p>
            <input className='py-3 pl-4 text-sm rounded-xl w-full'
              type="text" placeholder="請輸入 Email" 
              {...register("Email", {required: true, pattern: /^\S+@\S+$/i})} 
              value={email} onChange={(e)=>{setEmail(e.target.value)}} />
          </div>
          <div className='w-full'>
            <p className='text-brown font-medium w-full'>Password</p>
            <input className='py-3 pl-4 text-sm rounded-xl w-full'
              type="password" placeholder="請輸入密碼" 
              {...register("密碼", {required: true, maxLength: 20})}
              value={password} onChange={(e)=>{setPassword(e.target.value)}} />
          </div>
          <div className='w-full flex flex-col space-y-4 pt-4'>
            <input className='w-[140px] rounded-xl py-2 text-brown text-sm font-medium m-auto bg-primary tracking-widest hover:text-white'
              type="submit" value="登入" onClick={()=>{LogInApi(email,password)}}/>
            <input className='w-[140px] rounded-xl py-2 text-brown text-sm font-medium m-auto tracking-widest hover:text-white'
              type="button" value="註冊" onClick={() => window.location.href='./signup'} />
          </div>
        </form>
      </div>
    </div>
  )
}
