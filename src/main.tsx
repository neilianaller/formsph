import React from 'react'
import ReactDOM from 'react-dom/client'
import { inject } from '@vercel/analytics' // 1. Import inject
import App from './App'
import './index.css'

inject()
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
