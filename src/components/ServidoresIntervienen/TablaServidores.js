import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import BusquedaServidor from "./BusquedaServidor";
import DetalleServidorSancionado from "./DetalleServidor";
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from "@material-ui/core/Grid/Grid";
import EnhancedTableHead from '../Tablas/EnhancedTableHead';
import {Typography} from "@material-ui/core"
import Modal from "@material-ui/core/Modal/Modal";
import rp from "request-promise";
import MensajeErrorDatos from "../Tablas/MensajeErrorDatos";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import Collapse from "@material-ui/core/Collapse";
import Previos from "../Tablas/Previos";
import Descarga from "../Compartidos/Descarga";
import columnData from './column_data';

function getSorting(order, orderBy) {
    return order === 'desc'
        ? (a, b) => (b[orderBy] < a[orderBy] ? -1 : 1)
        : (a, b) => (a[orderBy] < b[orderBy] ? -1 : 1);
}
const styles = theme => ({
    root: {
        marginTop: '30px',
        marginBottom: '30px',
    },
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
    containerPrevios: {
        marginLeft: theme.spacing(2)
    } ,
    ul: {
        listStyle: "none",
        paddingLeft: "20px"
    },
    infoBusqueda: {
        paddingRight: theme.spacing(1),
        paddingLeft: theme.spacing(1),
        //paddingBottom: theme.spacing(4),
        //  paddingTop: theme.spacing(4),
        backgroundColor: "white"

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
        //paddingBottom: theme.spacing(2)
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
    },
});


class EnhancedTable extends React.Component {
    constructor(props) {
        super(props);
        this.child = React.createRef();
        this.btnDownloadAll = React.createRef();

        this.state = {
            order: 'asc',
            orderBy: 'servidor',
            selected: [],
            nombreServidor: '',
            apellidoUno: '',
            apellidoDos: '',
            /* rfc: '',
            curp: '', */
            data: [],
            filterData: null,
            page: 0,
            rowsPerPage: 10,
            procedimiento: 'todos',
            open: false,
            elementoSeleccionado: {},
            institucion: "ANY",
            loading: false,
            totalRows: 0,
            filterDataAll: [],
            error: false,
            nivel: 'todos',
            previos: [],
            panelPrevios: true,

        };

    }

