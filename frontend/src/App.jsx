import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ViewBlocks from "./ViewBlocks"
import ViewStudents from "./ViewStudents"
import Register from "./Register"
import Login from "./Login"
import AddStudent from "./AddStudent"
import AddBlock from "./AddBlock"
import Header from "./Header"
import Footer from "./Footer"

function App() {
  

  return (
    <>
      <Header />
      <p>Add Student</p>
      <AddStudent />
      <p>Add Block</p>
      <AddBlock />
      <Footer />
    </>
  )
}

export default App
