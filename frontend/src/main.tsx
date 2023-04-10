import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import LoginPage from './components/LoginPage'
import NotFoundPage from './components/NotFoundPage'
import RegisterPage from './components/RegisterPage'
import './index.css'

const router = createBrowserRouter([
    {
        path: "/",
        element: <div>Hello world</div>,
        errorElement: <NotFoundPage/>
    },
    {
        path: "/login",
        element: <LoginPage />,
    },
    {
        path: "/register",
        element: <RegisterPage />,
    }
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
