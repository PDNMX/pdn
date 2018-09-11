import {ADD_ACUSADO, TOOGLE_ACUSADOS} from "../constants/ActionTypes";

const rootReducer = (state = [], action) => {
    console.log("state: ", state)
    switch (action.type) {
        case ADD_ACUSADO:
            state.acusados.push(
                {
                    id: action.acusado.id,
                    nombre: action.acusado.nombre,
                    descripcionFisica: action.acusado.descripcionFisica
                }
            );
            return state;

        case TOOGLE_ACUSADOS:
            return state.map(acusado =>
                acusado
            );
        default:
            return state
    }
};

export default rootReducer;