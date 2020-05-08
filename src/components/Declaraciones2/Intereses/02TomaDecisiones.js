import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import styleSecciones from '../styleSecciones';

import DatosNoRegistrados from '../DatosNoRegistrados';
import DatosReservados from '../DatosReservados';
import { sumary, expansion, Divider, getMoneda, Ubicacion } from '../utils';
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles(styleSecciones);

function Participacion(props) {
	const classes = useStyles();
	const exp = expansion();
	const sum = sumary();
	const { participaciones } = props;
	return participaciones.map((obj, idx) => {
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
							{obj.nombreInstitucion} ({obj.tipoInstitucion.valor})
						</strong>
					</Typography>
				</ExpansionPanelSummary>
				<ExpansionPanelDetails>
					<Grid container spacing={1}>
						<Grid item xs={12} md={3}>
							<Typography className={classes.cardTitle}>PARTICIPA:</Typography>
							<Typography className={classes.card}>{obj.tipoRelacion}</Typography>
						</Grid>
						<Grid item xs={12} md={5}>
							<Typography className={classes.cardTitle}>TIPO DE INSTITUCIÓN:</Typography>
							<Typography className={classes.card}>{obj.tipoInstitucion.valor}</Typography>
						</Grid>
						<Grid item xs={12} md={4}>
							<Typography className={classes.cardTitle}>NOMBRE DE LA INSTITUCIÓN:</Typography>
							<Typography className={classes.cardReserved}>DATO RESERVADO</Typography>
						</Grid>
						<Grid item xs={12} md={3}>
							<Typography className={classes.cardTitle}>RFC:</Typography>
							<Typography className={classes.cardReserved}>DATO RESERVADO</Typography>
						</Grid>
						<Grid item xs={12} md={9}>
							<Typography className={classes.cardTitle}>
								FECHA DE INICIO DE PARTICIPACIÓN DENTRO DE LA INSTITUCIÓN:
							</Typography>
							<Typography className={classes.card}>{obj.fechaInicioParticipacion}</Typography>
						</Grid>
						<Grid item xs={12} md={3}>
							<Typography className={classes.cardTitle}>PUESTO/ROL:</Typography>
							<Typography className={classes.card}>{obj.puestoRol}</Typography>
						</Grid>
						<Grid item xs={12} md={5}>
							<Typography className={classes.cardTitle}>
								¿RECIBE REMUNERACIÓN POR SU PARTICIPACIÓN?:
							</Typography>
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

	// const participaciones = data.participacion.filter((i) => i.tipoRelacion === 'DECLARANTE');
	const participaciones = data.participacion;

	return (
		<Grid container spacing={2} className={classes.rootPrincipal}>
			<Grid item xs={12}>
				<Typography className={classes.tituloSeccion} align="center">
					2. ¿PARTICIPA EN LA TOMA DE DECISIONES DE ALGUNA DE ESTAS INSTITUCIONES? (HASTA LOS 2 ÚLTIMOS AÑOS)
				</Typography>
			</Grid>
			<Grid item xs={12}>
				{data.ninguno ? (
					<DatosNoRegistrados />
				) : participaciones.length ? (
					<Participacion participaciones={participaciones} />
				) : (
					<DatosReservados />
				)}				
			</Grid>
		</Grid>
	);
}
