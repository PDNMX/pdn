import React from 'react';
import { Grid, Paper } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/core/styles';
import style from './styleSecciones';

const useStyles = makeStyles(style);

const getMoneda = (valor, moneda) => {
	return new Intl.NumberFormat('es-MX', {
		style: 'currency',
		currency: 'MXN'
	}).format(valor);
};

const getUnidad = (unidad) => {
	switch (unidad) {
		case 'm2':
			return (
				<span>
					m<sup>2</sup>
				</span>
			);
		case 'km2':
			return (
				<span>
					km<sup>2</sup>
				</span>
			);
		default:
			return unidad;
	}
};

const getMorales = (elements) => {
	return elements.filter((i) => i.tipoPersona !== 'FISICA');
};

/************** CSS *******************/
/************** Expansion *******************/
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
/************** Expansion *******************/

function Divider() {
	return (
		<Grid item xs={12}>
			<hr style={{ border: '4px solid #f2f2f2' }} />
		</Grid>
	);
}

function DomicilioReservado() {
	return (
		<Grid item xs={12}>
			<hr style={{ border: '4px solid #f2f2f2' }} />
		</Grid>
	);
}

function CompDomicilio(props) {
	const classes = useStyles();
	const { domicilioMexico, domicilioExtranjero } = props;

	return (
		<Grid item xs={12}>
			{domicilioMexico && (
				<Grid item xs={12}>
					<Grid container spacing={1}>
						<Grid item xs={12}>
							<Typography className={classes.cardTitle} align="center">
								DOMICILIO EN MÉXICO
							</Typography>
						</Grid>
						<Grid item xs={12} md={3}>
							<Typography className={classes.cardTitle}>CALLE</Typography>
							<Typography className={classes.card}>{domicilioMexico.calle}</Typography>
						</Grid>
						<Grid item xs={12} md={3}>
							<Typography className={classes.cardTitle}>NÚMERO EXTERIOR</Typography>
							<Typography className={classes.card}>{domicilioMexico.numeroExterior}</Typography>
						</Grid>
						<Grid item xs={12} md={3}>
							<Typography className={classes.cardTitle}>NÚMERO INTERIOR</Typography>
							<Typography className={classes.card}>{domicilioMexico.numeroInterior}</Typography>
						</Grid>
						<Grid item xs={12} md={3}>
							<Typography className={classes.cardTitle}>COLONIA/LOCALIDAD</Typography>
							<Typography className={classes.card}>{domicilioMexico.coloniaLocalidad}</Typography>
						</Grid>
						<Grid item xs={12} md={3}>
							<Typography className={classes.cardTitle}>MUNICIPIO/ALCALDÍA</Typography>
							<Typography className={classes.card}>{domicilioMexico.municipioAlcaldia.valor}</Typography>
						</Grid>
						<Grid item xs={12} md={3}>
							<Typography className={classes.cardTitle}>ENTIDAD FEDERATIVA</Typography>
							<Typography className={classes.card}>{domicilioMexico.entidadFederativa.valor}</Typography>
						</Grid>
						<Grid item xs={12} md={3}>
							<Typography className={classes.cardTitle}>CÓDIGO POSTAL</Typography>
							<Typography className={classes.card}>{domicilioMexico.codigoPostal}</Typography>
						</Grid>
					</Grid>
				</Grid>
			)}
			{domicilioExtranjero && (
				<Grid item xs={12}>
					<Grid container spacing={1}>
						<Grid item xs={12}>
							<Typography className={classes.cardTitle} align="center">
								DOMICILIO EN EL EXTRANJERO
							</Typography>
						</Grid>
						<Grid item xs={12} md={3}>
							<Typography className={classes.cardTitle}>CALLE</Typography>
							<Typography className={classes.card}>{domicilioExtranjero.calle}</Typography>
						</Grid>
						<Grid item xs={12} md={3}>
							<Typography className={classes.cardTitle}>NÚMERO EXTERIOR</Typography>
							<Typography className={classes.card}>{domicilioExtranjero.numeroExterior}</Typography>
						</Grid>
						<Grid item xs={12} md={3}>
							<Typography className={classes.cardTitle}>NÚMERO INTERIOR</Typography>
							<Typography className={classes.card}>{domicilioExtranjero.numeroInterior}</Typography>
						</Grid>
						<Grid item xs={12} md={3}>
							<Typography className={classes.cardTitle}>CIUDAD/LOCALIDAD</Typography>
							<Typography className={classes.card}>{domicilioExtranjero.ciudadLocalidad}</Typography>
						</Grid>
						<Grid item xs={12} md={3}>
							<Typography className={classes.cardTitle}>ESTADO/PROVINCIA</Typography>
							<Typography className={classes.card}>{domicilioExtranjero.estadoProvincia}</Typography>
						</Grid>
						<Grid item xs={12} md={3}>
							<Typography className={classes.cardTitle}>PAÍS</Typography>
							<Typography className={classes.card}>{domicilioExtranjero.pais}</Typography>
						</Grid>
						<Grid item xs={12} md={3}>
							<Typography className={classes.cardTitle}>CÓDIGO POSTAL</Typography>
							<Typography className={classes.card}>{domicilioExtranjero.codigoPostal}</Typography>
						</Grid>
					</Grid>
				</Grid>
			)}
		</Grid>
	);
}

export { getMoneda, getUnidad, getMorales, sumary, expansion, Divider, DomicilioReservado, CompDomicilio };
