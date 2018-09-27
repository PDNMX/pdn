
const INITIAL_STATE = {
    acusados : []
};

let idAcusado = 0;
const fieldsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "ADD_ACUSADO":
            action.acusado.id = idAcusado++;
            let acusados = [
                ...state.acusados,
                {
                    id : action.acusado.id,
                    nombre : action.acusado.nombre,
                    descripcionFisica : action.acusado.descripcionFisica
                }
            ];
            let ob ={acusados:acusados};
            return ob;
        case 'TOOGLE_ACUSADOS':
            return state.map(acusado =>
                acusado
            );
        default:
            return state
    }
};

export default fieldsReducer;