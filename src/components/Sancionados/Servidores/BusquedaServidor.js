//PANTALLA DE BUSQUEDASERVIDOR, CON SELECT PARA SORT
import React from 'react';
import TextField from '@material-ui/core/TextField';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";
import {Typography} from "@material-ui/core"
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import Select from "@material-ui/core/Select";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import Modal from "@material-ui/core/Modal";
import CircularProgress from "@material-ui/core/CircularProgress";
import MensajeErrorDatos from "../../Mensajes/MensajeErrorDatos";
import Switch from "@material-ui/core/Switch";
import Collapse from "@material-ui/core/Collapse";
import Previos from "../../Compartidos/Previos";
import TablaServidoresSancionados from "./TablaServidoresSancionados";
import DetalleServidorSancionado from "./DetalleServidorSancionado";
const axios = require('axios');

const styles = theme => ({
    formControl: {
        width: '100%'
    },
    '&$focus': {
        color: theme.palette.black.color,
    },
    centrado: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    progress: {
        position: 'fixed',
        margin: 'auto',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
    },
    desc: {
        color: theme.palette.primary.dark,
    },
    container: {
        /* marginTop: '30px',
        marginBottom: '30px',*/
        overflowX: 'auto',
    },
    section: {
        maxWidth: '1200px',
        overflowX: 'auto',
        padding: theme.spacing(1)
    },
});

const tiposSancion = [
    {label: 'Inhabilitado', value: 'I'},
    {label: 'Multado', value: 'M'},
    {label: 'Suspensión del empleo, cargo o comisión', value: 'S'},
    {label: 'Destitución del empleo, cargo o comisión', value: 'D'},
    {label: 'Indemnización resarcitoria', value: 'IRSC'},
    {label: 'Sanción económica', value: 'SE'},
    {label: 'Otro', value: 'O'}
]

const camposOrdenamiento = [
    {label: 'Nombre', value: 'nombres'},
    {label: 'Apellido Uno', value: 'primerApellido'},
    {label: 'Apellido Dos', value: 'segundoApellido'},
    {label: 'Institución', value: 'institucionDependencia'}
]

const tiposOrdenamiento = [
    {label: 'Ascendente', value: 'asc'},
    {label: 'Descendente', value: 'desc'}
]

class BusquedaServidor extends React.Component {
    constructor(props) {
        super(props);
        this.previosRef = React.createRef();
        this.resultsRef = React.createRef();
        this.state = {
            filterData: [],
            page: 1,
            rowsPerPage: 10,
            totalRows: 0,
            previos: null,
            panelPrevios: true,
            error: false,
            loading: false,
            busquedaAvanzada: false,
            //Filtros
            nombres: '',
            primerApellido: '',
            segundoApellido: '',
            tipoSancion: [],
            institucionDependencia: "",
            nivel: '',
            campoOrden: '',
            tipoOrden: '',
            institucionesLista: [],
            elementoSeleccionado : null,
            proveedor:'',
            proveedoresLista: []
        }
    }

    componentDidMount() {
        this.loadInstituciones();
        this.loadProveedores();
    }

    loadInstituciones = () => {
        let sug = [];
        let options = {
            url: process.env.REACT_APP_S3S_BACKEND + '/api/v1/entities',
            json: true,
            method: "post",
            data: {
                nivel_gobierno: this.state.nivel,
                supplier_id: this.state.proveedor
            }
        };
        axios(options)
            .then(data => {
                data.data.forEach((item, index) => {
                    sug.push({value: item.nombre, label: item.nombre, key: index});
                });
                this.setState({institucionesLista: sug, institucionDependencia: ''});
            }).catch(err => {
            this.setState({error: true})
        });
    }

    loadProveedores = () => {
        let sug = [];
        let options = {
            url: process.env.REACT_APP_S3S_BACKEND + '/api/v1/getProviders',
            json: true,
            method: "post",
            data: {
                nivel_gobierno: this.state.nivel
            }
        };
        axios(options)
            .then(data => {
                data.data.forEach((provider) => {
                    sug.push({value: provider.supplier_id, label: provider.supplier_name, key: provider.supplier_id});
                });
                this.setState({proveedoresLista: sug, proveedor: ''});
            }).catch(err => {
            this.setState({error: true})
        });
    }

