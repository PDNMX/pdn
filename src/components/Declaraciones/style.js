export default theme => ({
  root: {
    flexGrow: 1
  },
  h1: {
    fontSize: 21,
    fontWeight: 700
  },
  mail: {
    fontSize: 11,
    fontWeight: "bold",
    paddingLeft: 21,
    marginBottom: 20
  },

  contenido: {
    fontSize: 14,
    color: "#313233",
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
    background: "#2EB2E7"
  },
  //Subsecciones
  rootSubseccion: {
    flexGrow: 1,
    padding: 15
  },
  titulo: {
    // fontSize: 12,
    color: "#2EB2E7",
    fontWeight: 500,
    fontSize: 20,
    marginBottom: 30
  },
  tituloCard: {
    fontSize: 13,
    fontWeight: "bold",
    marginBottom: 10
  },
  dataCard: {
    fontSize: 14,
    paddingBottom: 10,
    marginBottom: 10,
    paddingLeft: 20
  },
  lineCard: {
    borderBottom: "4px solid #f2f2f2"
  },
  tituloGeneralCard: {
    fontWeight: 600,
    fontSize: 16
    // color: "#606060",
    // paddingBottom: 10,
    // marginBottom: 10
  },
  gridCard: {
    borderBottom: "1px solid #f2f2f2",
    paddingBottom: 10,
    marginBottom: 10
  },
  gridEndCard: {
    borderBottom: "0px solid #f2f2f2",
    paddingBottom: 10,
    marginBottom: 10
  },
  declarante: {
    display: "inline-block",
    padding: 5,
    margin: "0px 5px",
    background: "#83dfff"
  },
  conyuge: {
    display: "inline-block",
    padding: 5,
    margin: "0px 5px",
    background: "#e8b3e2"
  },
  hijos: {
    display: "inline-block",
    padding: 5,
    margin: "0px 5px",
    background: "#b3cde2"
  },
  padres: {
    display: "inline-block",
    padding: 5,
    margin: "0px 5px",
    background: "#b3e0ce"
  },
  suegros: {
    display: "inline-block",
    padding: 5,
    margin: "0px 5px",
    background: "#e5e27f"
  },
  otro: {
    display: "inline-block",
    padding: 5,
    margin: "0px 5px",
    background: "#e09d9d"
  },
  //Progressbar
  marginProgressbar: {
    margin: theme.spacing(1, 0)
  },
  // graficas
  listaGraficas: {
    listStyle: "none",
    display: "inline-block",
    fontSize: 14
  },
  // formulario
  textField: {
    // paddingLeft: theme.spacing(1),
    // paddingRight: theme.spacing(1),
  },
  formControl: {
    margin: theme.spacing(1),
    display: "flex"
  },
  group: {
    margin: theme.spacing(1, 0)
  },
  button: {
    margin: theme.spacing(1),
    // color: "#FFF",
    fontWeight: "bold"
    // backgroundColor: "#2EB2E7"
  },
  expansion: {
    backgroundColor: "#83dfff",
    color: "#666666",
    textTransform: "uppercase",
    // backgroundColor: "#2EB2E7",
    fontWeight: 1200,
    fontSize: 16
  },
  expansionpaneldetails: {
    paddingTop: 20,
    paddingBottom: 20
  },
  // informacion sobre buscar funcionario
  ul: {
    listStyle: "none",
    //marginLeft: 0,
    paddingLeft: "20px"
  },
  li: {
    "&:before": {
      content: '"•"',
      color: "#5fb1e6",
      fontWeight: "bold",
      display: "inline-block",
      width: "1em",
      marginLeft: "-1em"
    }
  },
  infoBusqueda: {
    paddingRight: theme.spacing(1),
    paddingLeft: theme.spacing(1),
    //paddingBottom: theme.spacing(4),
    // paddingTop: theme.spacing(4),
    backgroundColor: "white"
  },
  // forms
  inputShrink: {
    transform: `scale(1)`
  }
});
