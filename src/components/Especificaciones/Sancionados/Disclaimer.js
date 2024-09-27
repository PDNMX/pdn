import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Paper } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { Link } from '@mui/material';
import ButtonPDN from '../../Compartidos/ButtonPDN';

import styles from '../../Declaraciones2/style';
const useStyles = makeStyles(styles);

export default function Disclaimer(props) {
  const classes = useStyles();
  return (
    <Dialog open={props.open} onClose={props.handleClose} aria-labelledby='alert-dialog-title' aria-describedby='alert-dialog-description'>
      <Paper className={classes.paper_search} style={{ margin: 0, borderRadius: 0 }}>
        <DialogTitle id='alert-dialog-title' className={classes.text_color}>
          Actualización de los formatos del Sistema de Servidores Públicos y Particulares Sancionados
        </DialogTitle>
        <DialogContent>
          <DialogContentText paragraph id='alert-dialog-description' style={{ textAlign: 'justify' }} className={classes.text_color}>
            En seguimiento a la implementación del Sistema Nacional de Servidores Públicos y Particulares Sancionados (Sistema 3), informamos que se ha publicado una nueva versión de los formatos y documentación relacionada.
          </DialogContentText>
          <DialogContentText paragraph id='alert-dialog-description' style={{ textAlign: 'justify' }} className={classes.text_color}>
            Estos formatos incluyen actualizaciones normativas, un nuevo diccionario de datos, la herramienta de captura y su manual de instalación. Te invitamos a consultar toda la documentación disponible a través del siguiente enlace:          </DialogContentText>
          <DialogContentText paragraph id='alert-dialog-description' style={{ textAlign: 'justify' }} className={classes.text_color}>
            <Link href='https://drive.google.com/drive/folders/1TC4SWXl5SowbECGOai-cYqlSObIxLfDm?usp=sharing' target='_blank' underline='none' className={classes.enlaces}>
            Consultar la documentación actualizada
            </Link>
          </DialogContentText>
          <DialogContentText paragraph id='alert-dialog-description' style={{ textAlign: 'justify' }} className={classes.text_color}>
            Es importante que revises esta nueva versión para asegurar el cumplimiento y correcto registro de la información en el Sistema 3.          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <ButtonPDN onClick={props.handleClose} style={{ color: 'rgba(0, 0, 0, 0.87)' }}>
            Aceptar
          </ButtonPDN>
        </DialogActions>
      </Paper>
    </Dialog>
  );
}
