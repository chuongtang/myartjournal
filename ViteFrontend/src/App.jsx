import React from 'react'
import './App.css'
import { useContext } from 'react';
import AuthContext from '../store/authContext';
import AuthUser from './components/AuthUser';
import Home from './container/Home'


const App = () => {
  const { user } = useContext(AuthContext)

  return (
    
    user==null ? <AuthUser /> : <Home />

  )
}

export default App;