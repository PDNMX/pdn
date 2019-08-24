import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import ReactJson from 'react-json-view';
import DownloadIcon from '@material-ui/icons/CloudDownload';
import Typography from "@material-ui/core/Typography";
import Divider from '@material-ui/core/Divider';
import {withStyles} from "@material-ui/core/styles";


const styles = theme => ({
    button: {
        background: '#ffe01b',
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
                <DialogTitle id="responsive-dialog-title">{"Detalle de la contratación"}</DialogTitle>
                <DialogContent>
                    {/*<DialogContentText></DialogContentText>*/}

                    {data !== null &&
                    <div>
                        <Typography paragraph><b>{data.tender.title}</b></Typography>
                        <Typography paragraph>{data.tender.description}</Typography>
                        <Typography paragraph>Institución: <b>{data.buyer.name}</b></Typography>
                        <Typography paragraph>Tipo de contratación: <b>{data.tender.procurementMethod}</b></Typography>
                        <Typography paragraph>Número de contratos: <b>{data.contracts? data.contracts.length: 'No disponible'}</b></Typography>
                        <Typography paragraph>Monto total: <b>{getTotal(data)}</b></Typography>

                        <Typography>Participantes:</Typography>

                        <ul>
                            {data.parties.map((p,i) => {
                                return <li key={i}>{p.name} ({p.roles.join(', ')})</li>
                            })}
                        </ul>


                        <Divider className={classes.divider}/>
                        <Typography paragraph>Datos en formato JSON</Typography>
                        <ReactJson src={data} collapsed={1}/>
                    </div>
                    }

                </DialogContent>
                <DialogActions>
                    <Button href={handleDownload()} variant="contained"
                            download={(data !== null ? data.ocid : 'datos')+'.json'}
                            className={classes.button}
                    ><DownloadIcon/></Button>
                    <Button onClick={handleCloseDialog}  variant="contained" color="primary" autoFocus
                            className={classes.button}
                    >
                        Cerrar
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

ResponsiveDialog.propTypes = {
    fullScreen: PropTypes.bool.isRequired,
    classes: PropTypes.object.isRequired
};

const ResponsiveDialogStyled = withStyles(styles)(ResponsiveDialog);

export default withMobileDialog()(ResponsiveDialogStyled);
