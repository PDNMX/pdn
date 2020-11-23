import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import Busqueda from './busqueda'

const drawerWidth = 450;
const useStyles = makeStyles((theme) => ({
    btnGlosario: {
      margin: theme.spacing(1),
      background: '#ffe01b',
    },
    drawerPaper: {
      width: drawerWidth
    },
    /* drawer: {
      [theme.breakpoints.up('sm')]: {
        width: 50,
        flexShrink: 0,
      },
    }, */
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
        <Drawer classes={{ paper: classes.drawerPaper, }} anchor="left"variant="temporary" anchor='right' open={state} onEscapeKeyDown={toggleDrawer(false)} onBackdropClick={toggleDrawer(false)} onClose={toggleDrawer(false)}> <Typography variant="h4" gutterBottom>
          Glosario
          </Typography>
          <Busqueda />
        </Drawer>
      </React.Fragment>
  );
}
