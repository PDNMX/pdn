import React from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import MenuLateral from './MenuLateral';

const Inicial = [
	{ clave: '1. PARTICIPACIÓN EN EMPRESAS, SOCIEDADES O ASOCIACIONES (HASTA LOS 2 ÚLTIMOS AÑOS)', valor: 0 },
	{
		clave: '2. ¿PARTICIPA EN LA TOMA DE DECISIONES DE ALGUNA DE ESTAS INSTITUCIONES? (HASTA LOS 2 ÚLTIMOS AÑOS)',
		valor: 0
	},
	{ clave: '3. APOYOS O BENEFICIOS PÚBLICOS (HASTA LOS 2 ÚLTIMOS AÑOS)', valor: 0 },
	{ clave: '4. REPRESENTACIÓN (HASTA LOS 2 ÚLTIMOS AÑOS)', valor: 3 },
	{ clave: '5. CLIENTES PRINCIPALES (HASTA LOS 2 ÚLTIMOS AÑOS)', valor: 5 },
	{ clave: '6. BENEFICIOS PRIVADOS (HASTA LOS 2 ÚLTIMOS AÑOS)', valor: 2 },
	{ clave: '7. FIDEICOMISOS (HASTA LOS 2 ÚLTIMOS AÑOS)', valor: 1 }
];

const useStyles = makeStyles({
	root: {
		flexGrow: 1,
		width: '100%',
		backgroundColor: '#f2f2f2'
	}
});

export default function MenuSuperior(props) {
	const classes = useStyles();

	return (
		<Paper square className={classes.root}>
			<Grid container spacing={0}>
				<Grid item xs={12} md={2}>
					<MenuLateral value={props.value} setValue={props.setValue} opciones={Inicial} />
				</Grid>
				<Grid item xs={12} md={10}>
					bbbbbb
				</Grid>
			</Grid>
		</Paper>
	);
}
