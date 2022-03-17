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

ReactGA.initialize('UA-126837818-1');
ReactGA.pageview(window.location.pathname + window.location.search);

const theme = createTheme({
      typography: {
        useNextVariants: true,
        fontFamily: ['"Roboto"', "sans-serif"].join(","),
      },
      palette: {
        primary: {
          main: "#89d4f2",
          light: "#bdffff",
          dark: "#56a3bf",
        },
        secondary: {
          main: "#ffe01b",
          light: "#ffff5c",
          dark: "#c8af00"
        },
        primario: {
          main: "#0d3b49",
          light: "#3d6575",
          dark: "#001621",
          contrastText: "#ced8db"
        },
        secundario: {
          main: "#3ab0e5",
          light: "#79e2ff",
          dark: "#0081b3",
          contrastText: "#0d3b49"
        },
        text:{
          main:"#ced8db",
          greyColor: '#666666',
          blueColor: '#3ab0e5'
        },
        background:{
          default: "#0d3b49",
          opaque:'#155065',
          hoverBotton: '#56a3bf',
          tableBody: "#f2f2f2"
        },
        azulPDN: "#0081b3",
        yellowColor: "#ffe01b",
        greyColor:"#666666",
        redColor:"#B00020",
        S1:{
          color:"#F29888",
          shade: "#F9CFC8"
        },
        S2:{
          color:"#B25FAC",
          shade: "#EBD6EA"
        },
        S3:{
          color:"#9085DA",
          shade:"#D5D0F1"
        },
        S4:{
          color:"#88BC69"
        },
        S5:{
          color:"#34C9B2"
        },
        S6:{
          color:"#42A5CC",
          shade: "#CFE8F2"
        },
      },

    }
    , esES);

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
        <ThemeProvider theme={theme}>
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
