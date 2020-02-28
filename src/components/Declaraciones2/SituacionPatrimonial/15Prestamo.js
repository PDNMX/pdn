import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import styleSecciones from '../styleSecciones';

import DatosNoRegistrados from '../DatosNoRegistrados';
import DatosReservados from '../DatosReservados';
import Transmisor from '../CompTransmisor';
import { sumary, expansion } from '../utils';
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles(styleSecciones);

export default function(props) {
	const classes = useStyles();
	const { data } = props;

	// const inversiones = data.inversion.filter((i) => i.titular.length === 1 && i.titular[0].clave === 'DEC');

	return (
		<Grid container spacing={2} className={classes.rootPrincipal}>
			<Grid item xs={12}>
				<Typography className={classes.tituloSeccion} align="center">
					15. PRÉSTAMO O COMODATO POR TERCEROS (SITUACIÓN ACTUAL)
				</Typography>
			</Grid>
			<Grid item xs={12}>
				{data.ninguno && <DatosNoRegistrados />}
				{/* {!data.ninguno && inversiones.length ? <Inversiones inversiones={inversiones} /> : <DatosReservados />} */}
			</Grid>
		</Grid>
	);
}
