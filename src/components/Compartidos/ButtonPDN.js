import React from 'react';
import withStyles from '@mui/styles/withStyles';
import { Button } from '@mui/material';

const styles = theme => ({
  btnPDN: {
    'margin': 0,
    'background': 'rgb(255,255,255,0.5)',
    'borderRadius': '50px',
    'fontWeight': 'bold',
    'fontStyle': 'italic',
    '&:hover': {
      backgroundColor: '#56a3bf'
    }
  },
  cover: {
    margin: theme.spacing(1),
    backgroundColor: '#124759',
    opacity: 0.85,
    borderRadius: '50px',
    border: 0,
    padding: 0
  }
});

const ButtonPDN = props => {
  const { classes } = props;
  return (
    <span className={classes.cover}>
      <Button {...props} variant={'contained'} className={classes.btnPDN} />
    </span>
  );
};

export default withStyles(styles)(ButtonPDN);
