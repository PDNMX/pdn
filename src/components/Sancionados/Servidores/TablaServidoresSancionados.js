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
import rp from "request-promise";
import CircularProgress from '@material-ui/core/CircularProgress';
import BajarCSV from "../../Tablas/BajarCSV";
import Grid from "@material-ui/core/Grid/Grid";
import EnhancedTableHead from '../../Tablas/EnhancedTableHead';
import Typography from "@material-ui/core/Typography/Typography";
import Modal from "@material-ui/core/Modal/Modal";

let counter = 0;

let createData = (item) => {
    let leyenda = "NO EXISTE DATO EN LA BASE DE DATOS RSPS";
    counter += 1;
    return {
        id: counter,
        servidor: item.servidor_publico ? item.servidor_publico : leyenda,
        institucion: item.dependencia ? item.dependencia : leyenda,
        autoridad: item.autoridad ? item.autoridad : leyenda,
        expediente: item.expediente ? item.expediente : leyenda,
        fecha_resolucion: item.fecha_resolucion ? item.fecha_resolucion : leyenda,
        sancion_impuesta: item.sancion_impuesta ? item.sancion_impuesta : leyenda,
        fecha_inicio: item.inicio ? item.inicio : leyenda,
        fecha_fin: item.fin ? item.fin : leyenda,
        monto: item.monto ? item.monto : leyenda,
        causa: item.causa ? item.causa : leyenda
    };
};

function getSorting(order, orderBy) {
    return order === 'desc'
        ? (a, b) => (b[orderBy] < a[orderBy] ? -1 : 1)
        : (a, b) => (a[orderBy] < b[orderBy] ? -1 : 1);
}

const columnData = [
    {id: 'servidor', disablePadding: false, label: 'Servidor público', position: 1, mostrar: true},
    {id: 'institucion', disablePadding: false, label: 'Institución', position: 2, mostrar: true},
    {id: 'autoridad', disablePadding: false, label: 'Autoridad', position: 3, mostrar: true},
    {id: 'expediente', disablePadding: false, label: 'Expediente', position: 4, mostrar: true},
    {
        id: 'fecha_resolucion',
        disablePadding: false,
        label: 'Fecha resolución',
        position: 5,
        mostrar: false
    },
    {
        id: 'sancion_impuesta',
        disablePadding: false,
        label: 'Sanción impuesta',
        position: 6,
        mostrar: false
    },
    {id: 'fecha_inicio', disablePadding: false, label: 'Fecha inicio', position: 7, mostrar: false},
    {id: 'fecha_fin', disablePadding: false, label: 'Fecha fin', position: 8, mostrar: false},
    {id: 'monto', disablePadding: false, label: 'Monto', position: 9, mostrar: false},
    {id: 'causa', disablePadding: false, label: 'Causa', position: 10, mostrar: false},
    {id: 'constancia', disablePadding: true, label: 'Constancia', position: 11, mostrar: false}
];

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
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
        padding: theme.spacing.unit
    }

});

