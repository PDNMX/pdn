import { Button } from '@mui/material'
import { withStyles } from 'tss-react/mui';

const StyledButton = withStyles(Button, (theme) => ({
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
}));

const ButtonPDN = (props) => {
  return (
    <StyledButton {...props} variant='contained' />
  )
}

export default ButtonPDN
