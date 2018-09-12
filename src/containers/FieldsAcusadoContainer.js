import {connect} from 'react-redux'
import FieldsAcusado from '../components/Denuncias/FormularioDenuncia/FieldsAcusado'

const mapDispatchToProps = (dispatch, ownProps) => ({
    addAcusado: (acusado) => dispatch({type: 'ADD_ACUSADO', acusado})
});

export default connect(
    null,
    mapDispatchToProps
)(FieldsAcusado)