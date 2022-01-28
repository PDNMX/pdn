export default theme => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    margin: theme.spacing(2),
    backgroundColor: '#FFF',
    color: '#55575a',
    flexBasis: ' | auto'
  },
  header: {
    backgroundColor: '#3E5866',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '67%',
    backgroundPosition: 'center center',
    padding: '20%'
  },
  boton: {
    color: '#55575a',
    borderRadius: '50px',
    border: 0,
    backgroundColor: '#edf2f9',
    padding: '5px 10px',
    fontWeight: 'bold'
  },
  boton_span: {
    backgroundColor: '#3ab0e5'
  }
});
