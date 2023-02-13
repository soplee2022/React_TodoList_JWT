import { useState } from 'react'
import { Route, Routes, BrowserRouter, NavLink, Outlet } from 'react-router-dom'
import LogIn from './pages/LogIn'
import SignUp from './pages/SignUp'
import Todo from './pages/Todo'
import NotFound from './pages/NotFound'

function App() {
  const divStyle = 'bg-primary-light h-screen flex flex-col items-center pb-[50px]';

  return (
    <>
      <div className={divStyle}>
        <BrowserRouter basename='/React_TodoList_JWT'>
        <Routes>
          <Route path="/" element={<Todo />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
