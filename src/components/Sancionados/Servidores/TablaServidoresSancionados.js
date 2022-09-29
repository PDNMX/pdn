import React from 'react';
import withStyles from '@mui/styles/withStyles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableFooter from '@mui/material/TableFooter';
import Grid from '@mui/material/Grid';
import { Button, Typography } from '@mui/material';
import TableHead from '@mui/material/TableHead';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const columnData = [
  { id: 'expediente', label: 'Expediente' },
  { id: 'servidorPublico.nombreCompleto', label: 'Servidor público' },
  { id: 'institucion.nombre', label: 'Institución/Dependencia' },
  { id: 'tipoSancion', label: 'Tipo sanción' }
];

const styles = theme => ({
  tablePagination: {
    overflowX: 'auto',
    fontSize: '0.75rem',
    color: theme.palette.greyColor,
    backgroundColor: theme.palette.background.tableBody
  },
  gridTable: {
    marginBottom: theme.spacing(3),
    padding: theme.spacing(1),
    maxWidth: '1200px'
  },
  container1: {
    display: 'table',
    tableLayout: 'fixed',
    width: '100%',
    maxWidth: '1200px',
    overflowX: 'auto',
    padding: theme.spacing(1)
  },
  container2: {
    display: 'tableCell',
    overflowX: 'auto',
    width: '100%'
  },
  tableHead: {
    color: theme.palette.text.main,
    backgroundColor: theme.palette.background.default
  },
  row: {
    cursor: 'pointer'
  },
  tableBody: {
    backgroundColor: theme.palette.background.tableBody
  },
  buttonBack: {
    padding: theme.spacing(1),
    fontWeight: 'bold',
    marginBottom: theme.spacing(1)
  }
});

function TablaServidoresSancionados({ classes, info, verDetalle, handleChangeRowsPerPage, handleChangePage, returnToPrevios }) {
  const {
    results: data,
    pagination: { page, totalRows, pageSize: rowsPerPage }
  } = info;

  return (
    <div>
      <Grid container justifyContent='center' spacing={0} className={classes.gridTable} id={'containerTest'}>
        <Grid item xs={12}>
          {data && data.length > 0 && (
            <Typography variant={'h6'} color={'primario.contrastText'}>
              Pulsa sobre el registro para ver su detalle
              <br />
            </Typography>
          )}
        </Grid>
        <Grid item xs={12} textAlign={'right'}>
          <Button startIcon={<ArrowBackIcon />} onClick={() => returnToPrevios()} color='secundario' className={classes.buttonBack}>
            Regresar
          </Button>
        </Grid>
        <Grid item xs={12} className={classes.container1} id={'hack1'}>
          <div className={classes.container2} id={'hack2'}>
            {data && data.length > 0 && (
              <Table>
                <TableHead className={classes.tableHead}>
                  <TableRow>
                    {columnData.map(column => {
                      return (
                        <TableCell key={column.id}>
                          <Typography color={'primario.contrastText'} variant={'body1'}>
                            {column.label}
                          </Typography>
                        </TableCell>
                      );
                    })}
                  </TableRow>
                </TableHead>
                <TableBody className={classes.tableBody}>
                  {data.map(n => {
                    return (
                      <TableRow hover onClick={event => verDetalle(event, n)} role='checkbox' tabIndex={-1} key={n.id} className={classes.row}>
                        <TableCell component='th' scope='row' padding='normal'>
                          {n.expediente}
                        </TableCell>
                        <TableCell>{n.servidorPublicoSancionado.nombres + ' ' + n.servidorPublicoSancionado.primerApellido + ' ' + n.servidorPublicoSancionado.segundoApellido}</TableCell>
                        <TableCell>{n.institucionDependencia.nombre}</TableCell>
                        <TableCell style={{ width: '25%' }}>{n.tipoSancion.map(e => e.valor).join(', ')}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TablePagination
                      className={classes.tablePagination}
                      sx={{
                        '.MuiTablePagination-select': {
                          color: '#666666'
                        }
                      }}
                      colSpan={4}
                      count={totalRows}
                      rowsPerPage={rowsPerPage}
                      page={page - 1}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                      labelRowsPerPage='Registros por página'
                      labelDisplayedRows={({ from, to, count }) => {
                        return `${from}-${to} de ${count}`;
                      }}
                      rowsPerPageOptions={[10, 25, 50]}
                    />
                  </TableRow>
                </TableFooter>
              </Table>
            )}
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default withStyles(styles)(TablaServidoresSancionados);
