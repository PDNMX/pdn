import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import styleSecciones from './styleSecciones';
const useStyles = makeStyles(styleSecciones);

export default function CompTercero(props) {
	const classes = useStyles();
	const { tercero } = props;

	return tercero.map((tercero, idx) => {
		return (
			<Grid item xs={12} key={'ter-' + idx}>
				{tercero.tipoPersona === 'MORAL' ? (
					<Grid container space={1}>
						<Grid item xs={12} md={4}>
							<Typography className={classes.cardTitle}>TIPO PERSONA:</Typography>
							<Typography className={classes.card}>MORAL</Typography>
						</Grid>
						<Grid item xs={12} md={4}>
							<Typography className={classes.cardTitle}>NOMBRE DEL TERCERO O TERCEROS</Typography>
							<Typography className={classes.card}>{tercero.nombreRazonSocial}</Typography>
						</Grid>
						<Grid item xs={12} md={4}>
							<Typography className={classes.cardTitle}>RFC</Typography>
							<Typography className={classes.card}>{tercero.rfc}</Typography>
						</Grid>
					</Grid>
				) : (
					<Grid container space={1}>
						<Grid item xs={12} md={4}>
							<Typography className={classes.cardTitle}>TIPO PERSONA:</Typography>
							<Typography className={classes.card}>FÍSICA</Typography>
						</Grid>
						<Grid item xs={12} md={4}>
							<Typography className={classes.cardTitle}>NOMBRE DEL TERCERO O TERCEROS</Typography>
							<Typography className={classes.card}>DATO RESERVADO</Typography>
						</Grid>
						<Grid item xs={12} md={4}>
							<Typography className={classes.cardTitle}>RFC</Typography>
							<Typography className={classes.card}>DATO RESERVADO</Typography>
						</Grid>
					</Grid>
				)}
			</Grid>
		);
	});
}
