import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Paper, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import ButtonPDN from '../Compartidos/ButtonPDN';

import styles from './style';
const useStyles = makeStyles(styles);

export default function Disclaimer(props) {
  const classes = useStyles();
  return (
    <Dialog open={props.open} onClose={props.handleClose} aria-labelledby='alert-dialog-title' aria-describedby='alert-dialog-description'>
      <Paper className={classes.paper_search} style={{ margin: 0, borderRadius: 0 }}>
        <DialogTitle id='alert-dialog-title'>
          <Typography paragraph className={classes.text_color}>
            Plataforma Digital Nacional
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description' style={{ textAlign: 'justify' }}>
            <Typography paragraph className={classes.text_color}>
              La totalidad de la información que se muestra en este Sistema es responsabilidad exclusiva de quien la genera, concentra y provee a esta Plataforma. Esto está establecido en las{' '}
              <Link href='https://www.dof.gob.mx/nota_detalle.php?codigo=5541802&fecha=23/10/2018' target='_blank' underline='none' className={classes.enlaces}>
                Bases para el Funcionamiento de la Plataforma Digital Nacional
              </Link>{' '}
              (Artículos: 3, 6, 7 y 8 ) y la{' '}
              <Link href='https://www.diputados.gob.mx/LeyesBiblio/pdf/LGRA.pdf' target='_blank' underline='none' className={classes.enlaces}>
                Ley General de Responsabilidades Administrativas
              </Link>{' '}
              (Artículos: 31 y 32).
            </Typography>
          </DialogContentText>
          <DialogContentText id='alert-dialog-description2' style={{ textAlign: 'justify' }}>
            <Typography paragraph className={classes.text_color}>
              Te invitamos a revisar los{' '}
              <RouterLink to={'/terminos'} className={classes.enlaces}>
                "Términos y Condiciones de Uso"
              </RouterLink>
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <ButtonPDN component={Link} to='/terminos'>
            Términos
          </ButtonPDN>
          <ButtonPDN onClick={props.handleClose}>Aceptar</ButtonPDN>
        </DialogActions>
      </Paper>
    </Dialog>
  );
}
