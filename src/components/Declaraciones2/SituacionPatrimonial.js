import React from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import MenuLateral from './MenuLateral';
import DatosGenerales from './SituacionPatrimonial/01DatosGenerales';
import Domicilio from './SituacionPatrimonial/02Domicilio';
import DatosCurriculares from './SituacionPatrimonial/03DatosCurriculares';
import EmpleoCargoComision from './SituacionPatrimonial/04EmpleoCargoComision';
import ExperienciaLaboral from './SituacionPatrimonial/05ExperienciaLaboral';
import DatosPareja from './SituacionPatrimonial/06DatosPareja';
import DependientesEconomicos from './SituacionPatrimonial/07DependientesEconomicos';

const Inicial = [
	{ clave: '1. DATOS GENERALES', valor: 0 },
	{ clave: '2. DOMICILIO DEL DECLARANTE', valor: 0 },
	{ clave: '3. DATOS CURRICULARES DEL DECLARANTE', valor: 0 },
	{ clave: '4. DATOS DEL EMPLEO, CARGO O COMISIÓN QUE INICIA', valor: 0 },
	{ clave: '5. EXPERIENCIA LABORAL', valor: 1 },
	{ clave: '6. DATOS DE LA PAREJA', valor: 0 },
	{ clave: '7. DATOS DEL DEPENDIENTE ECONÓMICO', valor: 2 },
	{ clave: '8. INGRESOS NETOS DEL DECLARANTE, PAREJA Y/O DEPENDIENTES ECONÓMICOS (SITUACIÓN ACTUAL)', valor: 0 },
	{ clave: '9. ¿TE COMO SERVIDOR PÚBLICO EN EL AÑO INMEDIATO ANTERIOR?', valor: 0 },
	{ clave: '10. BIENES INMUEBLES (SITUACIÓN ACTUAL)', valor: 5 },
	{ clave: '11. VEHÍCULOS (SITUACIÓN ACTUAL)', valor: 2 },
	{ clave: '12. BIENES MUEBLES (SITUACIÓN ACTUAL)', valor: 'P' },
	{ clave: '13. INVERSIONES, CUENTAS BANCARIAS Y OTRO TIPO DE VALORES / ACTIVOS (SITUACIÓN ACTUAL)', valor: 0 },
	{ clave: '14. ADEUDOS / PASIVOS (SITUACIÓN ACTUAL)', valor: 0 },
	{ clave: '15. PRÉSTAMO O COMODATO POR TERCEROS (SITUACIÓN ACTUAL)', valor: 0 }
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
			return <DatosGenerales data={data.datosGenerales} />;
		case 1:
			return <Domicilio data={data.domicilioDeclarante} />;
		case 2:
			return <DatosCurriculares data={data.datosCurricularesDeclarante} />;
		case 3:
			return <EmpleoCargoComision data={data.datosEmpleoCargoComision} />;
		case 4:
			return <ExperienciaLaboral data={data.experienciaLaboral} />;
		case 5:
			return <DatosPareja data={data.datosPareja} />;
		case 6:
			return <DependientesEconomicos data={data.datosDependienteEconomico} />;
		// case 7:
		// 	return <DatosGenerales data={data.datosGenerales} />;
		// case 8:
		// 	return <DatosGenerales data={data.datosGenerales} />;
		// case 9:
		// 	return <DatosGenerales data={data.datosGenerales} />;
		// case 10:
		// 	return <DatosGenerales data={data.datosGenerales} />;
		// case 11:
		// 	return <DatosGenerales data={data.datosGenerales} />;
		// case 12:
		// 	return <DatosGenerales data={data.datosGenerales} />;
		// case 13:
		// 	return <DatosGenerales data={data.datosGenerales} />;
		// case 14:
		// 	return <DatosGenerales data={data.datosGenerales} />;		
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
