import * as types from '../constants/ActionTypes';

export const addAcusado = acusado => {
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