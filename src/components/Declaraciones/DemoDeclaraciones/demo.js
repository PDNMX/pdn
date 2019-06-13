import React from 'react';
import {withStyles} from '@material-ui/core/styles/index'
import Typography from '@material-ui/core/Typography/index';
import PropTypes from 'prop-types';
import Header from "./Header";
import Grid from "@material-ui/core/Grid/Grid";
import TextField from "@material-ui/core/TextField/TextField";
import IconButton from "@material-ui/core/IconButton/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import ClearIcon from "@material-ui/icons/Clear";
import Mensaje from "./Mensaje";
import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import {mapDeclaracion} from "./utils";
import rp from "request-promise";
import TablaPre from "./TablaPre";
import CircularProgress from "@material-ui/core/CircularProgress/index";
import Tabs from "./TabsDemo";

const styles = theme => ({
    root: {
        flexGrow: 1,
        [theme.breakpoints.up('sm')]: {
            marginLeft: '150px',
            marginRight: '150px',

        },
        [theme.breakpoints.down('sm')]: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),

        },

    },
    title: {
        color: theme.palette.textPrincipal.color,
        textAlign: 'center',
        marginTop: theme.spacing(2),
    },
    bgPanelLight: {
        backgroundColor: theme.palette.white.color,
        minHeight: '550px',
        paddingBottom: '50px'
    },
    section: {
        maxWidth: '1024px'
    },
    bgImg: {
        height: '300px',
        backgroundImage: 'url(/test2.jpg)',
        backgroundPosition: 'bottom',
        backgroundRepeat: 'no-repeat',
        textAlign: 'left',
        backgroundSize: 'cover',
        width: '100%',
    },
    center: {
        textAlign: 'center'
    },
    container: {
        [theme.breakpoints.up('sm')]: {
            marginLeft: '100px',
            marginRight: '100px'
        },
        [theme.breakpoints.down('sm')]: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1)
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
    button: {
        [theme.breakpoints.up('sm')]: {
            margin: theme.spacing(1),
        },
        [theme.breakpoints.down('sm')]: {
            margin: '0',
        }

    },
    progress: {
        position: 'absolute',
        margin: 'auto',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
    },
    gridItem: {
        [theme.breakpoints.up('md')]: {
           maxWidth: '1024px'
        },
    },
    botonera:{
        textAlign : 'center'
    },
    tabsRoot:{
        flex : '1 1 100%',
        minHeight: 0,
        display: 'flex',
        flexDirection: 'column'
    }
});