    handleChangeCampo = (varState, event) => {
        this.setState({
            [varState]: event ? (event.target ? event.target.value : event.value) : ''
        }, () => {
            switch (varState) {
                case 'nivel':
                    this.loadInstituciones();
                    this.loadProveedores();
                    break;
                case 'campoOrden':
                    if(!this.state.tipoOrden)this.setState({tipoOrden: {label: 'Ascendente', value: 'asc'}});
                    if(!event.target.value)this.setState({tipoOrden:''})
                    break;
                case 'tipoOrden':
                    if(!this.state.campoOrden && event.target.value)this.setState({campoOrden: camposOrdenamiento[0] });
                    if(!event.target.value)this.setState({campoOrden:''})
                    break;
                case 'proveedor':
                    this.loadInstituciones();
                    break;
                default:
                    console.log(varState);
                    break;
            }
        })
    };

    handleCleanAll = () => {
        this.setState(
            {
                filterData: null,
                previos: null,
                nivel: '',
                tipoSancion: [],
                nombres: '',
                institucionDependencia: '',
                primerApellido: '',
                segundoApellido: '',
                campoOrden: '',
                tipoOrden: '',
                institucionesLista: [],
                elementoSeleccionado : null,
                rowsPerPage: 10,
                proveedoresLista: []
            }, () => {
                this.loadInstituciones();
                this.loadProveedores();
            })
    };
//10,25,50
    handleSearchPrevios = () => {
        this.setState({
            loading: true,
            filterData: [],
            elementoSeleccionado : null,
            rowsPerPage: 10
        }, () => {
            let body =
                {
                    "query": this.makeFiltros(),
                    "nivel_gobierno": this.state.nivel,
                    "proveedor" : this.state.proveedor,
                    "institucion" : this.state.institucionDependencia
                };

            let options = {
                method: 'POST',
                url: process.env.REACT_APP_S3S_BACKEND + '/api/v1/summary',
                json: true,
                data: body
            };
            axios(options)
                .then(res => {
                    this.setState(
                        {previos: res.data, loading: false, error: false, panelPrevios: true}
                    ,()=>{
                            this.executeScrollPrevios();
                        })
                }).catch(err => {
                 this.setState({loading: false, error: true});
            });
        });
    };

    makeFiltros = () => {
        let filtros = {};
        let {institucionDependencia, nombres, primerApellido, segundoApellido, tipoSancion} = this.state;
        if (nombres) filtros.nombres = nombres;
        if (primerApellido) filtros.primerApellido = primerApellido;
        if (segundoApellido) filtros.segundoApellido = segundoApellido;
        if (institucionDependencia && institucionDependencia !== '') filtros.institucionDependencia = institucionDependencia;
        if (tipoSancion.length > 0) filtros.tipoSancion = tipoSancion.map(item => item.value);
        return filtros;
    };

    makeSort = () => {
        let sort = {};
        if (this.state.campoOrden && this.state.tipoOrden) sort[this.state.campoOrden.value] = this.state.tipoOrden.value;
        return sort;
    };

    handleChange = () => {
        this.setState({
            panelPrevios: !this.state.panelPrevios
        })
    }

    handleBusquedaAvanzada = () => {
        this.setState({busquedaAvanzada: !this.state.busquedaAvanzada})
    }

    handleSearchAPI = () => {
        this.setState({loading: true}, () => {
            let body =
                {
                    "query": this.makeFiltros(),
                    "pageSize": this.state.rowsPerPage,
                    "page": this.state.page,
                    "supplier_id": this.state.supplier_id,
                    "sort": this.makeSort()
                };

            let options = {
                method: 'POST',
                url: process.env.REACT_APP_S3S_BACKEND + '/api/v1/search',
                json: true,
                data: body
            };

            axios(options)
                .then(res => {
                    let resultado = res.data;
                    this.setState({
                        filterData: resultado.results,
                        loading: false,
                        totalRows: resultado.pagination.totalRows,
                        error: false
                    },()=>{
                        this.executeScrollResults();
                    })
                }).catch(err => {
                this.setState({loading: false, error: true});
            });
        });

    };

    handleChangeAPI = (val) => {
        this.setState({
            supplier_id: val,
            page: 1,
            elementoSeleccionado: null,

        }, () => {
            this.handleSearchAPI();
        });
    };

    handleChangePage = (event, page) => {
        this.setState({page:page+1}, () => {
            this.handleSearchAPI();
        });
    };

    handleChangeRowsPerPage = event => {
        this.setState({rowsPerPage: event.target.value, page: 1}, () => {
            this.handleSearchAPI();
        });
    };

    verDetalle = (event, elemento) => {
        this.setState({elementoSeleccionado: elemento, panelPrevios : false});
    };

    handleChangeDetail = () => {
        this.setState({elementoSeleccionado: null});
    };

    executeScrollPrevios = () => this.previosRef.current.scrollIntoView();

