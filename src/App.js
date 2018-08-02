import React, { Component } from 'react';
import pndRoutes from './routes/index';
import { Switch, Route, Redirect, Router } from "react-router-dom";
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import appStyle from './AppStyle';
import { createBrowserHistory } from "history";


const hist = createBrowserHistory();

const switchRoutes = (
    <Router history={hist}>
        <Switch>
            {pndRoutes.map((prop, key) => {
                return <Route path={prop.path} component={prop.component} key={key} />;
            })}
        </Switch>
    </Router>
);

class App extends React.Component {
    constructor(props) {
        super(props);
        }

  render() {
    return (
        <div className={appStyle.mainPanel} ref="mainPanel">
            <div>
                <Header
                    routes={switchRoutes}
                />
                <div className={appStyle.content}>
                    <div className={appStyle.container}>{switchRoutes}</div>
                </div>
                <Footer/>

            </div>
        </div>

    );
  }
}

export default App;
