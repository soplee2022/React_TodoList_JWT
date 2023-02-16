import { createContext, useContext } from 'react';

// 建立共用環境 AuthContext ，共用 token 的值
export const AuthContext = createContext();

// 用函式 useAuth() 把 useContext 打包起來
// 當元件要用 token ＆ setToken 時，引入 useAuth() 就能開啟 useContext 環境
export const useAuth = () => useContext(AuthContext);

// createContext -> 建立環境
// useContext -> 開啟環境
// 環境裡的值 -> 寫在 App.jsx(全域) 