import React from 'react'
import pndRoutes from './routes/index'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import P404 from './components/P404'
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles'
import { ThemeProvider as LegacyStylesThemeProvider } from '@mui/styles'
/* import ScrollToTop from "./ScrollToTop"; */
import './components/Utils/Principal.css'
// Google Analytics
import ReactGA from 'react-ga4'
import Layout from './components/HomeV2/Layout'

import BaseTheme2023 from './BaseTheme2023'
import { UserContext } from './components/Login/UserContext'
import { getUser } from './components/Login/Auth'

import ScrollToTop from './ScrollToTop'

ReactGA.initialize('G-XWEKXGG46G')
ReactGA.send({
  hitType: 'pageview',
  page: window.location.pathname + window.location.search,
  title: document.title
})

const App = () => {
  const [user, setUser] = React.useState({
    loggedIn: false,
    nombres: 'No autenticado'
  })
  const value = { user, setUser }

  // Set user if session exists
  React.useEffect(() => {
    const fetchUser = async () => {
      console.log('Fetching user')
      try {
        const logged_user = await getUser()
        if (logged_user) {
          setUser({
            loggedIn: true,
            ...logged_user
          })
        }
      } catch (e) {
        console.log(e)
      }
    }

    fetchUser()
  }, [])

  return (
    <UserContext.Provider value={value}>
      <ThemeProvider theme={BaseTheme2023}>
        <LegacyStylesThemeProvider theme={BaseTheme2023}>
          <StyledEngineProvider injectFirst>
            <Router basename={process.env.BASE_URL}>
              <ScrollToTop />
              <Layout>
                <Routes>
                  {pndRoutes.map((prop, key) => {
                    const Component = prop.component
                    return (
                      <Route
                        path={prop.exact ? prop.path : `${prop.path}/*`}
                        key={key}
                        element={<Component />}
                      />
                    )
                  })}
                  <Route path='*' element={<P404 />} />
                </Routes>
              </Layout>
            </Router>
          </StyledEngineProvider>
        </LegacyStylesThemeProvider>

      </ThemeProvider>
    </UserContext.Provider>
  )
}

export default App
