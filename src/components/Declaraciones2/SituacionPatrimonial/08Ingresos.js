import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import IngresosInicial from './08IngresosInicial';
import IngresosModificacion from './08IngresosModificacion';
import IngresosConclusion from './08IngresosConclusion';

import styleSecciones from '../styleSecciones';
import { sumary, expansion, getMoneda } from '../utils';

import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { info } from '../utils';

const useStyles = makeStyles(styleSecciones);

export function ActividadIndustrial({ actividadIndustialComercialEmpresarial }) {
	const classes = useStyles();
	const exp = expansion();
	const sum = sumary();

	return (
		<ExpansionPanel>
			<ExpansionPanelSummary
				classes={sum}
				expandIcon={<ExpandMoreIcon />}
				aria-controls="panel1a-content"
				id="panel1a-header"
			>
				<Grid container spacing={1}>
					<Grid item xs={12} md={9}>
						<Typography className={exp.heading}>
							<strong>
								II.1.- POR ACTIVIDAD INDUSTRIAL, COMERCIAL Y/O EMPRESARIAL (DESPUÉS DE IMPUESTOS)
							</strong>
						</Typography>
					</Grid>
					<Grid item xs={12} md={3}>
						<Typography className={exp.heading}>
							<strong>
								{getMoneda(actividadIndustialComercialEmpresarial.remuneracionTotal.valor)}{' '}
								{actividadIndustialComercialEmpresarial.remuneracionTotal.moneda}
							</strong>
						</Typography>
					</Grid>
				</Grid>
			</ExpansionPanelSummary>
			<ExpansionPanelDetails>
				<Grid container spacing={1}>
					<Grid item xs={12} md={5}>
						<Typography className={classes.cardTitle}>NOMBRE O RAZÓN SOCIAL:</Typography>
					</Grid>
					<Grid item xs={12} md={4}>
						<Typography className={classes.cardTitle}>TIPO DE NEGOCIO:</Typography>
					</Grid>
					<Grid item xs={12} md={3}>
						<Typography className={classes.cardTitle}>INGRESO:</Typography>
					</Grid>
					{actividadIndustialComercialEmpresarial.actividades.map((act, idx) => {
						return (
							<Grid container spacing={1} key={'act-' + idx}>
								<Grid item xs={12} md={5}>
									<Typography className={classes.card}>{act.nombreRazonSocial}</Typography>
								</Grid>
								<Grid item xs={12} md={4}>
									<Typography className={classes.card}>{act.tipoNegocio}</Typography>
								</Grid>
								<Grid item xs={12} md={3}>
									<Typography className={classes.card}>
										{getMoneda(act.remuneracion.valor)} {act.remuneracion.moneda}
									</Typography>
								</Grid>
							</Grid>
						);
					})}
				</Grid>
			</ExpansionPanelDetails>
		</ExpansionPanel>
	);
}

