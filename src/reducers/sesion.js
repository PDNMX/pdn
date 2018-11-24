const INITIAL_STATE = {
    sesion:{
        authenticated : false,
        currentUser:null
    }
};


const sesionReducer = (state = INITIAL_STATE, action) =>{
    switch (action.type) {
        case "GET_USER":
            return;
        case "SET_USER":
            let d = {
                ...state.denuncia,
                [action.name] : action.date
            };
            let obj = {denuncia : d};
            return obj;
        case "REMOVE_USER":
            this.setState({

            });
            return true;
        default :
            return state;

    }
};

export default sesionReducer;