import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Grid from "@material-ui/core/Grid/Grid";
import TextField from "@material-ui/core/TextField/TextField";
import InputAdornment from "@material-ui/core/InputAdornment/InputAdornment";
import IconFlecha from '@material-ui/icons/KeyboardArrowRight';
import CloseButton from '@material-ui/icons/Close'
import IconButton from "@material-ui/core/IconButton/IconButton";
function getModalStyle() {
    const top = 50 ;
    const left = 50 ;
    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,

    };
}

const styles = theme => ({
    paper: {
        position: 'absolute',
        width: theme.spacing.unit * 80,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: '100%',

    },
    fontSmall:{
        fontSize:'.8em',
    },
    flex: {
        flexGrow: 1,
    },
     button:{
        float:'right'
     }
});

class DetalleServidor extends React.Component {
    render() {
        const {classes, handleClose, servidor, control} = this.props;
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
                            <Grid container spacing={24} justify="space-around">
                                <Grid item xs={11}>
                                    <Typography variant= "title">Detalle</Typography>
                                </Grid>
                                <Grid item xs={1}>
                                    <IconButton color="primary" className={classes.button} component="span" onClick={handleClose}>
                                        <CloseButton />
                                    </IconButton>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        id="read-only-input"
                                        label="Institución"
                                        defaultValue={servidor.institucion}
                                        className={classes.textField}
                                        margin="normal"
                                        multiline={true}
                                        InputProps={{
                                            readOnly: true,
                                            className:classes.fontSmall,
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <IconFlecha/>
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        id="read-only-input"
                                        label="Servidor público"
                                        defaultValue={servidor.servidor}
                                        className={classes.textField}
                                        margin="normal"
                                        InputProps={{
                                            readOnly: true,
                                            className:classes.fontSmall,
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <IconFlecha/>
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                </Grid>

                                <Grid item xs={6}>
                                    <TextField
                                        id="read-only-input"
                                        label="Puesto"
                                        defaultValue={servidor.puesto}
                                        className={classes.textField}
                                        margin="normal"
                                        InputProps={{
                                            readOnly: true,
                                            className:classes.fontSmall,
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <IconFlecha/>
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        id="read-only-input"
                                        label="Tipo de área"
                                        defaultValue={servidor.tipoArea}
                                        className={classes.textField}
                                        margin="normal"
                                        InputProps={{
                                            readOnly: true,
                                            className:classes.fontSmall,
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <IconFlecha/>
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        id="read-only-input"
                                        label="Contrataciones públicas"
                                        defaultValue={servidor.contrataciones}
                                        className={classes.textField}
                                        margin="normal"
                                        InputProps={{
                                            readOnly: true,
                                            className:classes.fontSmall,
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <IconFlecha/>
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        id="read-only-input"
                                        label="Enajenacion de bienes muebles"
                                        defaultValue={servidor.enajenacion}
                                        className={classes.textField}
                                        margin="normal"
                                        InputProps={{
                                            readOnly: true,
                                            className:classes.fontSmall,
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <IconFlecha/>
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        id="read-only-input"
                                        label="Concesiones, licencias, premios, autorizaciones y prórrogas"
                                        defaultValue={servidor.concesionesLicencias}
                                        className={classes.textField}
                                        margin="normal"
                                        InputProps={{
                                            readOnly: true,
                                            className:classes.fontSmall,
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <IconFlecha/>
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                </Grid>

                                <Grid item xs={6}>
                                    <TextField
                                        id="read-only-input"
                                        label="Asignación y emisión de dictámenes de avalúos nacionales"
                                        defaultValue={servidor.dictamenes}
                                        className={classes.textField}
                                        margin="normal"
                                        InputProps={{
                                            readOnly: true,
                                            className:classes.fontSmall,
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <IconFlecha/>
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={6}></Grid>

                            </Grid>

                        </form>


                    </div>
                </Modal>
            </div>
        );
    }
}

DetalleServidor.propTypes = {
    classes: PropTypes.object.isRequired,
};

// We need an intermediary variable for handling the recursive nesting.
//const SimpleModalWrapped = withStyles(styles)(SimpleModal);

export default withStyles(styles)(DetalleServidor);