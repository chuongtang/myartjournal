import { createContext, useState, useEffect } from 'react';
import netlifyIdentity from 'netlify-identity-widget';


// create global context 
export const AuthContext = createContext({
  user: null,
  login: () => {},
  logout: () => {},
  authReady: false
})


// Create a Provider to wrap around the app
export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {

    // These are the event listeners from Netlify-Identity
    netlifyIdentity.on('login', (user) => {
      setUser(user)
      netlifyIdentity.close() // close the modal after login
      console.log('login event')
    })
    netlifyIdentity.on('logout', () => {
      setUser(null)
      console.log('logout event')
    })
    netlifyIdentity.on('init', (user) => {
      setUser(user)
      setAuthReady(true)
      console.log('init event')
    })

    // initialise netlify identity connection
    netlifyIdentity.init()

    // Turn of event listeners 
    return () => {
      netlifyIdentity.off('login')
      netlifyIdentity.off('logout')
    }
  }, [])

  const login = () => {
    netlifyIdentity.open()
  }

  const logout = () => {
    netlifyIdentity.logout()
  }

  // Create context to feed into provider
  const context = { user, login, logout, authReady }

  return (
    <AuthContext.Provider value={context}>
      { children }
    </AuthContext.Provider>
  )
}

export default AuthContext