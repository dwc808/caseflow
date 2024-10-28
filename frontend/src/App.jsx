import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ViewBlocks from "./ViewBlocks"
import ViewStudents from "./ViewStudents"
import Register from "./Register"
import Login from "./Login"

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <p>Register</p>
      <Register />
      <p>Login</p>
      <Login />
    </>
  )
}

export default App
