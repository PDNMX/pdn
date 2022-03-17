import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@mui/styles';
import {Grid, Typography, Modal} from "@mui/material";


function getModalStyle() {
    const top = 50;
    const left = 50;
    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
        };
}

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
});



class Mensaje extends React.Component {
   render() {
        const {classes,titulo,mensaje,open} = this.props;
        return (
            <div>
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={open}
                    onClose={()=>this.props.handleClose()}
                >
                    <div className={classes.paperModal}  style={getModalStyle()} >
                        <Grid container spacing={1} justify={"flex-start"}>
                            <Grid item xs={12}>
                                <Typography variant={"h5"} className={classes.textCenter}>{titulo}</Typography>
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

Mensaje.propTypes = {
  titulo : PropTypes.string.isRequired,
  mensaje: PropTypes.string.isRequired,

};

export default withStyles(styles)(Mensaje);