import { makeStyles } from 'tss-react/mui';
import Table from '@mui/material/Table'
import TableContainer from '@mui/material/TableContainer'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'

import Paper from '@mui/material/Paper'
import EnhancedTableToolbar from './EnhancedTableToolbar'
import EnhancedTableHead from './EnhancedTableHead'

const useStyles = makeStyles()(theme => ({
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
    color: theme.palette.text.black,
    backgroundColor: 'rgba(113,57,114,0.25)'
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
  const { classes } = useStyles()

  const handleClick = (event, data) => {
    handleDataSelect(data)
  }

  const handleKeyDown = (event, data) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      handleClick(event, data)
    }
  }

  return (
    <Paper className={classes.paper}>
      <EnhancedTableToolbar />
      <TableContainer>
        <Table className={classes.table} aria-labelledby='tableTitle' aria-label='enhanced table'>
          <EnhancedTableHead classes={classes} rowCount={pagination.totalRows} />
          <TableBody>
            {rows.map((row, index) => {
              const labelId = `enhanced-table-checkbox-${index}`
              const { tipo } = row.metadata ?? {}
              const { datosGenerales, datosEmpleoCargoComision } = row.declaracion?.situacionPatrimonial ?? {}
              const generales = datosGenerales ?? {}
              const empleo = datosEmpleoCargoComision ?? {}
              return (
                <TableRow
                  hover
                  onClick={event => handleClick(event, row)}
                  onKeyDown={event => handleKeyDown(event, row)}
                  tabIndex={0}
                  key={'row-' + index}
                >
                  <TableCell component='th' id={labelId} scope='row'>{row.metadata?.actualizacion?.split('T')[0]}</TableCell>
                  <TableCell>{generales.nombre} {generales.primerApellido} {generales.segundoApellido}</TableCell>
                  <TableCell>{tipo}</TableCell>
                  <TableCell>{empleo.nombreEntePublico}</TableCell>
                  <TableCell>
                    {empleo.areaAdscripcion}
                  </TableCell>
                  <TableCell>{empleo.empleoCargoComision}</TableCell>
                </TableRow>
              )
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
        slotProps={{
          actions: {
            previousButton: { 'aria-label': 'página anterior' },
            nextButton: { 'aria-label': 'siguiente página' }
          }
        }}
        labelDisplayedRows={({ from, to, count }) => from + '-' + (to === -1 ? count : to) + ' de ' + count}
        onPageChange={(e, page) => {
          handleSetPage(posicion, page)
        }}
        onRowsPerPageChange={e => {
          handleChangeRowsPerPage(e, posicion)
        }}
      />
    </Paper>
  )
}
