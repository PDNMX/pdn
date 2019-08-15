import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import Toolbar from '@material-ui/core/Toolbar';
import BusquedaServidor from "./BusquedaServidor";
import DetalleServidorSancionado from "./DetalleServidorSancionado";
import CircularProgress from '@material-ui/core/CircularProgress';
import BajarCSV from "../../Tablas/BajarCSV";
import Grid from "@material-ui/core/Grid/Grid";
import EnhancedTableHead from '../../Tablas/EnhancedTableHead';
import {Typography} from "@material-ui/core"
import Modal from "@material-ui/core/Modal/Modal";
import rp from "request-promise";
import MensajeErrorDatos from "../../Tablas/MensajeErrorDatos";
import MensajeNoRegistros from "../../Tablas/MensajeNoRegistros";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import Collapse from "@material-ui/core/Collapse";
import Previos from "../../Tablas/Previos";


function getSorting(order, orderBy) {
    return order === 'desc'
        ? (a, b) => (b[orderBy] < a[orderBy] ? -1 : 1)
        : (a, b) => (a[orderBy] < b[orderBy] ? -1 : 1);
}

const columnData = [
    {id: 'expediente', disablePadding: false, label: 'Expediente', position: 1, mostrar: true},
    {id: 'nombre', disablePadding: false, label: 'Nombre', position: 2, mostrar: true},
    {id: 'apellidoUno', disablePadding: false, label: 'Apellido Uno', position: 3, mostrar: true},
    {id: 'apellidoDos', disablePadding: false, label: 'Apellido Dos', position: 4, mostrar: true},
    {id: 'institucion.nombre', disablePadding: false, label: 'Institución', position: 5, mostrar: true},
    {id: 'autoridad_sancionadora', disablePadding: false, label: 'Autoridad Sancionadora', position: 6, mostrar: true},
    {
        id: 'resolucion.fecha_notificacion',
        disablePadding: false,
        label: 'Fecha notificación',
        position: 7,
        mostrar: false
    },
    {
        id: 'tipo_sancion',
        disablePadding: false,
        label: 'Sanción impuesta',
        position: 8,
        mostrar: false
    },
    {id: 'inhabilitacion.fecha_inicial', disablePadding: false, label: 'Fecha inicio', position: 9, mostrar: false},
    {id: 'inhabilitacion.fecha_final', disablePadding: false, label: 'Fecha fin', position: 10, mostrar: false},
    {id: 'multa.monto', disablePadding: false, label: 'Monto', position: 11, mostrar: false},
    {id: 'causa', disablePadding: false, label: 'Causa', position: 12, mostrar: false},
    {id: 'constancia', disablePadding: true, label: 'Constancia', position: 13, mostrar: false}
];

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing(3),
    },
    tableWrapper: {
        overflowX: 'auto',
    },
    tableFooter: {
        display: 'flow-root',
        flexWrap: 'wrap',
    },
    progress: {
        position: 'fixed',
        margin: 'auto',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
    },
    container: {
        marginTop: '30px',
        marginBottom: '30px',
        overflowX: 'auto',
    },
    section: {
        maxWidth: '1024px',
        overflowX: 'auto'
    },
    table: {
        tableLayout: 'fixed',
    },
    tablePagination: {
        overflowX: 'auto',
        fontSize: '0.75rem'
    },
    gridTable: {
        marginBottom: '27px'
    },
    desc: {
        color: theme.palette.primary.dark,
    },
    item: {
        padding: theme.spacing(1)
    },
    containerPrevios: {
    marginLeft: theme.spacing(2)
}

});

const toolbarStyles = theme => ({
    root: {
        width: '100%',
        padding: theme.spacing(1),
    },
    toolBarStyle: {
        backgroundColor: 'transparent',
        position: 'relative',
        zIndex: 3,
        paddingTop: '53px',
        paddingBottom: '61px',
    },
    toolBarFloat: {
        paddingTop: '53px',
        paddingBottom: '61px',
        marginTop: '-30px',
        borderRadius: '3px',
        background: '#fff',
        boxShadow: '0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 10px -5px rgb(41, 92, 83)',
        width: '100%',

    },
    spacer: {
        flex: '1 1 100%',
    },
    actions: {
        color: theme.palette.text.secondary,
    },
    title: {
        flex: '0 0 auto',
    },
    flex: {
        flexGrow: 1,
    },
});


let EnhancedTableToolbar = props => {
    const {classes, handleChangeCampo, nombreServidor, apellidoUno, apellidoDos, institucion, rfc, curp, handleSearch, handleCleanAll, handleError, nivel} = props;
    return (
        <Toolbar className={classes.toolBarStyle}>
            <BusquedaServidor handleCleanAll={handleCleanAll} handleSearch={handleSearch}
                              handleChangeCampo={handleChangeCampo}
                              nombreServidor={nombreServidor} apellidoUno={apellidoUno} apellidoDos={apellidoDos}
                              institucion={institucion} rfc={rfc} curp={curp} handleError={handleError} nivel={nivel}/>
        </Toolbar>
    );
};

