import axios from 'axios';
import { useAuth } from './Context';
// 把 axios 要執行的動作寫在這裡， .then 寫在元件中
const authorization = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIzMTg0Iiwic2NwIjoidXNlciIsImF1ZCI6bnVsbCwiaWF0IjoxNjc2NDUwNjQ2LCJleHAiOjE2Nzc3NDY2NDYsImp0aSI6IjJhNjFkYzU1LTc0YzItNGNkMy1hMDJmLWEzZjI2YjVkODY1YiJ9.z_iDy2iphJprM3DDr0KP2NrjyhGfXS1MZB0JYNW2SiE';
const config = {headers:{'Authorization': authorization}};


export const api = axios.create({
  baseURL: 'https://todoo.5xcamp.us/',
});

export function LogInApi (email, password){
  return(api.post(`users/sign_in`,{
    "user": {
      "email": `${email}`,
      "password": `${password}`
    }
  }))}

  // LogOut always 401: Token 問題 or 其他？
export function LogOutApi (){
  return (api.delete(`users/sign_out`, config))
}