    executeScrollResults = () => this.resultsRef.current.scrollIntoView();

    render() {
        const {classes} = this.props;
        const {nombres, primerApellido, segundoApellido,institucionDependencia, nivel, tipoSancion, campoOrden, tipoOrden, institucionesLista, proveedor, proveedoresLista} = this.state;

        return (
            <React.Fragment>
                {/*Buscador*/}
                <Grid container spacing={4}>
                    <Grid item xs={12}>
                        <Typography><b>Busca un servidor público sancionado</b></Typography>
                    </Grid>
                    <Grid item xs={12} md={2}>
                        <FormControl className={classes.formControl}>
                            <TextField
                                id="nombres"
                                label="Nombre(s)"
                                type="search"
                                onChange={(e) => this.handleChangeCampo('nombres', e)}
                                value={nombres}
                            />

                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={2}>
                        <FormControl className={classes.formControl}>
                            <TextField
                                id="primerApellido"
                                label="Apellido Uno"
                                type="search"
                                onChange={(e) => this.handleChangeCampo('primerApellido', e)}
                                value={primerApellido}
                            />

                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={2}>
                        <FormControl className={classes.formControl}>
                            <TextField
                                id="segundoApellido"
                                label="Apellido Dos"
                                type="search"
                                onChange={(e) => this.handleChangeCampo('segundoApellido', e)}
                                value={segundoApellido}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <FormControl className={classes.formControl}>
                            <InputLabel shrink id="tipoSancion-label">Tipo sanción</InputLabel>
                            <Select displayEmpty
                                    id="tipoSancion-checkbox"
                                    multiple
                                    value={tipoSancion}
                                    onChange={e => this.handleChangeCampo('tipoSancion', e)}
                                    input={<Input/>}
                                    renderValue={
                                        selected => {
                                            if (selected.length === 0) {
                                                return <em>Todos</em>;
                                            }
                                            return selected.map(element => element.label).join(', ')
                                        }
                                    }

                            >
                                <MenuItem disabled value={[]}>
                                    <em>Todos</em>
                                </MenuItem>
                                {tiposSancion.map(tipo => (
                                    <MenuItem key={tipo.value} value={tipo}>
                                        <Checkbox checked={tipoSancion.indexOf(tipo) > -1}/>
                                        <ListItemText primary={tipo.label}/>
                                    </MenuItem>

                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={2}>
                        <FormControl className={classes.formControl}>
                            <InputLabel shrink id="nivel-label">
                                Nivel
                            </InputLabel>
                            <Select value={nivel}
                                    onChange={(e) => this.handleChangeCampo('nivel', e)}
                                    displayEmpty
                            >
                                <MenuItem value={''} key={-1}><em>Todos</em></MenuItem>
                                <MenuItem value={'Federal'} key={'Federal'}>
                                    {'Federal'}
                                </MenuItem>
                                <MenuItem value={'Estatal'} key={'Estatal'}>
                                    {'Estatal'}
                                </MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item md={4} xs={12}>
                        <FormControl className={classes.formControl}>
                            <InputLabel shrink id="proveedor-label">
                                Proveedor información
                            </InputLabel>
                            <Select value={proveedor}
                                    onChange={(e) => this.handleChangeCampo('proveedor', e)}
                                    displayEmpty
                            >
                                <MenuItem value={''} key={-1}><em>Todos</em></MenuItem>
                                {
                                    proveedoresLista.map((item => {
                                        return <MenuItem value={item.value} key={item.key}>
                                            {item.label}
                                        </MenuItem>
                                    }))
                                }
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <FormControl className={classes.formControl}>
                            <InputLabel shrink id="institucionDependencia-label">
                                Institución
                            </InputLabel>
                            <Select value={institucionDependencia}
                                    onChange={(e) => this.handleChangeCampo('institucionDependencia', e)}
                                    displayEmpty
                            >
                                <MenuItem value="" key={-1}><em>Todas</em></MenuItem>
                                {
                                    institucionesLista.map((item => {
                                        return <MenuItem value={item.value} key={item.key}>
                                            {item.label}
                                        </MenuItem>
                                    }))
                                }
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item  xs={12}>
                        <Button onClick={() => this.handleBusquedaAvanzada()}
                                startIcon={this.state.busquedaAvanzada ? <ExpandLessIcon/> : <ExpandMoreIcon/>}
                        >Búsqueda avanzada</Button>
                    </Grid>

                    {this.state.busquedaAvanzada && <Grid item xs={12} md={3}>
                        <FormControl className={classes.formControl}>
                            <InputLabel shrink id="campoOrden-label">Ordenar por</InputLabel>
                            <Select displayEmpty
                                    id="campoOrden-checkbox"
                                    value={campoOrden}
                                    onChange={e => this.handleChangeCampo('campoOrden', e)}
                                    input={<Input/>}
                                    renderValue={
                                        selected => {
                                            if (selected.length === 0) {
                                                return <em>Ninguno</em>;
                                            }
                                            return selected.label
                                        }
                                    }

                            >
                                <MenuItem value={''}>
                                    <em>Ninguno</em>
                                </MenuItem>
                                {camposOrdenamiento.map(tipo => (
                                    <MenuItem key={tipo.value} value={tipo}>
                                        <ListItemText primary={tipo.label}/>
                                    </MenuItem>

                                ))}
                            </Select>
                        </FormControl>
                    </Grid>}
                    {this.state.busquedaAvanzada && <Grid item xs={12} md={3}>
                        <FormControl className={classes.formControl}>
                            <InputLabel shrink id="tipoOrden-label">Tipo ordenamiento</InputLabel>
                            <Select displayEmpty
                                    id="tipoOrden-checkbox"
                                    value={tipoOrden}
                                    onChange={e => this.handleChangeCampo('tipoOrden', e)}
                                    input={<Input/>}
                                    renderValue={
                                        selected => {
                                            if (selected.length === 0) {
                                                return <em>Ninguno</em>;
                                            }
                                            return selected.label
                                        }
                                    }

                            >
                                <MenuItem value={''}>
                                    <em>Ninguno</em>
                                </MenuItem>
                                {tiposOrdenamiento.map(tipo => (
                                    <MenuItem key={tipo.value} value={tipo}>
                                        <ListItemText primary={tipo.label}/>
                                    </MenuItem>

                                ))}
                            </Select>
                        </FormControl>
                    </Grid>}

                    <Grid item md={10}/>

                    <Grid item xs={12} md={1} className={classes.centrado}>
                        <Button variant="contained" color="secondary" className={classes.button}
                                onClick={() => this.handleCleanAll()}>
                            Limpiar
                        </Button>
                    </Grid>
                    <Grid item xs={12} md={1} className={classes.centrado}>
                        <Button variant="contained" color="secondary" className={classes.button}
                                onClick={() => this.handleSearchPrevios()}>
                            Buscar
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        {
                            this.state.loading &&
                            <Modal
                                open={this.state.loading}
                                disableAutoFocus={true}
                            >
                                <CircularProgress className={classes.progress} id="spinnerLoading" size={200}/>
                            </Modal>

                        }
                        {
                            this.state.error && <MensajeErrorDatos/>
                        }
                    </Grid>
                </Grid>
                {/*PREVIOS*/}
                {this.state.previos && this.state.previos.length > 0 &&
                <Grid container ref={this.previosRef}>
                    <Grid item xs={12} className={classes.section}>
                            <FormControlLabel
                                control={<Switch className={classes.containerPrevios}
                                                 checked={this.state.panelPrevios}
                                                 onChange={() => this.handleChange()}/>}
                                label={
                                    <Typography variant="h6" className={classes.desc}>
                                        {this.state.panelPrevios ? 'Ocultar resultados generales' : 'Mostrar resultados generales'}</Typography>}
                            />
                    </Grid>
                    <Grid item xs={12} className={classes.section} >
                            <div className={classes.container}>
                                <Collapse in={this.state.panelPrevios}>
                                    <Previos data={this.state.previos} handleChangeSujetoObligado={this.handleChangeAPI}/>
                                </Collapse>
                            </div>
                    </Grid>
                </Grid>
                }
                {/*TABLA*/}
                {this.state.filterData && this.state.filterData.length > 0 && this.state.elementoSeleccionado === null &&
                <Grid container ref={this.resultsRef}>
                    <Grid item xs={12} >
                            <TablaServidoresSancionados data={this.state.filterData} page={this.state.page}
                                                        rowsPerPage={this.state.rowsPerPage}
                                                        totalRows={this.state.totalRows}
                                                        handleChangePage={this.handleChangePage}
                                                        handleChangeRowsPerPage={this.handleChangeRowsPerPage}
                                                        verDetalle={this.verDetalle}/>
                    </Grid>
                </Grid>
                }
                {
                    this.state.elementoSeleccionado !== null &&
                    <DetalleServidorSancionado handleChangeDetail={this.handleChangeDetail}
                                               servidor={this.state.elementoSeleccionado}
                    />
                }
            </React.Fragment>
        );
    }
}

BusquedaServidor.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles, {withTheme: true})(BusquedaServidor);
