import { useState } from 'react'
import { Route, Routes, BrowserRouter, NavLink, Outlet } from 'react-router-dom'
import LogIn from './pages/LogIn'
import SignUp from './pages/SignUp'
import Todo from './pages/Todo'
import NotFound from './pages/NotFound'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <h1>Vite + React</h1>
          <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
      </div>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Todo />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