const toolbarStyles = theme => ({
    root: {
        width: '100%',
        padding: theme.spacing.unit,
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
    const {classes, handleChangeCampo, nombreServidor, institucion, handleSearch, handleCleanAll} = props;
    return (
        <Toolbar className={classes.toolBarStyle}>
            <BusquedaServidor handleCleanAll={handleCleanAll} handleSearch={handleSearch}
                              handleChangeCampo={handleChangeCampo}
                              nombreServidor={nombreServidor}
                              institucion={institucion}/>
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
            data: [],
            filterData: [],
            page: 0,
            rowsPerPage: 10,
            procedimiento: 0,
            open: false,
            elementoSeleccionado: {},
            institucion: null,
            loading: false,
            totalRows: 0,
            filterDataAll: [],

        };

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

    getTotalRows = (params) => {
        let options = {
            uri: 'https://plataformadigitalnacional.org/api/rsps?select=count=eq.exact',
            json: true,
            qs: params
        };
        rp(options)
            .then(data => {
                this.setState({totalRows: data[0].count, loading: false});
            }).catch(err => {
            this.setState({loading: false});
            alert("_No se pudó obtener la información");
            console.log(err);
        });
    };
    handleSearchAPI = (typeSearch) => {
        this.setState({loading: true});
        let {institucion, nombreServidor} = this.state;
        const URI = 'https://plataformadigitalnacional.org/api/rsps?';

        let params = {};

        if (typeSearch !== 'ALL') {
            if(institucion)  params.dependencia = 'eq.' + institucion ;
            if(nombreServidor)  params.servidor_publico = 'like.*' + nombreServidor.toUpperCase() + '*';
            if(typeSearch === 'FIELD_FILTER' || typeSearch === 'CHANGE_PAGE')  params.limit = this.state.rowsPerPage;
            if(typeSearch === 'CHANGE_PAGE')  params.offset = (this.state.rowsPerPage * this.state.page);
            if(typeSearch === 'FIELD_FILTER') this.getTotalRows(params);
        }

        let options = {
            uri: URI,
            json: true,
            qs: params
        };

        rp(options)
            .then(data => {
                let dataAux = data.map(item => {
                    return createData(item);
                });
                typeSearch === 'ALL' ? this.setState({data: dataAux, loading: false}, () => {
                    this.btnDownloadAll.triggerDown();
                }) : (typeSearch === 'FIELD_FILTER' || typeSearch === 'CHANGE_PAGE') ? this.setState({
                        filterData: dataAux,
                        loading: false
                    }) :
                    this.setState({filterDataAll: dataAux, loading: false}, () => {
                        this.child.triggerDown();
                    });
                return true;
            }).catch(err => {
            this.setState({loading: false});
            alert("_No se pudó obtener la información");
            console.log(err);
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
                filterData: []
            }, () => {
                this.handleChangeCampo('nombreServidor');
                this.handleChangeCampo('procedimiento');
                this.handleChangeCampo('institucion');
            })
    };

    render() {
        const {classes} = this.props;
        const {data, order, orderBy, selected, rowsPerPage, page, filterData, totalRows, filterDataAll} = this.state;
        const emptyRows = rowsPerPage - filterData.length;

        return (
            <div>
                <Grid container justify={'center'} spacing={0} className={classes.gridTable}>
                    <Grid item xs={12}>
                        <EnhancedTableToolbar categoria={this.state.categoria}
                                              handleChangeCampo={this.handleChangeCampo}
                                              handleCleanAll={this.handleCleanAll}
                                              handleSearch={this.handleSearchAPI}
                                              nombreServidor={this.state.nombreServidor}
                                              data={filterData}
                                              columnas={columnData} institucion={this.state.institucion}/>
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
                    </Grid>
                    <Grid item xs={12}>
                        {filterData.length > 0 &&
                        <Typography variant={"h6"} className={classes.desc}>Pulsa sobre el registro para ver su
                            detalle<br/></Typography>
                        }

                    </Grid>
                    <Grid item xs={12}>
                        {filterData.length > 0 &&
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
                                                    <TableCell component="th" scope="row" style={{width:'25%'}}
                                                               padding="default">{n.servidor}</TableCell>
                                                    <TableCell>{n.institucion}</TableCell>
                                                    <TableCell style={{width: '25%'}}>{n.autoridad}</TableCell>
                                                    <TableCell>{n.expediente}</TableCell>
                                                </TableRow>
                                            );
                                        })}
                                    {emptyRows > 0 && (
                                        <TableRow style={{height: 49 * emptyRows}}>

                                            <TableCell colSpan={4}/>

                                        </TableRow>
                                    )}

                                </TableBody>
                                <TableFooter>
                                    <TableRow>
                                        <TableCell>
                                            <BajarCSV innerRef={comp => this.btnDownloadAll = comp} data={data}
                                                      filtrado={false}
                                                      columnas={columnData} fnSearch={this.handleSearchAPI}
                                                      fileName={'Servidores sancionados'}/>
                                        </TableCell>
                                        <TableCell>
                                            <BajarCSV innerRef={comp => this.child = comp} data={filterDataAll}
                                                      filtrado={true}
                                                      columnas={columnData} fnSearch={this.handleSearchAPI}
                                                      fileName={'Servidores sancionados'}/>
                                        </TableCell>
                                        <TablePagination
                                            className={classes.tablePagination}
                                            colSpan={2}
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
                    <Grid item xs={12} className={classes.item}>
                        {filterData.length > 0 &&
                        <Typography variant="caption" style={{fontStyle: 'italic'}} paragraph>
                            Fuente: https://datos.gob.mx/busca/dataset/servidores-publicos-sancionados
                        </Typography>
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
