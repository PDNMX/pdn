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
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import rp from "request-promise";
import Modal from "@material-ui/core/Modal";
import CircularProgress from "@material-ui/core/CircularProgress";
import MensajeErrorDatos from "../../Tablas/MensajeErrorDatos";
import Switch from "@material-ui/core/Switch";
import Collapse from "@material-ui/core/Collapse";
import Previos from "./Previos";
import TablaServidoresSancionados from "./TablaServidoresSancionados";
import MensajeNoRegistros from "../../Tablas/MensajeNoRegistros";
import DetalleServidorSancionado from "./DetalleServidorSancionado";

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
        marginTop: '30px',
        marginBottom: '30px',
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
    {label: 'Destitución del empleo, cargo o comisión', value: 'D'}
]

const camposOrdenamiento = [
    {label: 'RFC', value: 'rfc'},
    {label: 'CURP', value: 'curp'},
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
            rfc: '',
            curp: '',
            institucionDependencia: "",
            nivel: '',
            campoOrden: '',
            tipoOrden: '',
            institucionesLista: [],
            elementoSeleccionado : null
        }
    }

    componentDidMount() {
        this.loadInstituciones();
    }

    loadInstituciones = () => {
        let sug = [];
        let options = {
            uri: process.env.REACT_APP_S3S_BACK + '/entities',
            json: true,
            method: "post",
            body: {
                nivel_gobierno: this.state.nivel
            }
        };
        rp(options)
            .then(data => {
                data.forEach((item, index) => {
                    sug.push({value: item.nombre, label: item.nombre, key: index});
                });
                this.setState({institucionesLista: sug, institucionDependencia: ''});
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
                    break;
                case 'campoOrden':
                    if(!this.state.tipoOrden)this.setState({tipoOrden: {label: 'Ascendente', value: 'asc'}});
                    if(!event.target.value)this.setState({tipoOrden:''})
                    break;
                case 'tipoOrden':
                    if(!this.state.campoOrden && event.target.value)this.setState({campoOrden: {label: 'RFC', value: 'rfc'} });
                    if(!event.target.value)this.setState({campoOrden:''})
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
                rfc: '',
                curp: '',
                campoOrden: '',
                tipoOrden: '',
                institucionesLista: [],
                elementoSeleccionado : null,
                rowsPerPage: 10,
            }, () => {
                this.loadInstituciones();
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
                    "nivel_gobierno": this.state.nivel
                };

            let options = {
                method: 'POST',
                uri: process.env.REACT_APP_S3S_BACK + '/summary',
                json: true,
                body: body
            };
            rp(options)
                .then(res => {
                    this.setState({previos: res, loading: false, error: false, panelPrevios: true})
                }).catch(err => {
                 this.setState({loading: false, error: true});
            });
        });
    };

    makeFiltros = () => {
        let filtros = {};
        let {institucionDependencia, nombres, primerApellido, segundoApellido, rfc, curp, tipoSancion} = this.state;
        if (nombres) filtros.nombres = nombres;
        if (primerApellido) filtros.primerApellido = primerApellido;
        if (segundoApellido) filtros.segundoApellido = segundoApellido;
        if (rfc) filtros.rfc = rfc;
        if (curp) filtros.curp = curp;
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
                uri: process.env.REACT_APP_S3S_BACK + '/search',
                json: true,
                body: body
            };

            rp(options)
                .then(res => {
                    this.setState({
                        filterData: res.results,
                        loading: false,
                        totalRows: res.pagination.totalRows,
                        error: false
                    },)
                }).catch(err => {
                this.setState({loading: false, error: true});
            });
        });

    };

    handleChangeAPI = (val) => {
        this.setState({
            supplier_id: val,
            page: 1,
            elementoSeleccionado: null
        }, () => {
            this.handleSearchAPI()
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

    render() {
        const {classes} = this.props;
        const {nombres, primerApellido, segundoApellido, rfc, curp, institucionDependencia, nivel, tipoSancion, campoOrden, tipoOrden, institucionesLista} = this.state;
        return (
            <div>
                {/*Buscador*/}
                <Grid container spacing={4}>
                    <Grid item xs={12}>
                        <Typography><b>Busca un servidor público sancionado</b></Typography>
                    </Grid>
                    <Grid item xs={12} md={3}>
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
                    <Grid item xs={12} md={3}>
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
                    <Grid item xs={12} md={3}>
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

                    <Grid item xs={12} md={3}>
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
                                                return <em>Cualquiera</em>;
                                            }
                                            return selected.map(element => element.label).join(', ')
                                        }
                                    }

                            >
                                <MenuItem disabled value={[]}>
                                    <em>Cualquiera</em>
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

                    <Grid item xs={12} md={6}>
                        <FormControl className={classes.formControl}>
                            <InputLabel shrink id="institucionDependencia-label">
                                Institución
                            </InputLabel>
                            <Select value={institucionDependencia}
                                    onChange={(e) => this.handleChangeCampo('institucionDependencia', e)}
                                    displayEmpty
                            >
                                <MenuItem value="" key={-1}><em>Cualquiera</em></MenuItem>
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

                    <Grid item md={6} xs={12}>
                        <FormControl component="fieldset" className={classes.formControl}>
                            <FormLabel component="legend">Nivel</FormLabel>
                            <RadioGroup row
                                        aria-label="gender"
                                        name="gender1"
                                        className={classes.group}
                                        value={nivel}
                                        onChange={(e) => this.handleChangeCampo('nivel', e)}
                            >
                                <FormControlLabel value="" control={<Radio/>} label="Todos"/>
                                <FormControlLabel value="Federal" control={<Radio/>} label="Federal"/>
                                <FormControlLabel value="Estatal" control={<Radio/>} label="Estatal"/>
                            </RadioGroup>

                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <Button onClick={() => this.handleBusquedaAvanzada()}
                                startIcon={this.state.busquedaAvanzada ? <ExpandLessIcon/> : <ExpandMoreIcon/>}
                        >Búsqueda avanzada</Button>
                    </Grid>

                    {this.state.busquedaAvanzada && <Grid item xs={12} md={3}>
                        <FormControl className={classes.formControl}>
                            <TextField
                                id="curp"
                                label="CURP"
                                type="search"
                                onChange={(e) => this.handleChangeCampo('curp', e)}
                                value={curp}
                            />

                        </FormControl>
                    </Grid>}
                    {this.state.busquedaAvanzada && <Grid item xs={12} md={3}>
                        <FormControl className={classes.formControl}>
                            <TextField
                                id="rfc"
                                label="RFC"
                                type="search"
                                onChange={(e) => this.handleChangeCampo('rfc', e)}
                                value={rfc}
                            />

                        </FormControl>
                    </Grid>}
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
                                onClick={() => this.handleSearchPrevios()}>
                            Buscar
                        </Button>
                    </Grid>
                    <Grid item xs={12} md={1} className={classes.centrado}>
                        <Button variant="contained" color="secondary" className={classes.button}
                                onClick={() => this.handleCleanAll()}>
                            Limpiar
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
                <Grid container>
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
                    <Grid item xs={12} className={classes.section}>
                            <div className={classes.container}>
                                <Collapse in={this.state.panelPrevios}>
                                    <Previos previos={this.state.previos} handleChangeAPI={this.handleChangeAPI}/>
                                </Collapse>
                            </div>
                    </Grid>
                </Grid>
                }
                {
                    <Grid item xs={12}>
                        {(this.state.previos && this.state.previos.length <= 0) &&
                        <MensajeNoRegistros/>
                        }
                    </Grid>
                }
                {/*TABLA*/}
                {this.state.filterData && this.state.filterData.length > 0 && this.state.elementoSeleccionado === null &&
                <Grid container>
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
            </div>
        );
    }
}

BusquedaServidor.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles, {withTheme: true})(BusquedaServidor);
