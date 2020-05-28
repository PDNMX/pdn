import React from 'react';
import TextField from '@material-ui/core/TextField';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import FormControl from "@material-ui/core/FormControl/FormControl";
import Select from '@material-ui/core/Select';
import MenuItem from "@material-ui/core/MenuItem";
import rp from "request-promise";
import Grid from "@material-ui/core/Grid/Grid";
import {Typography} from "@material-ui/core"
import Button from "@material-ui/core/Button";
import InputLabel from '@material-ui/core/InputLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from "@material-ui/core/FormLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import Switch from "@material-ui/core/Switch";
import Collapse from "@material-ui/core/Collapse";
import Previos from "../../Compartidos/Previos";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Input from "@material-ui/core/Input";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import TablaParticularesSancionados from "./TablaParticularesSancionados";
import DetalleParticularSancionado from "./DetalleParticular";
import Modal from "@material-ui/core/Modal";
import CircularProgress from "@material-ui/core/CircularProgress";
import MensajeErrorDatos from "../../Tablas/MensajeErrorDatos";


const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
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
});

const tiposSancion = [
    {label: 'Inhabilitado', value: 'I'},
    {label: 'Multado', value: 'M'},
    {label: 'Suspensión de actividades', value: 'S'},
    {label: 'Disolución de la sociedad', value: 'D'},
    {label: 'Amonestación', value: 'A'}
]

const camposOrdenamiento = [
    {label: 'RFC', value: 'rfc'},
    {label: 'Nombre o razón social', value: 'nombreRazonSocial'},
    {label: 'Institución', value: 'institucionDependencia'}
]

const tiposOrdenamiento = [
    {label: 'Ascendente', value: 'asc'},
    {label: 'Descendente', value: 'desc'}
]

