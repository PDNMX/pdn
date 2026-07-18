import PropTypes from 'prop-types'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
// import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle'
import DownloadIcon from '@mui/icons-material/CloudDownload'
import Typography from '@mui/material/Typography'
import withStyles from '@mui/styles/withStyles'
import { Box, Paper } from '@mui/material'
import ButtonPDN from '../Compartidos/ButtonPDN'

// FIXME checkout https://mui.com/components/use-media-query/#using-material-uis-breakpoint-helpers
// const withMobileDialog = () => (WrappedComponent) => (props) => <WrappedComponent {...props} width="lg" fullScreen={false} />;

const styles = theme => ({
  button: {
    // background: '#ffe01b',
    marginLeft: theme.spacing(1)
  },
  divider: {
    marginBottom: theme.spacing(1)
  },
  title: {
    color: theme.palette.primary.main
  }
})

const JsonValue = ({ name, value, depth = 0 }) => {
  const isObject = value !== null && typeof value === 'object'

  if (!isObject) {
    return (
      <Box component='div' sx={{ pl: depth * 2, fontFamily: 'monospace', overflowWrap: 'anywhere' }}>
        {name !== undefined && <b>{name}: </b>}
        {JSON.stringify(value)}
      </Box>
    )
  }

  const entries = Object.entries(value)
  const label = Array.isArray(value) ? `[${entries.length}]` : `{${entries.length}}`

  return (
    <Box component='details' open={depth < 1} sx={{ pl: depth * 2, fontFamily: 'monospace' }}>
      <Box component='summary' sx={{ cursor: 'pointer' }}>
        {name !== undefined && <b>{name}: </b>}{label}
      </Box>
      {entries.map(([key, child]) => (
        <JsonValue key={key} name={key} value={child} depth={depth + 1} />
      ))}
    </Box>
  )
}

function ResponsiveDialog (props) {
  const { fullScreen, open, handleCloseDialog, data, classes } = props
  /*
    const [open, setOpen] = React.useState(false);

    function handleClickOpen() {
        setOpen(true);
    }

    function handleClose() {
        setOpen(false);
        open = false;
    }
    */

  function handleDownload () {
    const text = JSON.stringify(props.data, null, 4)
    const d = new Blob([text], { type: 'text/plain' })

    return window.URL.createObjectURL(d)
  }

  const getTotal = data => {
    let total = 0
    try {
      const reducer = (accum, contract) => accum + contract.value.amount
      total = data.contracts.reduce(reducer, 0)
      total = new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(total)
    } catch (e) {
      console.log(e)
      total = 'No disponible'
    }

    return total
  }

  return (
    <div>
      {/*
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                Open responsive dialog
            </Button>
            */}
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleCloseDialog}
        aria-labelledby='responsive-dialog-title'
      >
        <DialogTitle id='responsive-dialog-title'><Typography className={classes.title} variant='h4'>Detalle de la contratación</Typography></DialogTitle>
        <DialogContent>
          {/* <DialogContentText></DialogContentText> */}

          {data !== null &&
            <div>
              <Typography sx={{
                marginBottom: "16px"
              }}><b>{data.tender.title}</b></Typography>
              <Typography sx={{
                marginBottom: "16px"
              }}>{data.tender.description}</Typography>
              <Typography sx={{
                marginBottom: "16px"
              }}>Institución: <b>{data.buyer.name}</b></Typography>
              <Typography sx={{
                marginBottom: "16px"
              }}>Tipo de contratación: <b>{data.tender.procurementMethod}</b></Typography>
              <Typography sx={{
                marginBottom: "16px"
              }}>Estatus de la contratacion: <b>{data.tender.status}</b></Typography>
              <Typography sx={{
                marginBottom: "16px"
              }}>Número de contratos: <b>{data.contracts ? data.contracts.length : 'No disponible'}</b></Typography>
              <Typography sx={{
                marginBottom: "16px"
              }}>Monto total: <b>{getTotal(data)}</b></Typography>

              <Typography variant='h5'>Participantes</Typography>

              {data?.parties?.map((p, i) => {
                return <Party key={i} party={p} index={i} />
              })}

              {data.tender.documents && data.tender.documents.length > 0 &&
                <div>
                  <Typography variant='h5'>Documentos (Tender)</Typography>
                  {data.tender.documents.map((d, i) => { return <Document doc={d} index={i} key={i} /> })}
                </div>}

              {data.contracts && data.contracts.length > 0 && data.contracts[0] &&
                                data.contracts[0].documents && data.contracts[0].documents.length > 0 &&
                                  <div>
                                    <Typography variant='h5'>Documentos (Contracts)</Typography>
                                    {data.contracts[0].documents.map((d, i) => { return <Document doc={d} index={i} key={i} /> })}
                                  </div>}

              <Typography variant='h5' sx={{
                marginBottom: "16px"
              }}>Datos en formato JSON</Typography>
              <Box sx={{ maxWidth: '100%', overflowX: 'auto' }}>
                <JsonValue value={data} />
              </Box>
            </div>}

        </DialogContent>
        <DialogActions>
          <ButtonPDN
            href={handleDownload()} variant='contained'
            download={(data !== null ? data.ocid : 'datos') + '.json'}
          ><DownloadIcon style={{ color: 'white' }} />
          </ButtonPDN>
          <ButtonPDN onClick={handleCloseDialog} variant='contained' autoFocus>
            Cerrar
          </ButtonPDN>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const Party = props => {
  const { party, index } = props

  return (
    <Box sx={{
      p: 1
    }}>
      <Paper sx={{ p: 1 }} elevation={3}>
        <Typography sx={{ fontWeight: 'bold' }}>Participante {index + 1}</Typography>
        <Typography>{party.name}</Typography>
        <Typography sx={{
          marginBottom: "16px"
        }}>Roles: {party.roles ? `${party.roles.join(', ')}` : ''}</Typography>
        {party.contactPoint &&
          <div>
            <Typography variant='body2' sx={{ fontWeight: 'bold' }}>Contacto:</Typography>
            <Typography variant='body2'>Nombre: {party.contactPoint.name}</Typography>
            <Typography variant='body2'>Email: {party.contactPoint.email}</Typography>
          </div>}
      </Paper>
    </Box>
  );
}

const Document = props => {
  const { doc, index } = props
  return (
    <Box sx={{
      p: 1
    }}>
      <Paper sx={{ p: 1 }} elevation={3}>
        <Typography sx={{ fontWeight: 'bold' }}>Documento {index + 1}</Typography>
        <Typography>Título: {doc.title}</Typography>
        <Typography sx={{
          marginBottom: "16px"
        }}>Descripción: {doc.description}</Typography>
        <ButtonPDN variant='contained' size='small' href={doc.url} target='_blank'>
          URL
        </ButtonPDN>
      </Paper>
    </Box>
  );
}

ResponsiveDialog.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired
}

// const ResponsiveDialogStyled = withStyles(styles)(ResponsiveDialog);

export default withStyles(styles)(ResponsiveDialog)
