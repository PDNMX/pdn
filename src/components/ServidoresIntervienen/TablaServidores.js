import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from "@material-ui/core/Grid";
import {Typography} from "@material-ui/core"
import Modal from "@material-ui/core/Modal";
import rp from "request-promise";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import Collapse from "@material-ui/core/Collapse";

import BusquedaServidor from "./BusquedaServidor";
import DetalleServidorSancionado from "./DetalleServidor";
import TablaResumen from "./TablaResumen";
import EnhancedTableHead from './EnhancedTableHead';

import Descarga from "../Compartidos/Descarga";
import MensajeErrorDatos from "../Tablas/MensajeErrorDatos";

import columnData from './column_data';

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
            nombreServidor: '',
            apellidoUno: '',
            apellidoDos: '',
            summaryData: [],
            results: null,
            page: 0, // en el front end page inicia en 0
            rowsPerPage: 10,
            procedimiento: 'todos',
            open: false,
            elementoSeleccionado: {},
            entities: [],
            current_entity: "ANY",
            loading: false,
            totalRows: 0,
            error: false,
            nivel: 'todos',
            mostrarPanelResumen: true
        };
    }

    loadEntites = nivel => {
        let options = {
            uri: process.env.REACT_APP_S2_BACKEND + "/api/v1/entities",
            json: true,
            method: "post",
            body: {}
        };

        if (nivel !== 'todos'){
            options.body.nivel_gobierno = nivel
        }

        rp(options).then(data => {
            //let new_entities = data.map( d => ({value: d.nombre, label: d.nombre, supplier_id: d.supplier_id}) );

            this.setState({
                entities: data, //new_entities,
                current_entity: "ANY"
            });
        }).catch(err => {
            console.log(err);
        });
    };

    changeLevel = e => {
        const nivel = e.target.value;
        this.setState({nivel: nivel},() => {
            this.loadEntites(nivel);
        });
    };

    componentDidMount() {
        this.loadEntites("todos");
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

    handleClose = () => {
        this.setState({open: false});
    };

    handleClick = (event, elemento) => {
        this.setState({
            elementoSeleccionado: elemento,
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
                nombreServidor,
                apellidoUno,
                apellidoDos,
                procedimiento,
                nivel,
            } = this.state;

            let filtros = {};

            if(nivel && nivel !== 'todos') {
                filtros.nivel_gobierno = nivel;
            }

            if (nombreServidor) filtros.nombres = nombreServidor;
            if (apellidoUno) filtros.primerApellido = apellidoUno;
            if (apellidoDos) filtros.segundoApellido = apellidoDos;
            if (procedimiento && procedimiento !== 'todos') filtros.procedimiento = procedimiento;
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

    fetchData = () => {

        const {
            current_entity,
            nombreServidor,
            apellidoUno,
            apellidoDos,
            procedimiento,
            rowsPerPage,
            page,
            supplier_id
        } = this.state;

        let filtros = {};
        if (nombreServidor) filtros.nombres = nombreServidor;
        if (apellidoUno) filtros.primerApellido = apellidoUno;
        if (apellidoDos) filtros.segundoApellido = apellidoDos;
        if (current_entity && current_entity !== 'ANY') filtros.institucion = current_entity;
        if (procedimiento && procedimiento !== 'todos') filtros.procedimiento = procedimiento;

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
            nivel : 'todos',
            nombreServidor: "",
            procedimiento: "",
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

            nombreServidor,
            apellidoUno,
            apellidoDos,
            procedimiento,
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

                <Grid container justify={'center'} spacing={0} className={classes.gridTable}>
                    <Grid item xs={12} className={classes.toolBarStyle}>
                        <BusquedaServidor handleCleanAll={this.handleCleanAll}
                                          handleSearch={this.handleBroadSearch}
                                          handleSetState={this.handleSetState}
                                          nombreServidor={nombreServidor}
                                          apellidoUno={apellidoUno}
                                          apellidoDos={apellidoDos}
                                          entities = {entities}
                                          current_entity= {current_entity}
                                          nivel={nivel}
                                          changeLevel = {this.changeLevel}
                                          procedimiento={procedimiento}
                                          handleError={this.handleError}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <DetalleServidorSancionado handleClose={this.handleClose}
                                                   servidor={elementoSeleccionado}
                                                   control={open}/>
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
                            this.state.error && <MensajeErrorDatos/>
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
                    </Grid>

                </Grid>

                {results && results.length > 0 &&
                <Grid container justify={'center'} spacing={0} className={classes.gridTable}>
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
                                                    onClick={event => this.handleClick(event, n)}
                                                    tabIndex={-1}
                                                    key={index}
                                                >
                                                    <TableCell component="th" scope="row" style={{width: '25%'}}
                                                               padding="default">{nombrecompleto || `${nombres} ${primerApellido} ${segundoApellido}`}</TableCell>
                                                    <TableCell>{dependencia? dependencia.nombre : institucionDependencia.nombre}</TableCell>
                                                    <TableCell>{puesto.nombre}</TableCell>
                                                    {/*<TableCell>{n.tipo_actos}</TableCell>*/}
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
                                            page={page}
                                            backIconButtonProps={{
                                                'aria-label': 'Previous Page',
                                            }}
                                            nextIconButtonProps={{
                                                'aria-label': 'Next Page',
                                            }}
                                            onChangePage={this.handleChangePage}
                                            onChangeRowsPerPage={this.handleChangeRowsPerPage}
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

                <Grid container spacing={0} justify="center" className={classes.containerD}>
                    <Grid item xs={12} className={classes.itemD}>
                        <Descarga url={process.env.REACT_APP_BULK_S2}/>
                    </Grid>
                </Grid>

            </div>
        );
    }
}

TablaServidores.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TablaServidores);
