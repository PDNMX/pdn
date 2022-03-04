import Home from '../components/HomeV2/Home';
import About from '../components/AboutV2/About';
import Terminos from '../components/Terminos/Terminos';
import Faq from '../components/FAQ/index';
import Datos from '../components/CatalogoDatos/Datos';
import Sancionados from '../components/Sancionados/Index';
import Servidores from '../components/Sistema2/Index';
import DashboardSancionados from '../components/Sancionados/dashboard/Servidores/Dashboard';
import DashboardParticularesSancionados from '../components/Sancionados/dashboard/Particulares/Dashboard';
import Sistema6 from '../components/Sistema6/index';
import Validador from '../components/Validador/index';
import Especificaciones from '../components/Especificaciones/Landing/Especificaciones';
import DeclaracionesEspecificaciones from '../components/Especificaciones/Declaraciones/Declaraciones';
import EspecificacionesSancionados from '../components/Especificaciones/Sancionados/Sancionados';
import EspecificacionesServidoresIntervienen from '../components/Especificaciones/ServidoresIntervienen/ServidoresIntervienen';
import Sistema4 from '../components/Sistema4';
import Sistema5 from '../components/Sistema5';

import HelpDesk from '../components/HelpDesk/HelpDesk';
// import DeclaracionesS1 from '../components/Declaraciones';
import DeclaracionesS1v2 from '../components/Declaraciones2';
import SpecsS6 from '../components/Especificaciones/Contrataciones/index';

import IconS2 from "../assets/rediseno/ico_sistemas/ico_s2_color.svg";
import IconS3 from "../assets/rediseno/ico_sistemas/ico_s3_color.svg";
import IconS6 from "../assets/rediseno/ico_sistemas/ico_s6_color.svg";
import IconS1 from "../assets/rediseno/ico_sistemas/ico_s1_color.svg";
import IconS4 from "../assets/rediseno/ico_sistemas/ico_s4_color.svg";
import IconS5 from "../assets/rediseno/ico_sistemas/ico_s5_color.svg";

/*
Para que la ruta pueda usarse con el Header genérico debe contar con:
name: "Nombre completo de la sección",
shortName: "Nombre corto de la sección, se usa en el breadcrum",
color: "#", Color que se usara en la fuente y breadcrum
icon: IconS1, Icono de la sección
 */
const pdnRoutes = [
	{
		exact: true,
		path: '/',
		component:Home,
		private: false,
	},
	{
		exact: false,
		path: '/declaraciones',
		component: DeclaracionesS1v2,
		private: false,
		name: "Sistema de evolución patrimonial, de declaración de intereses y constancia de presentación de declaración fiscal",
		shortName: "Sistema de Declaraciones",
		color: "#f29888",
		icon: IconS1,
		disabled: false,
		type: "system"
	},
	{
		exact: true,
		path: '/servidores',
		component: Servidores,
		private: false,
		name: "Sistema de los servidores públicos que intervengan en procedimientos de contrataciones pública",
		shortName: "Sistema de Servidores Públicos en contrataciones",
		color: "#b25fac",
		icon: IconS2,
		disabled: false,
		type: "system"
	},
	{
		exact: true,
		path: '/sancionados',
		component: Sancionados,
		private: false,
		name: "Sistema nacional de servidores públicos y particulares sancionados",
		shortName: "Sistema de Sancionados",
		color: "#9085da",
		icon: IconS3,
		disabled: false,
		type:'system'
	},
	{
		exact: true,
		path: '/fiscalizacion',
		component: Sistema4,
		private: false,
		name: "Sistema de información y comunicación del Sistema Nacional Anticorrupción y del Sistema Nacional de Fiscalización",
		shortName: "Sistema de Fiscalización",
		color: "#88bc69",
		icon: IconS4,
		disabled: true,
		type: "system"
	},
	{
		exact: true,
		path: '/denuncias',
		component: Sistema5,
		private: false,
		name: "Sistema de denuncias públicas de faltas administrativas y hechos de corrupción",
		shortName: "Sistema de Denuncias",
		color: "#34c9b2",
		icon: IconS5,
		disabled: true,
		type: "system"
	},
	{
		exact: true,
		path: '/contrataciones',
		component: Sistema6,
		private: false,
		name: "Sistema de información pública de contrataciones",
		shortName: "Sistema de Contrataciones",
		color: "#42a5cc",
		icon: IconS6,
		disabled: false,
		type: "system"
	},
	{
		exact: true,
		path: '/about',
		component: About,
		private: false
	},
	{
		exact: true,
		path: '/terminos',
		component: Terminos,
		private: false
	},
	{
		exact: true,
		path: '/faq',
		component: Faq,
		private: false
	},
	{
		exact: true,
		path: '/CatalogoDatos',
		component: Datos,
		private: false
	},

	{
		exact: true,
		path: '/sancionados/dashboard',
		component: DashboardSancionados,
		private: false
	},
	{
		exact: true,
		path: '/sancionados/dashboardParticulares',
		component: DashboardParticularesSancionados,
		private: false
	},
	{
		exact: true,
		path: '/especificaciones',
		component: Especificaciones,
		private: false
	},
	{
		exact: true,
		path: '/especificaciones/s1',
		component: DeclaracionesEspecificaciones,
		private: false
	},
	{
		exact: true,
		path: '/especificaciones/s2',
		component: EspecificacionesServidoresIntervienen,
		private: false
	},
	{
		exact: true,
		path: '/especificaciones/s3',
		component: EspecificacionesSancionados,
		private: false
	},
	{
		exact: true,
		path: '/especificaciones/s6',
		component: SpecsS6,
		private: false
	},
	{
		exact: true,
		path: '/Validador',
		component: Validador,
		private: false
	},
	{
		exact: true,
		path: '/mesa-de-ayuda',
		component: HelpDesk,
		private: false
	},

];

export default pdnRoutes;
