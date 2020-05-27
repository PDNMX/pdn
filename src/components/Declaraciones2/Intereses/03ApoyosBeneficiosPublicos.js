import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import styleSecciones from '../styleSecciones';

import DatosNoRegistrados from '../DatosNoRegistrados';
import DatosReservados from '../DatosReservados';
import { sumary, expansion, getMoneda } from '../utils';
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles(styleSecciones);

function Apoyo(props) {
	const classes = useStyles();
	const exp = expansion();
	const sum = sumary();
	const { apoyo } = props;
	return apoyo.map((obj, idx) => {
		return (
			<ExpansionPanel key={'par-' + idx}>
				<ExpansionPanelSummary
					classes={sum}
					expandIcon={<ExpandMoreIcon />}
					aria-controls="panel1a-content"
					id="panel1a-header"
				>
					<Typography className={exp.heading}>
						<strong>{obj.nombrePrograma}</strong>
					</Typography>
				</ExpansionPanelSummary>
				<ExpansionPanelDetails>
					<Grid container spacing={1}>
						<Grid item xs={12} md={4}>
							<Typography className={classes.cardTitle}>BENEFICIARIO:</Typography>
							<Typography className={classes.card}>{obj.beneficiarioPrograma.valor}</Typography>
						</Grid>

						<Grid item xs={12} md={4}>
							<Typography className={classes.cardTitle}>NOMBRE DEL PROGRAMA:</Typography>
							<Typography className={classes.card}>{obj.nombrePrograma}</Typography>
						</Grid>
						<Grid item xs={12} md={4}>
							<Typography className={classes.cardTitle}>INSTITUCIÓN QUE OTORGA EL APOYO:</Typography>
							<Typography className={classes.card}>{obj.institucionOtorgante}</Typography>
						</Grid>
						<Grid item xs={12} md={4}>
							<Typography className={classes.cardTitle}>NIVEL U ORDEN DE GOBIERNO:</Typography>
							<Typography className={classes.card}>{obj.nivelOrdenGobierno}</Typography>
						</Grid>
						<Grid item xs={12} md={4}>
							<Typography className={classes.cardTitle}>TIPO DE APOYO:</Typography>
							<Typography className={classes.card}>{obj.tipoApoyo.valor}</Typography>
						</Grid>
						<Grid item xs={12} md={4}>
							<Typography className={classes.cardTitle}>FORMA DE RECEPCIÓN DEL APOYO:</Typography>
							<Typography className={classes.card}>{obj.formaRecepcion}</Typography>
						</Grid>
						{obj.formaRecepcion === 'MONETARIO' ? (
							<Grid item xs={12} md={4}>
								<Typography className={classes.cardTitle}>
									MONTO APROXIMADO DEL APOYO MENSUAL:
								</Typography>
								<Typography className={classes.card}>
									{getMoneda(obj.montoApoyoMensual.valor)} {obj.montoApoyoMensual.moneda}
								</Typography>
							</Grid>
						) : (
							<Grid item xs={12} md={4}>
								<Typography className={classes.cardTitle}>ESPECIFIQUE EL APOYO:</Typography>
								<Typography className={classes.card}>{obj.especifiqueApoyo}</Typography>
							</Grid>
						)}
					</Grid>
				</ExpansionPanelDetails>
			</ExpansionPanel>
		);
	});
}

export default function(props) {
	const classes = useStyles();
	const { data } = props;

	// const apoyo = data.apoyo.filter((i) => i.beneficiarioPrograma.clave === 'DEC');
	const apoyo = data.apoyo;

	return (
		<Grid container spacing={2} className={classes.rootPrincipal}>
			<Grid item xs={12}>
				<Typography className={classes.tituloSeccion} align="center">
					3. APOYOS O BENEFICIOS PÚBLICOS (HASTA LOS 2 ÚLTIMOS AÑOS)
				</Typography>
			</Grid>
			<Grid item xs={12}>
				{data.ninguno ? <DatosNoRegistrados /> : apoyo.length ? <Apoyo apoyo={apoyo} /> : <DatosReservados />}
			</Grid>
		</Grid>
	);
}