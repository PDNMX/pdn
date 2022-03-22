import PropTypes from 'prop-types';
import TableHead from '@mui/material/TableHead';
import Typography from '@mui/material/Typography';
import { TableCell, TableRow } from '@mui/material';

const headCells = [
  { id: 'nombre', numeric: false, disablePadding: false, label: 'NOMBRE' },
  {
    id: 'institucion',
    numeric: false,
    disablePadding: false,
    label: 'INSTITUCIÓN'
  },
  { id: 'area', numeric: false, disablePadding: false, label: 'ÁREA' },
  { id: 'cargo', numeric: false, disablePadding: false, label: 'CARGO' }
];

const EnhancedTableHead = props => {
  const { classes, order, orderBy } = props;
  // const { classes, order, orderBy, onRequestSort } = props;
  // const createSortHandler = property => event => {
  //   onRequestSort(event, property);
  // };

  return (
    <TableHead className={classes.tableHead}>
      <TableRow>
        {headCells.map(headCell => (
          <TableCell key={headCell.id} align={headCell.numeric ? 'right' : 'left'} padding={headCell.disablePadding ? 'none' : 'normal'} sortDirection={orderBy === headCell.id ? order : false}>
            {/* <TableSortLabel active={orderBy === headCell.id} direction={order} onClick={createSortHandler(headCell.id)}> */}
            {/* {headCell.label} */}
            {/* {orderBy === headCell.id ? <span className={classes.visuallyHidden}>{order === 'desc' ? 'sorted descending' : 'sorted ascending'}</span> : null} */}
            {/* </TableSortLabel> */}
            <Typography color={'primario.contrastText'} variant={'body1'}>
              {headCell.label}
            </Typography>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired
};

export default EnhancedTableHead;
