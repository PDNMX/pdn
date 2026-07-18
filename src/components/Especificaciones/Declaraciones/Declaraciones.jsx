import React from 'react'
import PropTypes from 'prop-types'
import withStyles from '@mui/styles/withStyles'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import DescripcionEstandar from './DescripcionEstandar'
import Licencia from '../Licencia'
import Recomendaciones from './Recomendaciones'
import { Paper } from '@mui/material'
import Herramientas from '../Herramientas'
import pdnRoutes from '../../../routes'
import HeaderV2 from '../../HomeV2/HeaderV2'

import styles from '../../style'
import EspecificacionesTecnicas from './EspecificacionesTecnicas'
import ProtocoloConexion from '../ProtocoloConexion'
import ServiceAgreement from '../ServiceAgreement'
class Declaraciones extends React.Component {
  render () {
    const { classes } = this.props
    const section = pdnRoutes.find(route => route.path === '/especificaciones/s1')

    return (
      <>
        <Grid container spacing={0} sx={{
          justifyContent: 'center'
        }}>
          <Grid size={12}>
            <HeaderV2 section={section} />
          </Grid>

          <Grid style={{ maxWidth: 1190, marginTop: 50, marginBottom: 50 }} size={12}>
            <Paper className={classes.paper_search} elevation={15}>
              <div style={{ maxWidth: 900, paddingTop: '50px', paddingBottom: '50px', margin: '0 auto' }}>
                <DescripcionEstandar />

                <Divider className={classes.divider} />

                <Recomendaciones />

                <Divider className={classes.divider} />

                <EspecificacionesTecnicas />

                <Divider className={classes.divider} />

                <ProtocoloConexion urlPlan='https://drive.google.com/open?id=1HZailvIOV77By1JwQKWXGTungYRBFmHi' />

                <Divider className={classes.divider} />

                <ServiceAgreement />

                <Divider className={classes.divider} />

                <Licencia />

                <Divider className={classes.divider} />

                <Herramientas />
              </div>
            </Paper>
          </Grid>
        </Grid>
        <div className={classes.root}>
          <Grid container spacing={0} className={classes.container} sx={{
            justifyContent: 'center'
          }}>
            <Grid className={classes.item} size={12} />
          </Grid>
        </div>
      </>
    );
  }
}

Declaraciones.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Declaraciones)
