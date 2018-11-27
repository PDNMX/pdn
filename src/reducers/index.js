import {  combineReducers } from 'redux';
import listReducer from './listReducer';
import denuncia from './denuncia';
import sesion from './sesion';


export default combineReducers({
    listReducer: listReducer,
    denunciaReducer :denuncia,
    sesionReducer : sesion
})
