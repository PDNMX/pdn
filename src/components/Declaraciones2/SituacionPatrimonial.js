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

const situacionPatrimonial = (data, tipo) => {
	let {
		datosCurricularesDeclarante,
		experienciaLaboral,
		bienesInmuebles,
		vehiculos,
		bienesMuebles,
		inversiones,
		adeudos,
		prestamoOComodato
	} = data;

	let bienInmueble = bienesInmuebles.bienInmueble.filter(
		(i) => i.titular.length === 1 && i.titular[0].clave === 'DEC'
	);
	let vehiculo = vehiculos.vehiculo.filter((i) => i.titular.length === 1 && i.titular[0].clave === 'DEC');
	let bienMueble = bienesMuebles.bienMueble.filter((i) => i.titular.length === 1 && i.titular[0].clave === 'DEC');
	let inversion = inversiones.inversion.filter((i) => i.titular.length === 1 && i.titular[0].clave === 'DEC');
	let adeudo = adeudos.adeudo.filter((i) => i.titular.length === 1 && i.titular[0].clave === 'DEC');

	const tDatosCurricurales =
		typeof datosCurricularesDeclarante === 'undefined' ? 0 : datosCurricularesDeclarante.escolaridad.length;

	const tExperienciaLaboral = typeof experienciaLaboral === 'undefined' ? 0 : experienciaLaboral.experiencia.length;

	const tPrestamoOComodato = typeof prestamoOComodato === 'undefined' ? 0 : prestamoOComodato.prestamo.length;

	const menu = [
		{ clave: 'DATOS GENERALES', valor: 0 },
		{ clave: 'DOMICILIO DEL DECLARANTE', valor: 0 },
		{
			clave: 'DATOS CURRICULARES DEL DECLARANTE',
			valor: tDatosCurricurales
		},
		{ clave: 'DATOS DEL EMPLEO, CARGO O COMISIÓN', valor: 0 },
		{
			clave: 'EXPERIENCIA LABORAL',
			valor: tExperienciaLaboral
		},
		{ clave: 'DATOS DE LA PAREJA', valor: 0 },
		{ clave: 'DATOS DEL DEPENDIENTE ECONÓMICO', valor: 0 },
		{
			clave: 'INGRESOS NETOS DEL DECLARANTE, PAREJA Y/O DEPENDIENTES ECONÓMICOS',
			valor: 0
		}
	];

	const menu2 = [
		{ clave: 'BIENES INMUEBLES', valor: bienInmueble.length },
		{ clave: 'VEHÍCULOS', valor: vehiculo.length },
		{ clave: 'BIENES MUEBLES', valor: bienMueble.length },
		{
			clave: 'INVERSIONES, CUENTAS BANCARIAS Y OTRO TIPO DE VALORES/ACTIVOS',
			valor: inversion.length
		},
		{ clave: 'ADEUDOS/PASIVOS', valor: adeudo.length },
		{
			clave: 'PRÉSTAMO O COMODATO POR TERCEROS',
			valor: tPrestamoOComodato
		}
	];

	switch (tipo) {
		case 'INICIAL':
			return [
				...menu,
				{
					clave: '¿TE DESEMPEÑASTE COMO SERVIDOR PÚBLICO EN EL AÑO INMEDIATO ANTERIOR?',
					valor: 0
				},
				...menu2
			];
		case 'MODIFICACIÓN':
			return [ ...menu, ...menu2 ];
		case 'CONCLUSIÓN':
			return [
				...menu,
				{
					clave: '¿TE DESEMPEÑASTE COMO SERVIDOR PÚBLICO EN EL AÑO INMEDIATO ANTERIOR?',
					valor: 0
				},
				...menu2
			];
		default:
			console.log(tipo);
			break;
	}
};

const useStyles = makeStyles({
	root: {
		flexGrow: 1,
		width: '100%',
		backgroundColor: '#f2f2f2'
	}
});

function OpcionInicialConclusion(valor, data, tipo) {
	switch (valor) {
		case 0:
			return <DatosGenerales data={data.datosGenerales} />;
		case 1:
			return <Domicilio />;
		case 2:
			return <DatosCurriculares data={data.datosCurricularesDeclarante} />;
		case 3:
			return <EmpleoCargoComision data={data.datosEmpleoCargoComision} tipo={tipo} />;
		case 4:
			return <ExperienciaLaboral data={data.experienciaLaboral} />;
		case 5:
			return <DatosPareja />;
		case 6:
			return <DependientesEconomicos />;
		case 7:
			return <Ingresos data={data.ingresos} tipo={tipo} />;
		case 8:
			return <ServidorAnioAnterior data={data.actividadAnualAnterior} />;
		case 9:
			return <Bienesinmuebles data={data.bienesInmuebles} />;
		case 10:
			return <Vehiculos data={data.vehiculos} />;
		case 11:
			return <BienesMuebles data={data.bienesMuebles} />;
		case 12:
			return <Inversiones data={data.inversiones} tipo={tipo} />;
		case 13:
			return <Adeudos data={data.adeudos} tipo={tipo} />;
		case 14:
			return <Prestamo data={data.prestamoOComodato} />;
		default:
			break;
	}
}

function OpcionModificacion(valor, data, tipo) {
	switch (valor) {
		case 0:
			return <DatosGenerales data={data.datosGenerales} />;
		case 1:
			return <Domicilio />;
		case 2:
			return <DatosCurriculares data={data.datosCurricularesDeclarante} />;
		case 3:
			return <EmpleoCargoComision data={data.datosEmpleoCargoComision} tipo={tipo} />;
		case 4:
			return <ExperienciaLaboral data={data.experienciaLaboral} />;
		case 5:
			return <DatosPareja />;
		case 6:
			return <DependientesEconomicos />;
		case 7:
			return <Ingresos data={data.ingresos} tipo={tipo} />;
		case 8:
			return <Bienesinmuebles data={data.bienesInmuebles} />;
		case 9:
			return <Vehiculos data={data.vehiculos} />;
		case 10:
			return <BienesMuebles data={data.bienesMuebles} />;
		case 11:
			return <Inversiones data={data.inversiones} tipo={tipo} />;
		case 12:
			return <Adeudos data={data.adeudos} tipo={tipo} />;
		case 13:
			return <Prestamo data={data.prestamoOComodato} />;
		default:
			break;
	}
}

function opcion(valor, data, tipo) {
	switch (tipo) {
		case 'INICIAL':
			return OpcionInicialConclusion(valor, data, tipo);
		case 'MODIFICACIÓN':
			return OpcionModificacion(valor, data, tipo);
		case 'CONCLUSIÓN':
			return OpcionInicialConclusion(valor, data, tipo);
		default:
			console.log(tipo);
			break;
	}
}

export default function MenuSuperior({ data, value, setValue, tipo }) {
	const classes = useStyles();

	return (
		<Paper square className={classes.root}>
			<Grid container spacing={0}>
				<Grid item xs={12} md={2} style={{ backgroundColor: '#34b3eb' }}>
					<MenuLateral value={value} setValue={setValue} opciones={situacionPatrimonial(data, tipo)} />
				</Grid>
				<Grid item xs={12} md={10}>
					{opcion(value, data, tipo)}
				</Grid>
			</Grid>
		</Paper>
	);
}
