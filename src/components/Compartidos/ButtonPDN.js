import React from 'react';
import withStyles from '@mui/styles/withStyles';
import { Button } from '@mui/material';

const styles = theme => ({
  btnPDN: {
    'margin': theme.spacing(1),
    'background': '#9eb1b6',
    'borderRadius': '50px',
    'fontWeight': 'bold',
    'fontStyle': 'italic',
    '&:hover': {
      backgroundColor: '#56a3bf'
    }
  }
});

const ButtonPDN = props => {
  const { classes } = props;
  return (
      <Button {...props} variant={'contained'} className={classes.btnPDN} />
  );
};

export default withStyles(styles)(ButtonPDN);
