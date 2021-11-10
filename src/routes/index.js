import Home from '../components/Home/Home';

import About from '../components/About/About';
import Terminos from '../components/Terminos/Terminos';
import Faq from '../components/FAQ/index';
import Datos from '../components/CatalogoDatos/Datos';
import Sancionados from '../components/Sancionados/Index';
import Servidores from '../components/ServidoresIntervienen/Index';
import DashboardSancionados from '../components/Sancionados/dashboard/Servidores/Dashboard';
import DashboardParticularesSancionados from '../components/Sancionados/dashboard/Particulares/Dashboard';
import Contrataciones from '../components/Contrataciones/index';
import Validador from '../components/Validador/index';
import Especificaciones from '../components/Especificaciones/Landing/Especificaciones';
import DeclaracionesEspecificaciones from '../components/Especificaciones/Declaraciones/Declaraciones';
import EspecificacionesSancionados from '../components/Especificaciones/Sancionados/Sancionados';
import EspecificacionesServidoresIntervienen from '../components/Especificaciones/ServidoresIntervienen/ServidoresIntervienen';

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
		component: Contrataciones,
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
		path: '/declaraciones/especificaciones',
		component: DeclaracionesEspecificaciones,
		private: false
	},
	{
		exact: true,
		path: '/sancionados/especificaciones',
		component: EspecificacionesSancionados,
		private: false
	},
	{
		exact: true,
		path: '/intervienen/especificaciones',
		component: EspecificacionesServidoresIntervienen,
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
		path: '/contrataciones/especificaciones',
		component: SpecsS6,
		private: false
	}
];

export default pdnRoutes;
