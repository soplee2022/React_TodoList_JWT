import { useState } from 'react'
import { Route, Routes, BrowserRouter, NavLink, Outlet } from 'react-router-dom'
import LogIn from './pages/LogIn'
import SignUp from './pages/SignUp'
import TodoPage from './pages/TodoPage'
import NotFound from './pages/NotFound'
import ProtectedRoute from './Components/ProtectedRoute'
import { AuthContext } from './helpers/Context'
import { divStyle } from './helpers/Style'

function App() {
  const [token, setToken] = useState(null);

  return (
    <>
      <div className={divStyle}>
      <AuthContext.Provider value={{ token, setToken }}>
        <BrowserRouter basename='/React_TodoList_JWT'>
        <Routes>
          {/* token 有值才能造訪 TodoPage */}
          <Route element={<ProtectedRoute />}>
            <Route path="/TodoPage" element={<TodoPage />} />
          </Route>
          <Route path="/" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        </BrowserRouter>
      </AuthContext.Provider>
      </div>
    </>
  )
}

export default App
