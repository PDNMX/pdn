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

const pdnRoutes = [
	{
		exact: true,
		path: '/',
		component: Home,
		private: false
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
		path: '/sancionados',
		component: Sancionados,
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
		path: '/servidores',
		component: Servidores,
		private: false
	},
	{
		exact: true,
		path: '/contrataciones',
		component: Sistema6,
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
	{
		exact: false,
		path: '/declaraciones',
		component: DeclaracionesS1v2,
		private: false
	},
	{
		exact: true,
		path: '/fiscalizacion',
		component: Sistema4,
		private: false
	},
	{
		exact: true,
		path: '/denuncias',
		component: Sistema5,
		private: false
	}
];

export default pdnRoutes;
