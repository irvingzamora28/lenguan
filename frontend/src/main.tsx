import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LoginPage from './components/AuthPage/LoginPage'
import NotFoundPage from './components/NotFoundPage'
import RegisterPage from './components/AuthPage/RegisterPage'
import './index.css'
import ColorButtons from './components/ColorButtons'
import DashboardPage from './components/DashboardPage/DashboardPage'

const router = createBrowserRouter([
    {
        path: "/",
        element: <DashboardPage />,
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
