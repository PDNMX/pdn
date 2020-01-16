import React from "react";
import clsx from 'clsx';
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid/Grid";
import {Paper, Typography} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';

const drawerWidth = 240;

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing(3),
    },
    tableWrapper: {
        overflowX: 'auto',
    },
    tableFooter: {
        display: 'flow-root',
        flexWrap: 'wrap',
    },
    progress: {
        position: 'fixed',
        margin: 'auto',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
    },
    container: {
        marginTop: '30px',
        marginBottom: '30px',
        overflowX: 'auto',
    },
    section: {
        maxWidth: '1200px',
        overflowX: 'auto',
        padding: theme.spacing(1)
    },
    table: {
        tableLayout: 'fixed',
    },
    tablePagination: {
        overflowX: 'auto',
        fontSize: '0.75rem'
    },
    gridTable: {
        marginBottom: '27px',
        padding: theme.spacing(1)
    },
    desc: {
        color: theme.palette.primary.dark,
    },
    item: {
        padding: theme.spacing(1)
    },
    containerPrevios: {
        marginLeft: theme.spacing(2)
    },

    ul: {
        listStyle: "none",
        paddingLeft: "20px"
    },
    infoBusqueda: {
        paddingRight: theme.spacing(1),
        paddingLeft: theme.spacing(1),
        //paddingBottom: theme.spacing(4),
        // paddingTop: theme.spacing(4),
        backgroundColor: "white"

    },
    toolBarStyle: {
        backgroundColor: 'transparent',
        position: 'relative',
        zIndex: 3,
        paddingTop: '53px',
        paddingBottom: '61px',
        maxWidth: '1200px',

    },
    li: {
        "&:before": {
            content: '"•"',
            color: '#5fb1e6',
            fontWeight: "bold",
            display: "inline-block",
            width: "1em",
            marginLeft: "-1em"
        },
        //paddingBottom: theme.spacing(2)
    },
    itemD: {
        maxWidth: 1200,
        paddingRight: theme.spacing(1),
        paddingLeft: theme.spacing(1),
        paddingBottom: theme.spacing(8),
        paddingTop: theme.spacing(8)
    },

    containerD: {
        backgroundColor: '#fff'
    },
    paper: {
        padding: theme.spacing(3, 2),
        margin: theme.spacing(3, 2)
    },
    cuadroActualizacion: {
        color: "#FFF",
        backgroundColor: theme.palette.primary.dark,
        fontWeight: "bold",
        padding: "5px 10px"
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
        },
    },
});

const setOpen = (v) =>  {
    this.setState({
        open: v
    })
};
const handleDrawerOpen = () => {
    setOpen(true);
};

const handleDrawerClose = () => {
    setOpen(false);
};

