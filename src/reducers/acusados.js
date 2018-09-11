//import {ADD_ACUSADO, TOOGLE_ACUSADOS} from "../constants/ActionTypes";

const INITIAL_STATE = {
    acusados : []
};

const fieldsReducer = (state = INITIAL_STATE, action) => {
    console.log("state: ", state);

    switch (action.type) {
        case "ADD_ACUSADO":
            console.log("adding acusado", action);

            /*
            return Object.assign({}, state, {
                timestamp: action.data.timestamp
            });
            */

            state.acusados.push(
                {
                    id: action.acusado.id,
                    nombre: action.acusado.nombre,
                    descripcionFisica: action.acusado.descripcionFisica
                }
            );
            return Object.assign({}, state);

        case 'TOOGLE_ACUSADOS':
            return state.map(acusado =>
                acusado
            );
        default:
            return state
    }
};

export default fieldsReducer;