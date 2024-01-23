import React from 'react'
import { withStyles } from '@mui/styles'
import { Typography } from '@mui/material'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import DownloadIcon from '@mui/icons-material/CloudDownload'
import PropTypes from 'prop-types'

import ReactGA from 'react-ga4'

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(3)
  },
  descarga: {
    color: theme.palette.primary.main,
    fontWeight: 500,
    fontSize: 50
  },
  jsonLabel: {
    color: theme.palette.primary.main,
    fontSize: 50
  },
  iconDownload: {
    color: theme.palette.primary.main,
    fontSize: 60,
    padding: theme.spacing(0),
    margin: theme.spacing(0)
  }
})
class Descarga extends React.Component {
  render () {
    const { classes, url, tipoGA } = this.props
    return (
      <div className={classes.root}>
        <Grid
          container
          direction='row'
          justifyContent='center'
          alignItems='stretch'
        >
          <Grid item xs={12} align='center'>
            <Typography className={classes.descarga} variant='h5'>
              Descarga todos los datos
            </Typography>
            <Typography className={classes.jsonLabel} variant='h6'>
              {'{ JSON }'}
            </Typography>
            <IconButton
              href={url}
              target='_blank'
              onClick={() =>
                ReactGA.event({ category: tipoGA, action: 'click' })}
            >
              <DownloadIcon className={classes.iconDownload} />
            </IconButton>
          </Grid>
        </Grid>
      </div>
    )
  }
}

Descarga.propTypes = {
  url: PropTypes.string.isRequired
}

export default withStyles(styles)(Descarga)
