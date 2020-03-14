import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import styleSecciones from '../styleSecciones';

import DatosNoRegistrados from '../DatosNoRegistrados';
import DatosReservados from '../DatosReservados';
import { sumary, expansion, getMoneda, Divider, Ubicacion } from '../utils';
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles(styleSecciones);

function Representacion(props) {
	const classes = useStyles();
	const exp = expansion();
	const sum = sumary();
	const { representacion } = props;
	return representacion.map((obj, idx) => {
		return (
			<ExpansionPanel key={'par-' + idx}>
				<ExpansionPanelSummary
					classes={sum}
					expandIcon={<ExpandMoreIcon />}
					aria-controls="panel1a-content"
					id="panel1a-header"
				>
					<Typography className={exp.heading}>
						<strong>
							{obj.tipoRepresentacion} DESDE {obj.fechaInicioRepresentacion}
						</strong>
					</Typography>
				</ExpansionPanelSummary>
				<ExpansionPanelDetails>
					<Grid container spacing={1}>
						<Grid item xs={12} md={4}>
							<Typography className={classes.cardTitle}>RELACIÓN:</Typography>
							<Typography className={classes.card}>{obj.tipoRelacion}</Typography>
						</Grid>
						<Grid item xs={12} md={4}>
							<Typography className={classes.cardTitle}>TIPO DE REPRESENTACIÓN:</Typography>
							<Typography className={classes.card}>{obj.tipoRepresentacion}</Typography>
						</Grid>
						<Grid item xs={12} md={4}>
							<Typography className={classes.cardTitle}>FECHA DE INICIO:</Typography>
							<Typography className={classes.card}>{obj.fechaInicioRepresentacion}</Typography>
						</Grid>
						<Grid item xs={12} md={4}>
							<Typography className={classes.cardTitle}>SECTOR PRODUCTIVO:</Typography>
							<Typography className={classes.card}>{obj.sector.valor}</Typography>
						</Grid>
						<Grid item xs={12} md={4}>
							<Typography className={classes.cardTitle}>¿RECIBE REMUNERACIÓN?:</Typography>
							<Typography className={classes.card}>{obj.recibeRemuneracion ? 'SÍ' : 'NO'}</Typography>
						</Grid>
						{obj.recibeRemuneracion && (
							<Grid item xs={12} md={4}>
								<Typography className={classes.cardTitle}>MONTO MENSUAL NETO:</Typography>
								<Typography className={classes.card}>
									{getMoneda(obj.montoMensual.valor)} {obj.montoMensual.moneda}
								</Typography>
							</Grid>
						)}
						<Divider />
						<Grid item xs={12} style={{ textAlign: 'center' }}>
							<Typography className={classes.tituloSubSeccion}>REPRESENTANTE / REPRESENTADO</Typography>
						</Grid>
						{obj.tipoPersona === 'FISICA' ? (
							<Grid item xs={12}>
								<Grid container spacing={1}>
									<Grid item xs={12} md={3}>
										<Typography className={classes.cardTitle}>TIPO PERSONA:</Typography>
										<Typography className={classes.cardReserved}>FÍSICA</Typography>
									</Grid>
									<Grid item xs={12} md={6}>
										<Typography className={classes.cardTitle}>
											NOMBRE O RAZÓN SOCIAL DEL REPRESENTANTE/REPRESENTADO:
										</Typography>
										<Typography className={classes.cardReserved}>DATO RESERVADO</Typography>
									</Grid>
									<Grid item xs={12} md={3}>
										<Typography className={classes.cardTitle}>RFC:</Typography>
										<Typography className={classes.cardReserved}>DATO RESERVADO</Typography>
									</Grid>
								</Grid>
							</Grid>
						) : (
							<Grid item xs={12}>
								<Grid container spacing={1}>
									<Grid item xs={12} md={3}>
										<Typography className={classes.cardTitle}>TIPO PERSONA:</Typography>
										<Typography className={classes.card}>MORAL</Typography>
									</Grid>
									<Grid item xs={12} md={6}>
										<Typography className={classes.cardTitle}>
											NOMBRE O RAZÓN SOCIAL DEL REPRESENTANTE/REPRESENTADO:
										</Typography>
										<Typography className={classes.card}>{obj.nombreRazonSocial}</Typography>
									</Grid>
									<Grid item xs={12} md={3}>
										<Typography className={classes.cardTitle}>RFC:</Typography>
										<Typography className={classes.card}>{obj.rfc}</Typography>
									</Grid>
								</Grid>
							</Grid>
						)}
						<Divider />
						<Ubicacion ubicacion={obj.ubicacion} />
					</Grid>
				</ExpansionPanelDetails>
			</ExpansionPanel>
		);
	});
}

export default function(props) {
	const classes = useStyles();
	const { data } = props;

	const representacion = data.representacion.filter((i) => i.tipoRelacion === 'DECLARANTE');

	return (
		<Grid container spacing={2} className={classes.rootPrincipal}>
			<Grid item xs={12}>
				<Typography className={classes.tituloSeccion} align="center">
					4. REPRESENTACIÓN (HASTA LOS 2 ÚLTIMOS AÑOS)
				</Typography>
			</Grid>
			<Grid item xs={12}>
				{data.ninguno && <DatosNoRegistrados />}
				{!data.ninguno && representacion.length ? (
					<Representacion representacion={representacion} />
				) : (
					<DatosReservados />
				)}
			</Grid>
		</Grid>
	);
}
