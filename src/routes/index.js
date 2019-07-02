import Home from '../components/Home/Home';
import About from '../components/About/About';
import Terminos from '../components/Terminos/Terminos';
import Faq from '../components/FAQ/index';
import Datos from '../components/CatalogoDatos/Datos';
import Sancionados from '../components/Sancionados/Index';
import Servidores from '../components/ServidoresIntervienen/Index';
import Indicadores from '../components/Indicadores/Indicadores';
import Contrataciones from '../components/Contrataciones/index';
import Denuncias from '../components/Denuncias/Index';
import FormularioDenuncias from '../components/Denuncias/FormularioDenuncia/FormularioDenuncia';
import FormularioConsula from '../components/Denuncias/ConsultaDenuncia/FormularioConsulta';
import Conexion from '../components/Conexion/Solicitudes/Conexion';
import Validador from '../components/Validador/index';
import ConsolaAdministracionSO from '../components/Conexion/Administracion/ConsolaAdministracionSO';
import ConsolaAdministracionPDN from '../components/Administracion/Index';
import ConsultaUsuarios from '../components/Administracion/Usuarios/ConsultaUsuarios';
import Consulta from '../components/Administracion/Conexiones/ConsultaSolicitudes';
import ConsultaConexiones from '../components/Administracion/Conexiones/ConsultaConexiones';

import Especificaciones from '../components/Especificaciones/Landing/Especificaciones';
import DeclaracionesEspecificaciones from '../components/Especificaciones/Declaraciones/Declaraciones';
import EspecificacionesSancionados from "../components/Especificaciones/Sancionados/Sancionados";
import EspecificacionesServidoresIntervienen from "../components/Especificaciones/ServidoresIntervienen/ServidoresIntervienen";
import DashboardSancionados from "../components/Sancionados/dashboard/Servidores/Dashboard";
import DashboardParticularesSancionados from "../components/Sancionados/dashboard/Particulares/Dashboard";



import Metodologia from "../components/GAA/Calidad/Metodologia";
import HelpDesk from "../components/HelpDesk/HelpDesk";
import GAA from "../components/GAA/GAA";

const pdnRoutes = [

    {
        path: "/",
        component: Home,
        private: false
    },
    {
        path: "/about",
        component: About,
        private: false
    },
    {
        path: "/terminos",
        component: Terminos,
        private: false
    },
    {
        path: "/faq",
        component: Faq,
        private: false
    },
    {
        path: "/CatalogoDatos",
        component: Datos,
        private: false
    },
    {
        path: "/sancionados",
        component: Sancionados,
        private: false
    },
    {
        path: "/sancionados/dashboard",
        component: DashboardSancionados,
        private: false
    },
    {
        path: "/sancionados/dashboardParticulares",
        component: DashboardParticularesSancionados,
        private: false
    },
    {
        path: "/servidores",
        component: Servidores,
        private: false
    },
    {
        path: "/indicadores",
        component: Indicadores,
        private: false
    },
    {
        path: "/contrataciones",
        component: Contrataciones,
        private: false
    },
    {
        path: "/denuncias",
        component: Denuncias
    },
    {
        path:"/formDenuncia",
        component: FormularioDenuncias,
        private: false
    },
    {
        path:"/formConsultaDenuncia",
        component: FormularioConsula,
        private: false
    },
    {
        path: "/conexion",
        component : Conexion,
        private: false
    },
    {
        path: "/especificaciones",
        component:  Especificaciones,
        private: false
    },
    {
        path: "/declaraciones/especificaciones",
        component: DeclaracionesEspecificaciones,
        private: false
    },
    {
        path: "/sancionados/especificaciones",
        component: EspecificacionesSancionados,
        private: false
    },
    {
        path: "/intervienen/especificaciones",
        component: EspecificacionesServidoresIntervienen,
        private: false
    },
    {
        path: '/Validador',
        component: Validador,
        private: false
    },
    {
        path: "/administracionPDN/consultasolicitudes",
        component : Consulta,
        private: true,
        perfom:'admon-pdn-consultaSolicitudes:visit'
    },
    {
        path: "/consolaAdmonSO",
        component: ConsolaAdministracionSO,
        private: true,
        perfom: "admon-conexion-so:visit"
    },
    {
        path: "/administracionPDN",
        component: ConsolaAdministracionPDN,
        private: true,
        perfom: "admon-pdn-page:visit"
    },
    {
        path: "/administracionPDN/usuarios",
        component : ConsultaUsuarios,
        private: true,
        perfom : "admon-pdn-usuarios:visit"
    },
    {
        path: "/administracionPDN/consultaconexiones",
        component : ConsultaConexiones,
        private: true,
        perfom : "admon-pdn-consultaConexiones:visit"
    },
    {
        path: "/gaa",
        component: GAA,
        private: false
    },
    {
        path: "/gaa/calidad",
        component: Metodologia,
        private: false
    },
    {
        path: "/mesa-de-ayuda",
        component: HelpDesk,
        private: false
    }

];

export default pdnRoutes;
