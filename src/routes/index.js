import Home from '../components/Home';
import About from '../components/About';
import Faq from '../components/FAQ/index';
import Datos from '../components/CatalogoDatos/Datos';
import Sancionados from '../components/Sancionados/Index';
import Servidores from '../components/ServidoresIntervienen/Index';
import Indicadores from '../components/Indicadores/Indicadores';
import Contrataciones from '../components/Contrataciones/index';
import Denuncias from '../components/Denuncias/Index';
import FormularioDenuncias from '../components/Denuncias/FormularioDenuncia/FormularioDenuncia'
import FormularioConsula from '../components/Denuncias/ConsultaDenuncia/FormularioConsulta'

const pdnRoutes = [
    {
        path: "/",
       component: Home
    },
    {
        path: "/about",
        component: About
    },
    {
        path: "/faq",
        component: Faq
    },
    {
        path: "/CatalogoDatos",
        component: Datos
    },
    {
        path: "/sancionados",
        component: Sancionados
    },
    {
        path: "/servidores",
        component: Servidores
    },
    {
        path: "/indicadores",
        component: Indicadores
    },
    {
        path: "/contrataciones",
        component: Contrataciones
    },
    {
        path: "/denuncias",
        component: Denuncias
    },
    {
        path:"/formDenuncia",
        component: FormularioDenuncias
    },
    {
        path:"/formConsultaDenuncia",
        component: FormularioConsula
    }
];

export default pdnRoutes;
