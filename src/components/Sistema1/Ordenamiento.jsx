import React from 'react';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableSortLabel from '@mui/material/TableSortLabel';

import makeStyles from '@mui/styles/makeStyles';

const headCells = [
  { id: 'nombres', label: 'Nombre(s)' },
  { id: 'primerApellido', label: 'Primer Apellido' },
  { id: 'segundoApellido', label: 'Segundo Apellido' },
  { id: 'escolaridadNivel', label: 'Escolaridad Nivel' },
  { id: 'totalIngresosNetos', label: 'Total de Ingresos Netos' }
];

const cellsEmpleo = [
  { id: 'nombreEntePublico', label: 'Nombre del Ente Público' },
  { id: 'entidadFederativa', label: 'Entidad Federativa' },
  { id: 'municipioAlcaldia', label: 'Municipio/Alcaldía' },
  { id: 'empleoCargoComision', label: 'Empleo, Cargo o Comisión' },
  { id: 'nivelEmpleoCargoComision', label: 'Nivel del Empleo,Cargo o Comisión' }
];

const cellsInmuebles = [
  { id: 'nivelOrdenGobierno', label: 'Ámbito' },
  { id: 'superficieConstruccion', label: 'Superficie de Construcción' },
  { id: 'superficieTerreno', label: 'Superficie del Terreno' },
  { id: 'formaAdquisicion', label: 'Forma de Adquisición' },
  { id: 'valorAdquisicion', label: 'Valor de Adquisición' }
];

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%'
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2)
  },
  table: {
    minWidth: 750
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
  },
  title: {
    flex: '1 1 100%'
  }
}));

const Ordenamiento = ({ handleOrdenamiento, ordenamiento }) => {
  const classes = useStyles();

  return (
    <TableContainer>
      <Table aria-labelledby='tableTitle' size='small' aria-label='enhanced table'>
        <TableHead>
          <TableRow>
            {headCells.map(headCell => (
              <TableCell key={headCell.id} padding='none' sortDirection={ordenamiento[headCell.id]}>
                <TableSortLabel active={ordenamiento[headCell.id] ? true : false} direction={ordenamiento[headCell.id] ? ordenamiento[headCell.id] : 'asc'} onClick={e => handleOrdenamiento(e, headCell.id)}>
                  {headCell.label}
                  {ordenamiento[headCell.id] ? <span className={classes.visuallyHidden}>{ordenamiento[headCell.id] === 'desc' ? 'sorted descending' : 'sorted ascending'}</span> : null}
                </TableSortLabel>
              </TableCell>
            ))}
          </TableRow>
          <TableRow>
            {cellsEmpleo.map(headCell => (
              <TableCell key={headCell.id} padding='none' sortDirection={ordenamiento[headCell.id]}>
                <TableSortLabel active={ordenamiento[headCell.id] ? true : false} direction={ordenamiento[headCell.id] ? ordenamiento[headCell.id] : 'asc'} onClick={e => handleOrdenamiento(e, headCell.id)}>
                  {headCell.label}
                  {ordenamiento[headCell.id] ? <span className={classes.visuallyHidden}>{ordenamiento[headCell.id] === 'desc' ? 'sorted descending' : 'sorted ascending'}</span> : null}
                </TableSortLabel>
              </TableCell>
            ))}
          </TableRow>
          <TableRow>
            {cellsInmuebles.map(headCell => (
              <TableCell key={headCell.id} padding='none' sortDirection={ordenamiento[headCell.id]}>
                <TableSortLabel active={ordenamiento[headCell.id] ? true : false} direction={ordenamiento[headCell.id] ? ordenamiento[headCell.id] : 'asc'} onClick={e => handleOrdenamiento(e, headCell.id)}>
                  {headCell.label}
                  {ordenamiento[headCell.id] ? <span className={classes.visuallyHidden}>{ordenamiento[headCell.id] === 'desc' ? 'sorted descending' : 'sorted ascending'}</span> : null}
                </TableSortLabel>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
      </Table>
    </TableContainer>
  );
};
export default Ordenamiento;
