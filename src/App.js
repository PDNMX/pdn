import React, { Component } from 'react';
import pndRoutes from './routes/index';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';
const p404 = () => {
    return (
        <div style={{padding: '75px'}}>
            <h1>404: Page not found</h1>
        </div>
    )
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
                    return <Route exact path={prop.path} component={prop.component}   />;
                })}
                <Route render={p404}/>
            </Switch>
        </Router>
    );
  }
}

export default App;
