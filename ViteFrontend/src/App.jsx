import React from 'react'
import './App.css'
import { useContext } from 'react';
import AppContext from '../store/AppContext';
import AuthUser from './components/AuthUser';
import Home from './container/Home'


const App = () => {
  const { user } = useContext(AppContext)

  return (

    user == null ? <AuthUser /> : <Home />

  )
}

export default App;