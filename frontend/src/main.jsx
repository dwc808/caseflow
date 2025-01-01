import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ErrorPage from "./error-page"
import * as React from "react"
import * as ReactDOM from "react-dom/client"
import Root from "./routes/root"
import Home from "./routes/Home"
import Login from "./routes/Login"
import Register from "./routes/Register"
import AddStudent from "./routes/AddStudent"
import AddBlock from "./routes/AddBlock"
import AddStudentsToBlock from './routes/AddStudentsToBlock'
import AddStudentToBlocks from './routes/AddStudentToBlocks'
import Lesson from './routes/Lesson'
import Graph from './routes/Graph'
import Outcomes from './routes/Outcomes'
import Scheduler from './routes/Scheduler'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import axios from 'axios'
import './index.css'
import App from './App.jsx'

axios.defaults.withCredentials = true;

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "addstudents",
        element: <AddStudentsToBlock />
      },
      {
        path: "addtoblock",
        element: <AddStudentToBlocks />
      },
      {
        path: "addstudent",
        element: <AddStudent />
      },
      {
        path: "addblock",
        element: <AddBlock />
      },
      {
        path: "graph",
        element: <Graph />
      },
      {
        path: "scheduler",
        element: <Scheduler />
      },
      {
        path: "outcomes",
        element: <Outcomes />
      },
      {
        path: "lessonplan",
        element: <Lesson />
      }
    ]
  },
  
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
