import {connect} from 'react-redux'
import {toogleAcusado} from '../../actions/index'
import AcusadoList from '../../components/Denuncias/FormularioDenuncia/AcusadoLista'

const getVisibleAcusados = acusados =>{
    return acusados
}

const mapStateToProps = state => ({
    acusados: getVisibleAcusados(state.acusados)
})

const mapDispatchToProps = dispatch => ({
    toogleAcusado:()=>dispatch (toogleAcusado())
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AcusadoList)