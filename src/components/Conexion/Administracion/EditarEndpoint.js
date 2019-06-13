import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {Typography} from "@material-ui/core"
import Modal from '@material-ui/core/Modal';
import Grid from "@material-ui/core/Grid/Grid";
import CloseButton from '@material-ui/icons/Close'
import IconButton from "@material-ui/core/IconButton/IconButton";
import FormularioEndpoint from './FormularioEndpoint';

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
    paper: {
        position: 'absolute',
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(4),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(110),
        },
        [theme.breakpoints.down('sm')]: {
            width: '80%',
            height: '80%',
            overflowY: 'scroll',

        },
        [theme.breakpoints.up('xl')]: {
            width: theme.spacing(130),
        },
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: '100%',

    },
    fontSmall: {
        fontSize: '.8em',
    },
    flex: {
        flexGrow: 1,
    },
    button: {
        float: 'right'
    },
    title: {
        color: theme.palette.primary.main,
    },
    centrado: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

class EditarEndpoint extends React.Component {
    render() {
        const {classes, handleClose, endpoint, control} = this.props;
        return (
            <div>
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={control}
                    onClose={handleClose}
                >
                    <div style={getModalStyle()} className={classes.paper}>
                        <form>
                            <Grid container spacing={1} justify="flex-start">
                                <Grid item xs={11}>
                                    <Typography variant="h6" className={classes.title}>Editar endpoint</Typography>
                                </Grid>

                                <Grid item xs={1}>
                                    <IconButton color="primary" className={classes.button} component="span"
                                                onClick={handleClose}>
                                        <CloseButton/>
                                    </IconButton>
                                </Grid>
                                <Grid item xs={12}>
                                    <FormularioEndpoint endpoint={endpoint} closeContainer={handleClose}/>
                                </Grid>

                            </Grid>
                        </form>
                    </div>
                </Modal>
            </div>
        );
    }
}

EditarEndpoint.propTypes = {
    classes: PropTypes.object.isRequired,

};

// We need an intermediary variable for handling the recursive nesting.
//const SimpleModalWrapped = withStyles(styles)(SimpleModal);

export default withStyles(styles)(EditarEndpoint);
