import React from "react";
import pndRoutes from "./routes/index";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import P404 from "./components/P404";
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {esES} from "@mui/material/locale";
import ScrollToTop from "./ScrollToTop";
import "./components/Utils/Header.css";
import {StyledEngineProvider} from '@mui/material/styles';
// Google Analytics
import ReactGA from 'react-ga';
import Layout from "./components/HomeV2/Layout";

import BaseTheme from "./BaseTheme";

ReactGA.initialize('UA-126837818-1');
ReactGA.pageview(window.location.pathname + window.location.search);

const p404 = () => {
  return <P404/>;
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
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
    );
  }
}

export default App;
