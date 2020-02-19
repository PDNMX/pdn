import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import style from '../styleSecciones';
import DatosReservados from '../DatosReservados';

const useStyles = makeStyles(style);

export default function MenuSuperior() {
	const classes = useStyles();

	return (
		<Grid container spacing={2} className={classes.rootPrincipal}>
			<Grid item xs={12}>
				<Typography className={classes.tituloSeccion} align="center">
					2. DOMICILIO DEL DECLARANTE
				</Typography>
			</Grid>
			<Grid item xs={12}>
				<DatosReservados />
			</Grid>			
		</Grid>
	);
}