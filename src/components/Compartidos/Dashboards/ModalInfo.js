import React from "react";
import {Modal} from "@mui/material";
import {withStyles} from '@mui/styles';

const styles = theme => ({
    modal:{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 700,
        backgroundColor: theme.palette.background.opaque,
        border: '2px solid',
        color: theme.palette.text.main,
        padding: theme.spacing(2),
        borderRadius: theme.spacing(5)
    }
});

const ModalInfo = (props) => {
    const {classes, children, open, setOpen} = props;

    return (
        <Modal open={open} onClose={()=> setOpen(false)}>
            <div className={classes.modal}>
                    {children}
            </div>
        </Modal>
    )
}

export default withStyles(styles)(ModalInfo);

