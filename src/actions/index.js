import * as types from '../constants/ActionTypes'
import {TOOGLE_ACUSADOS} from "../constants/ActionTypes";

let nextAcusadoId = 0

export const addAcusado = acusado =>(
    {
        type: types.ADD_ACUSADO,
        acusado: acusado
    }
)

export const toogleAcusado = () =>({
    type: TOOGLE_ACUSADOS
})