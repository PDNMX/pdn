import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import BusquedaServidor from "./BusquedaServidor";
import DetalleServidor from "./DetalleServidor";
import rp from "request-promise";
import CircularProgress from '@material-ui/core/CircularProgress';
import BajarCSV from "./BajarCSV";
import BusquedaParticular from "./BusquedaParticular";
import DetalleParticular from "./DetalleParticular";

let counter = 0;

let createData = (item) => {
    counter += 1;
    return {
        id: counter,
        proveedor: item.proveedor_o_contratista,
        dependencia: item.dependencia,
        expediente: item.numero_de_expediente,
        hechos: item.hechos_de_la_irregularidad,
        objetoSocial: item.objeto_social,
        sentidoResolucion: item.sentido_de_resolucion,
        fechaNotificacion: item.fecha_de_notificacion,
        fechaResolucion: item.fecha_de_resolucion,
        plazo: item.plazo,
        monto: item.monto,
        responsableInformacion: item.nombre_del_responsable_de_la_informacion,
        fechaActualizacion: item.fecha_de_actualizacion
    };
};

function getSorting(order, orderBy) {
    return order === 'desc'
        ? (a, b) => (b[orderBy] < a[orderBy] ? -1 : 1)
        : (a, b) => (a[orderBy] < b[orderBy] ? -1 : 1);
}

const columnData = [
    {id: 'proveedor', numeric: false, disablePadding: false, label: 'Proveedor o contratista', position: 1, mostrar: true},
    {id: 'dependencia', numeric: false, disablePadding: false, label: 'Dependencia', position: 2, mostrar: true},
    {id: 'expediente', numeric: false, disablePadding: false, label: 'Número de expediente', position: 3, mostrar: true},
    {id: 'hechos', numeric: false, disablePadding: false, label: 'Hechos de la irregularidad', position: 4, mostrar: false},
    {id: 'objetoSocial',numeric: false,disablePadding: false,label: 'Objeto social',position: 5,mostrar: false},
    {id: 'sentidoResolucion',numeric: false,disablePadding: false,label: 'Sentido de la resolución',position: 6,mostrar: true},
    {id: 'fechaNotificacion',numeric: false,disablePadding: false,label: 'Fecha notificación',position: 7,mostrar: true},
    {id: 'fechaResolucion',numeric: false,disablePadding: false,label: 'Fecha resolución',position: 8,mostrar: true},
    {id: 'plazo', numeric: false,disablePadding:false,label: 'Plazo', position: 9, mostrar: false},
    {id: 'monto', numeric: false, disablePadding: false, label: 'Monto', position: 10, mostrar:  false},
    {id: 'responsableInformacion', numeric: false, disablePadding: false, label: 'Responsable de información', position: 11, mostrar: false},
    {id: 'fechaActualizacion', numeric: false, disablePadding: false, label: 'Fecha actualización', position: 12, mostrar: false}
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
    contentLeft: {
        float: 'left'
    },
    contentRight: {
        float: 'right'
    },
    progress: {
        position: 'absolute',
        margin: 'auto',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
    },
});

class EnhancedTableHead extends React.Component {
    createSortHandler = property => event => {
        this.props.onRequestSort(event, property);
    };

    render() {
        const {order, orderBy} = this.props;
        return (
            <TableHead>
                <TableRow>
                    {columnData.map(column => {
                        if (column.mostrar) {
                            return (
                                <TableCell
                                    key={column.id}
                                    numeric={column.numeric}
                                    padding={column.disablePadding ? 'none' : 'default'}
                                    sortDirection={orderBy === column.id ? order : false}
                                >
                                    <Tooltip
                                        title="Sort"
                                        placement={column.numeric ? 'bottom-end' : 'bottom-start'}
                                        enterDelay={300}
                                    >
                                        <TableSortLabel
                                            active={orderBy === column.id}
                                            direction={order}
                                            onClick={this.createSortHandler(column.id)}
                                        >
                                            {column.label}
                                        </TableSortLabel>
                                    </Tooltip>
                                </TableCell>
                            );
                        }
                    }, this)}
                </TableRow>
            </TableHead>
        );
    }
}

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.string.isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};
EnhancedTableHead = withStyles(styles)(EnhancedTableHead);

