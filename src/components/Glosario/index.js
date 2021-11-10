import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';


import Busqueda from './busqueda'

const useStyles = makeStyles((theme) => ({
    btnGlosario: {
      margin: theme.spacing(1),
      background: '#ffe01b',
    },
    drawerPaper: {
      width: '25%',
      padding: 15,
      [theme.breakpoints.down('lg')]: {
        width: '80%',
        flexShrink: 0,
      },
    },
}));

export default function TemporaryDrawer() {
  const classes = useStyles();
  const [state, setState] = React.useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState(open);
  };

  return (
      <React.Fragment key='Glosario'>
        <Button variant='contained' className={classes.btnGlosario} onClick={toggleDrawer(true)}>Glosario</Button>
        <Drawer classes={{ paper: classes.drawerPaper, }} variant="temporary" anchor='right' open={state} onClose={toggleDrawer(false)}>
          <Grid container >
            <Grid item xs={12}>
              <Typography variant="h4" gutterBottom> Glosario </Typography>
            </Grid>
            <Grid style={{ height: '100%' }} item xs={12}>
              <Busqueda />
            </Grid>
          </Grid>
        </Drawer>
      </React.Fragment>
  );
}
