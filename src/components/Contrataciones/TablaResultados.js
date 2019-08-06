import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
//import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
//import FormControlLabel from '@material-ui/core/FormControlLabel';
//import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import DownloadIcon from '@material-ui/icons/CloudDownload';
import FilterListIcon from '@material-ui/icons/FilterList';
import LinearIndeterminate from './LinearIndeterminate';
import ResponsiveDialog from './ResponsiveDialog';
/*
function desc(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function stableSort(array, cmp) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = cmp(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
    return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}*/

const headRows = [
    { id: 'col1', numeric: false, disablePadding: false, label: 'OCID' },
    { id: 'col2', numeric: false, disablePadding: true, label: 'Tipo' },
    { id: 'col3', numeric: false, disablePadding: false, label: 'Título' },
    { id: 'col4', numeric: false, disablePadding: false, label: 'Datos' },
    //{ id: 'col5', numeric: true, disablePadding: false, label: 'Protein (g)' },
];

function EnhancedTableHead(props) {
    const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;

    /*const createSortHandler = property => event => {
        onRequestSort(event, property);
    };*/

    return (
        <TableHead>
            <TableRow>
                {/*
                <TableCell padding="checkbox">
                    <Checkbox
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{ 'aria-label': 'select all desserts' }}
                    />
                </TableCell>
                */}
                {headRows.map(row => (
                    <TableCell
                        key={row.id}
                        align={row.numeric ? 'right' : 'left'}
                        padding={row.disablePadding ? 'none' : 'default'}
                        sortDirection={orderBy === row.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === row.id}
                            direction={order}
                            //onClick={createSortHandler(row.id)}
                        >
                            {row.label}
                            {orderBy === row.id ? (
                                <span className={classes.visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
    //onRequestSort: PropTypes.func.isRequired,
    //onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles(theme => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.85),
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
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
}));

const EnhancedTableToolbar = props => {
    const classes = useToolbarStyles();
    const { numSelected } = props;

    return (
        <Toolbar
            className={clsx(classes.root, {
                [classes.highlight]: numSelected > 0,
            })}
        >
            <div className={classes.title}>
                {numSelected > 0 ? (
                    <Typography color="inherit" variant="subtitle1">
                        {numSelected} selected
                    </Typography>
                ) : (
                    <Typography variant="h6" id="tableTitle">
                        Resultados
                    </Typography>
                )}
            </div>
            <div className={classes.spacer} />
            <div className={classes.actions}>
                {numSelected > 0 ? (
                    <Tooltip title="Delete">
                        <IconButton aria-label="delete">
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                ) : (
                    <Tooltip title="Filter list">
                        <IconButton aria-label="filter list">
                            <FilterListIcon />
                        </IconButton>
                    </Tooltip>
                )}
            </div>
        </Toolbar>
    );
};

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing(3),
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: '100%',
    },
    tableWrapper: {
        overflowX: 'auto',
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
}));

export default function EnhancedTable(props) {

    let rows = props.data.map( d => ({
        col1: d.ocid,
        col2: typeof d.tender.procurementMethod === 'undefined'? "Other": d.tender.procurementMethod,
        col3: d.contracts[0].title

    }));

    const classes = useStyles();
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    //responsive dialog
    const [open, setOpen] = React.useState(false);

    function handleCloseDialog(){
        setOpen(false);
    }

    function handleOpenDialog(event){
        setOpen(true);
    }

    /*
    function handleRequestSort(event, property) {
        const isDesc = orderBy === property && order === 'desc';
        setOrder(isDesc ? 'asc' : 'desc');
        setOrderBy(property);
    }*/

    /*
    function handleSelectAllClick(event) {
        if (event.target.checked) {
            const newSelecteds = rows.map(n => n.name);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    }*/

    /*
    function handleClick(event, name) {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
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

        setSelected(newSelected);
    }*/


    function handleChangePage(event, newPage) {
        setPage(newPage);
        props.handleChangePage(newPage);
    }

    function handleChangeRowsPerPage(event) {
        setRowsPerPage(+event.target.value);
        setPage(0);
        props.handleChangeRowsPerPage(+event.target.value)
    }


    const isSelected = name => selected.indexOf(name) !== -1;

    //const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
    const emptyRows = props.pagination.rowsPerPage - Math.min(props.pagination.rowsPerPage, props.pagination.total - page * props.pagination.rowsPerPage);

    return (
        <div className={classes.root}>
            {props.loading?<LinearIndeterminate/>:
                <Paper className={classes.paper}>
                    <EnhancedTableToolbar numSelected={selected.length}/>
                    <div className={classes.tableWrapper}>
                        <Table
                            className={classes.table}
                            aria-labelledby="tableTitle"
                            size={'small'}
                        >
                            <EnhancedTableHead
                                classes={classes}
                                numSelected={selected.length}
                                order={order}
                                orderBy={orderBy}
                                //onSelectAllClick={handleSelectAllClick}
                                //onRequestSort={handleRequestSort}
                                rowCount={rows.length}
                            />
                            <TableBody>
                                {rows.map((row, index) => {
                                    const isItemSelected = isSelected(row.col1);
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                    <TableRow
                                    hover
                                    onClick={event => handleOpenDialog(event)}
                                    //onClick={event => handleClick(event, row.name)}
                                    //role="checkbox"
                                    //aria-checked={isItemSelected}
                                    tabIndex={-1}
                                    key={row.col1}
                                    //selected={isItemSelected}
                                    >
                                    {/*<TableCell padding="checkbox">
                                            {
                                                <Checkbox
                                                    checked={isItemSelected}
                                                    inputProps={{ 'aria-labelledby': labelId }}
                                                />
                                            </TableCell>*/}
                                    <TableCell component="th" id={labelId} scope="row" padding="default">
                                    {row.col1}
                                    </TableCell>
                                    <TableCell align="left">{row.col2}</TableCell>
                                    <TableCell align="left">{row.col3}</TableCell>
                                    <TableCell align="left">
                                    <IconButton>
                                    <DownloadIcon/>
                                    </IconButton>
                                    </TableCell>
                                    {/*<TableCell align="right">{row.col5}</TableCell>*/}
                                    </TableRow>
                                    );
                                })}
                                {/*stableSort(rows, getSorting(order, orderBy))
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row, index) => {
                                        const isItemSelected = isSelected(row.col1);
                                        const labelId = `enhanced-table-checkbox-${index}`;

                                        return (
                                            <TableRow
                                                hover
                                                //onClick={event => handleClick(event, row.name)}
                                                //role="checkbox"
                                                //aria-checked={isItemSelected}
                                                tabIndex={-1}
                                                key={row.col1}
                                                //selected={isItemSelected}
                                            >
                                                <TableCell padding="checkbox">
                                            {
                                                <Checkbox
                                                    checked={isItemSelected}
                                                    inputProps={{ 'aria-labelledby': labelId }}
                                                />
                                            </TableCell>*
                                                <TableCell component="th" id={labelId} scope="row" padding="default">
                                                    {row.col1}
                                                </TableCell>
                                                <TableCell align="left">{row.col2}</TableCell>
                                                <TableCell align="left">{row.col3}</TableCell>
                                                <TableCell align="left">
                                                    <IconButton>
                                                        <DownloadIcon/>
                                                    </IconButton>
                                                </TableCell>
                                                <TableCell align="right">{row.col5}</TableCell>
                                            </TableRow>
                                        );
                                    })*/}
                                {emptyRows > 0 && (
                                    <TableRow style={{height: 49 * emptyRows}}>
                                        <TableCell colSpan={6}/>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={props.pagination.total}//{rows.length}
                        rowsPerPage={props.pagination.pageSize}//{rowsPerPage}
                        page={props.pagination.page}//{page}
                        backIconButtonProps={{
                            'aria-label': 'previous page',
                        }}
                        nextIconButtonProps={{
                            'aria-label': 'next page',
                        }}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                        labelRowsPerPage={"Registros por página:"}
                        labelDisplayedRows={({from, to, count}) => `${from}-${to} de ${count}`}
                    />
                </Paper>
            }
            <ResponsiveDialog open={open} handleCloseDialog={handleCloseDialog}/>
        </div>
    );
}
