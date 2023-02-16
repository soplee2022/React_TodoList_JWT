import axios from 'axios';
import { useAuth } from './Context';
// 把 axios 要執行的動作寫在這裡， .then 寫在元件中
const authorization = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIzMTk4Iiwic2NwIjoidXNlciIsImF1ZCI6bnVsbCwiaWF0IjoxNjc2NTQwMDI4LCJleHAiOjE2Nzc4MzYwMjgsImp0aSI6IjEwNmJkYWYxLWJlMzgtNDM1Yi1iMTIxLTg1M2Y0MTFmN2FlNSJ9.T3hbpzr28dQxPrXCz2p8SfD5vRPkrQwe4ViBP7HRFCs"
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
export function LogOutApi (token){
  return (api.delete(`users/sign_out`, {headers:{'Authorization': `${token}`}}))
}