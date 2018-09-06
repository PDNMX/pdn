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
import fileJSON from '../../data/servidorPublico';
import BusquedaServidor from "./BusquedaServidor";
import Typography from "@material-ui/core/Typography/Typography";
import BajarCSV from "./BajarCSV";
import DetalleServidor from "./DetalleServidor";

let counter = 0;

function createData(servidor, institucion,puesto,tipoArea,contrataciones,concesionesLicencias,enajenacion,dictamenes) {
    counter += 1;
    return {
        id: counter,
        servidor: servidor,
        institucion: institucion,
        puesto: puesto,
        tipoArea:tipoArea,
        contrataciones:contrataciones,
        concesionesLicencias:concesionesLicencias,
        enajenacion:enajenacion,
        dictamenes:dictamenes
    };
    //return item;
}

function getSorting(order, orderBy) {
    return order === 'desc'
        ? (a, b) => (b[orderBy] < a[orderBy] ? -1 : 1)
        : (a, b) => (a[orderBy] < b[orderBy] ? -1 : 1);
}

const columnData = [
    {id: 'servidor', numeric: false, disablePadding: false, label: 'Servidor público', position: 1,mostrar:true},
    {id: 'institucion', numeric: false, disablePadding: false, label: 'Institución', position: 2, mostrar:true},
    {id: 'puesto', numeric: false, disablePadding: false, label: 'Puesto', position: 3,mostrar:true},
    {id: 'tipoArea', numeric: false, disablePadding: false, label: 'Tipo de área', position: 4, mostrar:true},
    {id: 'contrataciones', numeric: false, disablePadding: false, label: 'Contrataciones públicas', position: 5,mostrar:false},
    {id: 'concesionesLicencias', numeric: false, disablePadding: false, label: 'Concesiones, licencias, permisos, autorizaciones y prórrogas', position: 6, mostrar:false},
    {id: 'enajenacion', numeric: false, disablePadding: false, label: 'Enajenación de bienes muebles', position: 7, mostrar:false},
    {id: 'dictamenes', numeric: false, disablePadding: false, label: 'Asignación y emisión de dictámenes de avalúos nacionales', position: 8,mostrar:false},
];

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
    },
    table: {
        minWidth: 1020,
    },
    tableWrapper: {
        overflowX: 'auto',
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
                        if(column.mostrar){
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
    toolBarStyle:{
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
    const {classes,searchValue,handleSearch,campo,handleChangeCampo,data,columnas} = props;
    return (
        <Toolbar className={classes.toolBarStyle}>
            <BusquedaServidor handleSearch={handleSearch} value={searchValue}
                      campo={campo} handleChangeCampo={handleChangeCampo}/>
            <Typography variant="title" color="inherit" className={classes.flex}>
            </Typography>
            <BajarCSV data={data} nombreArchivo={"Servidores públicos.csv"} columnas={columnas}/>
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
        let dataAux = fileJSON.map((item, key) => {
                return createData(item.SERVIDOR_PUBLICO, item.INSTITUCION, item.PUESTO,item.TIPO_AREA,item.CONTRATACIONES_PUBLICAS,item.CONCESIONES_LICENCIAS_PERMISOS_AUTORIZACIONES_PRORROGAS, item.ENAJENACION_DE_BIENES_MUEBLES,item.ASIGNACION_EMISION_DE_DICTAMENES_DE_AVALUOS_NACIONALES)
            }
        );

        this.state = {
            order: 'asc',
            orderBy: 'servidor',
            selected: [],
            searchValue: '',
            data: dataAux,
            filterData: dataAux,
            page: 0,
            rowsPerPage: 5,
            campo: 0,
            open: false,
            elementoSeleccionado: {}
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
        this.setState({ open: false });
    };


    handleClick = (event, elemento) => {
        this.setState({elementoSeleccionado: elemento});
        this.setState({ open: true });

        /*const {selected} = this.state;
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        this.setState({selected: newSelected});
        */
    };

    handleChangePage = (event, page) => {
        this.setState({page});
    };

    handleChangeRowsPerPage = event => {
        this.setState({rowsPerPage: event.target.value});
    };

    isSelected = id => this.state.selected.indexOf(id) !== -1;

    handleSearch = event => {
        let {data, campo} = this.state;
        let searchValue = event ? event.target.value : this.state.searchValue;
        const regex = new RegExp(searchValue, 'gi');
        // buscar en todos los campos
        let filteredDatas = data.filter(e => {
            if (campo === 0) {
                return Object.keys(e).some(k => regex.test(e[k]));
            } else {
                let key = Object.keys(e)[campo];
                return regex.test(e[key]);
            }
        });
        this.setState({filterData: filteredDatas, searchValue: event ? event.target.value : this.state.searchValue})
    };

    handleChangeCampo = event => {
        let valor = event.target.value;
        this.setState({campo: valor}, () => {
            if (this.state.searchValue)
                this.handleSearch();
        });

    };

    render() {
        const {classes} = this.props;
        const {data, order, orderBy, selected, rowsPerPage, page, filterData} = this.state;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

        return (
            <div>
                <Paper>
                    <EnhancedTableToolbar campo={this.state.campo} handleChangeCampo = {this.handleChangeCampo}
                                          searchValue={this.state.searchValue} handleSearch={this.handleSearch}
                                        data={filterData} columnas={columnData}/>
                    <div className={classes.tableWrapper}>
                        <DetalleServidor  handleClose={this.handleClose} servidor={this.state.elementoSeleccionado} control={this.state.open}/>
                        <Table className={classes.table} aria-labelledby="tableTitle">
                            <EnhancedTableHead
                                numSelected={selected.length}
                                order={order}
                                orderBy={orderBy}
                                onSelectAllClick={this.handleSelectAllClick}
                                onRequestSort={this.handleRequestSort}
                                rowCount={data.length}
                            />
                            <TableBody>
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
                                                <TableCell component="th" scope="row" padding="default">
                                                    {n.servidor}
                                                </TableCell>
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
                    </div>
                    <TablePagination
                        component="div"
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
                </Paper>
            </div>
        );
    }
}

EnhancedTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EnhancedTable);
