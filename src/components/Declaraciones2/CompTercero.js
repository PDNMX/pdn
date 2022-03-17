import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

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
