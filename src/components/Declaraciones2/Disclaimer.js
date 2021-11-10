import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import MuiLink from '@mui/material/Link';
import { Link } from 'react-router-dom';

const styles = (theme) => ({
	button: {
		background: '#ffe01b',
		margin: 8
	}
});

const useStyles = makeStyles(styles);

export default function AlertDialog(props) {
	const classes = useStyles();
	return (
		<Dialog
			open={props.open}
			onClose={props.handleClose}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
		>
			<DialogTitle id="alert-dialog-title">Plataforma Digital Nacional</DialogTitle>
			<DialogContent>
				<DialogContentText id="alert-dialog-description" style={{ textAlign: 'justify' }}>
					La totalidad de la información que se muestra en este Sistema es responsabilidad exclusiva de quien
					la genera, concentra y provee a esta Plataforma. Esto está establecido en las{' '}
					<MuiLink
						href="https://www.dof.gob.mx/nota_detalle.php?codigo=5541802&fecha=23/10/2018"
						target="_blanck"
					>
						Bases para el Funcionamiento de la Plataforma Digital Nacional
					</MuiLink>{' '}
					(Artículos: 3, 6, 7 y 8 ) y la{' '}
					<MuiLink href="http://www.diputados.gob.mx/LeyesBiblio/pdf/LGRA_130420.pdf" target="_blanck">
						Ley General de Responsabilidades Administrativas
					</MuiLink>{' '}
					(Artículos: 31 y 32).
				</DialogContentText>
				<DialogContentText id="alert-dialog-description2" style={{ textAlign: 'justify' }}>
					Te invitamos a revisar los{' '}
					<MuiLink component={Link} to="/terminos">
						"Términos y Condiciones de Uso"
					</MuiLink>
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button variant="contained" component={Link} to="/terminos" className={classes.button}>
					Términos
				</Button>
				<Button variant="contained" onClick={props.handleClose} className={classes.button}>
					Aceptar
				</Button>
			</DialogActions>
		</Dialog>
	);
}
