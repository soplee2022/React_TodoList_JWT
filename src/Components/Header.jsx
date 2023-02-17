import React from 'react';
import { LogOutApi } from '../helpers/API'
import { useAuth } from '../helpers/Context';
import { useNavigate } from 'react-router-dom'
import Logo from '../assets/images/Logo.svg'
import { header } from '../helpers/Style';


export function Header({ nickName }) {
  const { token, setToken } = useAuth();
  const navigate = useNavigate();

  function LogOutBtn (){
    swal({
      title: "請確認", 
      text: "您是否要立即登出", 
      icon:"warning",
      buttons: true,
      dangerMode: true
      })
      .then(() =>{LogOut()});
  }

  function LogOut (){
    LogOutApi(token)
    .then((res) =>{
      console.log(res)
      setToken(null); //將App刷新,token設為無(同時local也設無),使下一位無法繼續使用同組token
      localStorage.removeItem('token'); //local記得一起設定為無,下一次重整才不會有token
      navigate('/login')
    })
    .catch(err => console.log(err))
  }

  return (
    <nav className={header}>
      <img className="w-[300px]" src={Logo} alt="Logo" />
      <div className="flex items-center space-x-6">
        <p className="text-base text-brown font-bold ml-4"> {nickName}'s Todo List</p>
        <input type="button" className="text-brown text-sm bg-primary py-1 px-5  rounded-lg tracking-widest hover:text-white" value="登出"
          onClick={() => { LogOutBtn(); }} />
      </div>
    </nav>);
}
