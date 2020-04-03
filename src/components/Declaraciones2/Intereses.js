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
import { Disclaimer } from './utils';

const Menu = (data) => {
	let {
		participacion,
		participacionTomaDecisiones,
		apoyos,
		representacion,
		clientesPrincipales,
		beneficiosPrivados,
		fideicomisos
	} = data;

	const participaciones = participacion.ninguno ? 0 : participacion.participacion.length;
	const tomaDeciones = participacionTomaDecisiones.ninguno ? 0 : participacionTomaDecisiones.participacion.length;
	const apoyo = apoyos.ninguno ? 0 : apoyos.apoyo.length;
	const representaciones = representacion.ninguno ? 0 : representacion.representacion.length;
	const cliente = clientesPrincipales.ninguno ? 0 : clientesPrincipales.cliente.length;
	const beneficio = beneficiosPrivados.ninguno ? 0 : beneficiosPrivados.beneficio.length;
	const fideicomiso = fideicomisos.ninguno ? 0 : fideicomisos.fideicomiso.length;

	return [
		{
			clave: '1. PARTICIPACIÓN EN EMPRESAS, SOCIEDADES O ASOCIACIONES',
			valor: participaciones
		},
		{
			clave: '2. ¿PARTICIPA EN LA TOMA DE DECISIONES DE ALGUNA DE ESTAS INSTITUCIONES?',
			valor: tomaDeciones
		},
		{ clave: '3. APOYOS O BENEFICIOS PÚBLICOS', valor: apoyo },
		{ clave: '4. REPRESENTACIÓN', valor: representaciones },
		{ clave: '5. CLIENTES PRINCIPALES', valor: cliente },
		{ clave: '6. BENEFICIOS PRIVADOS', valor: beneficio },
		{ clave: '7. FIDEICOMISOS', valor: fideicomiso }
	];
};

const useStyles = makeStyles({
	root: {
		flexGrow: 1,
		width: '100%',
		backgroundColor: '#f2f2f2'
	}
});

function opcion(valor, data) {
	let {
		participacion,
		participacionTomaDecisiones,
		apoyos,
		representacion,
		clientesPrincipales,
		beneficiosPrivados,
		fideicomisos
	} = data;

	switch (valor) {
		case 0:
			return <Participacion data={participacion} />;
		case 1:
			return <TomaDecisiones data={participacionTomaDecisiones} />;
		case 2:
			return <ApoyosBeneficiosPublicos data={apoyos} />;
		case 3:
			return <Representacion data={representacion} />;
		case 4:
			return <ClientesPrincipales data={clientesPrincipales} />;
		case 5:
			return <BeneficiosPrivados data={beneficiosPrivados} />;
		case 6:
			return <Fideicomisos data={fideicomisos} />;

		default:
			break;
	}
}

export default function MenuSuperior(props) {
	const classes = useStyles();
	const { data } = props;

	data.participacion.participacion = data.participacion.participacion.filter((i) => i.tipoRelacion === 'DECLARANTE');
	data.participacionTomaDecisiones.participacion = data.participacionTomaDecisiones.participacion.filter(
		(i) => i.tipoRelacion === 'DECLARANTE'
	);
	data.apoyos.apoyo = data.apoyos.apoyo.filter((i) => i.beneficiarioPrograma.clave === 'DEC');
	data.representacion.representacion = data.representacion.representacion.filter(
		(i) => i.tipoRelacion === 'DECLARANTE'
	);
	data.clientesPrincipales.cliente = data.clientesPrincipales.cliente.filter((i) => i.tipoRelacion === 'DECLARANTE');
	data.beneficiosPrivados.beneficio = data.beneficiosPrivados.beneficio.filter(
		(i) => i.beneficiario.length === 1 && i.beneficiario[0].clave === 'DC'
	);
	data.fideicomisos.fideicomiso = data.fideicomisos.fideicomiso.filter((i) => i.tipoRelacion === 'DECLARANTE');

	return data ? (
		<Paper square className={classes.root}>
			<Grid container spacing={0}>
				<Grid item xs={12} md={2} style={{ backgroundColor: '#34b3eb' }}>
					<MenuLateral value={props.value} setValue={props.setValue} opciones={Menu(data)} />
				</Grid>
				<Grid item xs={12} md={10}>
					{opcion(props.value, data)}
				</Grid>
			</Grid>
		</Paper>
	) : (
		<Disclaimer />
	);
}
