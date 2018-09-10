import {connect} from 'react-redux'
import {toogleAcusado} from '../../actions/index'
import AcusadoList from '../../components/Denuncias/FormularioDenuncia/AcusadoLista'

const mapStateToProps = state => ({
    acusados:state.acusados
})

export default connect(
    mapStateToProps,
    null
)(AcusadoList)