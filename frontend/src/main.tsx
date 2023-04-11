import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import LoginPage from './components/LoginPage'
import NotFoundPage from './components/NotFoundPage'
import RegisterPage from './components/RegisterPage'
import './index.css'
import ColorButtons from './components/ColorButtons'

const router = createBrowserRouter([
    {
        path: "/",
        element: <ColorButtons />,
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
