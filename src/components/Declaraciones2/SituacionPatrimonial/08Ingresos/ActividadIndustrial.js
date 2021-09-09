import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { sumary, expansion, getMoneda } from '../../utils';
import styleSecciones from '../../styleSecciones';
const useStyles = makeStyles(styleSecciones);

export default function({ actividadIndustrialComercialEmpresarial }) {
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
								{getMoneda(actividadIndustrialComercialEmpresarial.remuneracionTotal.valor)}{' '}
								{actividadIndustrialComercialEmpresarial.remuneracionTotal.moneda}
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
					{actividadIndustrialComercialEmpresarial.actividades.map((act, idx) => {
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