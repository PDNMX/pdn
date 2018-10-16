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
import glosario from "../../Utils/glosario.json";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import Button from "@material-ui/core/Button";
import DownloadIcon from "@material-ui/icons/CloudDownload";

function getGlosarioItem(id){
    return glosario.particulares[id];
}

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
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
        [theme.breakpoints.up('sm')]:{
            width: theme.spacing.unit * 110,
        },
        [theme.breakpoints.down('sm')]:{
            width: '80%',
            height: '80%',
            overflowY: 'scroll',

        },
        [theme.breakpoints.up('xl')]:{
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
    fontSmall:{
        fontSize:'.8em',
    },
    flex: {
        flexGrow: 1,
    },
    button:{
        float:'right'
    },
    title:{
        color : theme.palette.primary.main,

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
    centrado:{
    display: 'flex',
    justifyContent : 'center',
    alignItems: 'center'
}
});

class DetalleParticular extends React.Component {
    state ={
        open : false,
        id : 0
    };

    openPoper = () => {
        this.setState(state => ({
            open : !state.open
        }))
    };

    controlGlosario = (id) => {
        this.setState({id : id});
    };

    render() {
        const {classes, handleClose, particular, control} = this.props;
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
                        <form>
                            <Grid container spacing={8} justify="flex-start">
                                <Grid item xs={11}>
                                    <Typography variant= "title" className={classes.title}>Detalle particular</Typography>
                                </Grid>
                                <Grid item xs={1}>
                                    <IconButton color="primary" className={classes.button} component="span" onClick={handleClose}>
                                        <CloseButton />
                                    </IconButton>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        id="read-only-input"
                                        label="Hechos"
                                        defaultValue={particular.hechos}
                                        className={classes.textField}
                                        margin="normal"
                                        multiline
                                        InputProps={{
                                            readOnly: true,
                                            className:classes.fontSmall,
                                            endAdornment: (
                                                <InputAdornment position="end" onClick={()=>{this.openPoper(); this.controlGlosario(0)}}>
                                                    <IconHelp/>
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        id="read-only-input"
                                        label="Objeto social"
                                        defaultValue={particular.objetoSocial}
                                        className={classes.textField}
                                        margin="normal"
                                        multiline
                                        InputProps={{
                                            readOnly: true,
                                            className:classes.fontSmall,
                                            endAdornment: (
                                                <InputAdornment position="end" onClick={()=>{this.openPoper(); this.controlGlosario(1)}}>
                                                    <IconHelp/>
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                </Grid>
                                <Grid item md = {6} xs = {12}>
                                    <TextField
                                        id="read-only-input"
                                        label="Fecha notificación"
                                        defaultValue={particular.fechaNotificacion}
                                        className={classes.textField}
                                        margin="normal"
                                        InputProps={{
                                            readOnly: true,
                                            className:classes.fontSmall,
                                            endAdornment: (
                                                <InputAdornment position="end" onClick={()=>{this.openPoper(); this.controlGlosario(2)}}>
                                                    <IconHelp/>
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                </Grid>
                                <Grid item md = {6} xs = {12}>
                                    <TextField
                                        id="read-only-input"
                                        label="Fecha resolución"
                                        defaultValue={particular.fechaResolucion}
                                        className={classes.textField}
                                        margin="normal"
                                        InputProps={{
                                            readOnly: true,
                                            className:classes.fontSmall,
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
                                        label="Plazo"
                                        defaultValue={particular.plazo}
                                        className={classes.textField}
                                        margin="normal"
                                        InputProps={{
                                            readOnly: true,
                                            className:classes.fontSmall,
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
                                        label="Monto"
                                        defaultValue={particular.monto}
                                        className={classes.textField}
                                        margin="normal"
                                        InputProps={{
                                            readOnly: true,
                                            className:classes.fontSmall,
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
                                        label="Responsable de la información"
                                        defaultValue={particular.responsableInformacion}
                                        className={classes.textField}
                                        margin="normal"
                                        InputProps={{
                                            readOnly: true,
                                            className:classes.fontSmall,
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
                                        label="Fecha de última actualización"
                                        defaultValue={particular.fechaActualizacion}
                                        className={classes.textField}
                                        margin="normal"
                                        InputProps={{
                                            readOnly: true,
                                            className:classes.fontSmall,
                                            endAdornment: (
                                                <InputAdornment position="end" onClick={()=>{this.openPoper(); this.controlGlosario(7)}}>
                                                    <IconHelp/>
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                </Grid>
                                <Grid item md={6} xs={12} className={classes.centrado}></Grid>
                                <Grid item md={6} xs={12} className={classes.centrado}>
                                    <Button color="primary" variant="contained" size="small">
                                        <DownloadIcon/>
                                        {'Descargar constancia'}
                                    </Button>
                                </Grid>
                            </Grid>

                        </form>


                    </div>
                </Modal>
            </div>
        );
    }
}

DetalleParticular.propTypes = {
    classes: PropTypes.object.isRequired,
};

// We need an intermediary variable for handling the recursive nesting.
//const SimpleModalWrapped = withStyles(styles)(SimpleModal);

export default withStyles(styles)(DetalleParticular);
