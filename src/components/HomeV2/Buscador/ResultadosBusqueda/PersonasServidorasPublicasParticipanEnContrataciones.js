import React from 'react';
import {Table, TableBody, TableCell,TablePagination, TableRow, TableFooter, Button} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import {Box, Typography, Modal} from "@mui/material"
import axios from 'axios';

import EnhancedTableHead from '../../../Sistema2/EnhancedTableHead';
import AlertaError from "../../../Sistema2/AlertaError";
import FichaDetalle from "../../../Sistema2/FichaDetalle";

import columnData from '../../../Sistema2/column_data';
import Previos from "../../../Compartidos/Previos";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
root: {},
container: {
    marginTop: '30px',
    marginBottom: '30px',
    overflowX: 'auto',
},
progress: {
    position: 'fixed',
    margin: 'auto',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
},
tablePagination: {
    overflowX: 'auto',
    fontSize: '0.75rem'
},
desc: {
    color: theme.palette.primary.dark,
},
ul: {
    listStyle: "none",
    paddingLeft: "20px"
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
},
paper: {
    backgroundColor: theme.palette.background.opaque,
    padding: theme.spacing(2),
    color: theme.palette.primario.contrastText,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: theme.palette.secundario.main,
    borderRadius: '0px 10px 10px 10px'
},
tableBody: {
    background: theme.palette.background.tableBody
},
button: {
    marginRight: theme.spacing(1),
},
btnPDN:{
    margin: theme.spacing(1),
    background: "rgb(255,255,255,0.5)",
    borderRadius: "50px",
    fontWeight: "bold",
    fontStyle: "italic",
    '&:hover': {
        backgroundColor: "#56a3bf",
    },
},
}));

function getSorting(order, orderBy) {
    return order === 'desc'
        ? (a, b) => (b[orderBy] < a[orderBy] ? -1 : 1)
        : (a, b) => (a[orderBy] < b[orderBy] ? -1 : 1);
}

