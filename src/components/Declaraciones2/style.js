import bgimg from '../../assets/rediseno/fondo_cruces_dark.png';

const CssDeclaraciones = theme => ({
  root: {
    flexGrow: 1
  },
  backgroundCruces: {
    flexGrow: 1,
    backgroundImage: `url(${bgimg})`,
    backgroundRepeat: 'repeat',
    backgroundAttachment: 'fixed'
  },
  //principal
  bgContainer: {
    backgroundColor: theme.palette.S1.shade
  },
  card: {
    // backgroundColor: "#34b3eb", //theme.palette.azul.color,
    'backgroundColor': theme.palette.S1.color,
    'paddingLeft': theme.spacing(1),
    'paddingRight': theme.spacing(1),
    'paddingTop': theme.spacing(2),
    'paddingBottom': theme.spacing(2),
    'margin': 0,
    '&:hover': {
      cursor: 'pointer',
      backgroundColor: theme.palette.S1.shade,
      transition: 'background 0.3s ease'
    }
  },
  cardSeleccionada: {
    backgroundColor: theme.palette.S1.shade,
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    margin: 0
  },
  link: {
    textDecoration: 'none',
    color: 'inherit'
  },
  figure: {
    display: 'inline-block',
    float: 'left',
    margin: 0,
    padding: 0,
    paddingRight: '8px'
  },
  image: {
    width: '60px',
    padding: 0,
    margin: 0,
    border: 0
  },
  sectionT: {
    /*color: theme.palette.textGrey.color,*/
    marginTop: theme.spacing(7),
    maxWidth: 1200
    // margin: "0 auto",
  },
  whiteText: {
    /*color: theme.palette.textGrey.color,*/
    padding: '10px'
  },

  h1: {
    fontSize: 21,
    fontWeight: 700
  },
  mail: {
    fontSize: 11,
    fontWeight: 'bold',
    paddingLeft: 21,
    marginBottom: 20
  },

  contenido: {
    fontSize: 14,
    color: '#313233',
    fontWeight: 500,
    marginBottom: 20
  },
  paper: {
    padding: theme.spacing(3, 2)
  },
  //Secciones
  rootSeccion: {
    flexGrow: 1,
    marginTop: 30
  },
  sidebar: {
    background: '#2EB2E7'
  },
  //Subsecciones
  rootSubseccion: {
    flexGrow: 1,
    padding: 15
  },
  titulo: {
    // fontSize: 12,
    color: '#2EB2E7',
    fontWeight: 500,
    fontSize: 20,
    marginBottom: 30
  },
  tituloCard: {
    fontSize: 13,
    fontWeight: 'bold',
    marginBottom: 10
  },
  dataCard: {
    fontSize: 14,
    paddingBottom: 10,
    marginBottom: 10,
    paddingLeft: 20
  },
  lineCard: {
    borderBottom: '4px solid #f2f2f2'
  },
  tituloGeneralCard: {
    fontWeight: 600,
    fontSize: 16
    // color: "#606060",
    // paddingBottom: 10,
    // marginBottom: 10
  },
  gridCard: {
    borderBottom: '1px solid #f2f2f2',
    paddingBottom: 10,
    marginBottom: 10
  },
  gridEndCard: {
    borderBottom: '0px solid #f2f2f2',
    paddingBottom: 10,
    marginBottom: 10
  },
  declarante: {
    display: 'inline-block',
    padding: 5,
    margin: '0px 5px',
    background: '#83dfff'
  },
  conyuge: {
    display: 'inline-block',
    padding: 5,
    margin: '0px 5px',
    background: '#e8b3e2'
  },
  hijos: {
    display: 'inline-block',
    padding: 5,
    margin: '0px 5px',
    background: '#b3cde2'
  },
  padres: {
    display: 'inline-block',
    padding: 5,
    margin: '0px 5px',
    background: '#b3e0ce'
  },
  suegros: {
    display: 'inline-block',
    padding: 5,
    margin: '0px 5px',
    background: '#e5e27f'
  },
  otro: {
    display: 'inline-block',
    padding: 5,
    margin: '0px 5px',
    background: '#e09d9d'
  },
  //Progressbar
  marginProgressbar: {
    margin: theme.spacing(1, 0)
  },
  // graficas
  listaGraficas: {
    listStyle: 'none',
    display: 'inline-block',
    fontSize: 14
  },
  // formulario
  formControl: {
    width: '100%'
  },
  group: {
    margin: theme.spacing(1, 0)
  },
  button: {
    margin: theme.spacing(1),
    // color: "#FFF",
    fontWeight: 'bold'
    // backgroundColor: "#2EB2E7"
  },
  expansion: {
    backgroundColor: '#83dfff',
    color: '#666666',
    textTransform: 'uppercase',
    // backgroundColor: "#2EB2E7",
    fontWeight: 1200,
    fontSize: 16
  },
  expansionpaneldetails: {
    paddingTop: 20,
    paddingBottom: 20
  },
  // informacion sobre buscar declaraciones
  ul: {
    listStyle: 'none',
    //marginLeft: 0,
    paddingLeft: '20px'
  },
  li: {
    '&:before': {
      content: '"•"',
      color: '#5fb1e6',
      fontWeight: 'bold',
      display: 'inline-block',
      width: '1em',
      marginLeft: '-1em'
    }
  },
  infoBusqueda: {
    paddingRight: theme.spacing(1),
    paddingLeft: theme.spacing(1)
    //paddingBottom: theme.spacing(4),
    // paddingTop: theme.spacing(4),
    // backgroundColor: 'white'
  },
  //resultados
  resultadosRoot: {
    width: '100%',
    paddingBottom: theme.spacing(4),
    paddingTop: theme.spacing(4)
  },
  resultadosHeading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightBold
  },
  resultadosTitulo: {
    backgroundColor: theme.palette.background.opaque,
    color: theme.palette.primario.contrastText,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: theme.palette.secundario.main
  },
  resultadoContenido: {
    // backgroundColor: theme.palette.background.opaque,
    backgroundColor: 'rgba(42, 116, 145)',
    color: theme.palette.primario.contrastText,
    // borderStyle: 'solid',
    // borderWidth: 1,
    padding: theme.spacing(2),
    borderLeft: `1px solid ${theme.palette.secundario.main}`,
    borderRight: `1px solid ${theme.palette.secundario.main}`,
    borderBottom: `1px solid ${theme.palette.secundario.main}`
  },
  perfilRoot: {
    paddingBottom: theme.spacing(2),
    paddingTop: theme.spacing(2)
  },
  alertPrimary: {
    fontWeight: 'bolder',
    color: '#004085',
    backgroundColor: '#cce5ff',
    borderColor: '#b8daff',
    border: '1px solid transparent',
    borderRadius: '.25rem',
    padding: '.75rem 1.25rem',
    marginBottom: '1rem'
  },
  alertSecondary: {
    fontWeight: 'bolder',
    color: '#383d41',
    backgroundColor: '#e2e3e5',
    borderColor: '#d6d8db',
    border: '1px solid transparent',
    borderRadius: '.25rem',
    padding: '.75rem 1.25rem',
    marginBottom: '1rem'
  },
  alertSuccess: {
    fontWeight: 'bolder',
    color: '#155724',
    backgroundColor: '#d4edda',
    borderColor: '#c3e6cb',
    border: '1px solid transparent',
    borderRadius: '.25rem',
    padding: '.75rem 1.25rem',
    marginBottom: '1rem'
  },
  alertDanger: {
    fontWeight: 'bolder',
    color: '#721c24',
    backgroundColor: '#f8d7da',
    borderColor: '#f5c6cb',
    border: '1px solid transparent',
    borderRadius: '.25rem',
    padding: '.75rem 1.25rem',
    marginBottom: '1rem'
  },
  alertWarning: {
    fontWeight: 'bolder',
    color: '#856404',
    backgroundColor: '#fff3cd',
    borderColor: '#ffeeba',
    border: '1px solid transparent',
    borderRadius: '.25rem',
    padding: '.75rem 1.25rem',
    marginBottom: '1rem'
  },
  alertInfo: {
    fontWeight: 'bolder',
    color: '#0c5460',
    backgroundColor: '#d1ecf1',
    borderColor: '#bee5eb',
    border: '1px solid transparent',
    borderRadius: '.25rem',
    padding: '.75rem 1.25rem',
    marginBottom: '1rem'
  },
  alertLight: {
    fontWeight: 'bolder',
    color: '#818182',
    backgroundColor: '#fefefe',
    borderColor: '#fdfdfe',
    border: '1px solid transparent',
    borderRadius: '.25rem',
    padding: '.75rem 1.25rem',
    marginBottom: '1rem'
  },
  alertDark: {
    fontWeight: 'bolder',
    color: '#1b1e21',
    backgroundColor: '#d6d8d9',
    borderColor: '#c6c8ca',
    border: '1px solid transparent',
    borderRadius: '.25rem',
    padding: '.75rem 1.25rem',
    marginBottom: '1rem'
  },
  btnBack: {
    color: theme.palette.secundario.light
  },
  logo: {
    width: '60px'
  },
  figure_search: {
    display: 'inline-block',
    float: 'left',
    margin: 0,
    padding: 0,
    paddingRight: '8px'
  },
  selectedTab: {
    borderStyle: 'solid',
    borderColor: theme.palette.secundario.main,
    borderRadius: '10px 10px 0px 0px',
    borderBottomStyle: 'none',
    padding: theme.spacing(1),
    margin: 0,
    display: 'inline-block',
    float: 'left',
    marginRight: 10,
    opacity: 0.7
  },
  labelCard: {
    color: theme.palette.S1.color,
    marginLeft: theme.spacing(1),
    paddingTop: theme.spacing(1),
    fontWeight: 500
  },
  contentsSection: {
    color: theme.palette.secondary.contrastText,
    maxWidth: '1200px'
  },
  paper_search: {
    backgroundColor: theme.palette.background.opaque,
    padding: theme.spacing(4),
    marginBottom: theme.spacing(4),
    color: theme.palette.primario.contrastText,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: theme.palette.secundario.main,
    borderRadius: '0px 10px 10px 10px'
  },
  cuadroActualizacion: {
    fontWeight: 'bolder',
    color: '#0c5460',
    // backgroundColor: '#d1ecf1',
    borderColor: '#bee5eb',
    border: '1px solid transparent',
    borderRadius: '.25rem',
    padding: '.75rem 1.25rem',
    marginBottom: '1rem',
    backgroundColor: '#D1ECF1'
  },
  paper_perfil: {
    backgroundColor: 'rgba(42, 116, 145)',
    padding: theme.spacing(4),
    marginBottom: theme.spacing(4),
    color: theme.palette.primario.contrastText
  },
  text_color: {
    color: theme.palette.primario.contrastText
  },
  menulateral_fondo: {
    backgroundColor: 'rgba(42, 116, 145)'
  },
  enlaces: {
    'textDecoration': 'none',
    // 'color': '#b1bcc1',
    'color': theme.palette.azulPDN,
    '&:visited': {
      color: theme.palette.azulPDN
    },
    '&:link': {
      color: theme.palette.azulPDN
    },
    '&:active': {
      color: theme.palette.azulPDN
    },
    '&:hover': {
      color: '#FFF',
      borderBottom: '2px solid #3ab0e5'
    }
  }
});
export default CssDeclaraciones;
