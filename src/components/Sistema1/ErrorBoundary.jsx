import React from 'react'
import { Grid, Typography } from '@mui/material'
import { withStyles } from 'tss-react/mui';

import styleSecciones from './styleSecciones'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, seccion: props.seccion, timer: null }
  }

  componentDidCatch(error, info) {
    console.log('info: ', info)
    console.log('error: ', error)
    // console.log('seccion: ', this.state.seccion)
    // Display fallback UI
    this.setState({ hasError: true })
    // You can also log the error to an error reporting service

    // logErrorToMyService(error, info)
  }

  // componentDidMount() {
  // 	let timer = setTimeout(() => {
  // 		window.location.reload()
  // 	}, 3000)
  // 	this.setState({ timer })
  // }
  // componentWillUnmount() {
  // 	let timer = this.state.timer
  // 	clearTimeout(timer)
  // }

  render() {
    const { classes } = this.props
    if (this.state.hasError) {
      return (
        <Grid style={{ marginTop: 20 }} size={12}>
          <Typography className={classes.alertWarning} align='center'>
            Algo ha salido mal... espera unos segundos el navegador se refrescará en 3 segundos.
          </Typography>
        </Grid>
      );
    }
    return this.props.children
  }
}

export default withStyles(ErrorBoundary, styleSecciones);
