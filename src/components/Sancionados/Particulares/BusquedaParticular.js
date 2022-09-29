import React from 'react';
import {
    Grid, MenuItem, FormControl, Typography,  ListItemText, TextField, Button, Checkbox, Modal, CircularProgress
} from '@mui/material';
import {withStyles} from '@mui/styles';
import PropTypes from 'prop-types';
import Previos from "../../Compartidos/Previos";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TablaParticularesSancionados from "./TablaParticularesSancionados";
import DetalleParticularSancionado from "./DetalleParticular";
import MensajeErrorDatos from "../../Mensajes/MensajeErrorDatos";
import { ThemeProvider } from '@mui/material/styles';
import ThemeV2 from "../../../ThemeV2";

import ReactGA from "react-ga";


const axios = require('axios');
const styles = theme => ({
    formControl: {
        width: '100%'
    },
    '&$focus': {
        //color: theme.palette.black.color,
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
        color: theme.palette.text.contrastText,
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
    button: {
        padding: theme.spacing(1),
        fontWeight: 'bold'
    }
});

const tiposSancion = [
    {label: 'Inhabilitado', value: 'I'},
    {label: 'Multado', value: 'M'},
    {label: 'Suspensión de actividades', value: 'S'},
    {label: 'Disolución de la sociedad', value: 'D'},
    {label: 'Amonestación', value: 'A'},
    {
        label: 'Indemnización por los daños y perjuicios ocasionados a la Hacienda Pública Federal, local o municipal, o al patrimonio de los entes públicos',
        value: 'IND'
    },
    {label: 'Sanción económica', value: 'SE'},
    {label: 'Otro', value: 'O'}
]

const camposOrdenamiento = [
    {label: 'Nombre o razón social', value: 'nombreRazonSocial'},
    {label: 'Institución', value: 'institucionDependencia'}
]

const tiposOrdenamiento = [
    {label: 'Ascendente', value: 'asc'},
    {label: 'Descendente', value: 'desc'}
]

const initialPagination = {
    page: 1,
    rowsPerPage: 10,
    totalRows: 0,
};

const initialFilter = {
    nombreRazonSocial: '',
    institucionDependencia: 'any',
    expediente: '',
    tipoSancion: [],
    tipoPersona: 'any',
    nivel: 'any',
    provider: 'any'
}

const initialSort = {
    campoOrden: 'any',
    tipoOrden: 'any',
};
function BusquedaParticular ({classes}){
    const [filterData, setFilterData] = React.useState([]);
    const [previos, setPrevios] = React.useState(null);
    const [error, setError] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [showAdvancedSearch, setShowAdvancedSearch] = React.useState(false);
    const [institutionsList, setInstitutionsList] = React.useState([]);
    const [selectedItem, setSelectedItem] = React.useState(null);
    const [provider, setProvider] = React.useState('any');
    const [providersList, setProvidersList] = React.useState([]);
    const [pagination, setPagination] = React.useState(initialPagination);
    const [filter, setFilter] = React.useState(initialFilter);
    const [sort, setSort] = React.useState(initialSort);
    const [view, setView] = React.useState(0);

    const [fixpaginador, setFixpaginador] = React.useState(false);

    React.useEffect(() => {
        loadInstitutions();
        loadProviders();
    }, []);

    React.useEffect(() => {
        loadInstitutions();
        loadProviders();
    }, [filter?.nivel]);

    React.useEffect(() => {
        if (provider !== 'any') {
            setPagination({...pagination, page: 1});
            setSelectedItem(null);
            handleSearch();
        }
    }, [provider]);

    React.useEffect(() => {
        loadInstitutions();
    }, [filter?.provider])

    React.useEffect(() => {
        if (provider !== "any" && fixpaginador === true)  {
            /* setPagination({ ...pagination });
            setSelectedItem(null); */
            setSelectedItem(null);
            handleSearch();
        }
    }, [fixpaginador]);

    const loadInstitutions = () => {
        let instituciconesLista = [];
        let options = {
            url: process.env.REACT_APP_S3P_BACKEND + '/api/v1/entities',
            json: true,
            method: "post",
            data: {}
        };
        if (filter.nivel !== 'any') options.data.nivel_gobierno = filter.nivel;
        if (filter.provider !== 'any') options.data.supplier_id = filter.provider;

        axios(options)
            .then(data => {
                data.data.forEach((item, index) => {
                    instituciconesLista.push({value: item.nombre, label: item.nombre, key: index});
                });
                setInstitutionsList(instituciconesLista);
                setFilter({...filter, institucionDependencia: 'any'});
            }).catch(err => {
            setError(true);
        });
    }

    const loadProviders = () => {
        let sug = [];
        let options = {
            url: process.env.REACT_APP_S3P_BACKEND + '/api/v1/getProviders',
            json: true,
            method: "post",
            data: { }
        };
        if(filter.nivel !== 'any') options.data.nivel_gobierno = filter.nivel
        axios(options)
            .then(data => {
                data.data.forEach((provider) => {
                    sug.push({value: provider.supplier_id, label: provider.supplier_name, key: provider.supplier_id});
                });
                setProvidersList(sug);
                setProvider('any');
            }).catch(err => {
            setError(true);
        });
    }

    const handleCleanAll = () => {
        setFilter(initialFilter);
        setProvidersList([]);
        setPagination(initialPagination);
        setSort(initialSort);
        setFilterData(null);
        setPrevios([]);
        setInstitutionsList([]);
        setSelectedItem(null);
        setView(0);
    };

    const handleSearchPrevios = () => {
        setLoading(true);
        setFilterData([]);
        setSelectedItem(null);
        setPagination({...pagination, rowsPerPage: 10});
        
        let body =
            {
                "query": makeFiltros(),
                "institucion": filter.institucionDependencia
            };
        if(filter.nivel !== 'any') body.nivel_gobierno = filter.nivel;
        if(filter.proveedor !== 'any') body.proveedor = filter.proveedor;

        let options = {
            method: 'POST',
            url: process.env.REACT_APP_S3P_BACKEND + '/api/v1/summary',
            json: true,
            data: body
        };
        axios(options)
            .then(res => {
                setPrevios(res.data);
                setLoading(false);
                setError(false);
                setView(1);
                setFixpaginador(false);
            }).catch(err => {
                setError(true);
                setLoading(false);
        });
    };

    const makeFiltros = () => {
        let filtros = {};
        let {nombreRazonSocial, institucionDependencia, expediente, tipoPersona, tipoSancion} = filter;
        if (nombreRazonSocial) filtros.nombreRazonSocial = nombreRazonSocial;
        if (expediente) filtros.expediente = expediente;
        if (tipoPersona !== 'any') filtros.tipoPersona = tipoPersona;
        if (institucionDependencia && institucionDependencia !== 'any') filtros.institucionDependencia = institucionDependencia;
        if (tipoSancion.length > 0) filtros.tipoSancion = tipoSancion.map(item => item.value);
        return filtros;
    };

    const makeSort = () => {
        let sort_ = {};
        if (sort.campoOrden !== 'any' && sort.tipoOrden !== 'any') sort_[sort.campoOrden.value] = sort.tipoOrden.value;
        return sort_;
    };

    const handleSearch = () => {
        setLoading(true);
        let body =
            {
                "query": makeFiltros(),
                "pageSize": pagination.rowsPerPage,
                "page": pagination.page,
                "supplier_id": provider,
                "sort": makeSort()
            };

        let options = {
            method: 'POST',
            url: process.env.REACT_APP_S3P_BACKEND + '/api/v1/search',
            json: true,
            data: body
        };

        axios(options)
            .then(res => {
                setFilterData(res.data.results);
                setLoading(false);
                setPagination({...pagination, totalRows: res.data.pagination.totalRows});
                setError(false);
                setView(2)
                setFixpaginador(false);
            }).catch(err => {
            setLoading(false);
            setError(true);
        });
    };

    const handleChangeSujetoObligado = (val) => {
        setProvider(val);
        setPagination({...pagination, page: 1});
    };

    const handleChangePage = (event, page) => {
        setPagination({...pagination, page: page + 1});
        setFixpaginador(true);
    };

    const handleChangeRowsPerPage = event => {
        setPagination({...pagination, rowsPerPage: event.target.value, page: 1});
        setFixpaginador(true);
    };

    const verDetalle = (event, elemento) => {
        setSelectedItem(elemento);
        setView(3);
        //setProvider('any');
    };

    const hideDetalle = () => {
        setSelectedItem(null);
        setView(2);
    };
    const returnToPrevios = () => {
        setView(1);
        setProvider('any');
    }
            return (
            <ThemeProvider theme={ThemeV2}>
                <React.Fragment>
                    {/*Buscador*/}
                    <Grid container spacing={4}>
                        <Grid item xs={12}>
                            <Typography><b>Busca un particular sancionado</b></Typography>
                        </Grid>

                        <Grid item md={4} xs={12}>
                            <FormControl className={classes.formControl}>
                                <TextField
                                    id="search"
                                    label="Nombre / Razón social"
                                    type="search"
                                    onChange={(e) => setFilter({...filter, nombreRazonSocial: e.target.value})}
                                    value={filter.nombreRazonSocial}
                                    margin="normal"
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={2}>
                            <FormControl className={classes.formControl}>
                                <TextField
                                    id="search"
                                    label="Número expediente"
                                    type="search"
                                    onChange={(e) => setFilter({...filter, expediente: e.target.value})}
                                    value={filter.expediente}
                                    margin="normal"
                                />

                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <FormControl className={classes.formControl}>
                            <TextField id={'tipoSancion'} name={'tipoSancion-select'} margin="normal" select label={'Tipo sanción'} 
                                SelectProps={{
                                    multiple: true,
                                    renderValue: selected => selected.map(element => element.label).join(', '),
                                    onChange: e => setFilter({...filter, tipoSancion: e.target.value}),
                                    value: filter.tipoSancion
                            }}>
                                    {tiposSancion.map(tipo => (
                                        <MenuItem key={tipo.value} value={tipo}>
                                            <Checkbox checked={filter.tipoSancion.indexOf(tipo) > -1}/>
                                            <ListItemText primary={tipo.label}/>
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={2}>
                            <FormControl className={classes.formControl}>
                                <TextField id={'tipoPersona'} name={'tipoPersona'} margin="normal" select label={'Tipo persona'} value={filter.tipoPersona} onChange={(e) => setFilter({...filter, tipoPersona: e.target.value})}>
                                    <MenuItem value="any"><em>Todos</em></MenuItem>
                                    <MenuItem value="F" key={"F"}>Física</MenuItem>
                                    <MenuItem value="M" key={"M"}>Moral</MenuItem>
                                </TextField>
                            </FormControl>
                        </Grid>
                        <Grid item md={2} xs={12}>
                            <FormControl className={classes.formControl}>
                                <TextField id={'nivel'} name={'nivel'} margin="normal" select label={'Nivel'} value={filter.nivel} onChange={(e) => setFilter({...filter, nivel: e.target.value})}>
                                    <MenuItem value={'any'} ><em>Todos</em></MenuItem>
                                    <MenuItem value={'Federal'} key={'Federal'}>{'Federal'}</MenuItem>
                                    <MenuItem value={'Estatal'} key={'Estatal'}>{'Estatal'}</MenuItem>
                                </TextField>
                            </FormControl>
                        </Grid>
                        <Grid item md={4} xs={12}>
                            <FormControl className={classes.formControl}>
                                <TextField id={'proveedor'} name={'proveedor'} margin="normal" select label={'Proveedor información'} value={filter.provider} onChange={(e) => setFilter({...filter, provider: e.target.value})}>
                                    <MenuItem value={'any'} key={-1}><em>Todos</em></MenuItem>
                                    {providersList.map((item => {
                                        return <MenuItem value={item.value} key={item.key}>
                                            {item.label}
                                        </MenuItem>
                                    }))}
                                </TextField>
                            </FormControl>
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <FormControl className={classes.formControl}>
                                <TextField id={'institucionDependencia'} name={'institucionDependencia'} margin="normal" select label={'Institución'} value={filter.institucionDependencia} onChange={(e) => setFilter({...filter, institucionDependencia: e.target.value})}>
                                    <MenuItem value = 'any'><em>Todas</em></MenuItem>
                                    {institutionsList.map((item => {
                                        return <MenuItem value={item.value} key={item.key}>
                                            {item.label}
                                        </MenuItem>
                                    }))}
                                </TextField>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12}>
                            <Button onClick={() => setShowAdvancedSearch(prevState => {
                                return !prevState
                            })} color={"text"}
                                    startIcon={showAdvancedSearch ? <ExpandLessIcon/> : <ExpandMoreIcon/>}
                            >Búsqueda avanzada</Button>
                        </Grid>

                        {showAdvancedSearch && <Grid item xs={12} md={3}>
                            <FormControl className={classes.formControl}>
                                <TextField id={'campoOrden'} name={'campoOrden'} margin="normal" select label={'Ordenar por'} value={sort.campoOrden} onChange={e => setSort({...sort, campoOrden: e.target.value})}>
                                    <MenuItem value={'any'}>
                                        <em>Ninguno</em>
                                    </MenuItem>
                                    {camposOrdenamiento.map(tipo => (
                                        <MenuItem key={tipo.value} value={tipo}>
                                            <ListItemText primary={tipo.label}/>
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </FormControl>
                        </Grid>}
                        {showAdvancedSearch && <Grid item xs={12} md={3}>
                            <FormControl className={classes.formControl}>
                                <TextField id={'namtipoOrdene'} name={'tipoOrden'} margin="normal" select label={'Tipo ordenamiento'} value={sort.tipoOrden} onChange={e => setSort({...sort, tipoOrden: e.target.value})}>
                                    <MenuItem value={'any'}>
                                        <em>Ninguno</em>
                                    </MenuItem>
                                    {tiposOrdenamiento.map(tipo => (
                                        <MenuItem key={tipo.value} value={tipo}>
                                            <ListItemText primary={tipo.label}/>
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </FormControl>
                        </Grid>}

                        <Grid item md={10}/>
                        <Grid item xs={12} md={1}>
                            <Button variant="contained" color="secundario" className={classes.button}
                                    onClick={() => handleCleanAll()}>
                                Limpiar
                            </Button>
                        </Grid>
                        <Grid item xs={12} md={1}>
                            <Button variant="contained" color="secundario" className={classes.button}
                                    onClick={() => {
                                        handleSearchPrevios();
                                        ReactGA.event({ category: 'busqueda-s3P', action: 'click' });
                                      }}
                                    >
                                Buscar
                            </Button>
                        </Grid>
                        <Grid item xs={12}>
                            {
                                loading &&
                                <Modal id={'modalIsela'}
                                       open={loading}
                                >
                                    <div>
                                        <CircularProgress className={classes.progress} size={200}/>
                                    </div>
                                </Modal>

                            }
                            {
                                error && <MensajeErrorDatos/>
                            }
                        </Grid>
                    </Grid>
                    {/*Previos*/}
                    {view === 1 && previos && previos.length > 0 &&
                    <Grid container>
                        <Grid item xs={12} className={classes.section}>
                                    <Previos data={previos}
                                             handleChangeSujetoObligado={handleChangeSujetoObligado}/>
                        </Grid>
                    </Grid>
                    }
                    {/*Tabla*/}
                    {view ===2 && filterData && filterData.length > 0 && selectedItem === null &&
                    <Grid container>
                        <Grid item xs={12}>
                            <TablaParticularesSancionados data={filterData} page={pagination.page}
                                                          rowsPerPage={pagination.rowsPerPage}
                                                          totalRows={pagination.totalRows}
                                                          handleChangePage={handleChangePage}
                                                          handleChangeRowsPerPage={handleChangeRowsPerPage}
                                                          verDetalle={verDetalle} nivel={filter.nivel}
                                                          returnToPrevios={returnToPrevios}
                            />
                        </Grid>
                    </Grid>
                    }
                    {/*Detalle*/}
                    {
                        view === 3 && selectedItem !== null &&
                        <DetalleParticularSancionado hideDetalle={hideDetalle}
                                                     particular={selectedItem}
                        />
                    }
                </React.Fragment>
            </ThemeProvider>

        );

}

BusquedaParticular.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles, {withTheme: true})(BusquedaParticular);

