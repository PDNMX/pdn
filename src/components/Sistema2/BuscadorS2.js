import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@mui/styles/withStyles';
import {Table, TableBody, TableCell,TablePagination, TableRow, TableFooter} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import {Paper, Box, Typography, Modal} from "@mui/material"
import axios from 'axios';
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Collapse from "@mui/material/Collapse";

import EntradasBuscador from "./EntradasBuscador";
import TablaResumen from "./TablaResumen";
import EnhancedTableHead from './EnhancedTableHead';
import AlertaError from "./AlertaError";
import FichaServidorPublico from "./FichaServidorPublico";

import columnData from './column_data';
import Descarga from "../Compartidos/Descarga";
import { ThemeProvider } from '@mui/material/styles';
import ThemeV2 from '../../ThemeV2';

const styles = theme => ({
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
    }
});

function getSorting(order, orderBy) {
    return order === 'desc'
        ? (a, b) => (b[orderBy] < a[orderBy] ? -1 : 1)
        : (a, b) => (a[orderBy] < b[orderBy] ? -1 : 1);
}

const CustomTypography = withStyles(theme => ({
    root: {
        color: theme.palette.text.main
    }
}))(Typography);

class BuscadorS2 extends React.Component {
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
            url: process.env.REACT_APP_S2_BACKEND + "/api/v1/entities",
            json: true,
            method: "POST",
            data: {}
        };

        if (nivel !== 'todos'){
            options.data.nivel_gobierno = nivel
        }

        axios(options).then(res => {
            this.setState({
                entities: res.data,
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
                url: process.env.REACT_APP_S2_BACKEND +  '/api/v1/summary',
                json: true,
                data: filtros
            };

            axios(options).then(res => {
                this.setState({
                    summaryData: res.data,
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
            url: process.env.REACT_APP_S2_BACKEND + '/api/v1/search',
            json: true,
            data: {
                ...filtros,
                page: page + 1, //en el backend page inicia en 1
                pageSize: rowsPerPage,
                supplier_id: supplier_id
            }
        };

        axios(options).then(res => {
            const {results, pagination} = res.data;
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
            order, orderBy, rowsPerPage, page,
            results, totalRows,
            entities, current_entity,

            nombres, apellidoUno, apellidoDos,
            tipoProcedimiento, nivel,

            loading,
            elementoSeleccionado,
            open,
            summaryData,
            mostrarPanelResumen
        } = this.state;
        //  const emptyRows = rowsPerPage - filterData.length;

        return (<div>
            <ThemeProvider theme={ThemeV2}>
            <Paper className={classes.paper} elevation={15}>
                {/* Información de la búsqueda */}
                <Box p={1}>
                    <CustomTypography paragraph>
                        <b>Aquí encontrarás la siguiente información:</b>
                    </CustomTypography>
                        
                    <ul className={classes.ul}>
                        <li className={classes.li}>
                            <CustomTypography color="textPrimary" display='inline'>
                                Consulta los servidores que intervienen en procesos de contratación por institución, a nivel federal y/o estatal
                            </CustomTypography>
                        </li>
                        <li className={classes.li}>
                            <CustomTypography color="textPrimary" display='inline'>
                                Obtén datos del servidor como: nombre, puesto, institución
                            </CustomTypography>
                        </li>
                    </ul>
                </Box>

                {/* Parámetros de búsqueda */}
                <Box p={1}>
                    <EntradasBuscador handleCleanAll={this.handleCleanAll}
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
                </Box>

                {/* Resumen de resultados */}
                {summaryData && summaryData.length > 0 &&
                    <Box p={1}>
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
                    </Box>
                }

                <Box p={1}>
                    <AlertaError open={this.state.error} setOpen={open => {this.setState({error: open})}}/>
                </Box>

                {/* Desplegar resultados de la búsqueda */}
                {results && results.length > 0 &&
                    <Box p={1}>
                        <Typography variant={"h6"} className={classes.desc} paragraph>
                            Pulsa sobre el registro para ver su detalle
                        </Typography>

                        <div className={classes.container}>
                            <Table aria-describedby="spinnerLoading" id={'tableServidores'}
                                   aria-busy={this.state.loading} aria-labelledby="tableTitle">
                                <EnhancedTableHead
                                    order={order}
                                    orderBy={orderBy}
                                    onRequestSort={this.handleRequestSort}
                                    columnData={columnData}
                                />
                                <TableBody className={classes.tableBody}>
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
                                    {/*emptyRows > 0 && (
                                        <TableRow style={{height: 49 * emptyRows}}>
                                            <TableCell colSpan={6}/>
                                        </TableRow>
                                    )*/}

                                </TableBody>
                                <TableFooter className={classes.tableBody}>
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
                    </Box>
                }

            </Paper>

            <Box p={1}>
                <Descarga url={process.env.REACT_APP_BULK_S2}/>
            </Box>

            {loading &&
                <Modal open={loading} disableAutoFocus={true}>
                    <CircularProgress className={classes.progress} id="spinnerLoading" size={200}/>
                </Modal>
            }

            <FichaServidorPublico open={open} servidorPublico={elementoSeleccionado} closeDialog={this.closeDialog}/>
            </ThemeProvider>
        </div>);
    }
}

BuscadorS2.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BuscadorS2);