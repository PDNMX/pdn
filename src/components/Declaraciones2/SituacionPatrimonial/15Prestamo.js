import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import styleSecciones from '../styleSecciones';

import DatosNoRegistrados from '../DatosNoRegistrados';
import DatosReservados from '../DatosReservados';
import { sumary, expansion, Divider } from '../utils';
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { Disclaimer } from '../utils';

const useStyles = makeStyles(styleSecciones);

function Duenio({ obj }) {
	const classes = useStyles();
	return (
		<React.Fragment>
			<Divider />
			<Grid item xs={12} style={{ textAlign: 'center' }}>
				<Typography className={classes.tituloSubSeccion}>DUEÑO O TITULAR</Typography>
			</Grid>
			{obj.duenoTitular.tipoDuenoTitular === 'FISICA' ? (
				<Grid item xs={12}>
					<Grid container spacing={1}>
						<Grid item xs={12} md={4}>
							<Typography className={classes.cardTitle}>NOMBRE DEL DUEÑO O TITULAR:</Typography>
							<Typography className={classes.cardReserved}>DATO RESERVADO</Typography>
						</Grid>
						<Grid item xs={12} md={4}>
							<Typography className={classes.cardTitle}>RFC:</Typography>
							<Typography className={classes.cardReserved}>DATO RESERVADO</Typography>
						</Grid>
						<Grid item xs={12} md={4}>
							<Typography className={classes.cardTitle}>RELACIÓN CON EL DUEÑO O EL TITULAR:</Typography>
							<Typography className={classes.cardReserved}>DATO RESERVADO</Typography>
						</Grid>
					</Grid>
				</Grid>
			) : (
				<Grid item xs={12}>
					<Grid container spacing={1}>
						<Grid item xs={12} md={4}>
							<Typography className={classes.cardTitle}>NOMBRE DEL DUEÑO O TITULAR:</Typography>
							<Typography className={classes.card}>{obj.duenoTitular.nombreTitular}</Typography>
						</Grid>
						<Grid item xs={12} md={4}>
							<Typography className={classes.cardTitle}>RFC:</Typography>
							<Typography className={classes.card}>{obj.duenoTitular.rfc}</Typography>
						</Grid>
						<Grid item xs={12} md={4}>
							<Typography className={classes.cardTitle}>RELACIÓN CON EL DUEÑO O EL TITULAR:</Typography>
							<Typography className={classes.card}>{obj.duenoTitular.relacionConTitular}</Typography>
						</Grid>
					</Grid>
				</Grid>
			)}
		</React.Fragment>
	);
}

function Prestamo({ prestamo }) {
	const classes = useStyles();
	const exp = expansion();
	const sum = sumary();
	return prestamo.map((obj, idx) => {
		let { inmueble, vehiculo } = obj.tipoBien;
		return (
			<React.Fragment key={'prestamo-' + idx}>
				{inmueble && (
					<ExpansionPanel>
						<ExpansionPanelSummary
							classes={sum}
							expandIcon={<ExpandMoreIcon />}
							aria-controls="panel1a-content"
							id="panel1a-header"
						>
							<Typography className={exp.heading}>
								<strong>INMUEBLE</strong>
							</Typography>
						</ExpansionPanelSummary>
						<ExpansionPanelDetails>
							<Grid container spacing={1}>
								<Grid item xs={12} md={4}>
									<Typography className={classes.cardTitle}>TIPO DE BIEN:</Typography>
									<Typography className={classes.card}>INMUEBLE</Typography>
								</Grid>
								<Grid item xs={12} md={4}>
									<Typography className={classes.cardTitle}>UBICACIÓN DEL INMUEBLE:</Typography>
									<Typography className={classes.cardReserved}>DATO RESERVADO</Typography>
								</Grid>
								<Duenio obj={obj} />
							</Grid>
						</ExpansionPanelDetails>
					</ExpansionPanel>
				)}
				{vehiculo && (
					<ExpansionPanel>
						<ExpansionPanelSummary
							classes={sum}
							expandIcon={<ExpandMoreIcon />}
							aria-controls="panel1a-content"
							id="panel1a-header"
						>
							<Typography className={exp.heading}>
								<strong>VEHÍCULO</strong>
							</Typography>
						</ExpansionPanelSummary>
						<ExpansionPanelDetails>
							<Grid container spacing={1}>
								<Grid item xs={12} md={4}>
									<Typography className={classes.cardTitle}>TIPO DE BIEN:</Typography>
									<Typography className={classes.card}>VEHÍCULO</Typography>
								</Grid>
								<Grid item xs={12} md={4}>
									<Typography className={classes.cardTitle}>MARCA:</Typography>
									<Typography className={classes.card}>{vehiculo.marca}</Typography>
								</Grid>
								<Grid item xs={12} md={4}>
									<Typography className={classes.cardTitle}>MODELO:</Typography>
									<Typography className={classes.card}>{vehiculo.modelo}</Typography>
								</Grid>
								<Grid item xs={12} md={4}>
									<Typography className={classes.cardTitle}>AÑO:</Typography>
									<Typography className={classes.card}>{vehiculo.anio}</Typography>
								</Grid>
								<Grid item xs={12} md={4}>
									<Typography className={classes.cardTitle}>NÚMERO DE SERIE O REGISTRO:</Typography>
									<Typography className={classes.cardReserved}>DATO RESERVADO</Typography>
								</Grid>
								<Grid item xs={12} md={4}>
									<Typography className={classes.cardTitle}>
										¿DÓNDE SE ENCUENTRA REGISTRADO?:
									</Typography>
									<Typography className={classes.cardReserved}>DATO RESERVADO</Typography>
								</Grid>
								<Duenio obj={obj} />
							</Grid>
						</ExpansionPanelDetails>
					</ExpansionPanel>
				)}
			</React.Fragment>
		);
	});
}

export default function({ data, titulo }) {
	const classes = useStyles();

	let prestamo;

	if (data.ninguno) {
		prestamo = [];
	} else {
		prestamo = data.prestamo
			? data.prestamo.filter((i) => i.titular.length === 1 && i.titular[0].clave === 'DEC')
			: [];
	}

	return (
		<Grid container spacing={2} className={classes.rootPrincipal}>
			<Grid item xs={12}>
				<Typography className={classes.tituloSeccion} align="center">
					{titulo}
				</Typography>
			</Grid>
			{data ? (
				<Grid item xs={12}>
					{data.ninguno ? (
						<DatosNoRegistrados />
					) : prestamo.length ? (
						<Prestamo prestamo={prestamo} />
					) : (
						<DatosReservados />
					)}
				</Grid>
			) : (
				<Disclaimer />
			)}
		</Grid>
	);
}