export function ActividadFinanciera({ actividadFinanciera }) {
	const classes = useStyles();
	const exp = expansion();
	const sum = sumary();

	return (
		<ExpansionPanel>
			<ExpansionPanelSummary
				classes={sum}
				expandIcon={<ExpandMoreIcon />}
				aria-controls="panel1a-content"
				id="panel1a-header"
			>
				<Grid container spacing={1}>
					<Grid item xs={12} md={9}>
						<Typography className={exp.heading}>
							<strong>
								II.2.- POR ACTIVIDAD FINANCIERA (RENDIMIENTOS O GANANCIAS) (DESPUÉS DE IMPUESTOS)
							</strong>
						</Typography>
					</Grid>
					<Grid item xs={12} md={3}>
						<Typography className={exp.heading}>
							<strong>
								{getMoneda(actividadFinanciera.remuneracionTotal.valor)}{' '}
								{actividadFinanciera.remuneracionTotal.moneda}
							</strong>
						</Typography>
					</Grid>
				</Grid>
			</ExpansionPanelSummary>
			<ExpansionPanelDetails>
				<Grid container spacing={1}>
					<Grid item xs={12} md={9}>
						<Typography className={classes.cardTitle}>
							TIPO DE INSTRUMENTO QUE GENERÓ EL RENDIMIENTO O GANANCIA
						</Typography>
					</Grid>
					<Grid item xs={12} md={3}>
						<Typography className={classes.cardTitle}>INGRESO:</Typography>
					</Grid>
					{actividadFinanciera.actividades.map((act, idx) => {
						return (
							<Grid container spacing={1} key={'act-' + idx}>
								<Grid item xs={12} md={9}>
									<Typography className={classes.card}>{act.tipoInstrumento.valor}</Typography>
								</Grid>
								<Grid item xs={12} md={3}>
									<Typography className={classes.card}>
										{getMoneda(act.remuneracion.valor)} {act.remuneracion.moneda}
									</Typography>
								</Grid>
							</Grid>
						);
					})}
				</Grid>
			</ExpansionPanelDetails>
		</ExpansionPanel>
	);
}

export function ServiciosProfesionales({ serviciosProfesionales }) {
	console.log('serviciosProfesionales: ', serviciosProfesionales);
	const classes = useStyles();
	const exp = expansion();
	const sum = sumary();

	return (
		<ExpansionPanel>
			<ExpansionPanelSummary
				classes={sum}
				expandIcon={<ExpandMoreIcon />}
				aria-controls="panel1a-content"
				id="panel1a-header"
			>
				<Grid container spacing={1}>
					<Grid item xs={12} md={9}>
						<Typography className={exp.heading}>
							<strong>
								II.3.- POR SERVICIOS PROFESIONALES, CONSEJOS, CONSULTORÍAS Y/O ASESORÍAS (DESPUÉS DE
								IMPUESTOS)
							</strong>
						</Typography>
					</Grid>
					<Grid item xs={12} md={3}>
						<Typography className={exp.heading}>
							<strong>
								{getMoneda(serviciosProfesionales.remuneracionTotal.valor)}{' '}
								{serviciosProfesionales.remuneracionTotal.moneda}
							</strong>
						</Typography>
					</Grid>
				</Grid>
			</ExpansionPanelSummary>
			<ExpansionPanelDetails>
				<Grid container spacing={1}>
					<Grid item xs={12} md={9}>
						<Typography className={classes.cardTitle}>TIPO DE SERVICIO PRESTADO</Typography>
					</Grid>
					<Grid item xs={12} md={3}>
						<Typography className={classes.cardTitle}>INGRESO:</Typography>
					</Grid>
					{serviciosProfesionales.servicios.map((serv, idx) => {
						return (
							<Grid container spacing={1} key={'act-' + idx}>
								<Grid item xs={12} md={9}>
									<Typography className={classes.card}>{serv.tipoServicio}</Typography>
								</Grid>
								<Grid item xs={12} md={3}>
									<Typography className={classes.card}>
										{getMoneda(serv.remuneracion.valor)} {serv.remuneracion.moneda}
									</Typography>
								</Grid>
							</Grid>
						);
					})}
				</Grid>
			</ExpansionPanelDetails>
		</ExpansionPanel>
	);
}

