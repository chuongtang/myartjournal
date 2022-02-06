import { useState, useEffect } from 'react'
import logo from './logo.svg'
import './App.css'
import { useContext } from 'react';
import AuthContext from '../store/authContext';
import AuthUser from './components/AuthUser'


const App = () => {
  const { user, login, logout, authReady } = useContext(AuthContext)
  console.log('user herer', user)
  return (
    // user ? <Home /> : <Login />
    user==null ? <AuthUser /> : <p>Great</p>
    // <p>Body app here {user} {authReady}</p>
  )
}

export default App;