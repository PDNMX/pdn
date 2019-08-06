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
    background: "#34b3eb"
  },
  //Subsecciones
  rootSubseccion: {
    flexGrow: 1,
    padding: 15
  },
  titulo: {
    // fontSize: 12,
    color: "#34b3eb",
    fontWeight: 500,
    fontSize: 20,
    marginBottom: 30
  },
  tituloCard: {
    fontSize: 13,
    fontWeight: "bold",
    marginBottom: 5
  },
  dataCard: {
    fontSize: 14,
    paddingBottom: 10,
    marginBottom: 10
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
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "100%"
  },
  formControl: {
    margin: theme.spacing(3),
    display: "flex"
  },
  group: {
    margin: theme.spacing(1, 0)
  },
  button: {
    margin: theme.spacing(1),
    color: "#FFF",
    fontWeight: "bold",
    backgroundColor: "#34b3eb"
  },
  expansion: {
    backgroundColor: "#83dfff",
    color: "white",
    textTransform: "uppercase",
    // backgroundColor: "#34b3eb",
    fontWeight: 1200,
    fontSize: 16
  },
  expansionpaneldetails: {
    paddingTop: 20,
    paddingBottom: 20
  }
});
