import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
//import DialogContentText from '@mui/material/DialogContentText';
//import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import {Box, Typography} from "@mui/material";
import eri from '../../assets/rediseno/ico-espin-construction.svg';

const DialogoNoConectado = (props) =>  {

    const {open, setOpen} = props;
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const bgColor = theme.palette.background.opaque;

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div style={{background: theme.palette.background.opaque}}>
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                {/*<DialogTitle id="responsive-dialog-title" style={{color: "#d3d3d3", background: bgColor}}>
                    {"Cobertura"}
                </DialogTitle>*/}
                <DialogContent style={{background: bgColor}}>
                    <Box display="flex" flexWrap="wrap" justifyContent="center" alignContent="center" alignItems="stretch">
                        <Box p={1} m={1} flexGrow={1} alignSelf="center">
                            <img src={eri} alt="Eri" width="100px"/>
                        </Box>
                        <Box p={1} m={1} flexGrow={1} display="flex" alignItems="stretch">
                            <Typography color="white" alignSelf="center">
                                La Entidad no ha reportado información a la PDN
                            </Typography>
                        </Box>
                    </Box>
                    {/*<DialogContentText> La Entidad no ha reportado información a la PDN </DialogContentText>*/}
                </DialogContent>
                <DialogActions style={{background: bgColor}}>
                    <Button  variant="contained" onClick={handleClose} autoFocus>
                        Aceptar
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default DialogoNoConectado