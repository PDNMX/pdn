import {  combineReducers } from 'redux';
import listReducer from './listReducer';
import denuncia from './denuncia';


export default combineReducers({
    listReducer: listReducer,
    denunciaReducer :denuncia
})
