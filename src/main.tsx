import React from 'react'
import ReactDOM from 'react-dom/client'
import { registerSW } from 'virtual:pwa-register'
import { inject } from '@vercel/analytics'
import App from './App'
import './index.css'

// Register Service Worker for full PWA offline support
registerSW({ immediate: true })

// Inject Vercel Analytics
inject()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
