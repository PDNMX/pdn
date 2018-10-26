import React from 'react';
import {withStyles} from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import Footer from '../Footer/Footer';
import Header from "./Header";
import Grid from "@material-ui/core/Grid/Grid";
import Select from "@material-ui/core/Select/Select";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import FormControl from "@material-ui/core/FormControl/FormControl";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import TextField from "@material-ui/core/TextField/TextField";
import IconButton from "@material-ui/core/IconButton/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import ClearIcon from "@material-ui/icons/Clear";
import Mensaje from "./Mensaje";
import Registro from "./Registro";
import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import rp from "request-promise";
import data from "./data.json";
import {mapDeclaracion} from "./utils";
import Avatar from "@material-ui/core/Avatar/Avatar";

const styles = theme => ({
    root: {
        flexGrow: 1,
        [theme.breakpoints.up('sm')]: {
            marginLeft: '150px',
            marginRight: '150px',

        },
        [theme.breakpoints.down('sm')]: {
            marginLeft: theme.spacing.unit,
            marginRight: theme.spacing.unit,

        }
    },
    container1: {
        flexGrow: 1,
        backgroundColor: theme.palette.backDark.color
    },
    title: {
        color: theme.palette.textPrincipal.color,
        textAlign: 'center',
        marginTop: theme.spacing.unit * 2,
    },
    titleLight: {
        color: "#e6e6e6",
        textAlign: 'center',
        marginTop: theme.spacing.unit * 2,
    },
    titleDark: {
        color: "#e6e6e6",
        textAlign: 'center',
        marginTop: theme.spacing.unit * 2,
    },
    summary: {
        color: theme.palette.primary.main,
    },
    textLight: {
        color: "#e6e6e6",
        textAlign: 'justify'
    },
    textDark: {
        color: theme.palette.textNormal,
        textAlign: 'justify'
    },
    container2: {
        flexGrow: 1,
        backgroundColor: theme.palette.backLight.color,
    },
    bgPanelDark: {
        backgroundColor: theme.palette.backDark.color,
    },
    bgPanelLight: {
        backgroundColor: theme.palette.white.color,
        minHeight: '550px',
        paddingBottom: '50px',
    },
    section: {
        maxWidth: '1024px'
    },
    bgImg: {
        height: '300px',
        backgroundImage: 'url(test2.jpg)',
        backgroundPosition: 'bottom',
        backgroundRepeat: 'no-repeat',
        textAlign: 'left',
        backgroundSize: 'cover',
        width: '100%',
    },
    seccion: {
        backgroundColor: theme.palette.backDark.color
    },
    image: {
        width: '50%',
        height: '150px',
        borderRadius: '50px',
        display: 'inline-block'
    },
    bgContainer: {
        backgroundColor: theme.palette.grisTenue.color,
        paddingTop: theme.spacing.unit * 5,
        paddingBottom: theme.spacing.unit * 5
    },
    center: {
        textAlign: 'center'
    },
    links: {
        backgroundColor: theme.palette.grisTenue.color
    },
    container: {
        [theme.breakpoints.up('sm')]: {
            marginLeft: '100px',
            marginRight: '100px'
        },
        [theme.breakpoints.down('sm')]: {
            marginLeft: theme.spacing.unit,
            marginRight: theme.spacing.unit
        }
    },
    pdn: {
        [theme.breakpoints.up('sm')]: {
            paddingTop: '75px'
        },
        [theme.breakpoints.down('sm')]: {
            paddingTop: '40px'

        }
    },
    formControl: {
        margin: theme.spacing.unit,
        display: 'flex'

    },
    button: {
        margin: theme.spacing.unit,
    },
    avatar: {
        margin: 10
    }
});

