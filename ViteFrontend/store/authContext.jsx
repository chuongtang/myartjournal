import { createContext, useState, useEffect } from 'react';
import netlifyIdentity from 'netlify-identity-widget';


// create global context 
export const AuthContext = createContext({
  user: null,
  login: () => { },
  logout: () => { },
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

  // Convert fullname to initial
  const Initial = user?.user_metadata.full_name?.substring(0, 2); //use first2 letters only

  // ⇩ Random colors for  svg background
  const randomColor = `'%23${Math.random().toString(16).slice(2, 8).padEnd(6, '0')}'`;

  // Create SVG avatar with initial
  const ImgURLstring = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512' style='height:512px%3Bwidth:512px'%3E%3Cpath d='M256 23.05C127.5 23.05 23.05 127.5 23.05 256S127.5 488.9 256 488.9 488.9 384.5 488.9 256 384.5 23.05 256 23.05z' fill=${randomColor}/%3E%3Cg font-family='Arial  Helvetica  sans-serif' font-size='120' font-weight='bold' text-anchor='middle' text-decoration='rgba(255  255  255  1)'%3E%3Ctext stroke='rgba(0  0  0  1)' stroke-width='30' transform='translate(256 300)'%3E%3Ctspan x='0' y='0'%3E${Initial}%3C/tspan%3E%3C/text%3E%3Ctext fill='rgba(255  255  255  1)' transform='translate(256 300)'%3E%3Ctspan x='0' y='0'%3E${Initial}%3C/tspan%3E%3C/text%3E%3C/g%3E%3C/svg%3E`


  const userImgUrl = user?.user_metadata.avatar_url || ImgURLstring;


  // Create context to feed into provider
  const context = { user, login, logout, authReady, userImgUrl }
  // console.log('CONTEXT from PROVIDER', context);

  return (
    <AuthContext.Provider value={context}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext