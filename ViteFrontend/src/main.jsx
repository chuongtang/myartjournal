import React from 'react'
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css'
import App from './App';
import { AppContextProvider } from '../store/AppContext';
import 'virtual:windi.css'; //this imports all the three layers with the order base - components - utilities


ReactDOM.render(
  <React.StrictMode>
    <Router>
      <AppContextProvider>
        <App />
      </AppContextProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
)
