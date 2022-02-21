import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@mui/styles/withStyles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableFooter from '@mui/material/TableFooter';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from "@mui/material/Grid";
import {Typography} from "@mui/material"
import Modal from "@mui/material/Modal";
import rp from "request-promise";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Collapse from "@mui/material/Collapse";

import BusquedaServidor from "./BusquedaServidor";
import TablaResumen from "./TablaResumen";
import EnhancedTableHead from './EnhancedTableHead';
import AlertaError from "./AlertaError";
import FichaServidorPublico from "./FichaServidorPublico";

import columnData from './column_data';
import Descarga from "../Compartidos/Descarga";

const styles = theme => ({
    root: {},
    progress: {
        position: 'fixed',
        margin: 'auto',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
    },
    section: {
        maxWidth: '1200px',
        overflowX: 'auto',
        padding: theme.spacing(1)
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
    container: {
        marginTop: '30px',
        marginBottom: '30px',
        overflowX: 'auto',
    },
    panelResumen: {
        marginLeft: theme.spacing(2)
    } ,
    ul: {
        listStyle: "none",
        paddingLeft: "20px"
    },
    infoBusqueda: {
        paddingRight: theme.spacing(1),
        paddingLeft: theme.spacing(1),
        backgroundColor: "#fff"

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
    },
    itemD:{
        maxWidth: 1200,
        paddingRight: theme.spacing(1),
        paddingLeft: theme.spacing(1),
        paddingBottom: theme.spacing(8),
        paddingTop: theme.spacing(8)
    },
    containerD: {
        backgroundColor: '#fff'
        //backgroundColor: '#f6f6f6'
    },
});

function getSorting(order, orderBy) {
    return order === 'desc'
        ? (a, b) => (b[orderBy] < a[orderBy] ? -1 : 1)
        : (a, b) => (a[orderBy] < b[orderBy] ? -1 : 1);
}

class TablaServidores extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            order: 'asc',
            orderBy: 'servidor',
            nombres: '',
            apellidoUno: '',
            apellidoDos: '',
            summaryData: [],
            results: null,
            page: 0, // en el front end page inicia en 0
            rowsPerPage: 10,
            tipoProcedimiento: [],//0,
            open: false,
            elementoSeleccionado: null,
            entities: [],
            current_entity: "ANY",
            loading: false,
            totalRows: 0,
            error: false,
            nivel: 'todos',
            mostrarPanelResumen: true
        };
    }

    loadEntities = nivel => {
        let options = {
            uri: process.env.REACT_APP_S2_BACKEND + "/api/v1/entities",
            json: true,
            method: "POST",
            body: {}
        };

        if (nivel !== 'todos'){
            options.body.nivel_gobierno = nivel
        }

        rp(options).then(data => {
            this.setState({
                entities: data,
                current_entity: "ANY"
            });
        }).catch(err => {
            console.log(err);
            this.setState({
                error: true
            })
        });
    };

    changeLevel = e => {
        const nivel = e.target.value;
        this.setState({
            nivel: nivel,
            entities: []
        },() => {
            this.loadEntities(nivel);
        });
    };

    componentDidMount() {
        this.loadEntities("todos");
    }

    toggleShowSummary = () => {
        const {mostrarPanelResumen} = this.state;
        this.setState({
            mostrarPanelResumen: !mostrarPanelResumen
        });
    };

    handleError = (val) => {
        this.setState({
            error: val
        })
    };

    handleRequestSort = (event, property) => {
        const orderBy = property;
        let order = 'desc';
        if (this.state.orderBy === property && this.state.order === 'desc') {
            order = 'asc';
        }
        this.setState({order, orderBy});
    };

    closeDialog = () => {
        this.setState({
            open: false,
            elementoSeleccionado: null
        });
    };

    openDialog = (element) => {
        this.setState({
            elementoSeleccionado: element,
            open: true
        });
    };

    handleChangePage = (event, page) => {
        //log(page);
        this.setState({
            page: page
        }, () => {
            this.fetchData();
        });

    };

    handleChangeRowsPerPage = event => {
        this.setState({
            rowsPerPage: event.target.value
        }, () => {
            this.fetchData();
        });
    };

    //busqueda en varias URLs
    handleBroadSearch = () => {

        this.setState({
            results: null,
            summaryData: null,
            loading: true
            }, () => {

            let {
                current_entity,
                nombres,
                apellidoUno,
                apellidoDos,
                tipoProcedimiento,
                nivel,
            } = this.state;

            let filtros = {};

            if(nivel && nivel !== 'todos') {
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
                uri: process.env.REACT_APP_S2_BACKEND +  '/api/v1/summary',
                json: true,
                body: filtros
            };

            rp(options).then(res => {
                this.setState({
                    summaryData: res,
                    loading: false,
                    error: false
                })
            }).catch(err => {
                console.log(err);
                this.setState({
                    loading: false,
                    error: true
                });
            });

            }
        );
    };

    asignarTipoProcedimiento = procedimientos => {
        this.setState({
            tipoProcedimiento: procedimientos
        })
    };

    fetchData = () => {

        const {
            current_entity,
            nombres,
            apellidoUno,
            apellidoDos,
            tipoProcedimiento,
            rowsPerPage,
            page,
            supplier_id
        } = this.state;

        let filtros = {};
        if (nombres) filtros.nombres = nombres;
        if (apellidoUno) filtros.primerApellido = apellidoUno;
        if (apellidoDos) filtros.segundoApellido = apellidoDos;
        if (current_entity && current_entity !== 'ANY') filtros.institucion = current_entity;
        if (tipoProcedimiento.length !== 0) filtros.tipoProcedimiento = tipoProcedimiento;
        //if (tipoProcedimiento && tipoProcedimiento !== 0) filtros.tipoProcedimiento = [tipoProcedimiento];

        let options = {
            method: 'POST',
            uri: process.env.REACT_APP_S2_BACKEND + '/api/v1/search',
            json: true,
            body: {
                ...filtros,
                page: page + 1, //en el backend page inicia en 1
                pageSize: rowsPerPage,
                supplier_id: supplier_id
            }
        };

        rp(options).then(res => {
            const {results, pagination} = res;
            //console.log(data)

            this.setState({
                loading: false,
                results: results,
                totalRows: pagination.totalRows
            });

        }).catch(err => {
            console.log(err);
            this.setState({
                loading: false,
                error: true
            });
        });

    };

    handleSearchSupplier = supplier_id => {
        console.log(supplier_id);
        this.setState({
            page: 0,
            rowsPerPage: 10,
            loading: true,
            supplier_id: supplier_id
        }, () => {
            this.fetchData()
        });
    };

    handleSetState = (varState, event) => {
        this.setState({
            [varState]: event ? (event.target ? event.target.value : event.value) : ''
        });
    };

    handleCleanAll = () => {
        this.setState({
            results: null,
            summaryData : null,
            elementoSeleccionado: null,
            nivel : 'todos',
            nombres: "",
            tipoProcedimiento: [],//0,
            current_entity: "ANY",
            apellidoUno: "",
            apellidoDos: ""
        });
    };

    render() {
        const {classes} = this.props;

        const {
            order,
            orderBy,
            rowsPerPage,
            page,
            results,
            totalRows,
            entities,
            current_entity,

            nombres,
            apellidoUno,
            apellidoDos,
            tipoProcedimiento,
            nivel,

            loading,
            elementoSeleccionado,
            open,
            summaryData,
            mostrarPanelResumen
        } = this.state;
        //  const emptyRows = rowsPerPage - filterData.length;

        return (
            <div>
                <Grid container spacing={0} className={classes.infoBusqueda}>
                    <Grid item xs={12} style={{maxWidth: 1200, margin: "0 auto"}}>
                        <Typography paragraph>
                            <b>Aquí encontrarás la siguiente información:</b>
                        </Typography>
                        
                        <ul className={classes.ul}>
                            <li className={classes.li}>
                                <Typography color="textPrimary" display='inline'>
                                    Consulta los servidores que intervienen en procesos de contratación por institución, a nivel federal y/o estatal
                                </Typography>
                            </li>
                            <li className={classes.li}>
                                <Typography color="textPrimary" display='inline'>
                                    Obtén datos del servidor como: nombre, puesto, institución
                                </Typography>
                            </li>
                        </ul>
                        
                    </Grid>
                </Grid>

                <Grid container justifyContent={'center'} spacing={0} className={classes.gridTable}>
                    <Grid item xs={12} className={classes.toolBarStyle}>
                        <BusquedaServidor handleCleanAll={this.handleCleanAll}
                                          handleSearch={this.handleBroadSearch}
                                          handleSetState={this.handleSetState}
                                          nombres={nombres}
                                          apellidoUno={apellidoUno}
                                          apellidoDos={apellidoDos}
                                          entities = {entities}
                                          current_entity= {current_entity}
                                          nivel={nivel}
                                          changeLevel = {this.changeLevel}
                                          tipoProcedimiento={tipoProcedimiento}
                                          asignarTipoProcedimiento={this.asignarTipoProcedimiento}
                                          handleError={this.handleError}
                        />
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
                    </Grid>


                    <Grid item xs={12} className={classes.section}>
                        {summaryData && summaryData.length > 0 &&
                        <div>
                            <FormControlLabel
                                control={<Switch className={classes.panelResumen} checked={mostrarPanelResumen}
                                                 onChange={() => this.toggleShowSummary()}/>}
                                label={
                                    <Typography variant="h6" className={classes.desc}>
                                        {mostrarPanelResumen ? 'Ocultar resultados generales' : 'Mostrar resultados generales'}
                                    </Typography>
                                }
                            />
                            <div className={classes.container}>
                                <Collapse in={mostrarPanelResumen}>
                                    <TablaResumen summaryData={summaryData} handleSearchSupplier={this.handleSearchSupplier}/>
                                </Collapse>

                            </div>
                        </div>
                        }

                        <AlertaError open={this.state.error} setOpen={open => {this.setState({error: open})}}/>

                    </Grid>
                </Grid>

                {results && results.length > 0 &&
                <Grid container justifyContent='center' spacing={0} className={classes.gridTable}>
                    <Grid item xs={12} className={classes.section}>
                        <Typography variant={"h6"} className={classes.desc} paragraph>
                            Pulsa sobre el registro para ver su detalle
                        </Typography>
                    </Grid>

                    <Grid item xs={12} className={classes.section}>
                        <div className={classes.container}>
                            <Table aria-describedby="spinnerLoading" id={'tableServidores'}
                                   aria-busy={this.state.loading} aria-labelledby="tableTitle">
                                <EnhancedTableHead
                                    order={order}
                                    orderBy={orderBy}
                                    onRequestSort={this.handleRequestSort}
                                    columnData={columnData}
                                />
                                <TableBody>
                                    {results
                                        .sort(getSorting(order, orderBy))
                                        .map((n, index) => {
                                            const {nombrecompleto, nombres, primerApellido, segundoApellido, dependencia, institucionDependencia, puesto} = n;

                                            return (
                                                <TableRow
                                                    hover
                                                    onClick={() => this.openDialog(n)}
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
                                    {/*
                                        emptyRows > 0 && (
                                        <TableRow style={{height: 49 * emptyRows}}>

                                            <TableCell colSpan={6}/>

                                        </TableRow>
                                    )
                                    */}

                                </TableBody>
                                <TableFooter>
                                    <TableRow>
                                        <TablePagination
                                            className={classes.tablePagination}
                                            colSpan={6}
                                            count={totalRows}
                                            rowsPerPage={rowsPerPage}
                                            rowsPerPageOptions={[10,25,50]}
                                            page={page}
                                            backIconButtonProps={{
                                                'aria-label': 'Previous Page',
                                            }}
                                            nextIconButtonProps={{
                                                'aria-label': 'Next Page',
                                            }}
                                            onPageChange={this.handleChangePage}
                                            onRowsPerPageChange={this.handleChangeRowsPerPage}
                                            labelRowsPerPage='Registros por página'
                                            labelDisplayedRows={({from, to, count}) => {
                                                return `${from}-${to} de ${count}`;
                                            }}
                                        />
                                    </TableRow>
                                </TableFooter>
                            </Table>
                        </div>
                    </Grid>
                </Grid>
                }

                <Grid container spacing={0} justifyContent="center" className={classes.containerD}>
                    <Grid item xs={12} className={classes.itemD}>
                        <Descarga url={process.env.REACT_APP_BULK_S2}/>
                    </Grid>
                </Grid>

                <FichaServidorPublico open={open} servidorPublico={elementoSeleccionado} closeDialog={this.closeDialog}/>

            </div>
        );
    }
}

TablaServidores.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TablaServidores);
