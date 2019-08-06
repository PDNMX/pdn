import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
//import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import ReactJson from 'react-json-view';
import DownloadIcon from '@material-ui/icons/CloudDownload';

function ResponsiveDialog(props) {
    const { fullScreen, open, handleCloseDialog, data } = props;
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
                    {/* <DialogContentText>

                    </DialogContentText>*/}
                    <ReactJson src={data}/>
                </DialogContent>
                <DialogActions>
                    <Button href={handleDownload()} variant="contained"
                            download={(data !== null ? data.ocid : 'datos')+'.json'}
                            style={{
                                background: '#ffe01b',
                            }}
                    ><DownloadIcon/></Button>
                    <Button onClick={handleCloseDialog}  variant="contained" color="primary" autoFocus
                            style={{
                                background: '#ffe01b',
                            }}
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
};

export default withMobileDialog()(ResponsiveDialog);
