import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import styleSecciones from '../styleSecciones';

import DatosNoRegistrados from '../DatosNoRegistrados';
import DatosReservados from '../DatosReservados';
import Transmisor from '../CompTransmisor';
import { sumary, expansion } from '../utils';
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles(styleSecciones);

export function Inversiones(props) {
	const classes = useStyles();
	const exp = expansion();
	const sum = sumary();
	const { inversiones } = props;
	return inversiones.map((obj, idx) => {
		return (
			<ExpansionPanel key={'veh-' + idx}>
				<ExpansionPanelSummary
					classes={sum}
					expandIcon={<ExpandMoreIcon />}
					aria-controls="panel1a-content"
					id="panel1a-header"
				>
					<Typography className={exp.heading}>
						<strong>
							{obj.tipoInversion.valor} ({obj.subTipoInversion.valor})
						</strong>
					</Typography>
				</ExpansionPanelSummary>
				<ExpansionPanelDetails>
					<Grid container spacing={1}>
						<Grid item xs={12} md={4}>
							<Typography className={classes.cardTitle}>TIPO DE INVERSIÓN / ACTIVO:</Typography>
							<Typography className={classes.card}>{obj.tipoInversion.valor}</Typography>
						</Grid>
						<Grid item xs={12} md={4}>
							<Typography className={classes.cardTitle}>{obj.tipoInversion.valor}:</Typography>
							<Typography className={classes.card}>{obj.subTipoInversion.valor}</Typography>
						</Grid>
						<Grid item xs={12} md={4}>
							<Typography className={classes.cardTitle}>
								TITULAR DE LA INVERSIÓN, CUENTA BANCARIA Y OTRO TIPO DE VALORES:
							</Typography>
							<Typography component="div" className={classes.card}>
								{obj.titular.map((tit, idx) => {
									return <span key={'tit-' + idx}>{tit.valor}</span>;
								})}
							</Typography>
						</Grid>

						<Grid item xs={12} md={4}>
							<Typography className={classes.cardTitle}>NÚMERO DE CUENTA, CONTRATO O PÓLIZA</Typography>
							<Typography className={classes.card}>DATO RESERVADO</Typography>
						</Grid>
						<Grid item xs={12} md={4}>
							<Typography className={classes.cardTitle}>TIPO DE MONEDA</Typography>
							<Typography className={classes.card}>{obj.saldoSituacionActual.moneda}</Typography>
						</Grid>
						<Grid item xs={12} md={4}>
							<Typography className={classes.cardTitle}>
								¿DÓNDE SE LOCALIZA LA INVERSIÓN, CUENTA BANCARIA Y OTRO TIPO DE VALORES / ACTIVOS ?
							</Typography>
							<Typography className={classes.card}>
								{obj.localizacionInversion.pais === 'MX' ? 'EN MÉXICO' : 'EN EL EXTRANJERO'}
							</Typography>
						</Grid>
						<Grid item xs={12} md={4}>
							<Typography className={classes.cardTitle}>INSTITUCIÓN O RAZÓN SOCIAL</Typography>
							<Typography className={classes.card}>
								{obj.localizacionInversion.institucionRazonSocial}
							</Typography>
						</Grid>

						{obj.localizacionInversion.pais === 'MX' && (
							<Grid item xs={12} md={4}>
								<Typography className={classes.cardTitle}>RFC</Typography>
								<Typography className={classes.card}>{obj.localizacionInversion.rfc}</Typography>
							</Grid>
						)}

						{obj.localizacionInversion.pais !== 'MX' && (
							<Grid item xs={12} md={4}>
								<Typography className={classes.cardTitle}>PAÍS DÓNDE SE LOCALIZA</Typography>
								<Typography className={classes.card}>{obj.localizacionInversion.pais}</Typography>
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

	const inversiones = data.inversion.filter((i) => i.titular.length === 1 && i.titular[0].clave === 'DEC');

	return (
		<Grid container spacing={2} className={classes.rootPrincipal}>
			<Grid item xs={12}>
				<Typography className={classes.tituloSeccion} align="center">
					13. INVERSIONES, CUENTAS BANCARIAS Y OTRO TIPO DE VALORES / ACTIVOS (SITUACIÓN ACTUAL)
				</Typography>
			</Grid>
			<Grid item xs={12}>
				{data.ninguno && <DatosNoRegistrados />}
				{!data.ninguno && inversiones.length ? <Inversiones inversiones={inversiones} /> : <DatosReservados />}
			</Grid>
		</Grid>
	);
}
