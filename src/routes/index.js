import Home from "../components/Home/Home";
import About from "../components/About/About";
import Terminos from "../components/Terminos/Terminos";
import Faq from "../components/FAQ/index";
import Datos from "../components/CatalogoDatos/Datos";
import Sancionados from "../components/Sancionados/Index";
import Servidores from "../components/ServidoresIntervienen/Index";
import Indicadores from "../components/Indicadores/Indicadores";
import Contrataciones from "../components/Contrataciones/index";
import Denuncias from "../components/Denuncias/Index";
import FormularioDenuncias from "../components/Denuncias/FormularioDenuncia/FormularioDenuncia";
import FormularioConsula from "../components/Denuncias/ConsultaDenuncia/FormularioConsulta";
import Conexion from "../components/Conexion/Solicitudes/Conexion";
import Validador from "../components/Validador/index";
import ConsolaAdministracionSO from "../components/Conexion/Administracion/ConsolaAdministracionSO";
import ConsolaAdministracionPDN from "../components/Administracion/Index";
import ConsultaUsuarios from "../components/Administracion/Usuarios/ConsultaUsuarios";
import Consulta from "../components/Administracion/Conexiones/ConsultaSolicitudes";
import ConsultaConexiones from "../components/Administracion/Conexiones/ConsultaConexiones";

import Especificaciones from "../components/Especificaciones/Landing/Especificaciones";
import DeclaracionesEspecificaciones from "../components/Especificaciones/Declaraciones/Declaraciones";
import EspecificacionesSancionados from "../components/Especificaciones/Sancionados/Sancionados";
import EspecificacionesServidoresIntervienen from "../components/Especificaciones/ServidoresIntervienen/ServidoresIntervienen";
import DashboardSancionados from "../components/Sancionados/dashboard/Servidores/Dashboard";
import DashboardParticularesSancionados from "../components/Sancionados/dashboard/Particulares/Dashboard";

import Declaraciones from "../components/Declaraciones";

import Metodologia from "../components/GAA/Calidad/Metodologia";
import HelpDesk from "../components/HelpDesk/HelpDesk";
import GAA from "../components/GAA/GAA";

const pdnRoutes = [
  {
    exact: true,
    path: "/",
    component: Home,
    private: false
  },
  {
    exact: true,
    path: "/about",
    component: About,
    private: false
  },
  {
    exact: true,
    path: "/terminos",
    component: Terminos,
    private: false
  },
  {
    exact: true,
    path: "/faq",
    component: Faq,
    private: false
  },
  {
    exact: true,
    path: "/CatalogoDatos",
    component: Datos,
    private: false
  },
  {
    exact: true,
    path: "/sancionados",
    component: Sancionados,
    private: false
  },
  {
    exact: true,
    path: "/sancionados/dashboard",
    component: DashboardSancionados,
    private: false
  },
  {
    exact: true,
    path: "/sancionados/dashboardParticulares",
    component: DashboardParticularesSancionados,
    private: false
  },
  {
    exact: true,
    path: "/servidores",
    component: Servidores,
    private: false
  },
  {
    exact: true,
    path: "/indicadores",
    component: Indicadores,
    private: false
  },
  {
    exact: true,
    path: "/contrataciones",
    component: Contrataciones,
    private: false
  },
  {
    exact: true,
    path: "/denuncias",
    component: Denuncias
  },
  {
    exact: true,
    path: "/formDenuncia",
    component: FormularioDenuncias,
    private: false
  },
  {
    exact: true,
    path: "/formConsultaDenuncia",
    component: FormularioConsula,
    private: false
  },
  {
    exact: true,
    path: "/conexion",
    component: Conexion,
    private: false
  },
  {
    exact: true,
    path: "/especificaciones",
    component: Especificaciones,
    private: false
  },
  {
    exact: true,
    path: "/declaraciones/especificaciones",
    component: DeclaracionesEspecificaciones,
    private: false
  },
  {
    exact: true,
    path: "/sancionados/especificaciones",
    component: EspecificacionesSancionados,
    private: false
  },
  {
    exact: true,
    path: "/intervienen/especificaciones",
    component: EspecificacionesServidoresIntervienen,
    private: false
  },
  {
    exact: true,
    path: "/Validador",
    component: Validador,
    private: false
  },
  {
    exact: true,
    path: "/administracionPDN/consultasolicitudes",
    component: Consulta,
    private: false,
    perfom: "admon-pdn-consultaSolicitudes:visit"
  },
  {
    exact: true,
    path: "/consolaAdmonSO",
    component: ConsolaAdministracionSO,
    private: false,
    perfom: "admon-conexion-so:visit"
  },
  {
    exact: true,
    path: "/administracionPDN",
    component: ConsolaAdministracionPDN,
    private: false,
    perfom: "admon-pdn-page:visit"
  },
  {
    exact: true,
    path: "/administracionPDN/usuarios",
    component: ConsultaUsuarios,
    private: false,
    perfom: "admon-pdn-usuarios:visit"
  },
  {
    exact: true,
    path: "/administracionPDN/consultaconexiones",
    component: ConsultaConexiones,
    private: false,
    perfom: "admon-pdn-consultaConexiones:visit"
  },
  {
    exact: true,
    path: "/gaa",
    component: GAA,
    private: false
  },
  {
    exact: true,
    path: "/gaa/calidad",
    component: Metodologia,
    private: false
  },
  {
    exact: true,
    path: "/mesa-de-ayuda",
    component: HelpDesk,
    private: false
  },
  {
    exact: false,
    path: "/declaraciones",
    component: Declaraciones,
    private: false
  }
];

export default pdnRoutes;
