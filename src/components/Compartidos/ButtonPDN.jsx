import { Button } from '@mui/material'
import { withStyles } from '@mui/styles'

const StyledButton = withStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
    background: '#7a3e7c',
    borderRadius: '50px',
    fontWeight: 'bold',
    fontStyle: 'italic',
    '&:hover': {
      backgroundColor: '#b25fac'
    }
  }
}))(Button)

const ButtonPDN = (props) => {
  return (
    <StyledButton {...props} variant='contained' />
  )
}

export default ButtonPDN
