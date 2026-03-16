import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.jsx';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Routes, Route, Link } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Routes>
      <Route path="/" element={<App />} />
    </Routes>
    <Link to="/">Home</Link>

  </StrictMode>
)