class DetalleServidorSancionado2 extends React.Component {
    state = {
        id: 0,
        open: true,
        value:0
    };
    render() {
        const {classes, handleChangeDetail, servidor, control,theme} = this.props;

        console.log("Servidor: ", servidor);
        let testArray = ["Uno", "Dos", "Tres"]
        let lista=<ul>{testArray.map(item => <li>{item}</li>)}</ul>;


        return (
            <div>
                <Grid container spacing={0} className={classes.infoBusqueda}>
                    <Grid item xs={12} style={{maxWidth: 1200, margin: "0 auto"}}>
                        <Paper className={classes.paper} elevation={3} >
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={6}>
                                    <Typography variant={"h6"}>
                                        Expediente:{" "}{servidor.expediente}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Typography style={{textAlign: "right"}}>
                                <span className={classes.cuadroActualizacion}>
                                  Actualización:{" "}{servidor.fechaCaptura}
                                </span>
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} style={{height: "50px"}}> </Grid>
                                <Grid item xs={12} md={6}>
                                    <Typography variant={"h6"}>
                                        {servidor.servidorPublicoSancionado.nombres}{" "}{servidor.servidorPublicoSancionado.primerApellido}{" "}{servidor.servidorPublicoSancionado.segundoApellido}Isela
                                        Morquecho
                                    </Typography>
                                    <Typography variant={"subtitle2"} style={{textAlign: "left"}}>
                                        {servidor.servidorPublicoSancionado.puesto}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Typography variant={"h6"}>
                                        {servidor.institucionDependencia.nombre}
                                    </Typography>
                                    <Typography variant={"subtitle2"}>
                                        ({servidor.institucionDependencia.siglas})
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <BottomNavigation
                                        value={this.state.value}
                                        onChange={(event, newValue) => {
                                            this.setState({value:newValue});
                                        }}
                                        showLabels
                                        className={classes.root}
                                    >
                                        <BottomNavigationAction label="Falta" icon={<RestoreIcon />} />
                                        <BottomNavigationAction label="Sanción" icon={<FavoriteIcon />} />
                                    </BottomNavigation>
                                </Grid>


                                <Grid item xs={12} md={6} style={{marginTop: '30px'}}>
                                    <Grid container spacing={2} direction="column">
                                        <Grid item xs={12}>
                                            <Typography variant={"h6"} color={"primary"}>
                                                Falta
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <FormControl fullWidth className={classes.margin} variant="outlined">
                                                <TextField
                                                    id="outlined-multiline-static"
                                                    label="Falta"
                                                    defaultValue={servidor.tipoFalta}
                                                    variant="outlined"
                                                    InputProps={{
                                                        readOnly: true
                                                    }}
                                                />
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <FormControl fullWidth className={classes.margin} variant="outlined">
                                                <TextField
                                                    id="outlined-multiline-static"
                                                    label="Causa, motivo o hechos"
                                                    multiline
                                                    rows="9"
                                                    defaultValue={servidor.causaMotivoHechos}
                                                    variant="outlined"
                                                    InputProps={{
                                                        readOnly: true
                                                    }}
                                                />
                                            </FormControl>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} md={6} style={{marginTop: '30px'}}>
                                    <Grid container spacing={2} direction="column">
                                        <Grid item xs={12}>
                                            <Typography variant={"h6"} color={"primary"}>
                                                Sanción
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <FormControl fullWidth className={classes.margin} variant="outlined">
                                                <TextField
                                                    id="outlined-multiline-static"
                                                    label="Autoridad sancionadora"
                                                    defaultValue={servidor.autoridadSancionadora}
                                                    variant="outlined"
                                                    InputProps={{
                                                        readOnly: true
                                                    }}
                                                />
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <FormControl fullWidth className={classes.margin} variant="outlined">
                                                <TextField
                                                    id="outlined-multiline-static"
                                                    label="Sanción"
                                                    multiline
                                                    rows="9"
                                                    defaultValue={lista}
                                                    variant="outlined"
                                                />
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <FormControl fullWidth className={classes.margin} variant="outlined">
                                                <TextField
                                                    id="outlined-multiline-static"
                                                    label="Resolución"
                                                    defaultValue={servidor.resolucion.fechaResolucion}
                                                    variant="outlined"
                                                    InputProps={{
                                                        readOnly: true
                                                    }}
                                                />
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <FormControl fullWidth className={classes.margin} variant="outlined">
                                                <TextField
                                                    id="outlined-multiline-static"
                                                    label="Multa"
                                                    defaultValue={servidor.multa.monto + " "+ servidor.multa.moneda}
                                                    variant="outlined"
                                                    InputProps={{
                                                        readOnly: true
                                                    }}
                                                />
                                            </FormControl>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12}>
                                    <Grid item xs={12}>
                                        <FormControl fullWidth className={classes.margin} variant="outlined">
                                            <TextField
                                                id="outlined-multiline-static"
                                                label="Observaciones"
                                                defaultValue={servidor.observaciones}
                                                variant="outlined"
                                                InputProps={{
                                                    readOnly: true
                                                }}
                                            />
                                        </FormControl>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} style={{textAlign: 'right'}}>
                                    <Button color="primary" onClick={() => handleChangeDetail()}>Regresar</Button>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>

            </div>
        )
    }

}

DetalleServidorSancionado2.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DetalleServidorSancionado2);