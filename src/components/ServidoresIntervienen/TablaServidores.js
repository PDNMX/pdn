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
import Grid from "@material-ui/core/Grid/Grid";
import Typography from "@material-ui/core/Typography/Typography";

let counter = 0;

let createData = (item) => {
    let tipoArea = item.area_requirente === 1 ? "REQUIRENTE" : "" +
    item.area_contratante === 1 ? "CONTRATANTE" : "" +
    item.area_recnica === 1 ? "TÉCNICA" : "" +
    item.area_responsable === 1 ? "RESPONSABLE" : "" +
    item.area_otra === 1 ? "OTRA" : "";
    let nivel = item.id_nivel === 1 ? "ATENCIÓN O TRAMITACIÓN" : item.id_nivel === 2 ? "RESOLUCIÓN" : "ATENCIÓN O TRAMITACIÓN Y RESOLUCIÓN";
    counter += 1;
    return {
        id: counter,
        servidor: item.nombre,
        institucion: item.institucion,
        puesto: item.puesto,
        tipoArea: tipoArea,
        contrataciones: item.id_procedimiento === 1 ? nivel : "",
        concesionesLicencias: item.id_procedimiento === 2 ? nivel : "",
        enajenacion: item.id_procedimiento === 3 ? nivel : "",
        dictamenes: item.id_procedimiento === 4 ? nivel : ""
    };
};

function getSorting(order, orderBy) {
    return order === 'desc'
        ? (a, b) => (b[orderBy] < a[orderBy] ? -1 : 1)
        : (a, b) => (a[orderBy] < b[orderBy] ? -1 : 1);
}

const columnData = [
    {id: 'servidor', numeric: false, disablePadding: false, label: 'Servidor público', position: 1, mostrar: true},
    {id: 'institucion', numeric: false, disablePadding: false, label: 'Institución', position: 2, mostrar: true},
    {id: 'puesto', numeric: false, disablePadding: false, label: 'Puesto', position: 3, mostrar: true},
    {id: 'tipoArea', numeric: false, disablePadding: false, label: 'Tipo de área', position: 4, mostrar: true},
    {id: 'contrataciones', numeric: false, disablePadding: false,label: 'Contrataciones públicas',position: 5,mostrar: false},
    {id: 'concesionesLicencias',numeric: false,disablePadding: false,label: 'Concesiones, licencias, permisos, autorizaciones y prórrogas',position: 6,mostrar: false},
    {id: 'enajenacion',numeric: false,disablePadding: false,label: 'Enajenación de bienes muebles',position: 7,mostrar: false},
    {id: 'dictamenes',numeric: false,disablePadding: false,label: 'Asignación y emisión de dictámenes de avalúos nacionales',position: 8,mostrar: false},
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
    container : {
        width : '100%',
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
    const {classes, handleChangeCampo, nombreServidor, procedimiento, institucion} = props;
    return (
        <Toolbar className={classes.toolBarStyle}>
            <div className={classes.toolBarFloat}>
                <BusquedaServidor handleChangeCampo={handleChangeCampo}
                                  nombreServidor={nombreServidor} procedimiento={procedimiento} institucion={institucion}/>
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
            institucion: '',
            loading: true,
            totalRows:0,
            filterDataAll : [],

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
        this.setState({page},()=>{
            this.handleSearchAPI('CHANGE_PAGE');
        });

    };

    handleChangeRowsPerPage = event => {
        this.setState({rowsPerPage: event.target.value} ,()=>{
            this.handleSearchAPI('FIELD_FILTER');
        });
    };

    isSelected = id => this.state.selected.indexOf(id) !== -1;

    getTotalRows=(URL)=>{
        let options = {
            uri : URL ? URL : 'https://204.48.18.61/api/reniresp?select=count=eq.exact',
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
        let {procedimiento, institucion, nombreServidor} = this.state;
        const URI = 'https://204.48.18.61/api/reniresp?';
        let vUri = URI+((typeSearch === 'FIELD_FILTER'||typeSearch==='CHANGE_PAGE') ?('limit='+this.state.rowsPerPage+'&&offset='+(this.state.rowsPerPage*this.state.page)+'&&'):'');

        vUri = vUri + ((procedimiento && procedimiento > 0) ? 'id_procedimiento=eq.' + procedimiento + '&&' : '');
        vUri = vUri + ((institucion) ? 'institucion=eq.' + institucion + '&&' : '');
        vUri = vUri + ((nombreServidor) ? 'nombre=like.*' + nombreServidor.toUpperCase() + '*' : '');

        if(typeSearch==='FIELD_FILTER')this.getTotalRows(vUri+'&&select=count=eq.exact');

        let options = {
            uri: typeSearch==='ALL'? URI : vUri,
            json: true
        };

        rp(options)
            .then(data => {
                let dataAux = data.map(item => {
                    return createData(item);
                });
                typeSearch === 'ALL' ? this.setState({data: dataAux, loading:false},()=>{
                    this.btnDownloadAll.triggerDown();
                }) : (typeSearch === 'FIELD_FILTER' || typeSearch === 'CHANGE_PAGE') ? this.setState({filterData: dataAux, loading: false}) :
                    this.setState({filterDataAll : dataAux, loading : false}, () => {
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
        console.log("Varstate: ",varState);
        console.log("Event: ",event);
        this.setState({loading: true, [varState]: event.target ? event.target.value : event.value}, () => {
            this.handleSearchAPI('FIELD_FILTER');
        });
    };

    render() {
        const {classes} = this.props;
        const {data, order, orderBy, selected, rowsPerPage, page, filterData,totalRows,filterDataAll} = this.state;
        // const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
        const emptyRows = rowsPerPage - filterData.length;

        return (
            <div className={classes.container}>
                <Paper>
                    <EnhancedTableToolbar categoria={this.state.categoria} handleChangeCampo={this.handleChangeCampo}
                                          nombreServidor={this.state.nombreServidor}
                                          procedimiento={this.state.procedimiento} data={filterData}
                                          columnas={columnData} institucion={this.state.institucion}/>
                    <div className={classes.tableWrapper}>
                        <DetalleServidor handleClose={this.handleClose} servidor={this.state.elementoSeleccionado}
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
                            <TableBody id="tableServidores">
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
                                                           padding="default">{n.servidor}</TableCell>
                                                <TableCell>{n.institucion}</TableCell>
                                                <TableCell>{n.puesto}</TableCell>
                                                <TableCell>{n.tipoArea}</TableCell>
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
                            <Grid item  md={3} xs={12}>
                                <BajarCSV innerRef = {comp => this.btnDownloadAll = comp} data = {data} filtrado = {false}
                                          columnas = {columnData} fnSearch = {this.handleSearchAPI} fileName = {'Servidores'}/>
                            </Grid>
                            <Grid item md={3} xs={12}>
                                <BajarCSV innerRef = {comp => this.child = comp} data = {filterDataAll} filtrado = {true}
                                          columnas = {columnData} fnSearch = {this.handleSearchAPI} fileName = {'Servidores'}/>
                            </Grid>
                            <Grid item md={6} xs={12}>
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
