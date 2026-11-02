import React from 'react'
import { Grid, Typography } from '@mui/material'
import { withStyles } from 'tss-react/mui';

import styleSecciones from './styleSecciones'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  componentDidCatch(error, info) {
    console.error('Error al renderizar la sección: ', error, info)
    this.setState({ hasError: true })
  }

  render() {
    const { classes } = this.props
    if (this.state.hasError) {
      return (
        <Grid style={{ marginTop: 20 }} size={12}>
          <Typography className={classes.alertWarning} align='center'>
            Algo ha salido mal al mostrar esta sección. Intenta recargar la página.
          </Typography>
        </Grid>
      );
    }
    return this.props.children
  }
}

export default withStyles(ErrorBoundary, styleSecciones);