    handleChange = () => {
        this.setState({
            panelPrevios: !this.state.panelPrevios
        })
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

    handleSelectAllClick = (event, checked) => {
        if (checked) {
            this.setState(state => ({selected: state.data.map(n => n.id)}));
            return;
        }
        this.setState({selected: []});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    handleClick = (event, elemento) => {
        this.setState({elementoSeleccionado: elemento});
        this.setState({open: true});
    };

    handleChangePage = (event, page) => {
        this.setState({page}, () => {
            this.handleSearchAPI('CHANGE_PAGE');
        });

    };

    handleChangeRowsPerPage = event => {
        this.setState({rowsPerPage: event.target.value}, () => {
            this.handleSearchAPI('FIELD_FILTER');
        });
    };

    isSelected = id => this.state.selected.indexOf(id) !== -1;

    handleSearchPrevios = () => {
        this.handleCleanTables();
        this.setState({loading: true});

        let {institucion, nombreServidor, apellidoUno, apellidoDos, procedimiento} = this.state;

        let filtros = {};
        let offset = 0;


        if (nombreServidor) filtros.nombres = nombreServidor;
        if (apellidoUno) filtros.primer_apellido = apellidoUno;
        if (apellidoDos) filtros.segundo_apellido = apellidoDos;
        if (procedimiento && procedimiento !== 'todos') filtros.procedimiento = procedimiento;
        /* if (rfc) filtros.rfc = '%' + rfc + '%';
        if (curp) filtros.curp = '%' + curp + '%'; */
        if (institucion && institucion !== 'ANY') filtros.institucion = institucion;

        let limit =  this.state.rowsPerPage;

        let body =
            {
                "filtros": filtros,
                "limit": limit,
                "offset": offset,
                "nivel": this.state.nivel
            };

        let options = {
            method: 'POST',
            uri: process.env.REACT_APP_HOST_PDNBACK + '/apis/s2/getPrevio',
            json: true,
            body: body
        };

        rp(options)
            .then(res => {
                this.setState({previos: res, loading: false, error: false})
            }).catch(err => {
            this.setState({loading: false, error: true});
        });
    };

    handleCleanTables = () => {
        this.setState(
            {
                filterData: null,
                previos: null,
            }
        )
    };

    handleChangeAPI = (val) => {
        this.setState({
            api: val,
            page:0
        }, () => {
            this.handleSearchAPI('FIELD_FILTER')
        });
    };
    handleSearchAPI = (typeSearch) => {
        this.setState({loading: true});
        let {
            institucion,
            nombreServidor,
            apellidoUno,
            apellidoDos,
            procedimiento
        } = this.state;

        let filtros = {};
        let offset = 0;

        if (typeSearch !== 'DN_ALL') {
            if (nombreServidor) filtros.nombres = nombreServidor;
            if (apellidoUno) filtros.primer_apellido = apellidoUno;
            if (apellidoDos) filtros.segundo_apellido = apellidoDos;
            if (procedimiento) filtros.procedimiento = procedimiento;
            /* if (rfc) filtros.rfc = '%' + rfc + '%';
            if (curp) filtros.curp = '%' + curp + '%'; */
            if (institucion && institucion !== 'ANY') filtros.institucion = institucion;
            if (procedimiento && procedimiento !== 'todos') filtros.procedimiento = procedimiento;
        }

        let limit = (typeSearch === 'FIELD_FILTER' || typeSearch === 'CHANGE_PAGE') ? this.state.rowsPerPage : null;

        if (typeSearch === 'CHANGE_PAGE') offset = (this.state.rowsPerPage * this.state.page);
        else this.setState({page: 0})

        let body =
            {
                "filtros": filtros,
                "limit": limit,
                "offset": offset,
                "iterar": (typeSearch === 'DN_FILTER' || typeSearch === 'DN_ALL') ? true : false,
                "clave_api": this.state.api
            };
        let options = {
            method: 'POST',
            uri: process.env.REACT_APP_HOST_PDNBACK + '/apis/s2',
            json: true,
            body: typeSearch === 'DN_ALL' ? {"iterar": true} : body
        };

        rp(options)
            .then(res => {
                let dataAux = res.data;
                let total = res.totalRows;

                typeSearch === 'DN_ALL' ? this.setState({data: dataAux, loading: false}, () => {
                    this.btnDownloadAll.triggerDown();
                }) : (typeSearch === 'FIELD_FILTER' || typeSearch === 'CHANGE_PAGE') ? this.setState({
                        filterData: dataAux,
                        loading: false,
                        totalRows: total
                    }) :
                    this.setState({filterDataAll: dataAux, loading: false, totalRows: total}, () => {
                        this.child.triggerDown();
                    });
            }).catch(err => {
            this.setState({loading: false, error: true});
        });
    };

    handleChangeCampo = (varState, event) => {
        this.setState({
            [varState]: event ? (event.target ? event.target.value : event.value) : ''
        });
    };
    handleCleanAll = () => {
        this.setState(
            {
                filterData: null,
                previos : null,
                nivel : 'todos'
            }, () => {
                this.handleChangeCampo('nombreServidor');
                this.handleChangeCampo('procedimiento');
                this.handleChangeCampo('institucion');
                this.handleChangeCampo('apellidoUno');
                this.handleChangeCampo('apellidoDos');
            })
    };

    render() {
        const {classes} = this.props;
        const {data, order, orderBy, selected, rowsPerPage, page, filterData, totalRows} = this.state;
        //  const emptyRows = rowsPerPage - filterData.length;

        return (
            <div>
                <Grid
                    container
                    spacing={0}
                    style={{backgroundColor: "#fff"}}
                    className={classes.infoBusqueda}
                >
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
                                          handleSearch={this.handleSearchPrevios}
                                          handleChangeCampo={this.handleChangeCampo}
                                          nombreServidor={this.state.nombreServidor}
                                          apellidoUno={this.state.apellidoUno}
                                          apellidoDos={this.state.apellidoDos}
                                          institucion={this.state.institucion}
                                          procedimiento={this.state.procedimiento}
                                          handleError={this.handleError}
                                          nivel={this.state.nivel}/>
                    </Grid>
                    <Grid item xs={12}>
                        <DetalleServidorSancionado handleClose={this.handleClose}
                                                   servidor={this.state.elementoSeleccionado}
                                                   control={this.state.open}/>
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
                    <Grid item xs={12} className={classes.section}>
                        {this.state.previos && this.state.previos.length > 0 &&
                        <div>
                            <FormControlLabel
                                control={<Switch className={classes.containerPrevios} checked={this.state.panelPrevios}
                                                 onChange={() => this.handleChange()}/>}
                                label={
                                    <Typography variant="h6" className={classes.desc}>
                                        {this.state.panelPrevios ? 'Ocultar resultados generales' : 'Mostrar resultados generales'}</Typography>}
                            />
                            <div className={classes.container}>
                                <Collapse in={this.state.panelPrevios}>
                                    <Previos previos={this.state.previos} handleChangeAPI={this.handleChangeAPI}/>
                                </Collapse>

                            </div>
                        </div>
                        }

                    </Grid>
                    <Grid item xs={12} className={classes.section}>
                        {filterData && filterData.length > 0 &&
                        <Typography variant={"h6"} className={classes.desc}>Pulsa sobre el registro para ver su
                            detalle<br/></Typography>
                        }

                    </Grid>
                    <Grid item xs={12} className={classes.section}>
                        {filterData && filterData.length > 0 &&
                        <div className={classes.container}>
                            <Table aria-describedby="spinnerLoading" id={'tableServidores'}
                                   aria-busy={this.state.loading} aria-labelledby="tableTitle">
                                <EnhancedTableHead
                                    numSelected={selected.length}
                                    order={order}
                                    orderBy={orderBy}
                                    onSelectAllClick={this.handleSelectAllClick}
                                    onRequestSort={this.handleRequestSort}
                                    rowCount={data.length}
                                    columnData={columnData}
                                />
                                <TableBody>
                                    {filterData
                                        .sort(getSorting(order, orderBy))
                                        .map(n => {
                                            const isSelected = this.isSelected(n.id);
                                            return (
                                                <TableRow
                                                    hover
                                                    onClick={event => this.handleClick(event, n)}
                                                    role="checkbox"
                                                    aria-checked={isSelected}
                                                    tabIndex={-1}
                                                    key={n.id}
                                                    selected={isSelected}
                                                >
                                                    
                                                    <TableCell component="th" scope="row" style={{width: '25%'}}
                                                               padding="default">{n.servidor}</TableCell>
                                                    <TableCell>{n.institucion.nombre}</TableCell>
                                                    <TableCell>{n.puesto.nombre}</TableCell>
                                                    <TableCell>{n.tipo_actos}</TableCell>
                                                    

                                                </TableRow>
                                            );
                                        })}
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
                                        {/* <TableCell>
                                            <BajarCSV innerRef={comp => this.btnDownloadAll = comp} data={data}
                                                      filtrado={false}
                                                      columnas={columnData} fnSearch={this.handleSearchAPI}
                                                      fileName={'Servidores sancionados'}/>
                                        </TableCell>
                                        <TableCell colSpan={2}>
                                            <BajarCSV innerRef={comp => this.child = comp} data={filterDataAll}
                                                      filtrado={true}
                                                      columnas={columnData} fnSearch={this.handleSearchAPI}
                                                      fileName={'MiBusqueda'}/>
                                        </TableCell>*/}
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
                        }

                    </Grid>


                </Grid>
                <Grid container spacing={0} justify="center" className={classes.containerD} style={{backgroundColor: '#f6f6f6'}}>
                    <Grid item xs={12} className={classes.itemD}>

                        <Descarga url={process.env.REACT_APP_BULK_S2}/>

                    </Grid>
                </Grid>
            </div>
        );
    }
}

EnhancedTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EnhancedTable);
