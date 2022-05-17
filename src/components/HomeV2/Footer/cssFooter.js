const CssFooter = theme => ({
  root: {
    flexGrow: 1,
    height: 250,
    color: '#b1bcc1',
    backgroundColor: theme.palette.background.opaque,
    marginTop: theme.spacing(6)
  },
  emailContacto: {
    'display': 'inline-block',
    'float': 'right',
    'marginRight': 35,
    'textDecoration': 'none',
    'color': '#b1bcc1',
    '&:visited': {
      color: '#b1bcc1'
    },
    '&:link': {
      color: '#b1bcc1'
    },
    '&:active': {
      color: '#b1bcc1'
    },
    '&:hover': {
      color: '#FFF',
      borderBottom: '2px solid #3ab0e5'
    }
  },
  figure: {
    display: 'inline-block',
    float: 'right',
    margin: 0,
    marginRight: 15,
    padding: 0,
    paddingRight: 8
  },
  image: {
    width: '30px',
    padding: 0,
    margin: 0,
    border: 0
  },
  acercade: {
    display: 'inline-block',
    color: '#5d7b8a',
    backgroundColor: '#bae3f7',
    with: '100%',
    height: '50px',
    marginTop: '10px',
    paddingBottom: theme.spacing(1)
  },
  acercade_enlace: {
    'marginRight': 20,
    'textDecoration': 'none',
    'color': '#666',
    '&:visited': {
      color: '#666'
    },
    '&:link': {
      color: '#666'
    },
    '&:active': {
      color: '#666'
    },
    '&:hover': {
      color: '#FFF',
      borderBottom: '2px solid #3ab0e5'
    }
  },
  linkMobile: {
    'paddingBottom': theme.spacing(1),
    'textDecoration': 'none',
    'color': '#b1bcc1',
    '&:visited': {
      color: '#b1bcc1'
    },
    '&:link': {
      color: '#b1bcc1'
    },
    '&:active': {
      color: '#b1bcc1'
    }
  },
  footerMobileSeccEnlaces: {
    marginTop: theme.spacing(3),
    padding: theme.spacing(2),
    color: '#FFF',
    backgroundColor: '#3e5866'
  },
  footerMobileSeccLogos: {
    marginTop: theme.spacing(-1),
    padding: theme.spacing(2),
    color: '#FFF',
    backgroundColor: '#4b6471'
  },
  mobileSESNA: {
    width: '30vw',
    padding: 15,
    margin: 0,
    border: 0
  },
  mobilePDN: {
    width: '40vw',
    padding: 15,
    margin: 0,
    border: 0
  },
  // Center
  centerFoot: {
    backgroundColor: '#124759',
    marginTop: theme.spacing(-3),
    height: 274
  },
  centerFoot_padding: {
    marginTop: theme.spacing(3),
    backgroundColor: 'rgba(255, 255, 255, 0.15)'
  },
  centerFoot_left: {
    padding: '0 10px',
    paddingTop: theme.spacing(6)
  },
  centerFoot_center: {
    paddingTop: theme.spacing(4),
    // paddingLeft: 10,
    height: 250,
    color: '#FFF',
    backgroundColor: 'rgba(255, 255, 255, 0.15)'
  },
  centerFoot_right: {
    padding: '0 10px',
    paddingTop: theme.spacing(6)
  },
  //Right
  lsesna: {
    width: 191,
    padding: 0,
    margin: 0,
    border: 0
  },
  lpdn: {
    width: 242,
    padding: 0,
    margin: 0,
    border: 0
  },
  enlaces: {
    'textDecoration': 'none',
    // 'color': '#b1bcc1',
    'color': '#666',
    '&:visited': {
      color: '#b1bcc1'
    },
    '&:link': {
      color: '#b1bcc1'
    },
    '&:active': {
      color: '#b1bcc1'
    },
    '&:hover': {
      color: '#FFF',
      borderBottom: '2px solid #3ab0e5'
    }
  }
});

export default CssFooter;
