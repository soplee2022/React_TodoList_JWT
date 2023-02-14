import axios from 'axios';
// 把 axios 要執行的動作寫在這裡， .then 寫在元件中

export const api = axios.create({
  baseURL: 'https://todoo.5xcamp.us/',
});

export function Test (){
  return console.log(111)
}
