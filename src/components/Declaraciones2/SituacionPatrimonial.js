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
import DependientesEconomicos from './SituacionPatrimonial/07DatosDependienteEconomico';
import Ingresos from './SituacionPatrimonial/08Ingresos';
import ServidorAnioAnterior from './SituacionPatrimonial/09ServidorAnioAnterior';
import Bienesinmuebles from './SituacionPatrimonial/10Bienesinmuebles';
import Vehiculos from './SituacionPatrimonial/11Vehiculos';
import BienesMuebles from './SituacionPatrimonial/12BienesMuebles';
import Inversiones from './SituacionPatrimonial/13Inversiones';
import Adeudos from './SituacionPatrimonial/14Adeudos';
import Prestamo from './SituacionPatrimonial/15Prestamo';

const Inicial = [
	{ clave: '1. DATOS GENERALES', valor: 0 },
	{ clave: '2. DOMICILIO DEL DECLARANTE', valor: 0 },
	{ clave: '3. DATOS CURRICULARES DEL DECLARANTE', valor: 2 },
	{ clave: '4. DATOS DEL EMPLEO, CARGO O COMISIÓN QUE INICIA', valor: 1 },
	{ clave: '5. EXPERIENCIA LABORAL', valor: 2 },
	{ clave: '6. DATOS DE LA PAREJA', valor: 0 },
	{ clave: '7. DATOS DEL DEPENDIENTE ECONÓMICO', valor: 0 },
	{ clave: '8. INGRESOS NETOS DEL DECLARANTE, PAREJA Y/O DEPENDIENTES ECONÓMICOS', valor: 0 },
	{ clave: '9. ¿TE COMO SERVIDOR PÚBLICO EN EL AÑO INMEDIATO ANTERIOR?', valor: 0 },
	{ clave: '10. BIENES INMUEBLES', valor: 5 },
	{ clave: '11. VEHÍCULOS', valor: 2 },
	{ clave: '12. BIENES MUEBLES', valor: 'P' },
	{ clave: '13. INVERSIONES, CUENTAS BANCARIAS Y OTRO TIPO DE VALORES / ACTIVOS', valor: 0 },
	{ clave: '14. ADEUDOS / PASIVOS', valor: 0 },
	{ clave: '15. PRÉSTAMO O COMODATO POR TERCEROS', valor: 0 }
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
			return <Domicilio />;
		case 2:
			return <DatosCurriculares data={data.datosCurricularesDeclarante} />;
		case 3:
			return <EmpleoCargoComision data={data.datosEmpleoCargoComision} />;
		case 4:
			return <ExperienciaLaboral data={data.experienciaLaboral} />;
		case 5:
			return <DatosPareja />;
		case 6:
			return <DependientesEconomicos />;
		case 7:
			return <Ingresos data={data.ingresos} />;
		case 8:
			return <ServidorAnioAnterior data={data.actividadAnualAnterior} />;
		case 9:
			return <Bienesinmuebles data={data.bienesInmuebles} />;
		case 10:
			return <Vehiculos data={data.datosGenerales} />;
		case 11:
			return <BienesMuebles data={data.datosGenerales} />;
		case 12:
			return <Inversiones data={data.datosGenerales} />;
		case 13:
			return <Adeudos data={data.datosGenerales} />;
		case 14:
			return <Prestamo data={data.datosGenerales} />;
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
				<Grid item xs={12} md={2} style={{ backgroundColor: '#34b3eb' }}>
					<MenuLateral value={props.value} setValue={props.setValue} opciones={Inicial} />
				</Grid>
				<Grid item xs={12} md={10}>
					{opcion(props.value, data)}
				</Grid>
			</Grid>
		</Paper>
	);
}
