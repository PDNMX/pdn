import PropTypes from 'prop-types'
import { withStyles } from 'tss-react/mui';
import {
  Table,
  TableBody,
  TableCell,
  TablePagination,
  TableRow,
  TableFooter,
  TableHead,
  Grid,
  Typography,
  Button
} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

const columnData = [
  { id: 'proveedor', label: 'Proveedor o contratista' },
  { id: 'institucion', label: 'Institución' },
  { id: 'expediente', label: 'Número de expediente' },
  { id: 'sentidoResolucion', label: 'Sentido de la resolución' }
]
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
    backgroundColor: theme.palette.primary.main
  },
  row: {
    cursor: 'pointer'
  },
  tableBody: {
    backgroundColor: theme.palette.background.default
  },
  buttonBack: {
    padding: theme.spacing(1),
    fontWeight: 'bold',
    marginBottom: theme.spacing(1)
  }
});

function TablaParticularesSancionados ({
  classes,
  data,
  rowsPerPage,
  page,
  totalRows,
  nivel,
  verDetalle,
  handleChangeRowsPerPage,
  handleChangePage,
  returnToPrevios
}) {
  return (
    <div>
      <Grid container spacing={0} className={classes.gridTable} sx={{
        justifyContent: 'center'
      }}>
        <Grid className={classes.section} size={12}>
          {data && data.length > 0 &&
            <Typography variant='h6' sx={{
              color: 'primary.main'
            }}>Pulsa sobre el registro para ver su
              detalle<br />
            </Typography>}
        </Grid>
        <Grid size={12} sx={{
          textAlign: 'right'
        }}>
          <Button
            startIcon={<ArrowBackIcon />} onClick={() => returnToPrevios()}
            color='primary' className={classes.buttonBack}
          >
            Regresar
          </Button>
        </Grid>
        <Grid className={classes.container1} size={12}>
          <div className={classes.container2}>
            {data && data.length > 0 &&
              <Table>
                <TableHead className={classes.tableHead}>
                  <TableRow>
                    {
                                        columnData.map(column => {
                                          return (
                                            <TableCell key={column.id}>
                                              <Typography
                                                variant='body1'
                                                sx={{
                                                  color: 'text.clear'
                                                }}
                                              >
                                                {column.label}
                                              </Typography>
                                            </TableCell>
                                          );
                                        })
                                    }
                  </TableRow>
                </TableHead>
                <TableBody className={classes.tableBody}>
                  {data
                    .map(n => {
                      return (
                          <TableRow
                              hover
                              onClick={event => verDetalle(event, n)}
                              role='checkbox'
                              tabIndex={-1}
                              key={n.id}
                              className={classes.row}
                            >
                              <TableCell
                                  component='th' scope='row' style={{ width: '25%' }}
                                  padding='normal'
                                >{n.particularSancionado.nombreRazonSocial}
                                </TableCell>
                              <TableCell>{n.institucionDependencia.nombre}</TableCell>
                              <TableCell>{n.expediente}</TableCell>
                              <TableCell>{n.resolucion.sentido}</TableCell>
                            </TableRow>
                      );
                    })}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TablePagination
                        className={classes.tablePagination}
                        sx={{
                            ".MuiTablePagination-select": {
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
                            return `${from}-${to} de ${count}`
                          }}
                        rowsPerPageOptions={[10, 25, 50]}
                      />
                  </TableRow>
                </TableFooter>
              </Table>}
          </div>

        </Grid>

        <Grid className={classes.section} size={12}>
          {
                        nivel !== 'estatal' &&
                          <Typography variant='caption' style={{ fontStyle: 'italic' }}>Nota:
                            Este buscador mostrará en su primera etapa, solamente datos de carácter público,
                            proporcionados por la Secretaría de la Función Pública, relativos a
                            sanciones impuestas a personas físicas o morales, por infracciones a la Ley de
                            Adquisiciones, Arrendamientos y Servicios del Sector Público, Ley de
                            Obras Públicas y Servicios Relacionados con las Mismas, y Ley de Asociaciones Público
                            Privadas.
                          </Typography>
                    }
        </Grid>
      </Grid>
    </div>
  );
}

TablaParticularesSancionados.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  totalRows: PropTypes.number.isRequired,
  nivel: PropTypes.string.isRequired
}

export default withStyles(TablaParticularesSancionados, styles);
