import React from 'react';
import pndRoutes from './routes/index';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import P404 from './components/P404';
import {createMuiTheme, MuiThemeProvider} from "@material-ui/core/styles";
import PrivateRoute from "./PrivateRoute";
import app from "./config/firebase";
import LoginPDN from "./components/Inicio/LoginPDN";
import ScrollToTop from './ScrollToTop';
import ReactGA from 'react-ga';
import './components/Utils/Header.css';

const theme = createMuiTheme({
    typography: {
        fontFamily: ["Noto Sans SC", '"Helvetica"', '"Arial"', '"sans-serif"'].join(',')
    },
    palette: {
        primary: {
            main: '#89d4f2',
            light: '#bdffff',
            dark: '#56a3bf'
        },
        secondary: {
            main: '#ffe01b',
            light: "#ffff5c",
            dark: '#c8af00'
        },
        fontLight: {
            color: "#f5f5f5"//"#e0e0e0"
        },
        grey: {
            color: "#c5c5c5"
        },
        titleBanner: {
            color: '#666666'
        },
        graphGreen: {
            color: "#00cc99"
        },
        textPrincipal: {
            color: "#00322b"
        },
        textSecondary: {
            color: "#e6e6e6"
        },
        backLight: {
            color: "#e6e6e6"
        },
        backDark: {
            color: 'rgb(55, 70, 79)'
        },
        textNormal: {
            color: 'rgba(0, 0, 0, 0.87)'
        },
        white: {
            color: "#ffff"
        },
        grisTenue: {
            color: '#f5f5f5'
        },
        azul: {
            color: '#89d4f2'
        },
        black: {
            black: "#000"
        },
        red: {
            color: '#B00020'
        },
        textGrey: {
            color: '#666666'
        },

    },
    /*   overrides:{
           MuiTableHead:{
               root:{
                   backgroundColor: '#8fe19f'
               }
           }
       }
   */
});

const p404 = () => {
    return <P404/>
};


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state={}
    };

    componentWillMount() {
        this.initializeReactGA();
    };




    handleRecovery = (email) => {
        app.auth().sendPasswordResetEmail(email).then(() => {
            this.setState({
                mensaje: 'Se ha enviado un correo a su cuenta. Por favor siga los pasos indicados'
            });
        }).catch(error => {
            console.log("Error con sendPasswordResetEmail ", error);
            this.setState({
                mensaje: error.code === 'auth/invalid-email' ? 'El correo electrónico no es válido' : error.code === 'auth/user-disabled' ? 'El usuario ha sido deshabilitado' : error.code === 'auth/user-not-found' ?
                    'El correo electrónico no esta dado de alta' : 'La contraseña es invalida o la cuenta no tiene una contraseña'
            })
        });
    };

    initializeReactGA = () => {
        ReactGA.initialize('UA-131031213-1');
        ReactGA.pageview('/');
        ReactGA.pageview('/sancionados');
        ReactGA.pageview('/servidores');
    };

    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <Router basename={process.env.PUBLIC_URL}>
                    <ScrollToTop>
                        <Switch>
                            <Route exact path={'/login'}
                                   render={(props) => <LoginPDN />}/>

                            {pndRoutes.map((prop, key) => {
                                    return prop.private ?
                                        <PrivateRoute exact path={prop.path} component={prop.component} key={key}
                                                      perfom={prop.perfom}/> :
                                        <Route exact path={prop.path} component={prop.component} key={key}/>;
                                }
                            )
                            }
                            <Route component={p404}/>
                        </Switch>
                    </ScrollToTop>
                </Router>
            </MuiThemeProvider>
        );
    }
}

export default App;