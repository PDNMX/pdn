//PANTALLA DE BUSQUEDASERVIDOR, CON SELECT PARA SORT
import React from 'react';
import withStyles from '@mui/styles/withStyles';
import PropTypes from 'prop-types';
import {
    Typography, Grid, MenuItem, Checkbox, FormControl,
    Button, ListItemText, Modal, CircularProgress, TextField
} from "@mui/material"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import MensajeErrorDatos from "../../Mensajes/MensajeErrorDatos";
import Previos from "../../Compartidos/Previos";
import TablaServidoresSancionados from "./TablaServidoresSancionados";
import DetalleServidorSancionado from "./DetalleServidorSancionado";
import {ThemeProvider} from '@mui/material/styles';
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
    {label: 'Suspensión del empleo, cargo o comisión', value: 'S'},
    {label: 'Destitución del empleo, cargo o comisión', value: 'D'},
    {label: 'Indemnización resarcitoria', value: 'IRSC'},
    {label: 'Sanción económica', value: 'SE'},
    {label: 'Otro', value: 'O'}
];

const camposOrdenamiento = [
    {label: 'Nombre', value: 'nombres'},
    {label: 'Apellido Uno', value: 'primerApellido'},
    {label: 'Apellido Dos', value: 'segundoApellido'},
    {label: 'Institución', value: 'institucionDependencia'}
];

const tiposOrdenamiento = [
    {label: 'Ascendente', value: 'asc'},
    {label: 'Descendente', value: 'desc'}
];

const initialPagination = {
    page: 1,
    rowsPerPage: 10,
    totalRows: 0,
};

const initialFilter = {
    nombres: '',
    primerApellido: '',
    segundoApellido: '',
    tipoSancion: [],
    institucionDependencia: 'any',
    nivel: 'any',
    provider: 'any'
};

const initialSort = {
    campoOrden: 'any',
    tipoOrden: 'any',
};

