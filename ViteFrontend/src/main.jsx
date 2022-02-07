import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App';
import { AuthContextProvider } from '../store/authContext';
import 'virtual:windi.css';


ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