class BusquedaParticular extends React.Component {
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
            nombreRazonSocial: '',
            rfc: '',
            institucionDependencia: "",
            expediente: '',
            tipoSancion: [],
            tipoPersona: '',
            nivel: '',
            campoOrden: '',
            tipoOrden: '',
            institucionesLista: [],
            elementoSeleccionado: null
        };
    }

    componentDidMount() {
        this.loadInstituciones()
    }

    loadInstituciones = () => {
        let instituciconesLista = [];
        let options = {
            uri: process.env.REACT_APP_S3P_BACKEND + '/entities',
            json: true,
            method: "post",
            body: {
                nivel_gobierno: this.state.nivel
            }
        };
        rp(options)
            .then(data => {
                data.forEach((item, index) => {
                    instituciconesLista.push({value: item.nombre, label: item.nombre, key: index});
                });
                this.setState({institucionesLista: instituciconesLista, institucionDependencia: ''});
            }).catch(err => {
            console.log(err);
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
                    if (!this.state.tipoOrden) this.setState({tipoOrden: {label: 'Ascendente', value: 'asc'}});
                    if (!event.target.value) this.setState({tipoOrden: ''})
                    break;
                case 'tipoOrden':
                    if (!this.state.campoOrden && event.target.value) this.setState({
                        campoOrden: {
                            label: 'RFC',
                            value: 'rfc'
                        }
                    });
                    if (!event.target.value) this.setState({campoOrden: ''})
                    break;
                default:
                    break;
            }
        })
    };

    handleCleanAll = () => {
        this.setState(
            {
                nombreRazonSocial: "",
                rfc: "",
                institucionDependencia: "",
                expediente: "",
                tipoSancion: [],
                tipoPersona: "",
                nivel: "",
                campoOrden: "",
                tipoOrden: "",
                filterData: null,
                previos: null,
                curp: "",
                institucionesLista: [],
                elementoSeleccionado: null,
                rowsPerPage: 10,
            }, () => {
                this.loadInstituciones();
            })
    };

    handleSearchPrevios = () => {
        this.setState({
            loading: true,
            filterData: [],
            elementoSeleccionado: null,
            rowsPerPage: 10
        }, () => {
            let body =
                {
                    "query": this.makeFiltros(),
                    "nivel_gobierno": this.state.nivel
                };

            let options = {
                method: 'POST',
                uri: process.env.REACT_APP_S3P_BACKEND + '/summary',
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
        let {rfc, nombreRazonSocial, institucionDependencia, expediente, tipoPersona, tipoSancion} = this.state;
        if (nombreRazonSocial) filtros.nombreRazonSocial = nombreRazonSocial;
        if (expediente) filtros.expediente = expediente;
        if (tipoPersona) filtros.tipoPersona = tipoPersona;
        if (institucionDependencia && institucionDependencia !== '') filtros.institucionDependencia = institucionDependencia;
        if (tipoSancion.length > 0) filtros.tipoSancion = tipoSancion.map(item => item.value);
        if (rfc) filtros.rfc = rfc;
        return filtros;
    };

    makeSort = () => {
        let sort = {};
        if (this.state.campoOrden && this.state.tipoOrden) sort[this.state.campoOrden.value] = this.state.tipoOrden.value;
        return sort;
    };

    handleShowPrevios = () => {
        this.setState({
            panelPrevios: !this.state.panelPrevios
        })
    }

    handleBusquedaAvanzada = () => {
        this.setState({busquedaAvanzada: !this.state.busquedaAvanzada})
    }

    handleSearch = () => {
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
                uri: process.env.REACT_APP_S3P_BACKEND + '/search',
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

    handleChangeSujetoObligado = (val) => {
        this.setState({
            supplier_id: val,
            page: 1,
            elementoSeleccionado: null
        }, () => {
            this.handleSearch()
        });
    };

    handleChangePage = (event, page) => {
        this.setState({page: page + 1}, () => {
            this.handleSearch();
        });
    };

    handleChangeRowsPerPage = event => {
        this.setState({rowsPerPage: event.target.value, page: 1}, () => {
            this.handleSearch();
        });
    };

    verDetalle = (event, elemento) => {
        this.setState({elementoSeleccionado: elemento, panelPrevios: false});
    };

    hideDetalle = () => {
        this.setState({elementoSeleccionado: null});
    };

    render() {
        const {classes} = this.props;
        const {nombreRazonSocial, expediente, institucionDependencia, institucionesLista, nivel, rfc, campoOrden, tipoOrden, tipoSancion, tipoPersona} = this.state;

        return (
            <div>

                {/*Buscador*/}
                <Grid container spacing={4}>
                    <Grid item xs={12}>
                        <Typography paragraph><b>Busca un particular sancionado</b></Typography>
                    </Grid>

                    <Grid item md={3} xs={12}>
                        <FormControl className={classes.formControl}>
                            <TextField
                                id="search"
                                label="Nombre / Razón social"
                                type="search"
                                onChange={(e) => this.handleChangeCampo('nombreRazonSocial', e)}
                                value={nombreRazonSocial}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <FormControl className={classes.formControl}>
                            <TextField
                                id="search"
                                label="Número expediente"
                                type="search"
                                onChange={(e) => this.handleChangeCampo('expediente', e)}
                                value={expediente}
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
                    <Grid item xs={12} md={3}>
                        <FormControl className={classes.formControl}>
                            <InputLabel shrink id="tipoSancion-label">Tipo persona</InputLabel>
                            <Select value={tipoPersona}
                                    onChange={(e) => this.handleChangeCampo('tipoPersona', e)}
                                    displayEmpty
                            >
                                <MenuItem value="" key={-1}><em>Cualquiera</em></MenuItem>
                                <MenuItem value="F" key={"F"}>Física</MenuItem>
                                <MenuItem value="M" key={"M"}>Moral</MenuItem>
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
                                onClick={this.handleSearchPrevios}>
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
                            <Modal id={'modalIsela'}
                                   open={this.state.loading}
                            >
                                <div>
                                    <CircularProgress className={classes.progress} size={200}/>
                                </div>
                            </Modal>

                        }
                        {
                            this.state.error && <MensajeErrorDatos/>
                        }
                    </Grid>
                </Grid>
                {/*Previos*/}
                {this.state.previos && this.state.previos.length > 0 &&
                <Grid container>
                    <Grid item xs={12} className={classes.section}>
                        <FormControlLabel
                            control={<Switch className={classes.containerPrevios}
                                             checked={this.state.panelPrevios}
                                             onChange={() => this.handleShowPrevios()}/>}
                            label={
                                <Typography variant="h6" className={classes.desc}>
                                    {this.state.panelPrevios ? 'Ocultar resultados generales' : 'Mostrar resultados generales'}</Typography>}
                        />
                    </Grid>
                    <Grid item xs={12} className={classes.section}>
                        <div className={classes.container}>
                            <Collapse in={this.state.panelPrevios}>
                                <Previos data={this.state.previos}
                                         handleChangeSujetoObligado={this.handleChangeSujetoObligado}/>
                            </Collapse>
                        </div>
                    </Grid>
                </Grid>
                }
                {/*Tabla*/}
                {this.state.filterData && this.state.filterData.length > 0 && this.state.elementoSeleccionado === null &&
                <Grid container>
                    <Grid item xs={12}>
                        <TablaParticularesSancionados data={this.state.filterData} page={this.state.page}
                                                      rowsPerPage={this.state.rowsPerPage}
                                                      totalRows={this.state.totalRows}
                                                      handleChangePage={this.handleChangePage}
                                                      handleChangeRowsPerPage={this.handleChangeRowsPerPage}
                                                      verDetalle={this.verDetalle} nivel={this.state.nivel}/>
                    </Grid>
                </Grid>
                }
                {/*Detalle*/}
                {
                    this.state.elementoSeleccionado !== null &&
                    <DetalleParticularSancionado hideDetalle={this.hideDetalle}
                                                 particular={this.state.elementoSeleccionado}
                    />
                }
            </div>


        );
    }
}

BusquedaParticular.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles, {withTheme: true})(BusquedaParticular);

