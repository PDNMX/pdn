import React from 'react';
import Paper from '@mui/material/Paper';
import makeStyles from '@mui/styles/makeStyles';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import style from './styleSecciones';

const useStyles = makeStyles(style);

export default function CompDomicilio(props) {
	const classes = useStyles();
	const { domicilioMexico, domicilioExtranjero } = props;

	return (
		<Grid item xs={12}>
			{domicilioMexico && (
				<Paper className={classes.paper}>
					<Grid container spacing={1}>
						<Grid item xs={12}>
							<Typography className={classes.cardTitle} align="center">
								DOMICILIO EN MÉXICO
							</Typography>
						</Grid>
						<Grid item xs={12} md={3}>
							<Typography className={classes.cardTitle}>CALLE</Typography>
							<Typography className={classes.card}>{domicilioMexico.calle}</Typography>
						</Grid>
						<Grid item xs={12} md={3}>
							<Typography className={classes.cardTitle}>NÚMERO EXTERIOR</Typography>
							<Typography className={classes.card}>{domicilioMexico.numeroExterior}</Typography>
						</Grid>
						<Grid item xs={12} md={3}>
							<Typography className={classes.cardTitle}>NÚMERO INTERIOR</Typography>
							<Typography className={classes.card}>{domicilioMexico.numeroInterior}</Typography>
						</Grid>
						<Grid item xs={12} md={3}>
							<Typography className={classes.cardTitle}>COLONIA/LOCALIDAD</Typography>
							<Typography className={classes.card}>{domicilioMexico.coloniaLocalidad}</Typography>
						</Grid>
						<Grid item xs={12} md={3}>
							<Typography className={classes.cardTitle}>MUNICIPIO/ALCALDÍA</Typography>
							<Typography className={classes.card}>{domicilioMexico.municipioAlcaldia.valor}</Typography>
						</Grid>
						<Grid item xs={12} md={3}>
							<Typography className={classes.cardTitle}>ENTIDAD FEDERATIVA</Typography>
							<Typography className={classes.card}>{domicilioMexico.entidadFederativa.valor}</Typography>
						</Grid>
						<Grid item xs={12} md={3}>
							<Typography className={classes.cardTitle}>CÓDIGO POSTAL</Typography>
							<Typography className={classes.card}>{domicilioMexico.codigoPostal}</Typography>
						</Grid>
					</Grid>
				</Paper>
			)}
			{domicilioExtranjero && (
				<Paper className={classes.paper}>
					<Grid container spacing={1}>
						<Grid item xs={12}>
							<Typography className={classes.cardTitle} align="center">
								DOMICILIO EN EL EXTRANJERO
							</Typography>
						</Grid>
						<Grid item xs={12} md={3}>
							<Typography className={classes.cardTitle}>CALLE</Typography>
							<Typography className={classes.card}>{domicilioExtranjero.calle}</Typography>
						</Grid>
						<Grid item xs={12} md={3}>
							<Typography className={classes.cardTitle}>NÚMERO EXTERIOR</Typography>
							<Typography className={classes.card}>{domicilioExtranjero.numeroExterior}</Typography>
						</Grid>
						<Grid item xs={12} md={3}>
							<Typography className={classes.cardTitle}>NÚMERO INTERIOR</Typography>
							<Typography className={classes.card}>{domicilioExtranjero.numeroInterior}</Typography>
						</Grid>
						<Grid item xs={12} md={3}>
							<Typography className={classes.cardTitle}>CIUDAD/LOCALIDAD</Typography>
							<Typography className={classes.card}>{domicilioExtranjero.ciudadLocalidad}</Typography>
						</Grid>
						<Grid item xs={12} md={3}>
							<Typography className={classes.cardTitle}>ESTADO/PROVINCIA</Typography>
							<Typography className={classes.card}>{domicilioExtranjero.estadoProvincia}</Typography>
						</Grid>
						<Grid item xs={12} md={3}>
							<Typography className={classes.cardTitle}>PAÍS</Typography>
							<Typography className={classes.card}>{domicilioExtranjero.pais}</Typography>
						</Grid>
						<Grid item xs={12} md={3}>
							<Typography className={classes.cardTitle}>CÓDIGO POSTAL</Typography>
							<Typography className={classes.card}>{domicilioExtranjero.codigoPostal}</Typography>
						</Grid>
					</Grid>
				</Paper>
			)}
		</Grid>
	);
}
