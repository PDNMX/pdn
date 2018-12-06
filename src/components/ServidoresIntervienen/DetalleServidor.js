import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Grid from "@material-ui/core/Grid/Grid";
import TextField from "@material-ui/core/TextField/TextField";
import InputAdornment from "@material-ui/core/InputAdornment/InputAdornment";
import IconHelp from '@material-ui/icons/HelpOutline';
import CloseButton from '@material-ui/icons/Close'
import IconButton from "@material-ui/core/IconButton/IconButton";
import DialogContentText from "@material-ui/core/DialogContentText/DialogContentText";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import Button from "@material-ui/core/Button/Button";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import glosario from "../Utils/glosario.json";

function getGlosarioItem(id){
    return glosario.servidores[id];
}

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
        padding: theme.spacing.unit * 4,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing.unit * 110,
        },
        [theme.breakpoints.down('sm')]: {
            width: '80%',
            height: '80%',
            overflowY: 'scroll',
        },
        [theme.breakpoints.up('xl')]: {
            width: theme.spacing.unit * 130,
        },
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
        color: theme.palette.black.color,
    },
    paperGlosario: {
        position: 'absolute',
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing.unit * 80,
        },
        [theme.breakpoints.down('sm')]: {
            width: '80%',
            height: '80%',
            overflowY: 'scroll',
        },
        [theme.breakpoints.up('xl')]: {
            width: theme.spacing.unit * 130,
        },
    },

});

class DetalleServidor extends React.Component {
    state = {
        open: false,
        id : 0,

    };

    openPoper = () => {
        this.setState(state => ({
            open: !state.open
        }));
    };

    controlGlosario = (id) => {
        this.setState({id : id});
    };

    render() {
        const {classes, handleClose, servidor, control} = this.props;
        const {open,id} = this.state;
        return (
            <div>
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={open}>
                    <div style={getModalStyle()} className={classes.paperGlosario}>
                            <DialogTitle>{getGlosarioItem(id).title}</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    {getGlosarioItem(id).description}
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={this.openPoper} color="primary">
                                    Cerrar
                                </Button>
                            </DialogActions>

                    </div>

                </Modal>
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={control}
                    onClose={handleClose}
                >
                    <div style={getModalStyle()} className={classes.paper}>

                        <Grid container spacing={8} justify="flex-start">
                            <Grid item xs={11}>
                                <Typography variant="title" className={classes.title}>Ficha del servidor público </Typography>
                            </Grid>
                            <Grid item xs={1}>
                                <IconButton color="primary" className={classes.button} component="span" onClick={handleClose}>
                                    <CloseButton/>
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
                                        className: classes.fontSmall,
                                        endAdornment: (
                                            <InputAdornment position={'end'} onClick={()=>{this.openPoper(); this.controlGlosario(0)}}>
                                                <IconHelp/>
                                            </InputAdornment>

                                        )
                                    }}
                                />
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <TextField
                                    id="read-only-input"
                                    label="Servidor público"
                                    defaultValue={servidor.servidor}
                                    className={classes.textField}
                                    margin="normal"
                                    InputProps={{
                                        readOnly: true,
                                        className: classes.fontSmall,
                                        endAdornment: (
                                            <InputAdornment position="start" onClick={()=>{this.openPoper(); this.controlGlosario(1)}}>
                                                <IconHelp/>
                                            </InputAdornment>
                                        )
                                    }}
                                />
                            </Grid>

                            <Grid item md={6} xs={12}>
                                <TextField
                                    id="read-only-input"
                                    label="Puesto"
                                    defaultValue={servidor.puesto}
                                    className={classes.textField}
                                    margin="normal"
                                    InputProps={{
                                        readOnly: true,
                                        className: classes.fontSmall,
                                        endAdornment: (
                                            <InputAdornment position="end" onClick={()=>{this.openPoper(); this.controlGlosario(2)}}>
                                                <IconHelp/>
                                            </InputAdornment>
                                        )
                                    }}
                                />
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <TextField
                                    id="read-only-input"
                                    label="Tipo de área"
                                    defaultValue={servidor.tipoArea}
                                    className={classes.textField}
                                    margin="normal"
                                    InputProps={{
                                        readOnly: true,
                                        className: classes.fontSmall,
                                        endAdornment: (
                                            <InputAdornment position="end" onClick={()=>{this.openPoper(); this.controlGlosario(3)}}>
                                                <IconHelp/>
                                            </InputAdornment>
                                        )
                                    }}
                                />
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <TextField
                                    id="read-only-input"
                                    label="Contrataciones públicas"
                                    defaultValue={servidor.contrataciones}
                                    className={classes.textField}
                                    margin="normal"
                                    InputProps={{
                                        readOnly: true,
                                        className: classes.fontSmall,
                                        endAdornment: (
                                            <InputAdornment position="end" onClick={()=>{this.openPoper(); this.controlGlosario(4)}}>
                                                <IconHelp/>
                                            </InputAdornment>
                                        )
                                    }}
                                />
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <TextField
                                    id="read-only-input"
                                    label="Enajenacion de bienes muebles"
                                    defaultValue={servidor.enajenacion}
                                    className={classes.textField}
                                    margin="normal"
                                    InputProps={{
                                        readOnly: true,
                                        className: classes.fontSmall,
                                        endAdornment: (
                                            <InputAdornment position="end" onClick={()=>{this.openPoper(); this.controlGlosario(5)}}>
                                                <IconHelp/>
                                            </InputAdornment>
                                        )
                                    }}
                                />
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <TextField
                                    id="read-only-input"
                                    label="Concesiones, licencias, premios, autorizaciones y prórrogas"
                                    defaultValue={servidor.concesionesLicencias}
                                    className={classes.textField}
                                    margin="normal"
                                    InputProps={{
                                        readOnly: true,
                                        className: classes.fontSmall,
                                        endAdornment: (
                                            <InputAdornment position="end" onClick={()=>{this.openPoper(); this.controlGlosario(6)}}>
                                                <IconHelp/>
                                            </InputAdornment>
                                        )
                                    }}
                                />
                            </Grid>

                            <Grid item md={6} xs={12}>
                                <TextField
                                    id="read-only-input"
                                    label="Asignación y emisión de dictámenes de avalúos nacionales"
                                    defaultValue={servidor.dictamenes}
                                    className={classes.textField}
                                    margin="normal"
                                    InputProps={{
                                        readOnly: true,
                                        className: classes.fontSmall,
                                        endAdornment: (
                                            <InputAdornment position="end" onClick={()=>{this.openPoper(); this.controlGlosario(7)}}>
                                                <IconHelp/>
                                            </InputAdornment>
                                        )
                                    }}
                                />
                            </Grid>
                            <Grid item md={6} xs={12}></Grid>

                        </Grid>
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
