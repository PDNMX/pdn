import Home from '../components/Home';
import About from '../components/About';
import Faq from '../components/Faq';

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
    }
];

export default pdnRoutes;
