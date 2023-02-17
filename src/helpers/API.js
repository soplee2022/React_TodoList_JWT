import axios from "axios";
import { useAuth } from "./Context";
// 把 axios 要執行的動作寫在這裡， .then 寫在元件中

export const api = axios.create({
  baseURL: "https://todoo.5xcamp.us/",
});

export function SignUpApi(nickname, email, password) {
  return api.post(`users`, {
    user: {
      email,
      nickname,
      password,
    },
  });
}
export function LogInApi(email, password) {
  return api.post(`users/sign_in`, {
    user: {
      email,
      password,
    },
  });
}
export function LogOutApi(token) {
  return api.delete(`users/sign_out`, {
    headers: { Authorization: `${token}` },
  });
}


export function GetTodoApi(token) {
  return api.get(`todos`, {
    headers: { Authorization: `${token}` },
  });
}

export function AddTodoApi(token, content) {
  return api.post(`todos`, {
    headers: { Authorization: `${token}` },
    data: {'todo':{
      content
    }}
  });
}