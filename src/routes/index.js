import Home from '../components/HomeV2/Home';
import About from '../components/AboutV2/About';
import Terminos from '../components/Terminos/Terminos';
import Faq from '../components/FAQ/index';
import HelpDesk from '../components/HelpDesk/HelpDesk';

import Sistema2 from '../components/Sistema2/Index';
import Sancionados from '../components/Sancionados/Index';
import Sistema4 from '../components/Sistema4';
import Sistema5 from '../components/Sistema5';
import Sistema6 from '../components/Sistema6/index';

import Validador from '../components/Validador/index';
import Especificaciones from '../components/Especificaciones/Landing/Especificaciones';
import DeclaracionesEspecificaciones from '../components/Especificaciones/Declaraciones/Declaraciones';
import EspecificacionesSancionados from '../components/Especificaciones/Sancionados/Sancionados';
import SpecsS2 from '../components/Especificaciones/ServidoresIntervienen/ServidoresIntervienen';
import SpecsS6 from '../components/Especificaciones/Contrataciones/index';
import Cobertura from '../components/Cobertura/Cobertura';
import CoberturaVistaIndividual from "../components/Cobertura/VistaDetalleEstado";

// import DeclaracionesS1 from '../components/Declaraciones';
import DeclaracionesS1v2 from '../components/Declaraciones2';

import IconS2 from "../assets/rediseno2023/imgs/iconos/sistemas/ico_s2.svg";
import IconS3 from "../assets/rediseno2023/imgs/iconos/sistemas/ico_s3.svg";
import IconS6 from "../assets/rediseno2023/imgs/iconos/sistemas/ico_s6.svg";
import IconS1 from "../assets/rediseno2023/imgs/iconos/sistemas/ico_s1.svg";
import IconS4 from "../assets/rediseno2023/imgs/iconos/sistemas/ico_s4.svg";
import IconS5 from "../assets/rediseno2023/imgs/iconos/sistemas/ico_s5.svg";
import IconFAQ from "../assets/rediseno/ico_faq.svg";
import IconEspecificaciones from "../assets/rediseno2023/imgs/iconos/menu/ico_especificaciones.svg";
import IconAbout from "../assets/rediseno2023/imgs/iconos/menu/ico_que-es-pdn.svg";
import IconHelpDesk from "../assets/rediseno2023/imgs/iconos/menu/ico_mesa-ayuda.svg";
import IconValidador from "../assets/rediseno/validador.svg";
import IconCobertura from "../assets/rediseno2023/imgs/iconos/menu/ico_cobertura.svg";


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
		color: "#3a1c3a",
		icon: IconS1,
		disabled: false,
		type: "system"
	},
	{
		exact: true,
		path: '/servidores',
		component: Sistema2,
		private: false,
		name: "Sistema de los servidores públicos que intervengan en procedimientos de contrataciones públicas",
		shortName: "Sistema de Servidores Públicos en contrataciones",
		color: "#3a1c3a",
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
		color: "#3a1c3a",
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
		color: "#3a1c3a",
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
		color: "#3a1c3a",
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
		color: "#3a1c3a",
		icon: IconS6,
		disabled: false,
		type: "system"
	},
	{
		exact: true,
		path: '/especificaciones',
		component: Especificaciones,
		private: false,
		name: "Especificaciones técnicas",
		shortName: "Especificaciones",
		color: "#713972",
		icon: IconEspecificaciones
	},
	{
		exact: true,
		path: '/especificaciones/s1',
		component: DeclaracionesEspecificaciones,
		private: false,							
		name: "Sistema de evolución patrimonial, de declaración de intereses y constancia de presentación de declaración fiscal",
		shortName: "Especificaciones técnicas S1",
		subName:"Especificaciones técnicas",
		color: "#3a1c3a",
		icon: IconS1		
	},
	{
		exact: true,
		path: '/especificaciones/s2',
		component: SpecsS2,
		private: false,
		name: "Sistema de los servidores públicos que intervengan en procedimientos de contrataciones públicas",
		subName:"Especificaciones técnicas",
		shortName: "Especificaciones técnicas S2",
		color: "#3a1c3a",
		icon: IconS2,
	},
	{
		exact: true,
		path: '/especificaciones/s3',
		component: EspecificacionesSancionados,
		private: false,
		name: "Sistema nacional de servidores públicos y particulares sancionados",
		subName:"Especificaciones técnicas",
		shortName: "Especificaciones técnicas S3",
		color: "#3a1c3a",
		icon: IconS3,
	},
	{
		exact: true,
		path: '/especificaciones/s6',
		component: SpecsS6,
		private: false,
		name: "Sistema de información pública de contrataciones",
		subName:"Especificaciones técnicas",
		shortName: "Especificaciones técnicas S6",
		color: "#3a1c3a",
		icon: IconS6,
	},
	{
		exact: true,
		path: '/about',
		component: About,
		private: false,
		name: "¿Qué es la Plataforma Digital Nacional?",
		shortName: "¿Qué es la PDN?",
		color: "#713972",
		icon: IconAbout
	},
	{
		exact: true,
		path: '/terminos',
		component: Terminos,
		private: false,
		name: "Términos de uso",
		shortName: "Términos de uso",
		color: "#3a1c3a",
	},
	{
		exact: true,
		path: '/faq',
		component: Faq,
		private: false,
		name: "Preguntas frecuentes",
		shortName: "FAQ",
		color: "#713972",
		icon: IconFAQ
	},
	{
		exact: true,
		path: '/validador',
		component: Validador,
		private: false,
		name: "Validador",
		shortName: "Validador",
		color: "#713972",
		icon: IconValidador
	},
	{
		exact: true,
		path: '/mesa-de-ayuda',
		component: HelpDesk,
		private: false,
		name: "Mesa de ayuda",
		shortName: "Mesa de ayuda",
		color: "#713972",
		icon: IconHelpDesk
	},
	{
		exact: true,
		path: '/cobertura',
		component: Cobertura,
		private: false,
		name: "Cobertura",
		shortName: "Cobertura",
		color: "#713972",
		icon: IconCobertura
	},
	{
		exact: true,
		path: '/cobertura/:id_estado',
		component: CoberturaVistaIndividual,
		private: false,
		name: "Cobertura",
		shortName: "Cobertura",
		color: "#713972",
		icon: IconCobertura
	}
];

export default pdnRoutes;
