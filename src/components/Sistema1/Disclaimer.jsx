import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Paper, Link } from '@mui/material'
import { makeStyles } from 'tss-react/mui';
import { Link as RouterLink } from 'react-router-dom'
import ButtonPDN from '../Compartidos/ButtonPDN'
const avisoIntegral = 'https://drive.google.com/file/d/1Yotqc3mlHZn56-B8FO6MFMfYVf9x4RZS/view?usp=drive_link';
const avisoSimplificado = 'https://drive.google.com/file/d/1agSv598orLnyRfQmXQthSplWwoXWwDmL/view?usp=drive_link';

import styles from '../style'
const useStyles = makeStyles()(styles);

export default function Disclaimer(props) {
  const { classes } = useStyles()
  return (
    <Dialog open={props.open} onClose={props.handleClose} aria-labelledby='alert-dialog-title' aria-describedby='alert-dialog-description'>
      <Paper className={classes.paper_disclaimer} style={{ margin: 0, borderRadius: 0 }}>
        <DialogTitle id='alert-dialog-title' className={classes.text_color}>
          Plataforma Digital Nacional
        </DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description' style={{ textAlign: 'justify' }} className={classes.text_color} sx={{ marginBottom: '16px' }}>
            Toda la información que se muestra en este Sistema es responsabilidad de quien la genera, concentra y provee a la PDN.
          </DialogContentText>
          <DialogContentText id='alert-dialog-description' style={{ textAlign: 'justify' }} className={classes.text_color} sx={{ marginBottom: '16px' }}>
            Lo anterior se encuentra fundamentado en las{' '}
            <Link href='https://www.dof.gob.mx/nota_detalle.php?codigo=5541802&fecha=23/10/2018' target='_blank' underline='none' className={classes.enlaces} rel='noreferrer'>
              Bases para el Funcionamiento de la Plataforma Digital Nacional
            </Link>{' '}
            (artículos 3, 6, 7 y 8) y en la{' '}
            <Link href='https://www.diputados.gob.mx/LeyesBiblio/pdf/LGRA.pdf' target='_blank' underline='none' className={classes.enlaces} rel='noreferrer'>
              Ley General de Responsabilidades Administrativas
            </Link>{' '}
            (artículos 31 y 32).
          </DialogContentText>
          <DialogContentText id='alert-dialog-description' style={{ textAlign: 'justify' }} className={classes.text_color} sx={{ marginBottom: '16px' }}>
            <Link to='/terminos' className={classes.enlaces}>
              Conoce los términos y condiciones de uso
            </Link>
          </DialogContentText>
          <DialogContentText id='alert-dialog-description' style={{ textAlign: 'justify' }} className={classes.text_color} sx={{ marginBottom: '16px' }}>
            Conoce nuestros Avisos de Privacidad:{' '}
            <Link href={avisoSimplificado} target='_blank' underline='none' className={classes.enlaces}>
              Simplificado
            </Link>{' '}
            e{' '}
            <Link href={avisoIntegral} target='_blank' underline='none' className={classes.enlaces}>
              Integral
            </Link>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <ButtonPDN component={RouterLink} to='/terminos'>
            Términos
          </ButtonPDN>
          <ButtonPDN onClick={props.handleClose}>Aceptar</ButtonPDN>
        </DialogActions>
      </Paper>
    </Dialog>
  )
}
