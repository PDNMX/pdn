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
import rp from "request-promise";
import CircularProgress from '@material-ui/core/CircularProgress';
import BajarCSV from "./BajarCSV";
import BusquedaParticular from "./BusquedaParticular";
import DetalleParticular from "./DetalleParticular";
import Grid from "@material-ui/core/Grid/Grid";
import Typography from "@material-ui/core/Typography/Typography";

let counter = 0;

let createData = (item) => {
    counter += 1;
    let leyenda = "NO EXISTE DATO EN LA BASE DE DATOS SFP";
    return {
        id: counter,
        proveedor: item.proveedor_o_contratista ? item.proveedor_o_contratista : leyenda,
        dependencia: item.dependencia ? item.dependencia : leyenda,
        expediente: item.numero_de_expediente ? item.numero_de_expediente : leyenda,
        hechos: item.hechos_de_la_irregularidad ? item.hechos_de_la_irregularidad : leyenda,
        objetoSocial: item.objeto_social ? item.objeto_social : leyenda,
        sentidoResolucion: item.sentido_de_resolucion ? item.sentido_de_resolucion : leyenda,
        fechaNotificacion: item.fecha_de_notificacion ? item.fecha_de_notificacion : leyenda,
        fechaResolucion: item.fecha_de_resolucion ? item.fecha_de_resolucion : leyenda,
        plazo: item.plazo ? item.plazo :leyenda,
        monto: item.monto ? item.monto : leyenda,
        responsableInformacion: item.nombre_del_responsable_de_la_informacion ? item.nombre_del_responsable_de_la_informacion : leyenda,
        fechaActualizacion: item.fecha_de_actualizacion ? item.fecha_de_actualizacion : leyenda
    };
};

function getSorting(order, orderBy) {
    return order === 'desc'
        ? (a, b) => (b[orderBy] < a[orderBy] ? -1 : 1)
        : (a, b) => (a[orderBy] < b[orderBy] ? -1 : 1);
}

const columnData = [
    {
        id: 'proveedor',
        numeric: false,
        disablePadding: false,
        label: 'Proveedor o contratista',
        position: 1,
        mostrar: true
    },
    {id: 'dependencia', numeric: false, disablePadding: false, label: 'Dependencia', position: 2, mostrar: true},
    {
        id: 'expediente',
        numeric: false,
        disablePadding: false,
        label: 'Número de expediente',
        position: 3,
        mostrar: true
    },
    {
        id: 'hechos',
        numeric: false,
        disablePadding: false,
        label: 'Hechos de la irregularidad',
        position: 4,
        mostrar: false
    },
    {id: 'objetoSocial', numeric: false, disablePadding: false, label: 'Objeto social', position: 5, mostrar: false},
    {
        id: 'sentidoResolucion',
        numeric: false,
        disablePadding: false,
        label: 'Sentido de la resolución',
        position: 6,
        mostrar: true
    },
    {
        id: 'fechaNotificacion',
        numeric: false,
        disablePadding: false,
        label: 'Fecha notificación',
        position: 7,
        mostrar: false
    },
    {
        id: 'fechaResolucion',
        numeric: false,
        disablePadding: false,
        label: 'Fecha resolución',
        position: 8,
        mostrar: false
    },
    {id: 'plazo', numeric: false, disablePadding: false, label: 'Plazo', position: 9, mostrar: false},
    {id: 'monto', numeric: false, disablePadding: false, label: 'Monto', position: 10, mostrar: false},
    {
        id: 'responsableInformacion',
        numeric: false,
        disablePadding: false,
        label: 'Responsable de información',
        position: 11,
        mostrar: false
    },
    {
        id: 'fechaActualizacion',
        numeric: false,
        disablePadding: false,
        label: 'Fecha actualización',
        position: 12,
        mostrar: false
    }
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
        position: 'absolute',
        margin: 'auto',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
    },
    container: {
        width: '100%',
        borderRadius : '6px',
        display: 'flex',
        position : 'relative',
        marginTop : '30px',
        marginBottom : '30px',
        flexDirection : 'column',
    },
    tableHead : {
        color : theme.palette.primary.dark
    }
});

class EnhancedTableHead extends React.Component {
    createSortHandler = property => event => {
        this.props.onRequestSort(event, property);
    };

