import React from "react";
import pndRoutes from "./routes/index";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import P404 from "./components/P404";
import {ThemeProvider} from '@mui/material/styles';
import ScrollToTop from "./ScrollToTop";
import "./components/Utils/Header.css";
import {StyledEngineProvider} from '@mui/material/styles';
// Google Analytics
import ReactGA from 'react-ga';
import Layout from "./components/HomeV2/Layout";

import BaseTheme from "./BaseTheme";
import {UserContext} from "./components/Login/UserContext";
import {getUser} from "./components/Login/Auth";

ReactGA.initialize('UA-126837818-1');
ReactGA.pageview(window.location.pathname + window.location.search);

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
        <ThemeProvider theme={BaseTheme}>
          <StyledEngineProvider injectFirst>
            <Router basename={process.env.PUBLIC_URL}>
              <ScrollToTop>
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

              </ScrollToTop>
            </Router>
          </StyledEngineProvider>

        </ThemeProvider>
      </UserContext.Provider>
  );
}

export default App;
