import {connect} from 'react-redux'
import {addAcusado} from '../actions/index'
import FieldsAcusado from '../components/Denuncias/FormularioDenuncia/FieldsAcusado'

const mapStateToProps = state => ({
    acusados: state.acusados
});

const mapDispatchToProps = dispatch => ({
    addAcusado:(acusado)=>dispatch (addAcusado(acusado))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FieldsAcusado)