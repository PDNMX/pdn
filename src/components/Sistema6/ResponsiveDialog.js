import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
//import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ReactJson from 'react-json-view';
import DownloadIcon from '@mui/icons-material/CloudDownload';
import Typography from "@mui/material/Typography";
import withStyles from '@mui/styles/withStyles';
import {Button, Box, Paper} from '@mui/material';

// FIXME checkout https://mui.com/components/use-media-query/#using-material-uis-breakpoint-helpers
const withMobileDialog = () => (WrappedComponent) => (props) => <WrappedComponent {...props} width="lg" fullScreen={false} />;

const styles = theme => ({
    button: {
        //background: '#ffe01b',
        marginLeft: theme.spacing(1)
    },
    divider: {
        marginBottom: theme.spacing(1)
    }
});

function ResponsiveDialog(props) {
    const { fullScreen, open, handleCloseDialog, data, classes } = props;
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

    function handleDownload(){

        let text = JSON.stringify(props.data, null, 4);
        let d = new Blob([text], {type: 'text/plain'});

        return window.URL.createObjectURL(d);
    }

    const getTotal = data => {
        let total = 0;
        try{
            const reducer = (accum, contract) => accum + contract.value.amount;
            total = data.contracts.reduce(reducer, 0);
            total = new Intl.NumberFormat('es-MX', {style: 'currency', currency: 'MXN'}).format(total)

        } catch (e) {
            console.log(e);
            total = "No disponible";
        }

        return total;
    };

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
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title"><Typography variant='h4'>{"Detalle de la contratación"}</Typography></DialogTitle>
                <DialogContent>
                    {/*<DialogContentText></DialogContentText>*/}

                    {data !== null &&
                        <div>
                            <Typography paragraph><b>{data.tender.title}</b></Typography>
                            <Typography paragraph>{data.tender.description}</Typography>
                            <Typography paragraph>Institución: <b>{data.buyer.name}</b></Typography>
                            <Typography paragraph>Tipo de contratación: <b>{data.tender.procurementMethod}</b></Typography>
                            <Typography paragraph>Estatus de la contratacion: <b>{data.tender.status}</b></Typography>
                            <Typography paragraph>Número de contratos: <b>{data.contracts? data.contracts.length: 'No disponible'}</b></Typography>
                            <Typography paragraph>Monto total: <b>{getTotal(data)}</b></Typography>

                            <Typography variant='h5'>Participantes</Typography>

                            {data.parties.map((p,i) => {
                                return <Party key={i} party={p} index={i}/>
                            })}


                            {data.tender.documents && data.tender.documents.length > 0 &&
                                <div>
                                    <Typography variant='h5'>Documentos (Tender)</Typography>
                                    {data.tender.documents.map((d,i) => {return <Document doc={d} index={i} key={i}/>})}
                                </div>
                            }

                            {data.contracts && data.contracts.length > 0 && data.contracts[0] &&
                                data.contracts[0].documents && data.contracts[0].documents.length > 0 &&
                                <div>
                                    <Typography variant='h5'>Documentos (Contracts)</Typography>
                                    {data.contracts[0].documents.map((d,i) => {return <Document doc={d} index={i} key={i}/>})}
                                </div>

                            }

                            <Typography paragraph variant='h5'>Datos en formato JSON</Typography>
                            <ReactJson src={data} collapsed={1}/>
                        </div>
                    }

                </DialogContent>
                <DialogActions>
                    <Button href={handleDownload()} variant="contained" color="secundario"
                            download={(data !== null ? data.ocid : 'datos')+'.json'}
                            className={classes.button}
                    ><DownloadIcon/></Button>
                    <Button onClick={handleCloseDialog}  variant="contained" color="secundario" autoFocus
                            className={classes.button}
                    >
                        Cerrar
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

const Party = props => {
    const {party, index} = props;

    return <Box p={1}>
        <Paper sx={{p: 1}} elevation={3}>
            <Typography sx={{fontWeight: 'bold'}}>Participante {index + 1}</Typography>
            <Typography>{party.name}</Typography>
            <Typography paragraph>Roles: {party.roles ? `${party.roles.join(', ')}` : ''}</Typography>
            {party.contactPoint &&
                <div>
                    <Typography variant='body2' sx={{fontWeight: 'bold'}}>Contacto:</Typography>
                    <Typography variant='body2'>Nombre: {party.contactPoint.name}</Typography>
                    <Typography variant='body2'>Email: {party.contactPoint.email}</Typography>
                </div>
            }
        </Paper>
    </Box>
};

const Document = props => {
    const {doc, index} = props;
    return <Box p={1}>
        <Paper sx={{p: 1}} elevation={3}>
            <Typography sx={{fontWeight: 'bold'}}>Documento {index + 1}</Typography>
            <Typography>Título: {doc.title}</Typography>
            <Typography paragraph>Descripción: {doc.description}</Typography>
            <Button variant='contained' size='small' color='secundario' href={doc.url} target='_blank'>
                URL
            </Button>
        </Paper>
    </Box>;
};

ResponsiveDialog.propTypes = {
    fullScreen: PropTypes.bool.isRequired,
    classes: PropTypes.object.isRequired
};

const ResponsiveDialogStyled = withStyles(styles)(ResponsiveDialog);

export default withMobileDialog()(ResponsiveDialogStyled);
