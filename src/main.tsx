import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import DentistProvider from './hooks/useDentistList'


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <DentistProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </DentistProvider>
)
