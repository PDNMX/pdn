import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import styleSecciones from './styleSecciones';
const useStyles = makeStyles(styleSecciones);

export default function CompTransmisor(props) {
	const classes = useStyles();
	const { transmisor } = props;

	return (
		<Grid item xs={12}>
			<Grid container spacing={1}>
				<Grid item xs={12} style={{ textAlign: 'center' }}>
					<Typography className={classes.tituloSubSeccion}>TRANSMISOR(ES)</Typography>
				</Grid>
				<Grid item xs={12} md={2}>
					<Typography className={classes.cardTitle}>TIPO PERSONA</Typography>
				</Grid>
				<Grid item xs={12} md={3}>
					<Typography className={classes.cardTitle}>RFC</Typography>
				</Grid>
				<Grid item xs={12} md={3}>
					<Typography className={classes.cardTitle}>
						NOMBRE O RAZÓN SOCIAL DEL TRANSMISOR DE LA PROPIEDAD
					</Typography>
				</Grid>
				<Grid item xs={12} md={4}>
					<Typography className={classes.cardTitle}>
						RELACIÓN DEL TRANSMISOR DE LA PROPIEDAD CON EL TITULAR
					</Typography>
				</Grid>
				{typeof transmisor !== 'undefined' &&
					transmisor.map((transmisor, idx) => {
						return (
							<Grid item xs={12} key={'ter-' + idx}>
								{transmisor.tipoPersona === 'MORAL' ? (
									<Grid container spacing={1}>
										<Grid item xs={12} md={2}>
											<Typography className={classes.card}>MORAL</Typography>
										</Grid>
										<Grid item xs={12} md={3}>
											<Typography className={classes.card}>{transmisor.rfc}</Typography>
										</Grid>
										<Grid item xs={12} md={3}>
											<Typography className={classes.card}>
												{transmisor.nombreRazonSocial}
											</Typography>
										</Grid>
										<Grid item xs={12} md={4}>
											<Typography className={classes.cardReserved}>DATO RESERVADO</Typography>
										</Grid>
									</Grid>
								) : (
									<Grid container spacing={1}>
										<Grid item xs={12} md={2}>
											<Typography className={classes.card}>FÍSICA</Typography>
										</Grid>
										<Grid item xs={12} md={3}>
											<Typography className={classes.cardReserved}>DATO RESERVADO</Typography>
										</Grid>
										<Grid item xs={12} md={3}>
											<Typography className={classes.cardReserved}>DATO RESERVADO</Typography>
										</Grid>
										<Grid item xs={12} md={4}>
											<Typography className={classes.cardReserved}>DATO RESERVADO</Typography>
										</Grid>
									</Grid>
								)}
							</Grid>
						);
					})}
			</Grid>
		</Grid>
	);
}
