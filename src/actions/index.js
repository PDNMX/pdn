import * as types from '../constants/ActionTypes';

let nextAcusadoId = 1;

export const addAcusado = acusado => {
    acusado.id = nextAcusadoId++;
    return (
        {
            type: types.ADD_ACUSADO,
            acusado: acusado
        }
    )

};

export const toogleAcusado = () => ({
    type: types.TOOGLE_ACUSADOS
});