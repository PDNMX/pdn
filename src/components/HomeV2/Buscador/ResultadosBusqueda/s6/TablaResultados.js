import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
//import TableSortLabel from '@mui/material/TableSortLabel';

import Paper from '@mui/material/Paper';
import LinearIndeterminate from '../../../../Sistema6/LinearIndeterminate';
import ResponsiveDialog from '../../../../Sistema6/ResponsiveDialog';

const headRows = [
    { id: 'col1', numeric: false, disablePadding: false, label: 'OCID' },
    { id: 'col2', numeric: false, disablePadding: false, label: 'Fecha' },
    { id: 'col3', numeric: false, disablePadding: false, label: 'Tipo' },
    { id: 'col4', numeric: false, disablePadding: false, label: 'Título' },
    { id: 'col5', numeric: false, disablePadding: false, label: 'Monto' },
];

function EnhancedTableHead(props) {
    const {
        classes,
        //onSelectAllClick,
        order, orderBy,
        //numSelected, rowCount, onRequestSort
    } = props;

    return (
        <TableHead className={classes.tableHead}>
            <TableRow sx={{}}>
                {headRows.map(row => (
                    <TableCell
                        key={row.id}
                        align={row.numeric ? 'right' : 'left'}
                        padding={row.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === row.id ? order : false}
                        sx={{color: "#E1E8EB"}}
                    >
                        {row.label}
                        {orderBy === row.id ? (
                            <span className={classes.visuallyHidden}>
                                {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                            </span>
                        ) : null}
                        {/*</TableSortLabel>*/}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    //numSelected: PropTypes.number.isRequired,
    //onRequestSort: PropTypes.func.isRequired,
    //onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    //rowCount: PropTypes.number.isRequired,
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
    tableHead: {
        background: theme.palette.primario.main
    },
    tsl:{
        color: theme.palette.text.main
    }
}));

export default function EnhancedTable(props) {

    let getProcurementMethod = method => {
        let m = method;

        if (typeof method === 'undefined' || method === null){
            m = ""
        }

        m = m.toLowerCase();

        switch (m) {
            case "open":
                return "Licitación pública";
            case "direct":
                return "Adjudicación directa";
            case "selective":
                return "Invitación a tres";
            case "":
                return "En proceso";
            default:
                return m
        }
    };

    let rows = props.data.map( d => {

        let total = 0;

        try {
            for (let c of d.contracts) {
                try {
                    total += c.value.amount;
                } catch (e) {
                    //ignore exception
                }
            }
        } catch (e) {
            console.log(e);
            total = "No disponible"
        }

        let date = "";

        try {
            date = new Date(d.date).toLocaleDateString('es-MX');
        } catch (e){
            console.log(e);
            date = "No disponible";
        }

        date = date.toLowerCase() === "invalid date" ? d.cycle: date;

        return {
            col1: d.ocid,
            col2: date,
            col3: getProcurementMethod(d.tender.procurementMethod),
            col4: d.tender.title,
            col5: total === "No disponible"? total :  new Intl.NumberFormat('es-MX', {style: 'currency', currency: 'MXN'}).format(total)
        }
    });

    const classes = useStyles();
    // const [order, setOrder] = React.useState('asc');
    // const [orderBy, setOrderBy] = React.useState('calories');
    const order="asc";
    const orderBy="calories";
    //const [selected, setSelected] = React.useState([]);
    //const [page, setPage] = React.useState(0);
    //const [rowsPerPage, setRowsPerPage] = React.useState(10);

    //responsive dialog
    const [open, setOpen] = React.useState(false);
    const [dialogData, setDialogData] = React.useState(null);

    function handleCloseDialog(){
        setOpen(false);
    }

    function handleOpenDialog(event, index){
        setOpen(true);
        setDialogData(props.data[index]);
    }

    function handleChangePage(event, newPage) {
        //setPage(newPage);
        props.handleChangePage(newPage);
    }

    function handleChangeRowsPerPage(event) {
        //setRowsPerPage(+event.target.value);
        //setPage(0);
        props.handleChangeRowsPerPage(+event.target.value)
    }


    //const isSelected = name => selected.indexOf(name) !== -1;
    //const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
    const {page, total, pageSize} = props.pagination;
    const emptyRows = pageSize - Math.min(pageSize, total - page * pageSize);

    return (
        <div className={classes.root}>
            {props.loading?<LinearIndeterminate/>:
                <Paper className={classes.paper}>
                    {/* {console.log(total)} */}
                    {total > 0 ? (
                        <>
                            <div className={classes.tableWrapper}>
                            <Table
                                className={classes.table}
                                aria-labelledby="tableTitle"
                                size={'medium'}
                            >
                                <EnhancedTableHead
                                    classes={classes}
                                    //numSelected={selected.length}
                                    order={order}
                                    orderBy={orderBy}
                                    //onSelectAllClick={handleSelectAllClick}
                                    //onRequestSort={handleRequestSort}
                                    rowCount={rows.length}
                                />
                                <TableBody>
                                    {rows.map((row, index) => {
                                        //const isItemSelected = isSelected(row.col1);
                                        const labelId = `enhanced-table-checkbox-${index}`;

                                        return (
                                            <TableRow
                                                hover
                                                onClick={event => handleOpenDialog(event, index)}
                                                tabIndex={-1}
                                                key={row.col1}
                                                sx={{cursor: 'pointer'}}
                                            >
                                                <TableCell component="th" id={labelId} scope="row" padding="normal">
                                                    {row.col1}
                                                </TableCell>
                                                <TableCell align="left">{row.col2}</TableCell>
                                                <TableCell align="left">{row.col3}</TableCell>
                                                <TableCell align="left">{row.col4}</TableCell>
                                                <TableCell align="left">{row.col5}</TableCell>
                                            </TableRow>
                                        );
                                    })}
                                    {emptyRows > 0 && (
                                        <TableRow style={{height: 49 * emptyRows}}>
                                            <TableCell colSpan={4}/>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                        <TablePagination
                            sx={{
                                ".MuiTablePagination-select": {
                                    color: '#666666'
                                }
                            }}
                            rowsPerPageOptions={[5, 10, 25]}
                            component="div"
                            count={total}//{rows.length}
                            rowsPerPage={pageSize}//{rowsPerPage}
                            page={page}//{page}
                            backIconButtonProps={{
                                'aria-label': 'previous page',
                            }}
                            nextIconButtonProps={{
                                'aria-label': 'next page',
                            }}
                            onPageChange={handleChangePage}
                            //onChangePage={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            //onChangeRowsPerPage={handleChangeRowsPerPage}
                            labelRowsPerPage={"Registros por página:"}
                            labelDisplayedRows={({from, to, count}) => `${from}-${to} de ${count}`}
                        />
                        </>
                    ) : (<></>)}
                </Paper>
            }
            <ResponsiveDialog open={open} handleCloseDialog={handleCloseDialog} data ={dialogData}/>
        </div>
    );
}
