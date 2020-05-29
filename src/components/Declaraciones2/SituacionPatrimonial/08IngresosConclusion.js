import React from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import styleSecciones from '../styleSecciones';
import { Divider, getMoneda } from '../utils';

import {
	ActividadIndustrial,
	ActividadFinanciera,
	ServiciosProfesionales,
	EnajenacionBienes,
	OtrosIngresos
} from './08Ingresos';

const useStyles = makeStyles(styleSecciones);

export default function({ data }) {
	const classes = useStyles();

	return (
		<Grid container spacing={2} className={classes.rootPrincipal}>
			<Grid item xs={12}>
				<Typography className={classes.tituloSeccion} align="center">
					8. INGRESOS NETOS DEL AÑO EN CURSO A LA FECHA DE CONCLUSIÓN DEL EMPLEO, CARGO O COMISIÓN DEL
					DECLARANTE, PAREJA Y / O DEPENDIENTES ECONÓMICOS
				</Typography>
			</Grid>
			<Grid item xs={12}>
				<Paper className={classes.paper}>
					<Grid container spacing={1}>
						<Grid item xs={12} md={9}>
							<Typography className={classes.cardTitle}>
								I.- REMUNERACIÓN NETA DEL AÑO EN CURSO A LA FECHA DE CONCLUSIÓN DEL EMPLEO, CARGO O
								COMISIÓN DEL DECLARANTE POR SU CARGO PÚBLICO (POR CONCEPTO DE SUELDOS, HONORARI- OS,
								COMPENSACIONES, BONOS Y OTRAS PRESTACIONES) (CANTIDADES NETAS DESPUÉS DE IMPUESTOS)
							</Typography>
						</Grid>
						<Grid item xs={12} md={3}>
							<Typography className={classes.card}>
								{getMoneda(data.remuneracionConclusionCargoPublico.valor)}{' '}
								{data.remuneracionConclusionCargoPublico.moneda}
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
								{getMoneda(data.otrosIngresosConclusionTotal.valor)}{' '}
								{data.otrosIngresosConclusionTotal.moneda}
							</Typography>
						</Grid>
						<Grid item xs={12}>
							<ActividadIndustrial
								actividadIndustialComercialEmpresarial={data.actividadIndustialComercialEmpresarial}
							/>
							<ActividadFinanciera actividadFinanciera={data.actividadFinanciera} />
							<ServiciosProfesionales serviciosProfesionales={data.serviciosProfesionales} />
							<EnajenacionBienes enajenacionBienes={data.enajenacionBienes} />
							<OtrosIngresos otrosIngresos={data.otrosIngresos} />
						</Grid>
						<Divider />
						<Grid item xs={12} md={9}>
							<Typography className={classes.cardTitle}>
								A.- INGRESOS DEL DECLARANTE DEL AÑO EN CURSO A LA FECHA DE CONCLUSIÓN DEL EMPLEO, CARGO
								O COMISIÓN(SUMA DEL NUMERAL I Y II)
							</Typography>
						</Grid>
						<Grid item xs={12} md={3}>
							<Typography className={classes.card}>
								{getMoneda(data.ingresoConclusionNetoDeclarante.valor)}{' '}
								{data.ingresoConclusionNetoDeclarante.moneda}
							</Typography>
						</Grid>

						<Grid item xs={12} md={9}>
							<Typography className={classes.cardTitle}>
								B.- INGRESOS DEL AÑO EN CURSO A LA FECHA DE CONCLUSIÓN DEL EMPLEO, CARGO O COMISIÓN DE
								LA PAREJA Y / O DEPENDIENTES ECONÓMICOS (DESPUÉS DE IMPUESTOS)
							</Typography>
						</Grid>
						<Grid item xs={12} md={3}>
							<Typography className={classes.cardReserved}>DATO RESERVADO</Typography>
						</Grid>

						<Grid item xs={12} md={9}>
							<Typography className={classes.cardTitle}>
								C.- TOTAL DE INGRESOS NETOS DEL AÑO EN CURSO A LA FECHA DE CONCLUSIÓN DEL EMPLEO, CARGO
								O COMISIÓN PERCIBIDOS POR EL DECLARANTE, PAREJA Y / O DEPENDIENTES ECONÓMICOS (SUMA DE
								LOS APARTADOS A Y B)
							</Typography>
						</Grid>
						<Grid item xs={12} md={3}>
							<Typography className={classes.card}>
								{getMoneda(data.totalIngresosConclusionNetos.valor)}{' '}
								{data.totalIngresosConclusionNetos.moneda}
							</Typography>
						</Grid>
					</Grid>
				</Paper>
			</Grid>
		</Grid>
	);
}
