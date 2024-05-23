import { Paper, Typography } from '@mui/material'
import { withStyles } from '@mui/styles'

const styles = theme => ({
  paperChart: {
    backgroundColor: '#ffffffa3',
    padding: theme.spacing(2),
    textAlign: 'center',
    borderRadius: '5px'
  },
  text: {
    textAlign: 'center',
    color: theme.palette.text.main
  },
  digit: {
    textAlign: 'center',
    color: theme.palette.text.main
  }
})
const GeneralData = (props) => {
  const { classes, digit, text, currency } = props
  return (
    <>
      <Paper elevation={0} className={classes.paperChart}>
        <Typography variant='h3' className={classes.digit}>
          {currency ? '$' : null} {digit ? digit.toLocaleString('en-US') : null}
        </Typography>
        <Typography variant='subtitle' className={classes.text}>
          {text}
        </Typography>
      </Paper>
    </>
  )
}

export default withStyles(styles)(GeneralData)
