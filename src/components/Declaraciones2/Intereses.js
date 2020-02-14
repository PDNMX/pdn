import React from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import MenuLateral from './MenuLateral';

import Participacion from './Intereses/01Participacion';
import TomaDecisiones from './Intereses/02TomaDecisiones';
import ApoyosBeneficiosPublicos from './Intereses/03ApoyosBeneficiosPublicos';
import Representacion from './Intereses/04Representacion';
import ClientesPrincipales from './Intereses/05ClientesPrincipales';
import BeneficiosPrivados from './Intereses/06BeneficiosPrivados';
import Fideicomisos from './Intereses/07Fideicomisos';

const Inicial = [
	{ clave: '1. PARTICIPACIÓN EN EMPRESAS, SOCIEDADES O ASOCIACIONES', valor: 0 },
	{
		clave: '2. ¿PARTICIPA EN LA TOMA DE DECISIONES DE ALGUNA DE ESTAS INSTITUCIONES?',
		valor: 0
	},
	{ clave: '3. APOYOS O BENEFICIOS PÚBLICOS', valor: 0 },
	{ clave: '4. REPRESENTACIÓN', valor: 3 },
	{ clave: '5. CLIENTES PRINCIPALES', valor: 5 },
	{ clave: '6. BENEFICIOS PRIVADOS', valor: 2 },
	{ clave: '7. FIDEICOMISOS', valor: 1 }
];

const useStyles = makeStyles({
	root: {
		flexGrow: 1,
		width: '100%',
		backgroundColor: '#f2f2f2'
	}
});

function opcion(valor, data) {
	switch (valor) {
		case 0:
			return <Participacion data={data.datosGenerales} />;
		case 1:
			return <TomaDecisiones data={data.datosGenerales} />;
		case 2:
			return <ApoyosBeneficiosPublicos data={data.datosGenerales} />;
		case 3:
			return <Representacion data={data.datosGenerales} />;
		case 4:
			return <ClientesPrincipales data={data.datosGenerales} />;
		case 5:
			return <BeneficiosPrivados data={data.datosGenerales} />;
		case 6:
			return <Fideicomisos data={data.datosGenerales} />;

		default:
			break;
	}
}

export default function MenuSuperior(props) {
	const classes = useStyles();
	const { data } = props;

	return (
		<Paper square className={classes.root}>
			<Grid container spacing={0}>
				<Grid item xs={12} md={2}>
					<MenuLateral value={props.value} setValue={props.setValue} opciones={Inicial} />
				</Grid>
				<Grid item xs={12} md={10}>
					{opcion(props.value, data)}
				</Grid>
			</Grid>
		</Paper>
	);
}