function BusquedaServidor({classes}) {
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

    React.useEffect(() => {
        loadInstitutions();
        loadProviders();
    }, []);

    React.useEffect(() => {
        loadInstitutions();
        loadProviders();
    }, [filter?.nivel]);

    React.useEffect(() => {
        loadInstitutions();
    }, [filter?.provider]);

    React.useEffect(() => {
        if (provider !== 'any') {
            setPagination({...pagination, page: 1});
            setSelectedItem(null);
            handleSearchAPI();
        }
    }, [provider]);

    const loadInstitutions = () => {
        let sug = [];
        let options = {
            url: process.env.REACT_APP_S3S_BACKEND + '/api/v1/entities',
            json: true,
            method: "post",
            data: {}
        };
        if (filter.nivel !== 'any') options.data.nivel_gobierno = filter.nivel;
        if (filter.provider !== 'any') options.data.supplier_id = filter.provider.key;

        axios(options)
            .then(data => {
                data.data.forEach((item, index) => {
                    sug.push({value: item.nombre, label: item.nombre, key: index});
                });
                setInstitutionsList(sug);
                setFilter({...filter, institucionDependencia: 'any'});
            }).catch(err => {
            setError(true);
        });
    }

    const loadProviders = () => {
        let sug = [];
        let options = {
            url: process.env.REACT_APP_S3S_BACKEND + '/api/v1/getProviders',
            json: true,
            method: "post",
            data: {}
        };
        if (filter.nivel !== 'any')
            options.data.nivel_gobierno = filter.nivel
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
//10,25,50
    const handleSearchPrevios = () => {
        setLoading(true);
        setFilterData([]);
        setSelectedItem(null);
        setPagination({...pagination, rowsPerPage: 10});
        setProvider('any')

        let body =
            {
                "query": makeFiltros(),
                "institucion": filter.institucionDependencia
            };

        if (filter.nivel !== 'any') body.nivel_gobierno = filter.nivel;
        if (filter.provider !== 'any') body.proveedor = filter.provider.key;
        let options = {
            method: 'POST',
            url: process.env.REACT_APP_S3S_BACKEND + '/api/v1/summary',
            json: true,
            data: body
        };
        axios(options)
            .then(res => {
                setPrevios(res.data);
                setLoading(false);
                setError(false);
                setView(1);
            }).catch(err => {
            setError(true);
            setLoading(false);
        });

    };

    const makeFiltros = () => {
        let filtros = {};
        if (filter.nombres) filtros.nombres = filter.nombres;
        if (filter.primerApellido) filtros.primerApellido = filter.primerApellido;
        if (filter.segundoApellido) filtros.segundoApellido = filter.segundoApellido;
        if (filter.institucionDependencia && filter.institucionDependencia !== 'any') filtros.institucionDependencia = filter.institucionDependencia;
        if (filter.tipoSancion.length > 0) filtros.tipoSancion = filter.tipoSancion.map(item => item.value);
        return filtros;
    };

    const makeSort = () => {
        let sort_ = {};
        if (sort.campoOrden !== 'any' && sort.tipoOrden !== 'any') sort_[sort.campoOrden.value] = sort.tipoOrden.value;
        return sort_;
    };

    const handleSearchAPI = () => {
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
            url: process.env.REACT_APP_S3S_BACKEND + '/api/v1/search',
            json: true,
            data: body
        };

        axios(options)
            .then(res => {
                let resultado = res.data;
                setFilterData(resultado.results);
                setLoading(false);
                setPagination({...pagination, totalRows: resultado.pagination.totalRows})
                setError(false);
                setView(2)
            }).catch(err => {
            setLoading(false);
            setError(true);
        });

    };

    const handleChangeAPI = (val) => {
        setProvider(val)
    };

    const handleChangePage = (event, page) => {
        setPagination({...pagination, page: page + 1});
    };

    const handleChangeRowsPerPage = event => {
        setPagination({...pagination, rowsPerPage: event.target.value, page: 1});
    };

    const verDetalle = (event, elemento) => {
        setSelectedItem(elemento);
        setView(3);
        setProvider('any')
    };

    const handleChangeDetail = () => {
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
                        <Typography><b>Busca un servidor público sancionado</b></Typography>
                    </Grid>
                    <Grid item xs={12} md={2}>
                        <TextField
                            id="nombres"
                            label="Nombre(s)"
                            onChange={(e) => setFilter({...filter, nombres: e.target.value})}
                            value={filter.nombres}
                            margin='normal'
                        />

                    </Grid>
                    <Grid item xs={12} md={2}>
                        <TextField
                            id="primerApellido"
                            label="Apellido Uno"
                            type="search"
                            onChange={(e) => setFilter({...filter, primerApellido: e.target.value})}
                            value={filter.primerApellido}
                            margin='normal'
                        />
                    </Grid>
                    <Grid item xs={12} md={2}>
                        <FormControl className={classes.formControl}>
                            <TextField
                                id="segundoApellido"
                                label="Apellido Dos"
                                type="search"
                                onChange={(e) => setFilter({...filter, segundoApellido: e.target.value})}
                                value={filter.segundoApellido}
                                margin='normal'
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <FormControl className={classes.formControl}>
                            <TextField id={'tipoSancion'} name={'tipoSancion'} margin="normal" select
                                       label={'Tipo sanción'}
                                       SelectProps={{
                                           multiple: true,
                                           renderValue: selected => selected.map(element => element.label).join(', '),
                                           onChange: e => setFilter({...filter, tipoSancion: e.target.value}),
                                           value: filter.tipoSancion
                                       }}>
                                <MenuItem disabled value={[]}>
                                    <em>Todos</em>
                                </MenuItem>
                                {tiposSancion.map(tipo => (
                                    <MenuItem key={tipo.value} value={tipo}>
                                        <Checkbox checked={filter.tipoSancion.indexOf(tipo) > -1}/>
                                        <ListItemText primary={tipo.label}/>
                                    </MenuItem>
                                ))}
                            </TextField>
                            {/* <InputLabel id="tipoSancion-label">Tipo sanción</InputLabel>
                                <Select
                                    id="tipoSancion-checkbox"
                                    multiple
                                    value={tipoSancion}
                                    onChange={e => this.handleChangeCampo('tipoSancion', e)}
                                    input={<OutlinedInput label="Tipo sanción"/>}
                                    renderValue={
                                        selected => {
                                            return selected.map(element => element.label).join(', ')
                                        }
                                    }
                                    label={'Tipo sanción'}
                                    labelId={'tipoSancion-label'}
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
                                </Select> */}
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={2}>
                        <FormControl className={classes.formControl}>
                            <TextField id={'nivel'} name={'nivel'} margin="normal" select label={'Nivel'}
                                       value={filter.nivel}
                                       onChange={(e) => setFilter({...filter, nivel: e.target.value})}>
                                <MenuItem value="any">
                                    <em>Todos</em>
                                </MenuItem>
                                <MenuItem value={'Federal'} key={'Federal'}>
                                    {'Federal'}
                                </MenuItem>
                                <MenuItem value={'Estatal'} key={'Estatal'}>
                                    {'Estatal'}
                                </MenuItem>
                            </TextField>
                            {/* <InputLabel id="nivel-label">Nivel</InputLabel>
                                <Select
                                    labelId="nivel-label"
                                    id="nivel-label-helper"
                                    value={nivel}
                                    label="Nivel"
                                    onChange={(e) => this.handleChangeCampo('nivel', e)}
                                >
                                    <MenuItem value="any">
                                        <em>Todos</em>
                                    </MenuItem>
                                    <MenuItem value={'Federal'} key={'Federal'}>
                                        {'Federal'}
                                    </MenuItem>
                                    <MenuItem value={'Estatal'} key={'Estatal'}>
                                        {'Estatal'}
                                    </MenuItem>
                                </Select> */}
                        </FormControl>
                    </Grid>
                    <Grid item md={4} xs={12}>
                        <FormControl className={classes.formControl}>
                            <TextField id={'proveedor'} name={'proveedor'} margin="normal" select
                                       label={'Proveedor información'} value={filter.provider}
                                       onChange={(e) =>
                                           setFilter({...filter, provider: e.target.value})
                                       }>
                                <MenuItem value={'any'}><em>Todos</em></MenuItem>
                                {providersList.map((item) => {
                                    return (
                                        <MenuItem value={item} key={item.key}>
                                            {item.label}
                                        </MenuItem>
                                    );
                                })}
                            </TextField>
                        </FormControl>
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <FormControl className={classes.formControl}>
                            <TextField id={'institucionDependencia'} name={'institucionDependencia'} margin="normal"
                                       select
                                       label={'Institución'} value={filter.institucionDependencia}
                                       onChange={(e) => setFilter({...filter, institucionDependencia: e.target.value})}>
                                <MenuItem value='any'><em>Todas</em></MenuItem>
                                {institutionsList.map((item) => {
                                    return (
                                        <MenuItem value={item.value} key={item.key}>
                                            {item.label}
                                        </MenuItem>
                                    );
                                })}
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
                            <TextField id={'campoOrden-checkbox'} name={'campoOrden-checkbox'} margin="normal" select
                                       label={'Ordenar por'} value={sort.campoOrden}
                                       onChange={e => setSort({...sort, campoOrden: e.target.value})}>
                                <MenuItem value={'any'}>
                                    <em>Ninguno</em>
                                </MenuItem>
                                {camposOrdenamiento.map((tipo) => {
                                    return (
                                        <MenuItem key={tipo.value} value={tipo}>
                                            <ListItemText primary={tipo.label}/>
                                        </MenuItem>
                                    );
                                })}
                            </TextField>
                        </FormControl>
                    </Grid>}
                    {showAdvancedSearch && <Grid item xs={12} md={3}>
                        <FormControl className={classes.formControl}>
                            <TextField id={'tipoOrden-checkbox'} name={'tipoOrden-checkbox'} margin="normal" select
                                       label={'Tipo ordenamiento'} value={sort.tipoOrden}
                                       onChange={e => setSort({...sort, tipoOrden: e.target.value})}>
                                <MenuItem value={'any'}>
                                    <em>Ninguno</em>
                                </MenuItem>
                                {tiposOrdenamiento.map(tipo => {
                                    return (
                                        <MenuItem key={tipo.value} value={tipo}>
                                            <ListItemText primary={tipo.label}/>
                                        </MenuItem>
                                    );
                                })}
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
                                    ReactGA.event({category: 'busqueda-s3SP', action: 'click'});
                                }}>

                            Buscar
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        {
                            loading &&
                            <Modal
                                open={loading}
                                disableAutoFocus={true}
                            >
                                <CircularProgress className={classes.progress} id="spinnerLoading" size={200}/>
                            </Modal>

                        }
                        {
                            error && <MensajeErrorDatos/>
                        }
                    </Grid>
                </Grid>
                {/*PREVIOS*/}
                {view === 1 && previos && previos.length > 0 &&
                <Grid container>
                    <Grid item xs={12} className={classes.section}>
                        <Previos data={previos} handleChangeSujetoObligado={handleChangeAPI}/>
                    </Grid>
                </Grid>
                }
                {/*TABLA*/}
                {view === 2 && filterData && filterData.length > 0 && selectedItem === null &&
                <Grid container>
                    <Grid item xs={12}>
                        <TablaServidoresSancionados data={filterData} page={pagination.page}
                                                    rowsPerPage={pagination.rowsPerPage}
                                                    totalRows={pagination.totalRows}
                                                    handleChangePage={handleChangePage}
                                                    handleChangeRowsPerPage={handleChangeRowsPerPage}
                                                    verDetalle={verDetalle}
                                                    returnToPrevios={returnToPrevios}
                        />
                    </Grid>
                </Grid>
                }
                {
                    view === 3 && selectedItem !== null &&
                    <DetalleServidorSancionado handleChangeDetail={handleChangeDetail}
                                               servidor={selectedItem}
                    />
                }
            </React.Fragment>
        </ThemeProvider>

    );

}

BusquedaServidor.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles, {withTheme: true})(BusquedaServidor);
