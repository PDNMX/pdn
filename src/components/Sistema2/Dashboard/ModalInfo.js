import React from "react";
import {Modal} from "@mui/material";
import {withStyles} from '@mui/styles';

const styles = theme => ({
    paperChart: {
        backgroundColor: theme.palette.background.paperChart,
        padding: theme.spacing(1),
        maxHeight: 450,
        minHeight: 450,
        textAlign:'right'
    }
});

const ModalInfo = (props) => {
    const {classes, children} = props;
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <Modal open={open} onClose={handleClose}>
            {children}
        </Modal>
    )
}

export default withStyles(styles)(ModalInfo);

