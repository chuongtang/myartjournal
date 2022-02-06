import { useState, useEffect } from 'react'
import logo from './logo.svg'
import './App.css'
import { useContext } from 'react';
import AuthContext from '../store/authContext';
import AuthUser from './components/AuthUser';
import Home from './container/Home'


const App = () => {
  const { user, login, logout, authReady } = useContext(AuthContext)
  console.log('user herer', user)
  return (
    // user ? <Home /> : <Login />
    user==null ? <AuthUser /> : <Home />
    // <p>Body app here {user} {authReady}</p>
  )
}

export default App;