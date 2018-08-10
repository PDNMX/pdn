import Home from '../components/Home';
import About from '../components/About';
import Faq from '../components/Faq';
import Datos from '../components/datos/Datos';
import Sancionados from '../components/Sancionados/Sancionados';
import Servidores from '../components/ServidoresIntervienenContrataciones/Index';

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
        path: "/datos",
        component: Datos
    },
    {
        path: "/sancionados",
        component: Sancionados
    },
    {
        path: "/servidores",
        component: Servidores
    }
];

export default pdnRoutes;
