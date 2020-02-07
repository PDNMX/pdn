import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import style from '../styleSecciones';

import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles(style);
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
					3. DATOS CURRICULARES DEL DECLARANTE
				</Typography>
			</Grid>
			<Grid item xs={12}>
				{data.escolaridad.map((esc, index) => {
					return (
						<ExpansionPanel key={'esc-' + index}>
							<ExpansionPanelSummary
								classes={sum}
								expandIcon={<ExpandMoreIcon />}
								aria-controls="panel1a-content"
								id="panel1a-header"
							>
								<Typography className={exp.heading}>
									<strong>{esc.nivel.valor}</strong>
								</Typography>
							</ExpansionPanelSummary>
							<ExpansionPanelDetails>
								<Grid container spacing={1}>
									<Grid item xs={12} md={4}>
										<Typography className={classes.cardTitle}>NIVEL</Typography>
										<Typography className={classes.card}>{esc.nivel.valor}</Typography>
									</Grid>
									<Grid item xs={12} md={4}>
										<Typography className={classes.cardTitle}>INSTITUCIÓN EDUCATIVA</Typography>
										<Typography className={classes.card}>
											{esc.institucionEducativa.nombre}
										</Typography>
									</Grid>
									<Grid item xs={12} md={4}>
										<Typography className={classes.cardTitle}>
											CARRERA O ÁREA DE CONOCIMIENTO
										</Typography>
										<Typography className={classes.card}>{esc.carreraAreaConocimiento}</Typography>
									</Grid>
									<Grid item xs={12} md={4}>
										<Typography className={classes.cardTitle}>ESTATUS</Typography>
										<Typography className={classes.card}>{esc.estatus}</Typography>
									</Grid>
									<Grid item xs={12} md={4}>
										<Typography className={classes.cardTitle}>DOCUMENTO OBTENIDO</Typography>
										<Typography className={classes.card}>{esc.documentoObtenido}</Typography>
									</Grid>
									<Grid item xs={12} md={4}>
										<Typography className={classes.cardTitle}>
											FECHA DE OBTENCIÓN DEL DOCUMENTO
										</Typography>
										<Typography className={classes.card}>{esc.fechaObtencion}</Typography>
									</Grid>
									<Grid item xs={12}>
										<Typography className={classes.cardTitle}>
											LUGAR DONDE SE UBICA LA INSTITUCIÓN EDUCATIVA
										</Typography>
										<Typography className={classes.card}>
											{esc.institucionEducativa.ubicacion === 'MX' ? (
												'EN MÉXICO'
											) : (
												'EN EL EXTRANJERO'
											)}
										</Typography>
									</Grid>
								</Grid>
							</ExpansionPanelDetails>
						</ExpansionPanel>
					);
				})}
			</Grid>
		</Grid>
	);
}
