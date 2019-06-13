import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid/Grid";
import {Typography} from "@material-ui/core"
import Modal from "@material-ui/core/Modal/Modal";
import "../../index.css";

const styles = theme => ({
    text: {
        color: theme.palette.primary.dark,
    },
    paperModal: {
        position: 'absolute',
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(4),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(50),
        },
        [theme.breakpoints.down('sm')]: {
            width: '80%',
            height: '80%',
            overflowY: 'scroll',
        },
        [theme.breakpoints.up('xl')]: {
            width: theme.spacing(70),
        },
    },
    textCenter: {
        textAlign: 'center',
        color: theme.palette.primary.dark
    }
    ,
    titleError: {
        textAlign: 'center',
        color: theme.palette.red.color
    },
});

function getModalStyle() {
    const top = 50;
    const left = 50;
    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

class MensajeError extends React.Component {
    render() {
        const {classes, mensaje, open} = this.props;
        return (
            <div>
                <Modal
                    open={open}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    onClose={() => this.props.handleClose()}
                >
                    <div style={getModalStyle()} className={classes.paperModal}>
                        <Grid container justify={"center"}>
                            <Grid item xs={12}>
                                <Typography variant={"h5"} className={classes.titleError}>{'Error'}</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant={"subtitle1"}>{mensaje}</Typography>
                            </Grid>
                        </Grid>
                    </div>
                </Modal>

            </div>
        );
    }

}

export default withStyles(styles)(MensajeError);