import React from 'react';
import pndRoutes from './routes/index';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import P404 from './components/P404';
import createMuiTheme from "@material-ui/core/es/styles/createMuiTheme";
import MuiThemeProvider from "@material-ui/core/es/styles/MuiThemeProvider";


const theme = createMuiTheme({
    palette: {
        primary: {
            main:'#00695c',
            ligth:'#439889',
            dark:'#003d33'
        },
        secondary: {
            main: '#00bfa5',
            ligth: "#5df2d6",
            dark:'#008e76'
        },

    },
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
