import {connect} from 'react-redux';
import DatosDenuncia from '../components/Denuncias/FormularioDenuncia/DatosDenuncia';

const mapDispatchToProps = (dispatch, ownProps) => ({
    addAcusado : (acusado) => dispatch({type : 'ADD_ACUSADO', acusado})
});

const mapStateToProps = (state, ownProps) => {
    let newState = {
        acusados : state.fieldsReducer.acusados
    };
    return newState;
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DatosDenuncia)
