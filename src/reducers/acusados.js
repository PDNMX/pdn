import {ADD_ACUSADO, TOOGLE_ACUSADOS} from "../constants/ActionTypes";

const acusados= (state = [],action)  =>{
    switch (action.type) {
        case ADD_ACUSADO:
            return [
                ...state,
                {
                    id: action.id,
                    text: action.text
                }
            ]
        case TOOGLE_ACUSADOS:
            return state.map(acusado=>
                acusado
            )
        default:
            return state
    }
}

export default acusados;