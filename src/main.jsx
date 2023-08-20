import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { BrowserRouter } from 'react-router-dom';
import { Routes,Route } from 'react-router-dom';
import Profile from './Components/Profile/Profile';
import { AppProvider } from './Context/Context';
ReactDOM.createRoot(document.getElementById('root')).render(
    <AppProvider>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </AppProvider>

)
