import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import styleSecciones from '../styleSecciones';

import DatosNoRegistrados from '../DatosNoRegistrados';
import DatosReservados from '../DatosReservados';
import Transmisor from '../CompTransmisor';
import { sumary, expansion, Divider, getMoneda } from '../utils';
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles(styleSecciones);

export function BienMueble(props) {
	const classes = useStyles();
	const exp = expansion();
	const sum = sumary();
	const { bienMueble } = props;
	return bienMueble.map((obj, idx) => {
		return (
			<ExpansionPanel key={'veh-' + idx}>
				<ExpansionPanelSummary
					classes={sum}
					expandIcon={<ExpandMoreIcon />}
					aria-controls="panel1a-content"
					id="panel1a-header"
				>
					<Typography className={exp.heading}>
						<strong>{obj.tipoBien.valor}</strong>
					</Typography>
				</ExpansionPanelSummary>
				<ExpansionPanelDetails>
					<Grid container spacing={1}>
						<Grid item xs={12} md={8}>
							<Typography className={classes.cardTitle}>TIPO DEL BIEN:</Typography>
							<Typography className={classes.card}>{obj.tipoBien.valor}</Typography>
						</Grid>
						<Grid item xs={12} md={4}>
							<Typography className={classes.cardTitle}>TITULAR DEL BIEN:</Typography>
							<Typography className={classes.card}>
								{obj.titular.map((tit, idx) => {
									return <span key={'tit-' + idx}>{tit.valor}</span>;
								})}
							</Typography>
						</Grid>

						<Grid item xs={12} md={4}>
							<Typography className={classes.cardTitle}>DESCRIPCIÓN GENERAL DEL BIEN:</Typography>
							<Typography className={classes.card}>{obj.descripcionGeneralBien}</Typography>
						</Grid>
						<Grid item xs={12} md={4}>
							<Typography className={classes.cardTitle}>FORMA DE ADQUISICIÓN:</Typography>
							<Typography className={classes.card}>{obj.formaAdquisicion.valor}</Typography>
						</Grid>
						<Grid item xs={12} md={4}>
							<Typography className={classes.cardTitle}>FORMA DE PAGO:</Typography>
							<Typography className={classes.card}>{obj.formaPago}</Typography>
						</Grid>
						<Grid item xs={12} md={4}>
							<Typography className={classes.cardTitle}>VALOR DE ADQUISICIÓN DEL MUEBLE:</Typography>
							<Typography className={classes.card}>{getMoneda(obj.valorAdquisicion.valor)}</Typography>
						</Grid>
						<Grid item xs={12} md={4}>
							<Typography className={classes.cardTitle}>TIPO DE MONEDA:</Typography>
							<Typography className={classes.card}>{obj.valorAdquisicion.moneda}</Typography>
						</Grid>
						<Grid item xs={12} md={4}>
							<Typography className={classes.cardTitle}>FECHA DE ADQUISICIÓN:</Typography>
							<Typography className={classes.card}>{obj.fechaAdquisicion}</Typography>
						</Grid>

						{obj.motivoBaja && (
							<Grid item xs={12} md={4}>
								<Typography className={classes.cardTitle}>
									EN CASO DE BAJA DEL MUEBLE INCLUIR MOTIVO:
								</Typography>
								<Typography className={classes.card}>{obj.motivoBaja.valor}</Typography>
							</Grid>
						)}
						<Divider />

						{obj.transmisor && <Transmisor transmisor={obj.transmisor} />}
					</Grid>
				</ExpansionPanelDetails>
			</ExpansionPanel>
		);
	});
}

export default function(props) {
	const classes = useStyles();
	const { data } = props;

	const bienMueble = data.bienMueble.filter((i) => i.titular.length === 1 && i.titular[0].clave === 'DEC');

	return (
		<Grid container spacing={2} className={classes.rootPrincipal}>
			<Grid item xs={12}>
				<Typography className={classes.tituloSeccion} align="center">
					12. BIENES MUEBLES (SITUACIÓN ACTUAL)
				</Typography>
			</Grid>
			<Grid item xs={12}>
				{data.ninguno && <DatosNoRegistrados />}
				{!data.ninguno && bienMueble.length ? <BienMueble bienMueble={bienMueble} /> : <DatosReservados />}
			</Grid>
		</Grid>
	);
}
