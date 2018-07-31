import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import Home from './components/Home';
import About from './components/About';
import Faq from './components/Faq';

class App extends Component {
  render() {
    return (
        <Router>
            <div>
                <Route exact path={'/'} component={Home}/>
                <Route path={'/about'} component={About}/>
                <Route path={'/faq'} component={Faq}/>
            </div>
        </Router>
    );
  }
}

export default App;
