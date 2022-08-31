

import React from 'react';
import { Grid, Modal, CircularProgress } from '@mui/material';
import Previos from "../Previos";
import TablaParticularesSancionados from "../../../../Sancionados/Particulares/TablaParticularesSancionados";
import DetalleParticularSancionado from "../../../../Sancionados/Particulares/DetalleParticular";
import MensajeErrorDatos from "../../../../Mensajes/MensajeErrorDatos";
import { ThemeProvider } from '@mui/material/styles';
import ThemeV2 from "../../../../../ThemeV2";

import ReactGA from "react-ga";
import { makeStyles } from "@mui/styles";

import Chips from '../Chips';


const axios = require('axios');
const useStyles = makeStyles((theme) => ({
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
}));

const initialPagination = {
    page: 1,
    rowsPerPage: 10,
    totalRows: 0,
};

const initialSort = {
    campoOrden: 'any',
    tipoOrden: 'any',
};
export function ResultadosS3p(props){
    const dataProps = JSON.parse(props.data);
    const data = dataProps["empresas-sancionadas"];
    /*
    4.- Empresas sancionadas por actos de corrupción
      - Nombre / Razón social
      - Intitución donde presto el servicio
      - Tipo de sanción (select)
    */
    //console.log(data.institucion);
   

    const initialFilter = {
        nombreRazonSocial: data.nombreRazonSocial.trim(),
        institucionDependencia: data.institucion,
        expediente: '',
        tipoSancion: data.tipoSancion,
        tipoPersona: 'any',
        nivel: 'any',
        provider: 'any'
    }

    const [filterData, setFilterData] = React.useState([]);
    const [previos, setPrevios] = React.useState(null);
    const [error, setError] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    //const [showAdvancedSearch, setShowAdvancedSearch] = React.useState(false);
    /* const [institutionsList, setInstitutionsList] = React.useState([]); */
    const [selectedItem, setSelectedItem] = React.useState(null);
    const [provider, setProvider] = React.useState('any');
    /* const [providersList, setProvidersList] = React.useState([]); */
    const [pagination, setPagination] = React.useState(initialPagination);
    const [filter, setFilter] = React.useState(initialFilter);
    const [sort, setSort] = React.useState(initialSort);
    const [view, setView] = React.useState(0);

    const [fixpaginador, setFixpaginador] = React.useState(false);
    const classes = useStyles();

    React.useEffect(() => {
        /* loadInstitutions();
        loadProviders(); */
        handleSearchPrevios();
        ReactGA.event({ category: 'wizard_empresas-sancionadas', action: 'click' });
    }, []);

    React.useEffect(() => {
        if (provider !== 'any') {
            setPagination({...pagination, page: 1});
            setSelectedItem(null);
            handleSearch();
        }
    }, [provider]);

    React.useEffect(() => {
        if (provider !== "any" && fixpaginador === true)  {
            /* setPagination({ ...pagination }); */
            setSelectedItem(null);
            handleSearch();
        }
    }, [fixpaginador]);

   const handleSearchPrevios = () => {
        setLoading(true);
        setFilterData([]);
        setSelectedItem(null);
        setPagination({...pagination, rowsPerPage: 10});
        let body =
            {
                "query": makeFiltros(),
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
        //if (institucionDependencia && institucionDependencia !== 'any') filtros.institucionDependencia = institucionDependencia.nombre;
        if (
          institucionDependencia &&
          institucionDependencia !== "any" &&
          institucionDependencia.nombre
        ) {
            filtros.institucionDependencia = institucionDependencia.nombre;
            filtros.institucion = institucionDependencia.nombre;
        } else {
          institucionDependencia = "";
        }
        if (tipoSancion.length > 0) filtros.tipoSancion = tipoSancion.map(item => item.value);
        /* console.log(filtros) */
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
        
        if (
            filter.institucionDependencia &&
            filter.institucionDependencia !== "any" &&
            filter.institucionDependencia.nombre
          ) {
            setFilter({...filter, institucionDependencia: filter.institucionDependencia.nombre});
            setFilter({...filter, institucion: filter.institucionDependencia.nombre});
        } 

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
                    <Grid container spacing={0}>
                        
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
                                    <Chips criterios={JSON.stringify(data)}/>
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

export default ResultadosS3p;


