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

function Prestamo(props) {
	const classes = useStyles();
	const exp = expansion();
	const sum = sumary();
	const { prestamo } = props;
	return prestamo.map((obj, idx) => {
		let { inmueble, vehiculo } = obj.tipoBien;
		return (
			<ExpansionPanel key={'prestamo-' + idx}>
				<ExpansionPanelSummary
					classes={sum}
					expandIcon={<ExpandMoreIcon />}
					aria-controls="panel1a-content"
					id="panel1a-header"
				>
					{inmueble && (
						<Typography className={exp.heading}>
							<strong>{inmueble.tipoInmueble.valor}</strong>
						</Typography>
					)}
					{vehiculo && (
						<Typography className={exp.heading}>
							<strong>{vehiculo.tipo.valor}</strong>
						</Typography>
					)}
				</ExpansionPanelSummary>
				<ExpansionPanelDetails>
					{inmueble && (
						<Grid container spacing={1}>
							<Grid item xs={12} md={4}>
								<Typography className={classes.cardTitle}>TIPO DE BIEN:</Typography>
								<Typography className={classes.card}>INMUEBLE</Typography>
							</Grid>
							<Grid item xs={12} md={4}>
								<Typography className={classes.cardTitle}>UBICACIÓN DEL INMUEBLE:</Typography>
								<Typography className={classes.cardReserved}>DATO RESERVADO</Typography>
							</Grid>
						</Grid>
					)}
					{vehiculo && (
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
								<Typography className={classes.cardTitle}>¿DÓNDE SE ENCUENTRA REGISTRADO?:</Typography>
								<Typography className={classes.cardReserved}>DATO RESERVADO</Typography>
							</Grid>
							<Divider />
							<Grid item xs={12} style={{ textAlign: 'center' }}>
								<Typography className={classes.cardTitle}>DUEÑO O TITULAR</Typography>
							</Grid>
							{obj.duenoTitular.tipoDuenoTitular === 'FISICA' ? (
								<Grid item xs={12}>
									<Grid container spacing={1}>
										<Grid item xs={12} md={4}>
											<Typography className={classes.cardTitle}>
												NOMBRE DEL DUEÑO O TITULAR:
											</Typography>
											<Typography className={classes.cardReserved}>DATO RESERVADO</Typography>
										</Grid>
										<Grid item xs={12} md={4}>
											<Typography className={classes.cardTitle}>RFC:</Typography>
											<Typography className={classes.cardReserved}>DATO RESERVADO</Typography>
										</Grid>
										<Grid item xs={12} md={4}>
											<Typography className={classes.cardTitle}>
												RELACIÓN CON EL DUEÑO O EL TITULAR:
											</Typography>
											<Typography className={classes.cardReserved}>DATO RESERVADO</Typography>
										</Grid>
									</Grid>
								</Grid>
							) : (
								<Grid item xs={12}>
									<Grid container spacing={1}>
										<Grid item xs={12} md={4}>
											<Typography className={classes.cardTitle}>
												NOMBRE DEL DUEÑO O TITULAR:
											</Typography>
											<Typography className={classes.card}>
												{obj.duenoTitular.nombreTitular}
											</Typography>
										</Grid>
										<Grid item xs={12} md={4}>
											<Typography className={classes.cardTitle}>RFC:</Typography>
											<Typography className={classes.card}>{obj.duenoTitular.rfc}</Typography>
										</Grid>
										<Grid item xs={12} md={4}>
											<Typography className={classes.cardTitle}>
												RELACIÓN CON EL DUEÑO O EL TITULAR:
											</Typography>
											<Typography className={classes.card}>
												{obj.duenoTitular.relacionConTitular}
											</Typography>
										</Grid>
									</Grid>
								</Grid>
							)}
						</Grid>
					)}
				</ExpansionPanelDetails>
			</ExpansionPanel>
		);
	});
}

export default function(props) {
	const classes = useStyles();
	const { data } = props;

	return (
		<Grid container spacing={2} className={classes.rootPrincipal}>
			<Grid item xs={12}>
				<Typography className={classes.tituloSeccion} align="center">
					15. PRÉSTAMO O COMODATO POR TERCEROS (SITUACIÓN ACTUAL)
				</Typography>
			</Grid>
			{data ? (
				<Grid item xs={12}>
					{data.ninguno && <DatosNoRegistrados />}
					{!data.ninguno && data.prestamo.length ? (
						<Prestamo prestamo={data.prestamo} />
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
