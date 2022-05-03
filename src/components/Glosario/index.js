import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Fab from '@mui/material/Fab';
import MenuBookTwoToneIcon from '@mui/icons-material/MenuBookTwoTone';

import Busqueda from './busqueda'
import ReactGA from "react-ga";
const useStyles = makeStyles((theme) => ({
    drawerPaper: {
      width: '25%',
      padding: 15,
      background: '#f5f8fb',
      [theme.breakpoints.down('lg')]: {
        width: '80%',
        flexShrink: 0,
      },
    },
    fab: {
      margin: '10px',
      top: 'auto',
      right: 25,
      bottom: 100,
      left: 'auto',
      position: 'fixed',
      background: '#3d6575',
      zIndex: 10,
    }
}));

export default function TemporaryDrawer() {
  const classes = useStyles();
  const [state, setState] = React.useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState(open);
    if (open == true){
      ReactGA.event({ category: 'glosario', action: 'click' })
    }
  };

  return (
      <React.Fragment key='Glosario'>
        {/* <Button variant='contained' className={classes.btnGlosario} onClick={toggleDrawer(true)}>Glosario</Button> */}
        <Fab className={classes.fab} onClick={toggleDrawer(true)} color="primary" aria-label="add" >
          <MenuBookTwoToneIcon style={{ color: "#f5f8fb" }} />
        </Fab>
        <Drawer classes={{ paper: classes.drawerPaper, }} variant="temporary" anchor='right' open={state} onClose={toggleDrawer(false)}>
          <Grid container >
            <Grid item xs={12}>
              <Typography style={{ color: "#55575a"}} variant="h4" gutterBottom> Glosario </Typography>
            </Grid>
            <Grid style={{ height: '100%' }} item xs={12}>
              <Busqueda />
            </Grid>
          </Grid>
        </Drawer>
      </React.Fragment>
  );
}
