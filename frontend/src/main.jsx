import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './router/router.jsx'

createRoot(document.getElementById('App')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)