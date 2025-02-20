// Components/TablaResultados.jsx
import React, { useState } from 'react';
import { 
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Typography
} from '@mui/material';
import withStyles from '@mui/styles/withStyles';
import ContratacionDialog from './ContratacionDialog';
import { spanishProcurementMethod } from './TotalMonto';

const styles = theme => ({
  root: {
    background:'#e0f1f9cf',
    boxShadow: 'none',
    marginLeft: theme.spacing(3),
    marginBottom: theme.spacing(12),
  },
  tableContainer: {
    maxHeight: 440,
  },
  tableHead: {
    backgroundColor: '#ccc',
    '& th': {
      color: theme.palette.common.white,
      fontWeight: 'bold',
      background: 'linear-gradient(0deg, hsla(197, 58%, 53%, 1) 43%, hsl(196.83deg 57.68% 52.75%) 100%)',
    },
  },
  row: {
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
  },
  noDataMessage: {
    padding: theme.spacing(3),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }
});

const columns = [
  { id: 'id', label: 'ID Contratación', minWidth: 100 },
  { id: 'fecha', label: 'Fecha', minWidth: 100 },
  { id: 'tipo', label: 'Tipo', minWidth: 120 },
  { id: 'titulo', label: 'Título', minWidth: 170 },
  { id: 'monto', label: 'Monto', minWidth: 100, format: value => `$${value.toLocaleString('es-MX')}` },
];
const formatNumber = (value) => `$${value.toLocaleString('es-MX')}`;
const TablaResultados = ({ classes, selectedState, currentData }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedContract, setSelectedContract] = useState(null);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleRowClick = (contract) => {
    setSelectedContract(contract);
    setDialogOpen(true);
  };

  // Si no hay datos o si estamos en "todos", mostrar mensaje
  if (selectedState === 'todos' || !currentData || !currentData) {
    return (
      <Paper className={classes.root}>
        <Typography className={classes.noDataMessage}>
          Selecciona un estado para ver los contratos
        </Typography>
      </Paper>
    );
  }

  const contratos = currentData || [];

  // Si no hay contratos en el estado seleccionado
  if (contratos.length === 0) {
    return (
      <Paper className={classes.root}>
        <Typography className={classes.noDataMessage}>
          No hay contratos disponibles para el estado seleccionado
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.tableContainer}>
        <Table stickyHeader>
          <TableHead>
            <TableRow className={classes.tableHead}>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {contratos
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow 
                  hover 
                  key={row.id} 
                  className={classes.row}
                  onClick={() => handleRowClick(row)}
                >
                  <TableCell>
                    {row.id} 
                  </TableCell>
                  <TableCell>
                    {row.date} 
                  </TableCell>
                  <TableCell>
                    {spanishProcurementMethod[row.tender.procurementMethod]} 
                  </TableCell>
                  <TableCell>
                    {row.tender.title} 
                  </TableCell>
                  <TableCell>
                    {(!row.contracts || row.contracts.length === 0) ? "Sin contratos" : formatNumber(row.contracts.reduce((acc, contract) => acc + contract.value.amount, 0))}  
                  </TableCell>
                  {/* {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id}>
                        {column.format && value != null ? column.format(value) : value}
                      </TableCell>
                    );
                  })} */}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={contratos.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Registros por página:"
        labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
      />
      <ContratacionDialog
        open={dialogOpen}
        handleClose={() => setDialogOpen(false)}
        data={selectedContract}
      />
    </Paper>
  );
};

export default withStyles(styles)(TablaResultados);