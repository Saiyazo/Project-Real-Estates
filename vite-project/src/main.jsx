import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import AdminLogin from './AdminLogin.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename="/multipages">
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/AdminLogin" element={<AdminLogin />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