    render() {
        const {order, orderBy,classes} = this.props;
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
                                        title="Ordenar"
                                        placement={column.numeric ? 'bottom-end' : 'bottom-start'}
                                        enterDelay={300}
                                    >
                                        <TableSortLabel
                                            active={orderBy === column.id}
                                            direction={order}
                                            onClick={this.createSortHandler(column.id)}
                                        >
                                            <Typography className={classes.tableHead} variant={"body2"}>
                                                {column.label}
                                            </Typography>
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
        width : '100%',
        padding: theme.spacing.unit,
    },
    toolBarStyle: {
        backgroundColor : 'transparent',
        position : 'relative',
        padding : 0,
        margin: '0 15px',
        zIndex: 3,
        borderRadius : theme.spacing.unit,
    },
    toolBarFloat : {
        padding : '15px',
        marginTop : '-30px',
        borderRadius:  '3px',
        background : 'linear-gradient(60deg, #295c53, #8fe19f)',
        boxShadow : '0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 10px -5px rgb(41, 92, 83)',
        width : '100%',

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
    const {classes, handleChangeCampo, nombreParticular, institucion} = props;
    return (
        <Toolbar className={classes.toolBarStyle}>
            <div className={classes.toolBarFloat}>
            <BusquedaParticular handleChangeCampo={handleChangeCampo} nombreParticular={nombreParticular}
                                institucion={institucion}/>
            </div>
        </Toolbar>
    );
};

EnhancedTableToolbar.propTypes = {
    classes: PropTypes.object.isRequired
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);


class EnhancedTable extends React.Component {

    componentDidMount() {
        this.handleSearchAPI('FIELD_FILTER');
    }

    constructor(props) {
        super(props);
        this.child = React.createRef();
        this.btnDownloadAll = React.createRef();
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
            totalRows: 0,
            filterDataAll: []
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

    getTotalRows = (URL) => {
        let options = {
            uri : URL ? URL : 'https://plataformadigitalnacional.org/api/proveedores_sancionados?sentido_de_resolucion=like.*INHABILITACI%C3%93N*&&select=count=eq.exact',
            json : true
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
        let {institucion, nombreParticular} = this.state;
        const URI = 'https://plataformadigitalnacional.org/api/proveedores_sancionados?sentido_de_resolucion=like.*INHABILITACIÓN*&&';
        let vUri = URI + ((typeSearch === 'FIELD_FILTER'||typeSearch==='CHANGE_PAGE') ? ('limit=' + this.state.rowsPerPage + '&&offset=' + (this.state.rowsPerPage * this.state.page) + '&&'):'');

        vUri = vUri + ((institucion) ? 'dependencia=eq.' + institucion + '&&' : '');
        vUri = vUri + ((nombreParticular) ? 'proveedor_o_contratista=like.*' + nombreParticular.toUpperCase() + '*' : '');

        if(typeSearch==='FIELD_FILTER')this.getTotalRows(vUri+'&&select=count=eq.exact');

        let options = {
            uri: typeSearch === 'ALL' ? URI : vUri,
            json: true
        };
        rp(options)
            .then(data => {
                let dataAux = data.map(item => {
                    return createData(item);
                });
                typeSearch === 'ALL' ? this.setState({data: dataAux, loading:false}, () => {
                    this.btnDownloadAll.triggerDown();
                }) : (typeSearch === 'FIELD_FILTER' || typeSearch === 'CHANGE_PAGE') ? this.setState({filterData: dataAux, loading: false}) :
                    this.setState({filterDataAll: dataAux, loading: false}, () => {
                        this.child.triggerDown();
                    });
                return true;
            })
            .catch(err => {
                this.setState({loading: false});
                alert("_No se pudó obtener la información");
                console.log(err);
            });

    };

    handleChangeCampo = varState => event => {
        this.setState({loading: true, [varState]: event.target ? event.target.value : event.value}, () => {
            this.handleSearchAPI('FIELD_FILTER');
        });
    };


    render() {
        const {classes} = this.props;
        const {data, order, orderBy, selected, rowsPerPage, page, filterData, totalRows, filterDataAll} = this.state;
        const emptyRows = rowsPerPage - filterData.length;
        return (
            <div className={classes.container}>
                <Paper>
                    <EnhancedTableToolbar handleChangeCampo={this.handleChangeCampo}
                                          nombreParticular={this.state.nombreParticular}
                                          institucion={this.state.institucion}/>
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
                        <Grid container>
                            <Grid item md = {3} xs = {12}>
                                <BajarCSV innerRef={comp => this.btnDownloadAll = comp} data={data} filtrado = {false}
                                          columnas={columnData} fnSearch={this.handleSearchAPI} fileName={'Particulares inhabilitados'}/>
                            </Grid>
                            <Grid item md = {3} xs = {12}>
                                <BajarCSV innerRef={comp => this.child = comp} data={filterDataAll} filtrado = {true}
                                          columnas={columnData} fnSearch={this.handleSearchAPI} fileName = {'Particulares inhabilitados'}/>
                            </Grid>
                            <Grid item md = {6} xs = {12}>
                                <TablePagination
                                    component="span"
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
                            </Grid>
                        </Grid>


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
