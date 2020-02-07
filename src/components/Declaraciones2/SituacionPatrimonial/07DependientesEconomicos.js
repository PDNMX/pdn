import React from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import style from '../styleSecciones';
import { domicilioMexico, domicilioExtranjero } from '../infoReservada';
import CompDomicilio from '../CompDomicilio';

const useStyles = makeStyles(style);

export default function MenuSuperior(props) {
	const classes = useStyles();
	const { data } = props;
	console.log(data);

	return (
		<Grid container spacing={2} className={classes.rootPrincipal}>
			<Grid item xs={12}>
				<Typography className={classes.tituloSeccion} align="center">
					7. DATOS DEL DEPENDIENTE ECONÓMICO
				</Typography>
			</Grid>
			{data.dependienteEconomico.map((dep, index) => {
				return (
					<Grid item xs={12} key={'dep-' + index}>
						<Paper className={classes.paper}>
							<Grid container spacing={1}>
								<Grid item xs={12} md={4}>
									<Typography className={classes.cardTitle}>NOMBRE(S)</Typography>
									<Typography className={classes.card}>DATO RESERVADO</Typography>
								</Grid>
								<Grid item xs={12} md={4}>
									<Typography className={classes.cardTitle}>PRIMER APELLIDO</Typography>
									<Typography className={classes.card}>DATO RESERVADO</Typography>
								</Grid>
								<Grid item xs={12} md={4}>
									<Typography className={classes.cardTitle}>SEGUNDO APELLIDO</Typography>
									<Typography className={classes.card}>DATO RESERVADO</Typography>
								</Grid>
								<Grid item xs={12} md={4}>
									<Typography className={classes.cardTitle}>FECHA DE NACIMIENTO</Typography>
									<Typography className={classes.card}>DATO RESERVADO</Typography>
								</Grid>
								<Grid item xs={12} md={4}>
									<Typography className={classes.cardTitle}>RFC</Typography>
									<Typography className={classes.card}>DATO RESERVADO</Typography>
								</Grid>
								<Grid item xs={12} md={4}>
									<Typography className={classes.cardTitle}>
										PARENTESCO O RELACIÓN CON EL DECLARANTE
									</Typography>
									<Typography className={classes.card}>DATO RESERVADO</Typography>
								</Grid>
								<Grid item xs={12} md={4}>
									<Typography className={classes.cardTitle}>¿ES CIUDADANO EXTRANJERO?</Typography>
									<Typography className={classes.card}>DATO RESERVADO</Typography>
								</Grid>
								<Grid item xs={12} md={4}>
									<Typography className={classes.cardTitle}>CURP</Typography>
									<Typography className={classes.card}>DATO RESERVADO</Typography>
								</Grid>
								<Grid item xs={12} md={4}>
									<Typography className={classes.cardTitle}>
										¿HABITA EN EL DOMICILIO DEL DECLARANTE?
									</Typography>
									<Typography className={classes.card}>DATO RESERVADO</Typography>
								</Grid>
								<Grid item xs={12} md={4}>
									<Typography className={classes.cardTitle}>LUGAR DONDE RESIDE</Typography>
									<Typography className={classes.card}>DATO RESERVADO</Typography>
								</Grid>
								<Grid item xs={12} md={4}>
									<Typography className={classes.cardTitle}>NACIONALIDAD</Typography>
									<Typography className={classes.card}>DATO RESERVADO</Typography>
								</Grid>
								<Grid item xs={12} md={4}>
									<Typography className={classes.cardTitle}>NACIONALIDAD</Typography>
									<Typography className={classes.card}>DATO RESERVADO</Typography>
								</Grid>
							</Grid>
						</Paper>
					</Grid>
				);
			})}
		</Grid>
	);
}
