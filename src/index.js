import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
/*
ReactDOM.render(
   <Router history={hist}>

        <Switch>
            {pndRoutes.map((prop, key) => {
                return <Route path={prop.path} component={prop.component} key={key} />;
            })}
        </Switch>
    </Router>,
    document.getElementById("root")

);
*/
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
