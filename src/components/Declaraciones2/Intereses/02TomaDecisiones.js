import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import styleSecciones from '../styleSecciones';

import DatosReservados from '../DatosReservados';

const useStyles = makeStyles(styleSecciones);

export default function TomaDecisiones(props) {
	const classes = useStyles();

	return (
		<Grid container spacing={2} className={classes.rootPrincipal}>
			<Grid item xs={12}>
				<Typography className={classes.tituloSeccion} align="center">
					2. ¿PARTICIPA EN LA TOMA DE DECISIONES DE ALGUNA DE ESTAS INSTITUCIONES? (HASTA LOS 2 ÚLTIMOS AÑOS)
				</Typography>
			</Grid>
			<Grid item xs={12}>
				<DatosReservados />
			</Grid>
		</Grid>
	);
}
