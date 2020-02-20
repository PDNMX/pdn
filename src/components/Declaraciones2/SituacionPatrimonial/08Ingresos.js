import React from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import styleSecciones from '../styleSecciones';

import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles(styleSecciones);
const sumary = makeStyles((theme) => ({
	root: {
		backgroundColor: '#83dfff',
		textTransform: 'uppercase'
	}
}));
const expansion = makeStyles((theme) => ({
	root: {
		width: '100%'
	},
	heading: {
		fontSize: theme.typography.pxToRem(15),
		fontWeight: theme.typography.fontWeightRegular
	}
}));

export default function MenuSuperior(props) {
	const classes = useStyles();
	const exp = expansion();
	const sum = sumary();
	const { data } = props;

	return (
		<Grid container spacing={2} className={classes.rootPrincipal}>
			<Grid item xs={12}>
				<Typography className={classes.tituloSeccion} align="center">
					8. INGRESOS NETOS DEL DECLARANTE, PAREJA Y/O DEPENDIENTES ECONÓMICOS (SITUACIÓN ACTUAL)
				</Typography>
			</Grid>
			<Grid item xs={12}>
				<Paper className={classes.paper}>
					<Grid container spacing={1}>
						<Grid item xs={12} md={10}>
							<Typography className={classes.cardTitle}>
								I.- REMUNERACIÓN MENSUAL NETA DEL DECLARANTE POR SU CARGO PÚBLICO (POR CONCEPTO DE
								SUELDOS, HONORARIOS, COMPENSACIONES, BONOS Y OTRAS PRESTACIONES) (CANTIDADES NETAS
								DESPUÉS DE IMPUESTOS)
							</Typography>
						</Grid>
						<Grid item xs={12} md={2}>
							<Typography className={classes.card}>
								${data.remuneracionMensualCargoPublico.valor}{' '}
								{data.remuneracionMensualCargoPublico.moneda}
							</Typography>
						</Grid>
					</Grid>
				</Paper>
			</Grid>
			<Grid item xs={12}>
				<Paper className={classes.paper}>
					<Grid container spacing={1}>
						<Grid item xs={12} md={10}>
							<Typography className={classes.cardTitle}>
								II.- OTROS INGRESOS MENSUALES DEL DECLARANTE (SUMA DEL II.1 AL II.4)
							</Typography>
						</Grid>
						<Grid item xs={12} md={2}>
							<Typography className={classes.card}>
								${data.otrosIngresosMensualesTotal.valor} {data.otrosIngresosMensualesTotal.moneda}
							</Typography>
						</Grid>
						<Grid item xs={12}>
							<ExpansionPanel>
								<ExpansionPanelSummary
									classes={sum}
									expandIcon={<ExpandMoreIcon />}
									aria-controls="panel1a-content"
									id="panel1a-header"
								>
									<Grid container spacing={1}>
										<Grid item xs={12} md={10}>
											<Typography className={exp.heading}>
												<strong>
													II.1.- POR ACTIVIDAD INDUSTRIAL, COMERCIAL Y / O EMPRESARIAL
													(DESPUÉS DE IMPUESTOS)
												</strong>
											</Typography>
										</Grid>
										<Grid item xs={12} md={2}>
											<Typography className={exp.heading}>
												<strong>
													${
														data.actividadIndustialComercialEmpresarial.remuneracionTotal
															.valor
													}{' '}
													{
														data.actividadIndustialComercialEmpresarial.remuneracionTotal
															.moneda
													}
												</strong>
											</Typography>
										</Grid>
									</Grid>
								</ExpansionPanelSummary>
								<ExpansionPanelDetails>
									{data.actividadIndustialComercialEmpresarial.actividades.map((act, idx) => {
										return (
											<Grid container key={'act-' + idx}>
												<Grid item xs={12} md={5}>
													<Typography className={classes.cardTitle}>
														NOMBRE O RAZÓN SOCIAL:
													</Typography>
													<Typography className={classes.card}>
														{act.nombreRazonSocial}
													</Typography>
												</Grid>
												<Grid item xs={12} md={5}>
													<Typography className={classes.cardTitle}>
														TIPO DE NEGOCIO:
													</Typography>
													<Typography className={classes.card}>{act.tipoNegocio}</Typography>
												</Grid>
												<Grid item xs={12} md={2}>
													<Typography className={classes.cardTitle}>INGRESO:</Typography>
													<Typography className={classes.card}>
														${act.remuneracion.valor} {act.remuneracion.moneda}
													</Typography>
												</Grid>
											</Grid>
										);
									})}
								</ExpansionPanelDetails>
							</ExpansionPanel>
							<ExpansionPanel>
								<ExpansionPanelSummary
									classes={sum}
									expandIcon={<ExpandMoreIcon />}
									aria-controls="panel1a-content"
									id="panel1a-header"
								>
									<Grid container spacing={1}>
										<Grid item xs={12} md={10}>
											<Typography className={exp.heading}>
												<strong>
													II.2.- POR ACTIVIDAD FINANCIERA (RENDIMIENTOS O GANANCIAS) (DESPUÉS
													DE IMPUESTOS)
												</strong>
											</Typography>
										</Grid>
										<Grid item xs={12} md={2}>
											<Typography className={exp.heading}>
												<strong>
													${data.actividadFinanciera.remuneracionTotal.valor}{' '}
													{data.actividadFinanciera.remuneracionTotal.moneda}
												</strong>
											</Typography>
										</Grid>
									</Grid>
								</ExpansionPanelSummary>
								<ExpansionPanelDetails>
									{data.actividadFinanciera.actividades.map((act, idx) => {
										return (
											<Grid container key={'act-' + idx}>
												<Grid item xs={12} md={10}>
													<Typography className={classes.cardTitle}>
														TIPO DE INSTRUMENTO QUE GENERÓ EL RENDIMIENTO O GANANCIA
													</Typography>
													<Typography className={classes.card}>
														{act.tipoInstrumento.valor}
													</Typography>
												</Grid>
												<Grid item xs={12} md={2}>
													<Typography className={classes.cardTitle}>INGRESO:</Typography>
													<Typography className={classes.card}>
														${act.remuneracion.valor} {act.remuneracion.moneda}
													</Typography>
												</Grid>
											</Grid>
										);
									})}
								</ExpansionPanelDetails>
							</ExpansionPanel>
							<ExpansionPanel>
								<ExpansionPanelSummary
									classes={sum}
									expandIcon={<ExpandMoreIcon />}
									aria-controls="panel1a-content"
									id="panel1a-header"
								>
									<Grid container spacing={1}>
										<Grid item xs={12} md={10}>
											<Typography className={exp.heading}>
												<strong>
													II.3.- POR SERVICIOS PROFESIONALES, CONSEJOS, CONSULTORÍAS Y / O
													ASESORÍAS (DESPUÉS DE IMPUESTOS)
												</strong>
											</Typography>
										</Grid>
										<Grid item xs={12} md={2}>
											<Typography className={exp.heading}>
												<strong>
													${data.serviciosProfesionales.remuneracionTotal.valor}{' '}
													{data.serviciosProfesionales.remuneracionTotal.moneda}
												</strong>
											</Typography>
										</Grid>
									</Grid>
								</ExpansionPanelSummary>
								<ExpansionPanelDetails>
									{data.serviciosProfesionales.servicios.map((serv, idx) => {
										return (
											<Grid container key={'act-' + idx}>
												<Grid item xs={12} md={10}>
													<Typography className={classes.cardTitle}>
														TIPO DE SERVICIO PRESTADO
													</Typography>
													<Typography className={classes.card}>
														{serv.tipoServicio}
													</Typography>
												</Grid>
												<Grid item xs={12} md={2}>
													<Typography className={classes.cardTitle}>INGRESO:</Typography>
													<Typography className={classes.card}>
														${serv.remuneracion.valor} {serv.remuneracion.moneda}
													</Typography>
												</Grid>
											</Grid>
										);
									})}
								</ExpansionPanelDetails>
							</ExpansionPanel>
							<ExpansionPanel>
								<ExpansionPanelSummary
									classes={sum}
									expandIcon={<ExpandMoreIcon />}
									aria-controls="panel1a-content"
									id="panel1a-header"
								>
									<Grid container spacing={1}>
										<Grid item xs={12} md={10}>
											<Typography className={exp.heading}>
												<strong>
													II.4.- OTROS INGRESOS NO CONSIDERADOS A LOS ANTERIORES (DESPUÉS DE
													IMPUESTOS)
												</strong>
											</Typography>
										</Grid>
										<Grid item xs={12} md={2}>
											<Typography className={exp.heading}>
												<strong>
													${data.otrosIngresos.remuneracionTotal.valor}{' '}
													{data.otrosIngresos.remuneracionTotal.moneda}
												</strong>
											</Typography>
										</Grid>
									</Grid>
								</ExpansionPanelSummary>
								<ExpansionPanelDetails>
									{data.otrosIngresos.ingresos.map((ing, idx) => {
										return (
											<Grid container key={'act-' + idx}>
												<Grid item xs={12} md={10}>
													<Typography className={classes.cardTitle}>
														ESPECIFICAR TIPO DE INGRESO (ARRENDAMIENTO, REGALÍA, SORTEOS,
														CONCURSOS, DONACIONES, SEGUROS DE VIDA, ETC.)
													</Typography>
													<Typography className={classes.card}>{ing.tipoIngreso}</Typography>
												</Grid>
												<Grid item xs={12} md={2}>
													<Typography className={classes.cardTitle}>INGRESO:</Typography>
													<Typography className={classes.card}>
														${ing.remuneracion.valor} {ing.remuneracion.moneda}
													</Typography>
												</Grid>
											</Grid>
										);
									})}
								</ExpansionPanelDetails>
							</ExpansionPanel>
						</Grid>
					</Grid>
				</Paper>
			</Grid>
			<Grid item xs={12}>
				<Paper className={classes.paper}>
					<Grid container spacing={1}>
						<Grid item xs={12} md={10}>
							<Typography className={classes.cardTitle}>
								A.- INGRESO MENSUAL NETO DEL DECLARANTE (SUMA DEL NUMERAL I Y II)
							</Typography>
						</Grid>
						<Grid item xs={12} md={2}>
							<Typography className={classes.card}>
								${data.ingresoMensualNetoDeclarante.valor} {data.ingresoMensualNetoDeclarante.moneda}
							</Typography>
						</Grid>

						<Grid item xs={12} md={10}>
							<Typography className={classes.cardTitle}>
								B.- INGRESO MENSUAL NETO DE LA PAREJA Y / O DEPENDIENTES ECONÓMICOS (DESPUÉS DE
								IMPUESTOS)
							</Typography>
						</Grid>
						<Grid item xs={12} md={2}>
							<Typography className={classes.card}>DATO RESERVADO</Typography>
						</Grid>

						<Grid item xs={12} md={10}>
							<Typography className={classes.cardTitle}>
								C.- TOTAL DE INGRESOS MENSUALES NETOS PERCIBIDOS POR EL DECLARANTE, PAREJA Y / O
								DEPENDIENTES ECONÓMICOS (SUMA DE LOS APARTADOS A Y B)
							</Typography>
						</Grid>
						<Grid item xs={12} md={2}>
							<Typography className={classes.card}>
								${data.totalIngresosMensualesNetos.valor} {data.totalIngresosMensualesNetos.moneda}
							</Typography>
						</Grid>
					</Grid>
				</Paper>
			</Grid>
		</Grid>
	);
}
