import { combineReducers } from 'redux';
//import reducers ...
import acusados from './acusados';
import listReducer from './listReducer';

export default combineReducers({
    fieldsReducer: acusados,
    listReducer: listReducer
})
