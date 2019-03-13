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
import DemoDeclaraciones from '../components/DemoDeclaraciones/demo';
import Conexion from '../components/Conexion/Solicitudes/Conexion';
import Validador from '../components/Validador/index';
import ConsolaAdministracionSO from '../components/Conexion/Administracion/ConsolaAdministracionSO';
import ConsolaAdministracionPDN from '../components/Administracion/Index';
import ConsultaUsuarios from '../components/Administracion/Usuarios/ConsultaUsuarios';
import Consulta from '../components/Administracion/Conexiones/ConsultaSolicitudes';
import ConsultaConexiones from '../components/Administracion/Conexiones/ConsultaConexiones';

import Especificaciones from '../components/Especificaciones/Especificaciones';
import DeclaracionesEspecificaciones from '../components/Especificaciones/Declaraciones/Especificaciones';
import EspecificacionesSancionados from "../components/Especificaciones/Sancionados/Sancionados";
import EspecificacionesServidoresIntervienen from "../components/Especificaciones/ServidoresIntervienen/ServidoresIntervienen";

const pdnRoutes = [

    {
        path: "/", // /"home",
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
        path : "/demodeclaraciones",
        component: DemoDeclaraciones,
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
        private: false
    },
    {
        path: "/consolaAdmonSO",
        component: ConsolaAdministracionSO,
        private: false
    },
    {
        path: "/administracionPDN",
        component: ConsolaAdministracionPDN,
        private: false
    },
    {
        path: "/administracionPDN/usuarios",
        component : ConsultaUsuarios,
        private: false
    },
    {
        path: "/administracionPDN/consultaconexiones",
        component : ConsultaConexiones,
        private: false
    },

];

export default pdnRoutes;
