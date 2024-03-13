import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './tailwind.css'
import { GlobalStyle } from './styles/global.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GlobalStyle />
    <App />
  </React.StrictMode>,
)
