import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import styleSecciones from '../styleSecciones';

import DatosNoRegistrados from '../DatosNoRegistrados';
import DatosReservados from '../DatosReservados';

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

	console.log(data);
	const inmuebles = data.bienInmueble.filter((i) => i.titular.length === 1 && i.titular[0].clave === 'DEC');

	return (
		<Grid container spacing={2} className={classes.rootPrincipal}>
			<Grid item xs={12}>
				<Typography className={classes.tituloSeccion} align="center">
					10. BIENES INMUEBLES (SITUACIÓN ACTUAL)
				</Typography>
			</Grid>
			<Grid item xs={12}>
				{data.ninguno && <DatosNoRegistrados />}
				{!data.ninguno &&
					(inmuebles.length ? (
						data.bienInmueble.map((inm, idx) => {
							if (inm.titular.length === 1 && inm.titular[0].clave === 'DEC')
								return (
									<ExpansionPanel key={'inm-' + idx}>
										<ExpansionPanelSummary
											classes={sum}
											expandIcon={<ExpandMoreIcon />}
											aria-controls="panel1a-content"
											id="panel1a-header"
										>
											<Typography className={exp.heading}>
												<strong>{inm.tipoInmueble.valor}</strong>
											</Typography>
										</ExpansionPanelSummary>
										<ExpansionPanelDetails>
											<Grid container spacing={1}>
												<Grid item xs={12} md={4}>
													<Typography className={classes.cardTitle}>
														TIPO DE INMUEBLE:
													</Typography>
													<Typography className={classes.card}>
														{inm.tipoInmueble.valor}
													</Typography>
												</Grid>
												<Grid item xs={12} md={4}>
													<Typography className={classes.cardTitle}>
														TITULAR DEL INMUEBLE:
													</Typography>
													<Typography component="div" className={classes.card}>
														<ul style={{ listStyle: 'none' }}>
															{inm.titular.map((tit, idx) => {
																return <li key={'tit-' + idx}>{tit.valor}</li>;
															})}
														</ul>
													</Typography>
												</Grid>
												<Grid item xs={12} md={4}>
													<Typography className={classes.cardTitle}>
														PORCENTAJE DE PROPIEDAD DEL DECLARANTE CONFORME A ESCRITURACIÓN
														O CONTRATO:
													</Typography>
													<Typography component="div" className={classes.card}>
														{inm.porcentajePropiedad}%
													</Typography>
												</Grid>
											</Grid>
										</ExpansionPanelDetails>
									</ExpansionPanel>
								);
						})
					) : (
						<DatosReservados />
					))}
			</Grid>
		</Grid>
	);
}
