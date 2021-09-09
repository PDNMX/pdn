import React from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import styleSecciones from '../styleSecciones';
import { Divider, getMoneda } from '../utils';

import {
	ActividadFinanciera,
	ServiciosProfesionales,
	EnajenacionBienes,
	OtrosIngresos
} from './08Ingresos';
import ActividadIndustrial from './08Ingresos/ActividadIndustrial';

import basicModif from './00_basic_modif';

const useStyles = makeStyles(styleSecciones);

export default function ({ data: info, titulo }) {
	const classes = useStyles();

	const data = { ...basicModif.ingresos, ...info };

	return (
		<Grid container spacing={2} className={classes.rootPrincipal}>
			<Grid item xs={12}>
				<Typography className={classes.tituloSeccion} align="center">
					{titulo}
				</Typography>
			</Grid>
			<Grid item xs={12}>
				<Paper className={classes.paper}>
					<Grid container spacing={1}>
						<Grid item xs={12} md={9}>
							<Typography className={classes.cardTitle}>
								I.- REMUNERACIÓN ANUAL NETA DEL DECLARANTE POR SU CARGO PÚBLICO (POR CONCEPTO DE
								SUELDOS, HONORARIOS, COMPENSACIONES, BONOS, AGUINALDOS Y OTRAS PRESTACIONES) (CANTIDADES
								NETAS DESPUÉS DE IMPUESTOS)
							</Typography>
						</Grid>
						<Grid item xs={12} md={3}>
							<Typography className={classes.card}>
								{getMoneda(data.remuneracionAnualCargoPublico.valor)}{' '}
								{data.remuneracionAnualCargoPublico.moneda}
							</Typography>
						</Grid>
						<Divider />
						<Grid item xs={12} md={9}>
							<Typography className={classes.cardTitle}>
								II.- OTROS INGRESOS DEL DECLARANTE (SUMA DEL II.1 AL II.5)
							</Typography>
						</Grid>
						<Grid item xs={12} md={3}>
							<Typography className={classes.card}>
								{getMoneda(data.otrosIngresosAnualesTotal.valor)}{' '}
								{data.otrosIngresosAnualesTotal.moneda}
							</Typography>
						</Grid>
						<Grid item xs={12}>
							<ActividadIndustrial
								actividadIndustrialComercialEmpresarial={data.actividadIndustialComercialEmpresarial||data.actividadIndustrialComercialEmpresarial}
							/>
							<ActividadFinanciera actividadFinanciera={data.actividadFinanciera} />
							<ServiciosProfesionales serviciosProfesionales={data.serviciosProfesionales} />
							<EnajenacionBienes enajenacionBienes={data.enajenacionBienes} />
							<OtrosIngresos otrosIngresos={data.otrosIngresos} />
						</Grid>
						<Divider />
						<Grid item xs={12} md={9}>
							<Typography className={classes.cardTitle}>
								A.- INGRESO ANUAL NETO DEL DECLARANTE (SUMA DEL NUMERAL I Y II)
							</Typography>
						</Grid>
						<Grid item xs={12} md={3}>
							<Typography className={classes.card}>
								{getMoneda(data.ingresoAnualNetoDeclarante.valor)}{' '}
								{data.ingresoAnualNetoDeclarante.moneda}
							</Typography>
						</Grid>

						<Grid item xs={12} md={9}>
							<Typography className={classes.cardTitle}>
								B.- INGRESO ANUAL NETO DE LA PAREJA Y/O DEPENDIENTES ECONÓMICOS (DESPUÉS DE IMPUESTOS)
							</Typography>
						</Grid>
						<Grid item xs={12} md={3}>
							<Typography className={classes.cardReserved}>DATO RESERVADO</Typography>
						</Grid>

						<Grid item xs={12} md={9}>
							<Typography className={classes.cardTitle}>
								C.- TOTAL DE INGRESOS ANUALES NETOS PERCIBIDOS POR EL DECLARANTE, PAREJA Y/O
								DEPENDIENTES ECONÓMICOS (SUMA DE LOS APARTADOS A Y B)
							</Typography>
						</Grid>
						<Grid item xs={12} md={3}>
							<Typography className={classes.card}>
								{getMoneda(data.totalIngresosAnualesNetos.valor)}{' '}
								{data.totalIngresosAnualesNetos.moneda}
							</Typography>
						</Grid>
					</Grid>
				</Paper>
			</Grid>
		</Grid>
	);
}
