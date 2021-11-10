import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@mui/styles/withStyles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import fileJSON from '../../data/csvjson';
import VerIcon from '@mui/icons-material/Launch';
import Busqueda from "./Busqueda";

let counter = 0;

function createData(institucion, abreviacion, unidadResponsable, registroBase, descripcion, url) {
    counter += 1;
    return {
        id: counter,
        institucion: institucion,
        abreviacion: abreviacion,
        unidadResponsable: unidadResponsable,
        registroBase: registroBase,
        descripcion: descripcion,
        url: url
    };
    //return item;
}

function getSorting(order, orderBy) {
    return order === 'desc'
        ? (a, b) => (b[orderBy] < a[orderBy] ? -1 : 1)
        : (a, b) => (a[orderBy] < b[orderBy] ? -1 : 1);
}

const columnData = [
    {id: 'institucion', numeric: false, disablePadding: false, label: 'Institución', position: 1},
    {id: 'abreviacion', numeric: false, disablePadding: false, label: 'Abreviatura', position: 2},
    {id: 'unidadResponsable', numeric: false, disablePadding: false, label: 'Unidad Responsable', position: 3},
    {id: 'registroBase', numeric: false, disablePadding: false, label: 'Registro Base', position: 4},
    {id: 'descipcripcion', numeric: false, disablePadding: false, label: 'Descripción', position: 5},
    {id: 'url', numeric: false, disablePadding: false, label: 'Consultar', position: 6}
];

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing(3),
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
        paddingRight: theme.spacing(1),
    },
    highlight:{
        color: theme.palette.secondary.main,
        backgroundColor: theme.palette.primary.main
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
});


let EnhancedTableToolbar = props => {
    const {classes,searchValue,handleSearch,campo,handleChangeCampo} = props;
    return (
        <Toolbar className={classes.highlight}>
            <Busqueda handleSearch={handleSearch} value={searchValue}
                      campo={campo} handleChangeCampo={handleChangeCampo}/>
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
                return createData(item.institucion, item.abreviacion, item.unidad_responsable, item.sistema_registro_base, item.descripcion, item.url_conjunto)
            }
        );

        this.state = {
            order: 'asc',
            orderBy: 'institucion',
            selected: [],
            searchValue: '',
            data: dataAux,
            filterData: dataAux,
            page: 0,
            rowsPerPage: 5,
            campo: 0
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

    handleClick = (event, id) => {
        const {selected} = this.state;
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
    };

    handleChangePage = (event, page) => {
        this.setState({page});
    };

    handleChangeRowsPerPage = event => {
        this.setState({rowsPerPage: event.target.value});
    };

    isSelected = id => this.state.selected.indexOf(id) !== -1;

    handleSearch = event => {
        const {data, campo, searchValue} = this.state;
        let filteredDatas = [];
        let x = event ? event.target.value : searchValue;
        const regex = new RegExp(x, 'gi');
        if (campo === 0) {
            filteredDatas = data.filter(e => {
                let mathesItems = Object.values(e);
                let retVal = false;
                mathesItems.some(e => {
                    if (typeof e === 'string') {
                        if (e.match(regex) != null && e.match(regex).length > 0) {
                            retVal = true
                            return retVal;
                        }
                    }
                    return retVal;
                });
                return retVal;
            });
        } else {
            filteredDatas = data.filter(e => {
                let mathesItems = Object.values(e);
                let retVal = false;
                let columnaBusqueda = mathesItems[campo];
                if (typeof columnaBusqueda === 'string') {
                    if (columnaBusqueda.match(regex) != null && columnaBusqueda.match(regex).length > 0) {
                        retVal = true
                    }
                }
                return retVal;
            });
        }

        if (event)
            this.setState({filterData: filteredDatas, searchValue: event.target.value})
        else
            this.setState({filterData: filteredDatas})
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
                <Paper className={classes.root}>
                    <EnhancedTableToolbar campo={this.state.campo} handleChangeCampo = {this.handleChangeCampo}
                        searchValue={this.state.searchValue} handleSearch={this.handleSearch}/>
                    <div className={classes.tableWrapper}>
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
                                                onClick={event => this.handleClick(event, n.id)}
                                                role="checkbox"
                                                aria-checked={isSelected}
                                                tabIndex={-1}
                                                key={n.id}
                                                selected={isSelected}
                                            >
                                                <TableCell component="th" scope="row" padding="normal">
                                                    {n.institucion}
                                                </TableCell>
                                                <TableCell>{n.abreviacion}</TableCell>
                                                <TableCell>{n.unidadResponsable}</TableCell>
                                                <TableCell>{n.registroBase}</TableCell>
                                                <TableCell>{n.descripcion}</TableCell>
                                                <TableCell>
                                                    <a href={n.url} target="_blank" rel="noopener noreferrer">
                                                        <Tooltip title="Ir a sitio">
                                                            <IconButton color="primary" className={classes.button} component="span" size="large">
                                                                <VerIcon/>
                                                            </IconButton>
                                                        </Tooltip>
                                                    </a>
                                                </TableCell>
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
                        onPageChange={this.handleChangePage}
                        onRowsPerPageChange={this.handleChangeRowsPerPage}
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
