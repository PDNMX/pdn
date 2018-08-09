import React from 'react';
import pndRoutes from './routes/index';
import {BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import P404 from './components/P404';

const p404 = () => {
    return <P404/>
};

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Router>
                <Switch>
                    {pndRoutes.map((prop, key) => {
                        return <Route exact path={prop.path} component={prop.component}  key={key} />;
                    })}
                    <Route render={p404}/>
                </Switch>
            </Router>
        );
    }
}

export default App;
