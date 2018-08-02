import React, { Component } from 'react';
import pndRoutes from './routes/index';
import {BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Faq from './components/Faq';
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
                <Route exact path='/' component={Home}/>
                <Route path='/about' component={About}/>
                <Route path='/faq' component={Faq}/>
               /* {pndRoutes.map((prop, key) => {
                    return <Route path={prop.path} component={prop.component} key={key} />;
                })}
                */
                <Route render={p404}/>
            </Switch>
        </Router>
       /* <div className={appStyle.mainPanel} ref="mainPanel">
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
*/
    );
  }
}

export default App;
