import React from "react";
import pndRoutes from "./routes/index";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import P404 from "./components/P404";
import {ThemeProvider} from '@mui/material/styles';
/* import ScrollToTop from "./ScrollToTop";*/
import "./components/Utils/Principal.css";
import {StyledEngineProvider} from '@mui/material/styles';
// Google Analytics
import ReactGA from 'react-ga4';
import Layout from "./components/HomeV2/Layout";

import BaseTheme2023 from "./BaseTheme2023";
import {UserContext} from "./components/Login/UserContext";
import {getUser} from "./components/Login/Auth";

import ScrollToTop from './ScrollToTop';

ReactGA.initialize('G-XWEKXGG46G');
ReactGA.send(window.location.pathname + window.location.search);

const p404 = () => {
  return <P404/>;
};

const App  = props => {
  const [user, setUser] = React.useState({
    loggedIn: false,
    nombres: 'No autenticado'
  });
  const value = {user, setUser};

  //Set user if session exists
  React.useEffect(() => {

    const fetchUser = async () => {
      console.log("Fetching user");
      try {
        const logged_user = await getUser();
        if (logged_user){
          setUser({
            loggedIn: true,
            ...logged_user
          });
        }
      } catch (e){
        console.log(e);
      }
    }

    fetchUser();
  },[]);

  return (
      <UserContext.Provider value={value}>
        <ThemeProvider theme={BaseTheme2023}>
          <StyledEngineProvider injectFirst>
            <Router basename={import.meta.env.BASE_URL}>
            <ScrollToTop />
                <Layout>
                  <Switch>
                    {pndRoutes.map((prop, key) => {
                      return (
                          <Route
                              exact={prop.exact}
                              path={prop.path}
                              key={key}
                              component={prop.component}
                          />
                      )
                    })}
                    <Route component={p404}/>
                  </Switch>
                </Layout>
            </Router>
          </StyledEngineProvider>

        </ThemeProvider>
      </UserContext.Provider>
  );
}

export default App;
