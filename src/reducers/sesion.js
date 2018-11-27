const INITIAL_STATE = {
    sesion: {
        authenticated: false,
        currentUser: null
    }
};


const sesionReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "GET_USER":
            return this.state.sesion.currentUser;
        case "SET_SESION":
            let s = {
                sesion: action.sesion
            };
            return s;

        case "REMOVE_SESION":
            return INITIAL_STATE;
        default :
            return state;
    }
};

export default sesionReducer;