class DemoDeclaraciones extends React.Component {
    state = {
        user: 'Auditor Superior de la Federación',
        nombre: '',
        apellidoUno: '',
        apellidoDos: '',
        bandera: 0,

    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };
    handleChangeUser= event => {
        this.setState({ user: event.target.value });
    };
    search = () => {
        alert("Buscando...");
        let options = {
            uri: 'https://api',
            json: true
        };
        this.setState(
            {
                declaracion: mapDeclaracion(data)
            }, () => {
                this.setState({bandera: this.state.bandera === 1 ? 2 : 1})
            }
        );

        /*
                rp(options)
                    .then(data => {
                        this.setState(
                            {declaracion: mapDeclaracion(data)}
                            );
                    }).catch(err => {
                    this.setState({loading: false});
                    alert("_No se pudó obtener la información");
                    console.log(err);
                });
        */
    };

    clean = () => {
        this.setState({
            user: 'Auditor Superior de la Federación',
            nombre: '',
            apellidoUno: '',
            apellidoDos: '',
            bandera: 0
        });
    };

    render() {
        const {classes} = this.props;
        return (
            <div>
                <Header user={this.state.user} handleChangeUser={this.handleChangeUser}/>
                <div className={classes.bgImg}>
                    <div className={classes.container}>
                        <Grid container spacing={24}>
                            <Grid item xs={12} align="center">
                                <Typography className={classes.pdn} variant="display2" style={{color: '#fff'}}>
                                    Sistema de declaración patrimonial y de intereses
                                </Typography>
                                <pre>
                                <Typography variant="subheading" style={{color: '#fff', paddingTop: '10px'}}>
                                    {'*Inicial \n' +
                                    '* Conclusión, ó \n' +
                                    '* Modificación patrimonial'
                                    }
                                </Typography>
                                </pre>
                                <br/>
                            </Grid>
                        </Grid>
                    </div>
                </div>
                <div className={classes.bgPanelLight}>
                    <div className={classes.root}>
                        <Grid container justify={'center'} spacing={0}>
                            <Grid item xs={12} className={classes.section}>
                                <Grid container spacing={16}>
                                    <Grid item xs={12}>
                                        <Typography variant={'title'} className={classes.title}> Consulta</Typography>
                                    </Grid>

                                    <Grid item xs={3}>
                                        <TextField
                                            id="standard-name"
                                            label="Nombre(s)"
                                            className={classes.textField}
                                            value={this.state.nombre}
                                            onChange={this.handleChange('nombre')}
                                            margin="normal"

                                        />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <TextField
                                            id="standard-name"
                                            label="Apellido uno"
                                            className={classes.textField}
                                            value={this.state.apellidoUno}
                                            onChange={this.handleChange('apellidoUno')}
                                            margin="normal"
                                        />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <TextField
                                            id="standard-name"
                                            label="Apellido dos"
                                            className={classes.textField}
                                            value={this.state.apellidoDos}
                                            onChange={this.handleChange('apellidoDos')}
                                            margin="normal"
                                        />
                                    </Grid>
                                    <Grid item xs={1}>
                                        <Tooltip title={'Buscar'}>
                                            <IconButton color="primary" className={classes.button}
                                                        aria-label="Add to shopping cart" onClick={this.search}>
                                                <SearchIcon/>
                                            </IconButton>
                                        </Tooltip>

                                    </Grid>
                                    <Grid item xs={1}>
                                        <Tooltip title={'Limpiar'}>
                                            <IconButton color="primary" className={classes.button}
                                                        aria-label="Add to shopping cart" onClick={this.clean}>
                                                <ClearIcon/>
                                            </IconButton>
                                        </Tooltip>

                                    </Grid>
                                    <Grid item xs={12}>
                                        {this.state.bandera !== 0 &&
                                        <Typography variant={'title'} className={classes.title}> Resultado</Typography>
                                        }

                                    </Grid>
                                    <Grid item xs={12}>
                                        {
                                            this.state.bandera === 1 &&
                                            <Mensaje mensaje={'El usuario no cuenta con los permisos suficientes'}/>
                                        }
                                        {
                                            this.state.bandera === 2 && <Registro declaracion={this.state.declaracion}/>
                                        }

                                    </Grid>


                                </Grid>
                            </Grid>
                        </Grid>

                    </div>
                </div>
                <Footer/>
            </div>
        );
    }

}

DemoDeclaraciones.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DemoDeclaraciones);