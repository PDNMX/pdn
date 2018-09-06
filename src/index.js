import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import rootReducer from './reducers';

// definimos el estado inicial
const initialState = {
    acusados: [
        {
            id:1,
            text:'Carlos Alberto López Mendoza'
        }
        ]
};
let store = createStore(rootReducer,initialState);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);

registerServiceWorker();
