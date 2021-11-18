import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import style from './styleSecciones';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';

const useStyles = makeStyles(style);

export default function ActividadLaboralSectorPrivadoOtro(props) {
	const classes = useStyles();
	const { actividadLaboralSectorPrivadoOtro, actividadLaboral } = props;

	return (
		<Grid item xs={12}>
			{actividadLaboralSectorPrivadoOtro && (
				<Grid container spacing={1}>
					<Grid item xs={12} md={3}>
						<Typography className={classes.cardTitle}>ACTIVIDAD LABORAL</Typography>
						<Typography className={classes.card}>{actividadLaboral}</Typography>
					</Grid>
					<Grid item xs={12} md={3}>
						<Typography className={classes.cardTitle}>
							NOMBRE DE LA EMPRESA, SOCIEDAD O ASOCIACIÓN
						</Typography>
						<Typography className={classes.card}>
							{actividadLaboralSectorPrivadoOtro.nombreEmpresaSociedadAsociacion}
						</Typography>
					</Grid>
					<Grid item xs={12} md={3}>
						<Typography className={classes.cardTitle}>EMPLEO O CARGO</Typography>
						<Typography className={classes.card}>
							{actividadLaboralSectorPrivadoOtro.empleoCargoComision}
						</Typography>
					</Grid>
					<Grid item xs={12} md={3}>
						<Typography className={classes.cardTitle}>RFC</Typography>
						<Typography className={classes.card}>{actividadLaboralSectorPrivadoOtro.rfc}</Typography>
					</Grid>
					<Grid item xs={12} md={3}>
						<Typography className={classes.cardTitle}>FECHA DE INGRESO AL EMPLEO</Typography>
						<Typography className={classes.card}>
							{actividadLaboralSectorPrivadoOtro.fechaIngreso}
						</Typography>
					</Grid>

					<Grid item xs={12} md={3}>
						<Typography className={classes.cardTitle}>SALARIO MENSUAL NETO</Typography>
						<Typography className={classes.card}>
							{actividadLaboralSectorPrivadoOtro.salarioMensualNeto.valor}{' '}
							{actividadLaboralSectorPrivadoOtro.salarioMensualNeto.moneda}
						</Typography>
					</Grid>
					<Grid item xs={12} md={3}>
						<Typography className={classes.cardTitle}>SECTOR AL QUE PERTENECE</Typography>
						<Typography className={classes.card}>
							{actividadLaboralSectorPrivadoOtro.sector.valor}
						</Typography>
					</Grid>
					<Grid item xs={12} md={3}>
						{actividadLaboralSectorPrivadoOtro.proveedorContratistaGobierno === 'DATO RESERVADO' ? (
							<span>
								<Typography className={classes.cardTitle}>
									¿ES PROVEEDOR O CONTRATISTA DEL GOBIERNO?
								</Typography>
								<Typography className={classes.card}>DATO RESERVADO</Typography>
							</span>
						) : actividadLaboralSectorPrivadoOtro.proveedorContratistaGobierno ? (
							<Typography className={classes.cardTitle}>
								<CheckBoxIcon color="primary" />¿ES PROVEEDOR O CONTRATISTA DEL GOBIERNO?
							</Typography>
						) : (
							<Typography className={classes.cardTitle}>
								<CheckBoxOutlineBlankIcon color="error" />¿ES PROVEEDOR O CONTRATISTA DEL GOBIERNO?
							</Typography>
						)}
					</Grid>
				</Grid>
			)}
		</Grid>
	);
}
