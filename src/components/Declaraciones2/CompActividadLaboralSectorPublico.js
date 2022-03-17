import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import style from './styleSecciones';

const useStyles = makeStyles(style);

export default function ActividadLaboralSectorPublico(props) {
	const classes = useStyles();
	const { actividadLaboralSectorPublico, actividadLaboral } = props;

	return (
		<Grid item xs={12}>
			{actividadLaboralSectorPublico && (
				<Grid container spacing={1}>
					<Grid item xs={12} md={3}>
						<Typography className={classes.cardTitle}>ACTIVIDAD LABORAL</Typography>
						<Typography className={classes.card}>{actividadLaboral}</Typography>
					</Grid>
					<Grid item xs={12} md={3}>
						<Typography className={classes.cardTitle}>NIVEL/ORDEN DE GOBIERNO</Typography>
						<Typography className={classes.card}>
							{actividadLaboralSectorPublico.nivelOrdenGobierno}
						</Typography>
					</Grid>
					<Grid item xs={12} md={3}>
						<Typography className={classes.cardTitle}>ÁMBITO PÚBLICO</Typography>
						<Typography className={classes.card}>{actividadLaboralSectorPublico.ambitoPublico}</Typography>
					</Grid>
					<Grid item xs={12} md={3}>
						<Typography className={classes.cardTitle}>NOMBRE DEL ENTE PÚBLICO</Typography>
						<Typography className={classes.card}>
							{actividadLaboralSectorPublico.nombreEntePublico}
						</Typography>
					</Grid>
					<Grid item xs={12} md={3}>
						<Typography className={classes.cardTitle}>ÁREA DE ADSCRIPCIÓN</Typography>
						<Typography className={classes.card}>
							{actividadLaboralSectorPublico.areaAdscripcion}
						</Typography>
					</Grid>
					<Grid item xs={12} md={3}>
						<Typography className={classes.cardTitle}>EMPLEO, CARGO O COMISIÓN</Typography>
						<Typography className={classes.card}>
							{actividadLaboralSectorPublico.empleoCargoComision}
						</Typography>
					</Grid>
					<Grid item xs={12} md={3}>
						<Typography className={classes.cardTitle}>ESPECIFIQUE FUNCIÓN PRINCIPAL</Typography>
						<Typography className={classes.card}>
							{actividadLaboralSectorPublico.funcionPrincipal}
						</Typography>
					</Grid>
					<Grid item xs={12} md={3}>
						<Typography className={classes.cardTitle}>SALARIO MENSUAL NETO</Typography>
						<Typography className={classes.card}>
							{actividadLaboralSectorPublico.salarioMensualNeto.valor}{' '}
							{actividadLaboralSectorPublico.salarioMensualNeto.moneda}
						</Typography>
					</Grid>
					<Grid item xs={12} md={3}>
						<Typography className={classes.cardTitle}>FECHA DE INGRESO AL EMPLEO</Typography>
						<Typography className={classes.card}>{actividadLaboralSectorPublico.fechaIngreso}</Typography>
					</Grid>
				</Grid>
			)}
		</Grid>
	);
}
