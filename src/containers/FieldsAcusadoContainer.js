import {connect} from 'react-redux'
//import {addAcusado} from '../actions/index'
import FieldsAcusado from '../components/Denuncias/FormularioDenuncia/FieldsAcusado'
/*
const mapStateToProps = (state, ownProps) => ({
    acusados: state.acusados
});
*/
const mapDispatchToProps = (dispatch, ownProps) => ({
    addAcusado: (acusado) => dispatch({type: 'ADD_ACUSADO', acusado})//dispatch (addAcusado(acusado))
});

export default connect(
    null,//mapStateToProps,
    mapDispatchToProps
)(FieldsAcusado)