export function ResultadosPersonasServidorasPublicasParticipanEnContrataciones(props) {
const data = JSON.parse(props.data);
/*
2.- Personas servidoras pub que participan contrataciones
    - Nombre
    - AP1
    - AP2
    - Institución
    - Tipo de procedimiento (select)
*/
/* console.log(data.nombres);
console.log(data.primerApellido);
console.log(data.segundoApellido);
console.log(data.institucion);
console.log(data.tipoProcedimiento);  */
/* const initialFilter = {
    nombres: data.nombres,
    primerApellido: data.primerApellido,
    segundoApellido: data.segundoApellido,
    tipoSancion: [],
    institucionDependencia: data.institucion,
    nivel: "any",
    provider: "any",
}; */

const classes = useStyles();

const [state, setState] = React.useState({
    order: 'asc',
    orderBy: 'servidor',
    nombres: data.nombres,
    apellidoUno: data.primerApellido,
    apellidoDos: data.segundoApellido,
    summaryData: [],
    results: null,
    page: 0, // en el front end page inicia en 0
    rowsPerPage: 10,
    tipoProcedimiento: data.tipoProcedimientoContratacion,//0,
    elementoSeleccionado: null,
    entities: [],
    current_entity: "ANY",
    loading: false,
    totalRows: 0,
    nivel: 'Todos'
});

    const [dialog, setDialog] = React.useState({
        selectedElement: null,
        open: false
    });

    const [showSummaryPanel, setShowSummaryPanel] = React.useState(true);
    const [showResultsTable, setShowResultsTable] = React.useState(false);
    const [error, setError] = React.useState(false);

    React.useEffect(() => {
        //loadEntities("Todos");
        //handleSearchSupplier();
        handleBroadSearch();
    },[]);

    React.useEffect(() => {
        if (state.loading){
            console.log("Searching...")
            broadSearch();
        }
    }, [state.summaryData]);

    React.useEffect(() => {
        // al hacer click en el boton regresar: state.loading => true y state.results = []
        // state.results = [] desencadena la búsqueda
        if (state.loading) {
            console.log('Fetching data...');
            fetchData();
        }
    }, [
        state.supplier_id,
        state.page,
        state.rowsPerPage,
        state.results
        //state.loading
    ]);

    React.useEffect(() => {
        if (state.loading){
            console.log('Fetching entities..');
            loadEntities();
        }
    },[state.nivel]);

    /* const changeLevel = e => {
        const nivel = e.target.value;
        setState({
            ...state,
            loading: true,
            nivel: nivel
        });
    }; */

    const backButton = () => {
        setShowSummaryPanel(true);
        setShowResultsTable(false);
    };

    /* const handleError = (val) => {
        setError(val);
    }; */

    const closeDialog = () => {
        setShowResultsTable(true);
        setDialog({
            open: false,
            elementoSeleccionado: null
        });
    };

    const openDialog = (element) => {
        setShowResultsTable(false);
        setDialog({
            elementoSeleccionado: element,
            open: true
        });
    };

    // creo que no se usa
    const handleRequestSort = (event, property) => {
        const orderBy = property;
        let order = 'desc';
        if (state.orderBy === property && state.order === 'desc') {
            order = 'asc';
        }
        setState({
            ...state,
            order,
            orderBy
        });
    };

    const handleChangePage = (event, page) => {
        setState({
            ...state, //
            loading: true,
            page: page
        });
    };

    const handleChangeRowsPerPage = event => {
        setState({
            ...state,
            loading: true,
            rowsPerPage: event.target.value
        });
    };

    //busqueda en varias URLs
    const handleBroadSearch = () => {
        setShowSummaryPanel(false);
        setShowResultsTable(false);

        setState({
            ...state,
            results: null,
            summaryData: null,
            loading: true
        });
    };

    /* const asignarTipoProcedimiento = procedimientos => {
        setState({
            ...state, //
            tipoProcedimiento: procedimientos
        });
    }; */

    const handleSearchSupplier = supplier_id => {
        setState({
            ...state,
            page: 0,
            rowsPerPage: 10,
            loading: true,
            supplier_id: supplier_id,
            results: [] // limpiar resultados antes de volver a buscar
        });
    };

    /* const handleSetState = (varState, event) => {
        setState({
            ...state,//
            [varState]: event ? (event.target ? event.target.value : event.value) : ''
        });
    }; */

    /* const handleCleanAll = () => {
        setState({
            ...state,
            results: null,
            summaryData : null,
            elementoSeleccionado: null,
            nivel : 'Todos',
            nombres: "",
            tipoProcedimiento: [],//0,
            current_entity: "ANY",
            apellidoUno: "",
            apellidoDos: ""
        });
    }; */

    const loadEntities = async () => {
        let options = {
            url: process.env.REACT_APP_S2_BACKEND + "/api/v1/entities",
            json: true,
            method: "POST",
            data: {}
        };

        if (state.nivel !== 'Todos'){
            options.data.nivel_gobierno = state.nivel
        }

        try {
            const res = await axios(options);
            const entities = JSON.parse(JSON.stringify(res.data))

            // handle errors and set state
            setState({
                ...state,
                loading: false,
                entities: entities[0].error ? [] : entities, //res.data,
                current_entity: "ANY"
            });
        } catch (err) {
            console.log(err);
            setState({
                ...state,
                loading: false,
                entities: [],
                current_entity: "ANY"
            });
        }
    };

    const broadSearch = async () => {
        let {
            current_entity,
            nombres,
            apellidoUno,
            apellidoDos,
            tipoProcedimiento,
            nivel,
        } = state;

        let filtros = {};

        if (nivel && nivel !== 'Todos') {
            filtros.nivel_gobierno = nivel;
        }

        if (nombres) filtros.nombres = nombres;
        if (apellidoUno) filtros.primerApellido = apellidoUno;
        if (apellidoDos) filtros.segundoApellido = apellidoDos;
        if (tipoProcedimiento.length !== 0) filtros.tipoProcedimiento = tipoProcedimiento;
        //if (tipoProcedimiento && tipoProcedimiento !== 0) filtros.tipoProcedimiento = [tipoProcedimiento];
        if (current_entity && current_entity !== 'ANY') filtros.institucion = current_entity;

        let options = {
            method: 'POST',
            url: process.env.REACT_APP_S2_BACKEND +  '/api/v1/summary',
            json: true,
            data: filtros
        };

        try {
            const res = await axios(options);
            setState({
                ...state, //
                summaryData: res.data,
                loading: false
            });

            setError(false);
            setShowResultsTable(false);
            setShowSummaryPanel(true);

        } catch (err){
            console.log(err);
            setState({
                ...state,
                loading: false
            });

            setError(true);
            setShowResultsTable(false);
            setShowSummaryPanel(true);
        }
    };

    const fetchData = async () => {
        const {
            current_entity,
            nombres,
            apellidoUno,
            apellidoDos,
            tipoProcedimiento,
            /* rowsPerPage,
            page, */
            supplier_id
        } = state;

        let filtros = {};
        if (nombres) filtros.nombres = nombres;
        if (apellidoUno) filtros.primerApellido = apellidoUno;
        if (apellidoDos) filtros.segundoApellido = apellidoDos;
        if (current_entity && current_entity !== 'ANY') filtros.institucion = current_entity;
        if (tipoProcedimiento.length !== 0) filtros.tipoProcedimiento = tipoProcedimiento;
        //if (tipoProcedimiento && tipoProcedimiento !== 0) filtros.tipoProcedimiento = [tipoProcedimiento];

        let options = {
            method: 'POST',
            url: process.env.REACT_APP_S2_BACKEND + '/api/v1/search',
            json: true,
            data: {
                ...filtros,
                /* page: page + 1,
                pageSize: rowsPerPage, */
                supplier_id: supplier_id
            }
        };

        try {
            const res = await axios(options);
            const {results, pagination} = res.data;

            setState({
                ...state, //
                loading: false,
                results: results,
                totalRows: pagination.totalRows
            });

            setShowSummaryPanel(false);
            setShowResultsTable(true);
        } catch (err){
            console.log(err);
            setState({
                ...state,
                loading: false
            });

            setShowSummaryPanel(false);
            setShowResultsTable(true);
            setError(true);
        }
    };

    //  const emptyRows = rowsPerPage - filterData.length;

    return (<>
        {/* Resumen de resultados */}
        {showSummaryPanel && state.summaryData && state.summaryData.length > 0 &&
            <Box p={1}>
                <div className={classes.container}>
                    <Previos data={state.summaryData} handleChangeSujetoObligado={handleSearchSupplier}/>

                    {/* <TablaResumen summaryData={state.summaryData} handleSearchSupplier={handleSearchSupplier}/> */}
                </div>
            </Box>
        }
        <Box p={1}>
            <AlertaError open={error} setOpen={open => {setError(open)}}/>
        </Box>

            {/* Desplegar resultados de la búsqueda */}
            {showResultsTable && state.results && state.results.length > 0 &&
                <Box p={1}>

                    <Box sx={{ display:'flex', flexDirection: 'row'}}>
                        <Box sx={{flexGrow: 1}}>
                            <Typography variant={"h6"} className={classes.desc}>
                                Pulsa sobre el registro para ver su detalle
                            </Typography>
                        </Box>

                        <Button onClick={() => backButton()} startIcon={<ArrowBackIcon/>} color='secundario' sx={{fontWeight: 'bold'}} >
                            Regresar
                        </Button>
                    </Box>

                    <div className={classes.container}>
                        <Table aria-describedby="spinnerLoading" id={'tableServidores'}
                                aria-busy={state.loading} aria-labelledby="tableTitle">
                            <EnhancedTableHead
                                order={state.order}
                                orderBy={state.orderBy}
                                onRequestSort={handleRequestSort}
                                columnData={columnData}
                            />
                            <TableBody className={classes.tableBody}>
                                {state.results
                                    .sort(getSorting(state.order, state.orderBy))
                                    .map((n, index) => {
                                        const {nombrecompleto, nombres, primerApellido, segundoApellido, dependencia, institucionDependencia, puesto} = n;

                                        return (
                                            <TableRow
                                                hover
                                                onClick={() => openDialog(n)}
                                                tabIndex={-1}
                                                key={index}
                                            >
                                                <TableCell component="th" scope="row" style={{width: '25%'}}
                                                            padding="normal">{nombrecompleto || `${nombres} ${primerApellido} ${segundoApellido}`}</TableCell>
                                                <TableCell>{dependencia? dependencia.nombre : institucionDependencia.nombre}</TableCell>
                                                <TableCell>{puesto.nombre}</TableCell>
                                            </TableRow>
                                        );
                                    })
                                }
                                {/*emptyRows > 0 && (
                                        <TableRow style={{height: 49 * emptyRows}}>
                                            <TableCell colSpan={6}/>
                                        </TableRow>
                                    )*/}

                            </TableBody>
                            <TableFooter className={classes.tableBody}>
                                <TableRow>
                                    <TablePagination
                                        sx={{
                                            ".MuiTablePagination-select": {
                                                color: 'black'
                                            }
                                        }}
                                        className={classes.tablePagination}
                                        colSpan={6}
                                        count={state.totalRows}
                                        rowsPerPage={state.rowsPerPage}
                                        rowsPerPageOptions={[10,25,50]}
                                        page={state.page}
                                        backIconButtonProps={{
                                            'aria-label': 'Previous Page',
                                        }}
                                        nextIconButtonProps={{
                                            'aria-label': 'Next Page',
                                        }}
                                        onPageChange={handleChangePage}
                                        onRowsPerPageChange={handleChangeRowsPerPage}
                                        labelRowsPerPage='Registros por página'
                                        labelDisplayedRows={({from, to, count}) => {
                                            return `${from}-${to} de ${count}`;
                                        }}
                                    />
                                </TableRow>
                            </TableFooter>
                        </Table>
                    </div>
                </Box>
            }

            {
                dialog.open &&
                <FichaDetalle servidorPublico={dialog.elementoSeleccionado} closeDialog={closeDialog}/>
            }



        {state.loading &&
            <Modal open={state.loading} disableAutoFocus={true}>
                <CircularProgress className={classes.progress} id="spinnerLoading" size={200}/>
            </Modal>
        }

    </>);
}

export default ResultadosPersonasServidorasPublicasParticipanEnContrataciones;