class DemoDeclaraciones extends React.Component {
    state = {
        user: 'profile_4',
        nombre: '',
        apellidoUno: '',
        apellidoDos: '',
        bandera: 0,
        srcAvatar: '/avatarUno.png',
        registros: [],
        showTable: false,
        loading: false,
        totalRows: 0,
        rowsPerPage: 10,
        page: 0
    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    handleChangeUser = event => {
        this.setState(
            {
                user: event.target.value,
                nombre: '',
                apellidoUno: '',
                apellidoDos: '',
                bandera: 0,
                registros: [],
                showTable: false,
                srcAvatar: event.target.value === 'profile_4' ? '/avatarUno.png' : event.target.value === 'profile_2' ? '/avatarDos.png' : event.target.value === 'profile_3' ? '/avatarTres.png' : '/avatarCuatro.png'
            });
    };

    getRegistro = (id) => {
        const API_URL = process.env.API_URL || 'https://demospdn.host/demo1/api/s1/declaraciones';

        this.setState({loading: true});

        let options = {
            uri: API_URL,
            qs: {
                id: id,
                profile: this.state.user
            },
            json: true,
            insecure: true
        };

        rp(options)
            .then(data => {
                this.setState(
                    {
                        declaracion: mapDeclaracion(data)

                    }, () => {
                        this.setState(
                            {
                                bandera: 2,
                                showTable: false,
                                loading: false,
                            })
                    }
                );

            }).catch(err => {
            this.setState({loading: false});
            alert("_No se pudó obtener la información");
            console.log(err);
        });

    };
    search = () => {
        const API_URL = process.env.API_URL || 'https://demospdn.host/demo1/api/s1/declaraciones';
        this.setState({loading: true});
        let qs = {};
        this.state.nombre ? qs.nombres = this.state.nombre : null;
        this.state.apellidoUno ? qs.primer_apellido = this.state.apellidoUno : null;
        this.state.apellidoDos ? qs.segundo_apellido = this.state.apellidoDos : null;
        qs.skip = this.state.page * this.state.rowsPerPage;
        qs.limit = this.state.rowsPerPage;

        let options = {
            uri: API_URL,
            qs: qs,
            json: true,
            insecure: true

        };

        rp(options)
            .then(data => {
                this.setState({
                    registros: data.results,
                    showTable: true,
                    bandera: 0,
                    loading: false,
                    totalRows: data.total,
                    rowsPerPage: data.pagination.limit,

                })

            }).catch(err => {
            this.setState({loading: false});
            alert("_No se pudó obtener la información");
            console.log(err);
        });


    };

    handleChangePage = (event, page) => {
        this.setState({page}, () => {
            this.search();
        });

    };
    handleChangeRowsPerPage = event => {
        this.setState({rowsPerPage: event.target.value}, () => {
            this.search();
        });
    };
    clean = () => {
        this.setState({
            nombre: '',
            apellidoUno: '',
            apellidoDos: '',
            bandera: 0,
            registros: [],
            showTable: false
        });
    };


    render() {
        const {classes} = this.props;
        return (
            <div>
                <Header user={this.state.user} srcAvatar={this.state.srcAvatar}
                        handleChangeUser={this.handleChangeUser}/>

                <div className={classes.bgImg}>
                    <div className={classes.container}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} align="center">
                                <Typography className={classes.pdn} variant="display2" style={{color: '#fff'}}>
                                    Sistema de declaración patrimonial y de intereses
                                </Typography>
                            </Grid>
                        </Grid>
                    </div>
                </div>
                <div className={classes.bgPanelLight}>
                    <div className={classes.root} id={'root1'}>
                        {
                            this.state.loading &&
                            <CircularProgress className={classes.progress} id="spinnerLoading" size={100}/>
                        }
                        <Grid container justify={'center'} spacing={0} aria-describedby={'spinnerLoading'}
                              aria-busy={this.state.loading} id={'container1'}>
                            <Grid item xs={12}  id={'item1C1'} className={classes.gridItem}>
                                <Grid container spacing={1} id={'container2'}>
                                    <Grid item xs={12} id={'item1C2'}>
                                        <Typography variant={'title'} className={classes.title}>Consulta</Typography>
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <TextField
                                            id="standard-name"
                                            label="Nombre(s)"
                                            value={this.state.nombre}
                                            onChange={this.handleChange('nombre')}
                                            margin="normal"
                                            fullWidth={true}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <TextField
                                            id="standard-name"
                                            label="Apellido uno"
                                            value={this.state.apellidoUno}
                                            onChange={this.handleChange('apellidoUno')}
                                            margin="normal"
                                            fullWidth={true}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <TextField
                                            id="standard-name"
                                            label="Apellido dos"
                                            value={this.state.apellidoDos}
                                            onChange={this.handleChange('apellidoDos')}
                                            margin="normal"
                                            fullWidth={true}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={3} className={classes.botonera}>
                                        <Tooltip title={'Buscar'} >
                                            <IconButton color="primary" onClick={this.search}>
                                                <SearchIcon/>
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title={'Limpiar'}>
                                            <IconButton color="primary" onClick={this.clean}>
                                                <ClearIcon/>
                                            </IconButton>
                                        </Tooltip>
                                    </Grid>

                                    <Grid item xs={12}>
                                        {this.state.showTable &&
                                        <Typography variant={'title'} className={classes.title}> Resultados
                                            previos</Typography>
                                        }
                                    </Grid>
                                    <Grid item xs={12}>
                                        {this.state.showTable &&
                                        <TablaPre registros={this.state.registros} getRegistro={this.getRegistro}
                                                  totalRows={this.state.totalRows} rowsPerPage={this.state.rowsPerPage}
                                                  page={this.state.page}
                                                  handleChangePage={this.handleChangePage}
                                                  handleChangeRowsPerPage={this.handleChangeRowsPerPage}/>
                                        }
                                    </Grid>
                                    <Grid item xs={12} id={'itemTabs'}>
                                        {
                                            this.state.bandera === 1 &&
                                            <Mensaje mensaje={'El usuario no cuenta con los permisos suficientes'}/>
                                        }
                                        {
                                            // this.state.bandera === 2 && <Registro declaracion={this.state.declaracion}/>
                                            this.state.bandera === 2 && <Tabs declaracion={this.state.declaracion}/>
                                        }
                                    </Grid>
                                </Grid>
                            </Grid>

                        </Grid>

                    </div>
                </div>
            </div>
        );
    }

}

DemoDeclaraciones.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DemoDeclaraciones);