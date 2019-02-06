import Home from '../components/Home/Home';
import About from '../components/About/About';
import Terminos from '../components/About/Terminos';
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
import Conexion from '../components/Conexion/Conexion';
import DeclaracionesEspecificaciones from '../components/Declaraciones/Especificaciones/Especificaciones';
//import LoginPDN from "../components/Inicio/LoginPDN";
import Consulta from '../components/Conexion/Consulta';

const pdnRoutes = [

    {
        path: "/home",
        component: Home,
        private: true
    },
    {
        path: "/about",// "/"
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
        private: true
    },
    {
        path: "/CatalogoDatos",
        component: Datos,
        private: true
    },
    {
        path: "/sancionados",
        component: Sancionados,
        private: true
    },
    {
        path: "/servidores",
        component: Servidores,
        private: true
    },
    {
        path: "/indicadores",
        component: Indicadores,
        private: true
    },
    {
        path: "/contrataciones",
        component: Contrataciones,
        private: true
    },
    {
        path: "/denuncias",
        component: Denuncias
    },
    {
        path:"/formDenuncia",
        component: FormularioDenuncias,
        private: true
    },
    {
        path:"/formConsultaDenuncia",
        component: FormularioConsula,
        private: true
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
        path: "/declaraciones/especificaciones",
        component: DeclaracionesEspecificaciones,
        private: false
    },
    {
        path: "/consultasolicitudes",
        component : Consulta,
        private: false
    },
];

export default pdnRoutes;
