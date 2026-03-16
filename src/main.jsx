import React from 'react'
import ReactDOM from 'react-dom/client' // لازم السطر ده يكون كدة بالظبط
import App from './App'
import './index.css'

// لاحظ هنا بنستخدم ReactDOM من الـ client
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)