import { combineReducers } from 'redux';
//import reducers ...
import acusados   from './acusados'

const pdnAppReducers = combineReducers(acusados,acusados);

export default acusados