const toolbarStyles = theme => ({
    root: {
        paddingRight: theme.spacing.unit,
    },
    toolBarStyle: {
        color: theme.palette.secondary.main,
        backgroundColor: theme.palette.primary.main,
        display: 'flex',
        flexWrap: 'wrap',
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
    const {classes, handleChangeCampo, nombreParticular, procedimiento, institucion} = props;
    return (
        <Toolbar className={classes.toolBarStyle}>
            <BusquedaParticular handleChangeCampo={handleChangeCampo}
                              nombreParticular={nombreParticular} dependencia={institucion}/>
        </Toolbar>
    );
};

EnhancedTableToolbar.propTypes = {
    classes: PropTypes.object.isRequired
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);


class EnhancedTable extends React.Component {

    componentDidMount() {
        this.handleSearchAPI('INI');
    }

    constructor(props) {
        super(props);
        this.state = {
            order: 'asc',
            orderBy: 'proveedor',
            selected: [],
            nombreParticular: '',
            data: [],
            filterData: [],
            page: 0,
            rowsPerPage: 10,
            open: false,
            elementoSeleccionado: {},
            institucion: '',
            loading: true,
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
        this.setState({page});
    };

    handleChangeRowsPerPage = event => {
        this.setState({rowsPerPage: event.target.value});
    };

    isSelected = id => this.state.selected.indexOf(id) !== -1;

    handleSearchAPI = (typeSearch) => {
        let {institucion, nombreProveedor} = this.state;
        let vUri = 'http://204.48.18.61/api/proveedores_sancionados?';
        let params = {};
        (institucion) ? params.dependencia = 'eq.' + institucion : null;
        (nombreProveedor) ? params.proveedor_o_contratista = 'like.*' + nombreProveedor.toUpperCase() + '*' : null;


         vUri = vUri + ((institucion) ? 'dependencia=eq.' + institucion + '&&' : '');
        vUri = vUri + ((nombreProveedor) ? 'proveedor_o_contratista=like.*' + nombreProveedor.toUpperCase() + '*' : '');

        let options = {
            uri: vUri,
            json: true
        };

        rp(options)
            .then(data => {
                let dataAux = data.map(item => {
                    return createData(item);
                });
                this.setState({filterData: dataAux, loading: false});
                typeSearch === 'INI' ? this.setState({data: dataAux}) : null;
            }).catch(err => {
            this.setState({loading: false});
            alert("_No se pudó obtener la información");
            console.log(err);
        });

    };

    handleChangeCampo = (varState, event) => {
        this.setState({loading: true, [varState]: event.target.value}, () => {
            this.handleSearchAPI('FILTER');
        });
    };

    render() {
        const {classes} = this.props;
        const {data, order, orderBy, selected, rowsPerPage, page, filterData} = this.state;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

        return (
            <div>
                <Paper>
                    <EnhancedTableToolbar handleChangeCampo={this.handleChangeCampo}
                                          nombreParticular={this.state.nombreParticular}
                                          data={filterData} columnas={columnData} institucion={this.state.institucion}/>
                    <div className={classes.tableWrapper}>
                        <DetalleParticular handleClose={this.handleClose} particular={this.state.elementoSeleccionado}
                                         control={this.state.open}/>
                        {
                            this.state.loading &&
                            <CircularProgress className={classes.progress} id="spinnerLoading" size={100}/>
                        }
                        <Table className={classes.table} aria-describedby="spinnerLoading"
                               aria-busy={this.state.loading} aria-labelledby="tableTitle">
                            <EnhancedTableHead
                                numSelected={selected.length}
                                order={order}
                                orderBy={orderBy}
                                onSelectAllClick={this.handleSelectAllClick}
                                onRequestSort={this.handleRequestSort}
                                rowCount={data.length}
                            />
                            <TableBody id="tableParticulares">

                                {filterData
                                    .sort(getSorting(order, orderBy))
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
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
                                                           padding="default">{n.proveedor}</TableCell>
                                                <TableCell>{n.dependencia}</TableCell>
                                                <TableCell>{n.expediente}</TableCell>
                                                <TableCell>{n.sentidoResolucion}</TableCell>
                                                <TableCell>{n.fechaNotificacion}</TableCell>
                                                <TableCell>{n.fechaResolucion}</TableCell>

                                            </TableRow>
                                        );
                                    })}
                                {emptyRows > 0 && (
                                    <TableRow style={{height: 49 * emptyRows}}>
                                        <TableCell colSpan={6}/>
                                    </TableRow>
                                )}

                            </TableBody>
                        </Table>
                        <div>
                            <div className={classes.contentLeft}>
                                <BajarCSV data={data} filtrado={false} columnas={columnData}/>
                                <BajarCSV data={filterData} filtrado={true} columnas={columnData}/>
                            </div>
                            <div  className={classes.contentRight}>
                                <TablePagination
                                    component="span"
                                    count={filterData.length}
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
                            </div>
                        </div>

                    </div>
                </Paper>
            </div>
        );
    }
}

EnhancedTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EnhancedTable);
