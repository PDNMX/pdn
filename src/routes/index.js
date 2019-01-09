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

const pdnRoutes = [

    {
        path: "/pdn/home",
        component: Home,
        private: true
    },
    {
        path: "/", // "/about"
        component: About,
        private: false
    },
    {
        path: "/terminos",
        component: Terminos,
        private: false
    },
    {
        path: "/pdn/faq",
        component: Faq,
        private: true
    },
    {
        path: "/pdn/CatalogoDatos",
        component: Datos,
        private: true
    },
    {
        path: "/pdn/sancionados",
        component: Sancionados,
        private: true
    },
    {
        path: "/pdn/servidores",
        component: Servidores,
        private: true
    },
    {
        path: "/pdn/indicadores",
        component: Indicadores,
        private: true
    },
    {
        path: "/pdn/contrataciones",
        component: Contrataciones,
        private: true
    },
    {
        path: "/pdn/denuncias",
        component: Denuncias
    },
    {
        path:"/pdn/formDenuncia",
        component: FormularioDenuncias,
        private: true
    },
    {
        path:"/pdn/formConsultaDenuncia",
        component: FormularioConsula,
        private: true
    },
    {
        path : "/pdn/demodeclaraciones",
        component: DemoDeclaraciones,
        private: true
    },
    {
        path: "/pdn/conexion",
        component : Conexion,
        private: false
    },
    {
        path: "/declaraciones/especificaciones",
        component: DeclaracionesEspecificaciones,
        private: false
    }
];

export default pdnRoutes;
