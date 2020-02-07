import React from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import style from '../styleSecciones';

const useStyles = makeStyles(style);

export default function MenuSuperior(props) {
	const classes = useStyles();
	const { data } = props;

	return (
		<Grid container spacing={2} className={classes.rootPrincipal}>
			<Grid item xs={12}>
				<Typography className={classes.tituloSeccion} align="center">
					2. DOMICILIO DEL DECLARANTE
				</Typography>
			</Grid>
			{data.domicilioMexico && (
				<Grid item xs={12}>
					<Paper className={classes.paper}>
						<Grid container spacing={1}>
							<Grid item xs={12}>
								<Typography className={classes.cardTitle} align="center">
									DOMICILIO EN MÉXICO
								</Typography>
							</Grid>
							<Grid item xs={12} md={3}>
								<Typography className={classes.cardTitle}>CALLE</Typography>
								<Typography className={classes.card}>DATO RESERVADO</Typography>
							</Grid>
							<Grid item xs={12} md={3}>
								<Typography className={classes.cardTitle}>NÚMERO EXTERIOR</Typography>
								<Typography className={classes.card}>DATO RESERVADO</Typography>
							</Grid>
							<Grid item xs={12} md={3}>
								<Typography className={classes.cardTitle}>NÚMERO INTERIOR</Typography>
								<Typography className={classes.card}>DATO RESERVADO</Typography>
							</Grid>
							<Grid item xs={12} md={3}>
								<Typography className={classes.cardTitle}>COLONIA/LOCALIDAD</Typography>
								<Typography className={classes.card}>DATO RESERVADO</Typography>
							</Grid>
							<Grid item xs={12} md={3}>
								<Typography className={classes.cardTitle}>MUNICIPIO/ALCALDÍA</Typography>
								<Typography className={classes.card}>DATO RESERVADO</Typography>
							</Grid>
							<Grid item xs={12} md={3}>
								<Typography className={classes.cardTitle}>ENTIDAD FEDERATIVA</Typography>
								<Typography className={classes.card}>DATO RESERVADO</Typography>
							</Grid>
							<Grid item xs={12} md={3}>
								<Typography className={classes.cardTitle}>CÓDIGO POSTAL</Typography>
								<Typography className={classes.card}>DATO RESERVADO</Typography>
							</Grid>
						</Grid>
					</Paper>
				</Grid>
			)}
			{data.domicilioExtranjero && (
				<Grid item xs={12}>
					<Paper className={classes.paper}>
						<Grid container spacing={1}>
							<Grid item xs={12}>
								<Typography className={classes.cardTitle} align="center">
									DOMICILIO EN EL EXTRANJERO
								</Typography>
							</Grid>
							<Grid item xs={12} md={3}>
								<Typography className={classes.cardTitle}>CALLE</Typography>
								<Typography className={classes.card}>DATO RESERVADO</Typography>
							</Grid>
							<Grid item xs={12} md={3}>
								<Typography className={classes.cardTitle}>NÚMERO EXTERIOR</Typography>
								<Typography className={classes.card}>DATO RESERVADO</Typography>
							</Grid>
							<Grid item xs={12} md={3}>
								<Typography className={classes.cardTitle}>NÚMERO INTERIOR</Typography>
								<Typography className={classes.card}>DATO RESERVADO</Typography>
							</Grid>
							<Grid item xs={12} md={3}>
								<Typography className={classes.cardTitle}>CIUDAD/LOCALIDAD</Typography>
								<Typography className={classes.card}>DATO RESERVADO</Typography>
							</Grid>
							<Grid item xs={12} md={3}>
								<Typography className={classes.cardTitle}>ESTADO/PROVINCIA</Typography>
								<Typography className={classes.card}>DATO RESERVADO</Typography>
							</Grid>
							<Grid item xs={12} md={3}>
								<Typography className={classes.cardTitle}>PAÍS</Typography>
								<Typography className={classes.card}>DATO RESERVADO</Typography>
							</Grid>
							<Grid item xs={12} md={3}>
								<Typography className={classes.cardTitle}>CÓDIGO POSTAL</Typography>
								<Typography className={classes.card}>DATO RESERVADO</Typography>
							</Grid>
						</Grid>
					</Paper>
				</Grid>
			)}
		</Grid>
	);
}
