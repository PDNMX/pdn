import React from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import style from '../styleSecciones';
import { Divider, CompDomicilio } from '../utils';

import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles(style);

function Empleo({ data }) {
	const classes = useStyles();

	return (
		<React.Fragment>
			<Grid item xs={12} md={4}>
				<Typography className={classes.cardTitle}>NIVEL/ORDEN DE GOBIERNO</Typography>
				<Typography className={classes.card}>{data.nivelOrdenGobierno}</Typography>
			</Grid>
			<Grid item xs={12} md={4}>
				<Typography className={classes.cardTitle}>ÁMBITO PÚBLICO</Typography>
				<Typography className={classes.card}>{data.ambitoPublico}</Typography>
			</Grid>
			<Grid item xs={12} md={4}>
				<Typography className={classes.cardTitle}>NOMBRE DEL ENTE PÚBLICO</Typography>
				<Typography className={classes.card}>{data.nombreEntePublico}</Typography>
			</Grid>
			<Grid item xs={12} md={4}>
				<Typography className={classes.cardTitle}>ÁREA DE ADSCRIPCIÓN</Typography>
				<Typography className={classes.card}>{data.areaAdscripcion}</Typography>
			</Grid>
			<Grid item xs={12} md={4}>
				<Typography className={classes.cardTitle}>EMPLEO, CARGO O COMISIÓN </Typography>
				<Typography className={classes.card}>{data.empleoCargoComision}</Typography>
			</Grid>
			<Grid item xs={12} md={4}>
				<Typography className={classes.cardTitle}>¿ESTÁ CONTRATADO POR HONORARIOS?</Typography>
				<Typography className={classes.card} align="center">
					{data.contratadoPorHonorarios ? 'SÍ' : 'NO'}
				</Typography>
			</Grid>
			<Grid item xs={12} md={4}>
				<Typography className={classes.cardTitle}>NIVEL DEL EMPLEO, CARGO O COMISIÓN</Typography>
				<Typography className={classes.card}>{data.nivelEmpleoCargoComision}</Typography>
			</Grid>
			<Grid item xs={12} md={4}>
				<Typography className={classes.cardTitle}>ESPECIFIQUE FUNCIÓN PRINCIPAL</Typography>
				<Typography className={classes.card}>{data.funcionPrincipal}</Typography>
			</Grid>
			<Grid item xs={12} md={4}>
				<Typography className={classes.cardTitle}>TELÉFONO DE OFICINA Y EXTENSIÓN</Typography>
				<Typography className={classes.card}>
					{data.telefonoOficina.telefono}
					{' Extensión '}
					{data.telefonoOficina.extension}
				</Typography>
			</Grid>
			<Grid item xs={12} md={4}>
				<Typography className={classes.cardTitle}>
					FECHA DE TOMA DE POSESIÓN DEL EMPLEO, CARGO O COMISIÓN
				</Typography>
				<Typography className={classes.card}>{data.fechaTomaPosesion}</Typography>
			</Grid>

			<Divider />
			<CompDomicilio domicilioMexico={data.domicilioMexico} domicilioExtranjero={data.domicilioExtranjero} />
		</React.Fragment>
	);
}

export default function({ data, titulo }) {
	const classes = useStyles();

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
						<Empleo data={data} />
						{data.cuentaConOtroCargoPublico &&
							data.otroEmpleoCargoComision.map((o, i) => {
								return (
									<ExpansionPanel key={'e-' + i}>
										<ExpansionPanelSummary
											expandIcon={<ExpandMoreIcon />}
											aria-controls="panel1a-content"
											id="panel1a-header"
											className={classes.resultadosTitulo}
										>
											<Grid container spacing={0}>
												<Grid item xs={8}>
													OTRO EMPLEO, CARGO O COMISIÓN EN EL SERVICIO PÚBLICO
												</Grid>
											</Grid>
										</ExpansionPanelSummary>
										<ExpansionPanelDetails className={classes.resultadoContenido}>
											<Grid container spacing={1}>
												<Empleo data={o} />
											</Grid>
										</ExpansionPanelDetails>
									</ExpansionPanel>
								);
							})}
					</Grid>
				</Paper>
			</Grid>
		</Grid>
	);
}
