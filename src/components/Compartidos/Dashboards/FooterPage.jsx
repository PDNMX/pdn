import { Paper, Typography, Link } from '@mui/material'
import { withStyles } from '@mui/styles'

const styles = theme => ({
  paperChart: {
    backgroundColor: '#ffffffa3',
    padding: theme.spacing(2),
    borderRadius: '5px'
  },
  text: {
    color: theme.palette.text.main
  },
  title: {
    color: theme.palette.text.main,
    textAlign: 'center'
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.text.linkColor,
    wordBreak: 'break-word'
  }
})

const FooterPage = (props) => {
  const { classes, dataSet, provider, referenceDate } = props
  return (
    <>
      <Paper elevation={0} className={classes.paperChart}>
        <Typography className={classes.title} variant='h6'>
          Nota
        </Typography>
        <Typography className={classes.text} variant='body2'>
          Los datos utilizados para la realización de estas gráficas fueron tomados de la página
          <Link display='inline' href='https://datos.gob.mx/' target='_blank' className={classes.link} rel='noreferrer'>
            {' datos.gob.mx '}
          </Link>
          y corresponden al conjunto de datos <b>{`"${dataSet}"`}</b> publicado por la <b>{`${provider}`}</b>.
          Fecha de consulta: {`${referenceDate}`}
        </Typography>

      </Paper>
    </>
  )
}

export default withStyles(styles)(FooterPage)