export function EnajenacionBienes({ enajenacionBienes }) {
	const classes = useStyles();
	const exp = expansion();
	const sum = sumary();

	return (
		<ExpansionPanel>
			<ExpansionPanelSummary
				classes={sum}
				expandIcon={<ExpandMoreIcon />}
				aria-controls="panel1a-content"
				id="panel1a-header"
			>
				<Grid container spacing={1}>
					<Grid item xs={12} md={9}>
						<Typography className={exp.heading}>
							<strong>II.4.- POR ENAJENACIÓN DE BIENES (DESPUÉS DE IMPUESTOS)</strong>
						</Typography>
					</Grid>
					<Grid item xs={12} md={3}>
						<Typography className={exp.heading}>
							<strong>
								{getMoneda(enajenacionBienes.remuneracionTotal.valor)}{' '}
								{enajenacionBienes.remuneracionTotal.moneda}
							</strong>
						</Typography>
					</Grid>
				</Grid>
			</ExpansionPanelSummary>
			<ExpansionPanelDetails>
				<Grid container spacing={1}>
					<Grid item xs={12} md={9}>
						<Typography className={classes.cardTitle}>TIPO DE BIEN ENAJENADO</Typography>
					</Grid>
					<Grid item xs={12} md={3}>
						<Typography className={classes.cardTitle}>INGRESO:</Typography>
					</Grid>
					{enajenacionBienes.bienes.map((ing, idx) => {
						return (
							<Grid container spacing={1} key={'act-' + idx}>
								<Grid item xs={12} md={9}>
									<Typography className={classes.card}>{ing.tipoBienEnajenado}</Typography>
								</Grid>
								<Grid item xs={12} md={3}>
									<Typography className={classes.card}>
										{getMoneda(ing.remuneracion.valor)} {ing.remuneracion.moneda}
									</Typography>
								</Grid>
							</Grid>
						);
					})}
				</Grid>
			</ExpansionPanelDetails>
		</ExpansionPanel>
	);
}

export function OtrosIngresos({ otrosIngresos }) {
	const classes = useStyles();
	const exp = expansion();
	const sum = sumary();

	return (
		<ExpansionPanel>
			<ExpansionPanelSummary
				classes={sum}
				expandIcon={<ExpandMoreIcon />}
				aria-controls="panel1a-content"
				id="panel1a-header"
			>
				<Grid container spacing={1}>
					<Grid item xs={12} md={9}>
						<Typography className={exp.heading}>
							<strong>
								II.5.- OTROS INGRESOS NO CONSIDERADOS A LOS ANTERIORES (DESPUÉS DE IMPUESTOS)
							</strong>
						</Typography>
					</Grid>
					<Grid item xs={12} md={3}>
						<Typography className={exp.heading}>
							<strong>
								{getMoneda(otrosIngresos.remuneracionTotal.valor)}{' '}
								{otrosIngresos.remuneracionTotal.moneda}
							</strong>
						</Typography>
					</Grid>
				</Grid>
			</ExpansionPanelSummary>
			<ExpansionPanelDetails>
				<Grid container spacing={1}>
					<Grid item xs={12} md={9}>
						<Typography className={classes.cardTitle}>
							TIPO DE INGRESO (ARRENDAMIENTO, REGALÍA, SORTEOS, CONCURSOS, DONACIONES, SEGUROS DE VIDA,
							ETC.)
						</Typography>
					</Grid>
					<Grid item xs={12} md={3}>
						<Typography className={classes.cardTitle}>INGRESO:</Typography>
					</Grid>
					{otrosIngresos.ingresos.map((ing, idx) => {
						return (
							<Grid container spacing={1} key={'act-' + idx}>
								<Grid item xs={12} md={9}>
									<Typography className={classes.card}>{ing.tipoIngreso}</Typography>
								</Grid>
								<Grid item xs={12} md={3}>
									<Typography className={classes.card}>
										{getMoneda(ing.remuneracion.valor)} {ing.remuneracion.moneda}
									</Typography>
								</Grid>
							</Grid>
						);
					})}
				</Grid>
			</ExpansionPanelDetails>
		</ExpansionPanel>
	);
}

export default function({ data, tipo, titulo }) {
	switch (tipo) {
		case 'INICIAL':
			return <IngresosInicial data={data} titulo={titulo} />;
		case 'MODIFICACIÓN':
			return <IngresosModificacion data={data} titulo={titulo} />;
		case 'CONCLUSIÓN':
			return <IngresosConclusion data={data} titulo={titulo} />;
		default:
			info('Tipo declaración: ' + tipo);
			break;
	}
}