EnhancedTableToolbar.propTypes = {
    classes: PropTypes.object.isRequired
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);


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
            rfc: '',
            curp: '',
            data: [],
            filterData: null,
            page: 0,
            rowsPerPage: 10,
            procedimiento: 0,
            open: false,
            elementoSeleccionado: {},
            institucion: "",
            loading: false,
            totalRows: 0,
            filterDataAll: [],
            error: false,
            nivel: 'todos',
            previos: [],
            panelPrevios: true,
            api: ''

        };

    }

    handleChange = () => {
        this.setState({
            panelPrevios: !this.state.panelPrevios
        })
    }

    handleError = (val) => {
        this.setState({
            error: val
        })
    }
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

        let {institucion, nombreServidor, apellidoUno, apellidoDos, rfc, curp} = this.state;

        let filtros = {};
        let offset = 0;


        if (nombreServidor) filtros.nombres = '%' + nombreServidor + '%';
        if (apellidoUno) filtros.primer_apellido = '%' + apellidoUno + '%';
        if (apellidoDos) filtros.segundo_apellido = '%' + apellidoDos + '%';
        if (rfc) filtros.rfc = '%' + rfc + '%';
        if (curp) filtros.curp = '%' + curp + '%';
        if (institucion && institucion !== 'TODAS') filtros.nombre = '%' + institucion + '%';

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
            uri: process.env.REACT_APP_HOST_PDNBACK + '/apis/getPrevioServidoresSancionados',
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
            api: val
        }, () => {
            this.handleSearchAPI('FIELD_FILTER')
        });
    };
    handleSearchAPI = (typeSearch) => {
        this.setState({loading: true});
        let {institucion, nombreServidor, apellidoUno, apellidoDos, rfc, curp} = this.state;

        let filtros = {};
        let offset = 0;

        if (typeSearch !== 'DN_ALL') {
            if (nombreServidor) filtros.nombres = '%' + nombreServidor + '%';
            if (apellidoUno) filtros.primer_apellido = '%' + apellidoUno + '%';
            if (apellidoDos) filtros.segundo_apellido = '%' + apellidoDos + '%';
            if (rfc) filtros.rfc = '%' + rfc + '%';
            if (curp) filtros.curp = '%' + curp + '%';
            if (institucion && institucion !== 'TODAS') filtros.nombre = '%' + institucion + '%';
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
            uri: process.env.REACT_APP_HOST_PDNBACK + '/apis/getServidoresSancionados',
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
        const {data, order, orderBy, selected, rowsPerPage, page, filterData, totalRows, filterDataAll} = this.state;
        //  const emptyRows = rowsPerPage - filterData.length;

        return (
            <div>
                <Grid container justify={'center'} spacing={0} className={classes.gridTable}>
                    <Grid item xs={12}>
                        <EnhancedTableToolbar categoria={this.state.categoria}
                                              handleChangeCampo={this.handleChangeCampo}
                                              handleCleanAll={this.handleCleanAll}
                                              handleSearch={this.handleSearchPrevios}
                                              nombreServidor={this.state.nombreServidor}
                                              data={filterData}
                                              columnas={columnData} institucion={this.state.institucion}
                                              apellidoUno={this.state.apellidoUno}
                                              apellidoDos={this.state.apellidoDos} handleError={this.handleError}
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
                    <Grid item xs={12}>
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
                    <Grid item xs={12}>
                        {filterData && filterData.length > 0 &&
                        <Typography variant={"h6"} className={classes.desc}>Pulsa sobre el registro para ver su
                            detalle<br/></Typography>
                        }

                    </Grid>
                    <Grid item xs={12}>
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
                                                    <TableCell component="th" scope="row"
                                                               padding="default">{n.expediente}</TableCell>
                                                    <TableCell>{n.nombre}</TableCell>
                                                    <TableCell>{n.apellidoUno}</TableCell>
                                                    <TableCell>{n.apellidoDos}</TableCell>
                                                    <TableCell>{n.institucion.nombre}</TableCell>
                                                    <TableCell
                                                        style={{width: '25%'}}>{n.autoridad_sancionadora}</TableCell>

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
                    <Grid item xs={12}>
                        {
<<<<<<< HEAD
                            filterData && filterData.length == 0 &&
=======
                            filterData && filterData.length===0 &&
>>>>>>> 558bf5ca292f0c27db5a8c701d0976160c70e055
                            <MensajeNoRegistros/>
                        }
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
