import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

import Paper from '@mui/material/Paper';
/* import EnhancedTableToolbar from '../../../Declaraciones2/Tabla/EnhancedTableToolbar'; */
import EnhancedTableHead from '../../../Declaraciones2/Tabla/EnhancedTableHead';

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
}

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3)
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2)
  },
  table: {
    minWidth: 750
  },
  tableHead: {
    color: theme.palette.text.main,
    backgroundColor: theme.palette.background.default
  },
  tableWrapper: {
    overflowX: 'auto'
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
    width: 1
  }
}));

export default function EnhancedTable({ rows, pagination, posicion, handleDataSelect, handleSetPage, handleChangeRowsPerPage }) {
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('nombres');

  const handleRequestSort = (event, property) => {
    const isDesc = orderBy === property && order === 'desc';
    setOrder(isDesc ? 'asc' : 'desc');
    setOrderBy(property);
  };

  const handleClick = (event, data) => {
    handleDataSelect(data);
  };

  return (
    <Paper className={classes.paper}>
      {/* <EnhancedTableToolbar /> */}
      <TableContainer>
        <Table className={classes.table} aria-labelledby='tableTitle' aria-label='enhanced table'>
          <EnhancedTableHead classes={classes} order={order} orderBy={orderBy} onRequestSort={handleRequestSort} rowCount={pagination.totalRows} />
          <TableBody>
            {stableSort(rows, getSorting(order, orderBy)).map((row, index) => {
              const labelId = `enhanced-table-checkbox-${index}`;
              const { datosGenerales, datosEmpleoCargoComision } = row.declaracion.situacionPatrimonial;
              return (
                <TableRow sx={{cursor: 'pointer'}} hover onClick={event => handleClick(event, row)} tabIndex={-1} key={row.nombre + '-' + index}>
                  <TableCell component='th' id={labelId} scope='row'>
                    {datosGenerales.nombre} {datosGenerales.primerApellido} {datosGenerales.segundoApellido}
                  </TableCell>
                  <TableCell>{datosEmpleoCargoComision.nombreEntePublico}</TableCell>
                  <TableCell>
                    {datosEmpleoCargoComision.areaAdscripcion}
                    {/* {row.metadata.tipo} */}
                  </TableCell>
                  <TableCell>{datosEmpleoCargoComision.empleoCargoComision}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component='div'
        labelRowsPerPage='Registros por pagina:'
        count={pagination.totalRows}
        rowsPerPage={pagination.pageSize}
        rowsPerPageOptions={[5, 10, 50, 100, 150, 200]}
        page={pagination.page - 1}
        backIconButtonProps={{
          'aria-label': 'página anterior'
        }}
        nextIconButtonProps={{
          'aria-label': 'siguiente página'
        }}
        labelDisplayedRows={({ from, to, count }) => from + '-' + (to === -1 ? count : to) + ' de ' + count}
        onPageChange={(e, page) => {
          handleSetPage(posicion, page);
        }}
        onRowsPerPageChange={e => {
          handleChangeRowsPerPage(e, posicion);
        }}
      />
    </Paper>
  );
}
