import React from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import styleSecciones from '../styleSecciones';
import style from '../style';

import CompDomicilio from '../CompDomicilio';
import CompActividadLaboralSectorPublico from '../CompActividadLaboralSectorPublico';
import CompActividadLaboralSectorPrivadoOtro from '../CompActividadLaboralSectorPrivadoOtro';

import {
	domicilioMexico,
	domicilioExtranjero,
	actividadLaboralSectorPublico,
	actividadLaboralSectorPrivadoOtro
} from '../infoReservada';

const useStyles = makeStyles(styleSecciones);
const generalStyle = makeStyles(style);

export default function MenuSuperior(props) {
	const classes = useStyles();
	const general = generalStyle();
	const { data } = props;

	data.domicilioMexico = data.domicilioMexico ? domicilioMexico : '';
	data.domicilioExtranjero = data.domicilioExtranjero ? domicilioExtranjero : '';
	data.actividadLaboralSectorPublico = data.actividadLaboralSectorPublico ? actividadLaboralSectorPublico : '';
	data.actividadLaboralSectorPrivadoOtro = data.actividadLaboralSectorPrivadoOtro
		? actividadLaboralSectorPrivadoOtro
		: '';

	return (
		<Grid container spacing={2} className={classes.rootPrincipal}>
			<Grid item xs={12}>
				<Typography className={classes.tituloSeccion} align="center">
					6. DATOS DE LA PAREJA
				</Typography>
			</Grid>
			<Grid item xs={12}>
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
							<Typography className={classes.cardTitle}>RELACIÓN CON EL DECLARANTE</Typography>
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
							<Typography className={classes.cardTitle}>¿ES DEPENDIENTE ECONÓMICO?</Typography>
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
						<Grid item xs={12} md={4}>
							<Typography className={classes.cardTitle}>NACIONALIDAD</Typography>
							<Typography className={classes.card}>DATO RESERVADO</Typography>
						</Grid>
					</Grid>
				</Paper>
			</Grid>
			<CompDomicilio domicilioMexico={data.domicilioMexico} domicilioExtranjero={data.domicilioExtranjero} />
			<Grid item xs={12}>
				<Paper className={classes.paper}>
					<Grid container spacing={1}>
						<Grid item xs={12}>
							<Typography className={classes.cardTitle} align="center">
								EMPLEO
							</Typography>
						</Grid>
						{data.actividadLaboral.clave === 'NING' ? (
							<Grid item xs={12}>
								<Typography className={general.alertWarning} align="center">
									NO REGISTRO ACTIVIDAD LABORAL
								</Typography>
							</Grid>
						) : (
							<span>
								<CompActividadLaboralSectorPublico
									actividadLaboralSectorPublico={data.actividadLaboralSectorPublico}
									actividadLaboral={data.actividadLaboral.valor}
								/>
								<CompActividadLaboralSectorPrivadoOtro
									actividadLaboralSectorPrivadoOtro={data.actividadLaboralSectorPrivadoOtro}
									actividadLaboral={data.actividadLaboral.valor}
								/>
							</span>
						)}
					</Grid>
				</Paper>
			</Grid>
		</Grid>
	);
}
