import Paper from '@mui/material/Paper'
import { makeStyles } from 'tss-react/mui';
import Grid from '@mui/material/Grid'

import MenuLateral from './MenuLateral'

import Participacion from './Intereses/01Participacion'
import TomaDecisiones from './Intereses/02TomaDecisiones'
import ApoyosBeneficiosPublicos from './Intereses/03ApoyosBeneficiosPublicos'
import Representacion from './Intereses/04Representacion'
import ClientesPrincipales from './Intereses/05ClientesPrincipales'
import BeneficiosPrivados from './Intereses/06BeneficiosPrivados'
import Fideicomisos from './Intereses/07Fideicomisos'
import { Disclaimer } from './utils'

import ErrorBoundary from './ErrorBoundary'
import style from '../style'

const onlyDec = i => i.titular && i.titular.length === 1 && i.titular[0].clave === 'DEC'
const tipoRelacion = i => i.tipoRelacion === 'DECLARANTE'
const esBeneficiarioDeclarante = i => i.beneficiario && i.beneficiario.length === 1 && i.beneficiario[0].clave === 'DC'
const esProgramaDeclarante = i => i.beneficiarioPrograma && i.beneficiarioPrograma.clave === 'DEC'
const todos = () => true

// Returns the filtered items of a section without assuming the section or the
// list exist. API responses omit sections for some declaration types.
const list = (bucket, key, filter) => {
  if (!bucket || bucket.ninguno) return []
  return Array.isArray(bucket[key]) ? bucket[key].filter(filter) : []
}

const count = items => (Array.isArray(items) ? items.length : 0)

const Menu = data => {
  if (!data) return []

  const { participacion, participacionTomaDecisiones, apoyos, representacion, clientesPrincipales, beneficiosPrivados, fideicomisos } = data

  const participacionesDec = list(participacion, 'participacion', onlyDec)
  const participaciones = participacionesDec.length ? participacionesDec : list(participacion, 'participacion', todos)

  return [
    {
      clave: 'PARTICIPACIÓN EN EMPRESAS, SOCIEDADES O ASOCIACIONES',
      valor: count(participaciones)
    },
    {
      clave: '¿PARTICIPA EN LA TOMA DE DECISIONES DE ALGUNA DE ESTAS INSTITUCIONES?',
      valor: count(list(participacionTomaDecisiones, 'participacion', tipoRelacion))
    },
    { clave: 'APOYOS O BENEFICIOS PÚBLICOS', valor: count(list(apoyos, 'apoyo', esProgramaDeclarante)) },
    { clave: 'REPRESENTACIÓN', valor: count(list(representacion, 'representacion', tipoRelacion)) },
    { clave: 'CLIENTES PRINCIPALES', valor: count(list(clientesPrincipales, 'cliente', tipoRelacion)) },
    { clave: 'BENEFICIOS PRIVADOS', valor: count(list(beneficiosPrivados, 'beneficio', esBeneficiarioDeclarante)) },
    { clave: 'FIDEICOMISOS', valor: count(list(fideicomisos, 'fideicomiso', tipoRelacion)) }
  ]
}

// Builds a filtered copy of the interest data. The previous implementation
// mutated the object received through props during render.
const prepararDatos = data => {
  if (!data) return data

  return {
    ...data,
    participacion: data.participacion ? { ...data.participacion, participacion: list(data.participacion, 'participacion', tipoRelacion) } : data.participacion,
    participacionTomaDecisiones: data.participacionTomaDecisiones ? { ...data.participacionTomaDecisiones, participacion: list(data.participacionTomaDecisiones, 'participacion', tipoRelacion) } : data.participacionTomaDecisiones,
    apoyos: data.apoyos ? { ...data.apoyos, apoyo: list(data.apoyos, 'apoyo', esProgramaDeclarante) } : data.apoyos,
    representacion: data.representacion ? { ...data.representacion, representacion: list(data.representacion, 'representacion', tipoRelacion) } : data.representacion,
    clientesPrincipales: data.clientesPrincipales ? { ...data.clientesPrincipales, cliente: list(data.clientesPrincipales, 'cliente', tipoRelacion) } : data.clientesPrincipales,
    beneficiosPrivados: data.beneficiosPrivados ? { ...data.beneficiosPrivados, beneficio: list(data.beneficiosPrivados, 'beneficio', esBeneficiarioDeclarante) } : data.beneficiosPrivados,
    fideicomisos: data.fideicomisos ? { ...data.fideicomisos, fideicomiso: list(data.fideicomisos, 'fideicomiso', tipoRelacion) } : data.fideicomisos
  }
}

const useStyles = makeStyles()(theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.opaque
  }
}));

const styles = makeStyles()(style);

function opcion(valor, data) {
  const { participacion, participacionTomaDecisiones, apoyos, representacion, clientesPrincipales, beneficiosPrivados, fideicomisos } = data

  switch (valor) {
    case 0:
      return <Participacion data={participacion} />
    case 1:
      return <TomaDecisiones data={participacionTomaDecisiones} />
    case 2:
      return <ApoyosBeneficiosPublicos data={apoyos} />
    case 3:
      return <Representacion data={representacion} />
    case 4:
      return <ClientesPrincipales data={clientesPrincipales} />
    case 5:
      return <BeneficiosPrivados data={beneficiosPrivados} />
    case 6:
      return <Fideicomisos data={fideicomisos} />

    default:
      break
  }
}

export default function Intereses({ data, value, setValue }) {
  const { classes } = useStyles()
  const { classes: classes2 } = styles()

  if (!data) return <Disclaimer />

  const prepared = prepararDatos(data)

  return (
    <Paper square className={classes.root}>
      <Grid container spacing={0}>
        <Grid
          className={classes2.menulateral_fondo}
          size={{
            xs: 12,
            md: 2
          }}>
          <MenuLateral value={value} setValue={setValue} opciones={Menu(data)} />
        </Grid>
        <Grid
          size={{
            xs: 12,
            md: 10
          }}>
          <ErrorBoundary>{opcion(value, prepared)}</ErrorBoundary>
        </Grid>
      </Grid>
    </Paper>
  );
}
