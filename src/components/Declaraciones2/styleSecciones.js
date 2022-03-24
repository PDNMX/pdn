const CssSeccDeclaraciones = theme => ({
  rootPrincipal: {
    flexGrow: 1,
    width: '100%',
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.opaque
  },
  tituloSeccion: {
    color: '#2EB2E7',
    fontSize: 20,
    fontWeight: 'bold'
  },
  tituloSubSeccion: {
    color: '#2EB2E7',
    fontSize: 14,
    fontWeight: 'bold'
  },
  paper: {
    padding: theme.spacing(2),
    backgroundColor: 'rgba(42, 116, 145)',
    marginBottom: theme.spacing(4),
    color: theme.palette.primario.contrastText
  },
  cardTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    marginBottom: 10,
    color: theme.palette.primario.contrastText
  },
  card: {
    fontSize: 14,
    paddingLeft: 20,
    // marginBottom: 10,
    paddingBottom: 10,
    color: '#155724',
    backgroundColor: '#d4edda',
    borderColor: '#c3e6cb',
    border: '1px solid transparent',
    borderRadius: '.25rem',
    padding: '.75rem 1.25rem',
    marginBottom: '1rem',
    minHeight: '20px'
  },
  cardReserved: {
    fontSize: 14,
    paddingLeft: 20,
    // marginBottom: 10,
    paddingBottom: 10,
    color: '#1b1e21',
    backgroundColor: 'rgb(255,255,255,0.5)',
    borderColor: 'rgb(255,255,255,0.5)',
    border: '1px solid transparent',
    borderRadius: '.25rem',
    padding: '.75rem 1.25rem',
    marginBottom: '1rem'
  },
  alertPrimary: {
    color: '#004085',
    backgroundColor: '#cce5ff',
    borderColor: '#b8daff',
    border: '1px solid transparent',
    borderRadius: '.25rem',
    padding: '.75rem 1.25rem',
    marginBottom: '1rem'
  },
  alertSecondary: {
    color: '#383d41',
    backgroundColor: '#e2e3e5',
    borderColor: '#d6d8db',
    border: '1px solid transparent',
    borderRadius: '.25rem',
    padding: '.75rem 1.25rem',
    marginBottom: '1rem'
  },
  alertSuccess: {
    color: '#155724',
    backgroundColor: '#d4edda',
    borderColor: '#c3e6cb',
    border: '1px solid transparent',
    borderRadius: '.25rem',
    padding: '.75rem 1.25rem',
    marginBottom: '1rem'
  },
  alertDanger: {
    color: '#721c24',
    backgroundColor: '#f8d7da',
    borderColor: '#f5c6cb',
    border: '1px solid transparent',
    borderRadius: '.25rem',
    padding: '.75rem 1.25rem',
    marginBottom: '1rem'
  },
  alertWarning: {
    color: '#856404',
    backgroundColor: '#fff3cd',
    borderColor: '#ffeeba',
    border: '1px solid transparent',
    borderRadius: '.25rem',
    padding: '.75rem 1.25rem',
    marginBottom: '1rem'
  },
  alertInfo: {
    color: '#0c5460',
    backgroundColor: '#d1ecf1',
    borderColor: '#bee5eb',
    border: '1px solid transparent',
    borderRadius: '.25rem',
    padding: '.75rem 1.25rem',
    marginBottom: '1rem'
  },
  alertLight: {
    color: '#818182',
    backgroundColor: '#fefefe',
    borderColor: '#fdfdfe',
    border: '1px solid transparent',
    borderRadius: '.25rem',
    padding: '.75rem 1.25rem',
    marginBottom: '1rem'
  },
  alertDark: {
    color: '#1b1e21',
    backgroundColor: '#d6d8d9',
    borderColor: '#c6c8ca',
    border: '1px solid transparent',
    borderRadius: '.25rem',
    padding: '.75rem 1.25rem',
    marginBottom: '1rem'
  },
  btnBack: {
    color: theme.palette.primary.dark
  },
  resultadosTitulo: {
    backgroundColor: 'rgb(52, 179, 235)',
    color: '#f5f5f5'
  }

  /******************
	root: {
		flexGrow: 1
	},
	//principal
	bgContainer: {
		backgroundColor: theme.palette.pestanas.bg
	},
	card: {
		// backgroundColor: "#34b3eb", //theme.palette.azul.color,
		backgroundColor: theme.palette.pestanas.bg,
		paddingLeft: theme.spacing(1),
		paddingRight: theme.spacing(1),
		paddingTop: theme.spacing(2),
		paddingBottom: theme.spacing(2),
		margin: 0
	},
	cardSeleccionada: {
		backgroundColor: theme.palette.pestanas.activa,
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
		color: theme.palette.textGrey.color,
		marginTop: theme.spacing(7),
		maxWidth: 1200,
		margin: '0 auto'
	},
	whiteText: {
		color: theme.palette.textGrey.color,
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
	textField: {
		// paddingLeft: theme.spacing(1),
		// paddingRight: theme.spacing(1),
	},
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
		paddingLeft: theme.spacing(1),
		//paddingBottom: theme.spacing(4),
		// paddingTop: theme.spacing(4),
		backgroundColor: 'white'
	},
	// forms
	inputShrink: {
		transform: `scale(1)`
	},

	//resultados
	resultadosRoot: {
		width: '100%',
		paddingBottom: theme.spacing(4),
		paddingTop: theme.spacing(4)
	},
	resultadosHeading: {
		fontSize: theme.typography.pxToRem(15),
		fontWeight: theme.typography.fontWeightRegular
	},
	
	resultadoContenido: {
		backgroundColor: 'rgb(242, 242, 242)',
		color: '#666666'
	},
	perfilRoot: {
		paddingBottom: theme.spacing(4),
		paddingTop: theme.spacing(4)
	},
	
    ************/
});
export default CssSeccDeclaraciones;
