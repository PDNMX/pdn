import React from 'react';
import pndRoutes from './routes/index';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import P404 from './components/P404';
//import createMuiTheme from "@material-ui/core/es/styles/createMuiTheme";
import {createMuiTheme, MuiThemeProvider} from "@material-ui/core/styles";
//import MuiThemeProvider from "@material-ui/core/es/styles/MuiThemeProvider";


const theme = createMuiTheme({
    palette: {
        primary: {
            main:'#295c53',
            light:'#56897f',
            dark:'#00322b'
        },
        secondary: {
            main: '#8fe19f',
            light: "#c1ffd0",
            dark:'#5eaf70'
        },
        fontLight:{
            color: "#f5f5f5"//"#e0e0e0"
        }
    },
    overrides:{
        MuiTableHead:{
            root:{
                backgroundColor: '#8fe19f'
            }
        }
    }

});

const p404 = () => {
    return <P404/>
};

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <MuiThemeProvider theme={theme}>
            <Router>
                <Switch>
                    {pndRoutes.map((prop, key) => {
                        return <Route exact path={prop.path} component={prop.component}  key={key} />;
                    })}
                    <Route render={p404}/>
                </Switch>
            </Router>
            </MuiThemeProvider>
        );
    }
}

export default App;
