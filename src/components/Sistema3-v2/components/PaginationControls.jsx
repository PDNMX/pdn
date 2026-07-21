import { TablePagination } from '@mui/material';
import PropTypes from 'prop-types';

const PaginationControls = ({ pagination, onPageChange }) => {
  const { page, limit, totalItems } = pagination;

  const handleChangePage = (_event, newPage) => {
    onPageChange(newPage + 1); // +1 porque MUI usa paginación base-0
  };

  const handleChangeRowsPerPage = () => {
    // Si necesitas implementar el cambio de límite por página
    // onLimitChange(parseInt(event.target.value, 10));
  };

  return (
    <TablePagination
      component="div"
      count={totalItems}
      page={page - 1} // -1 porque MUI usa paginación base-0
      onPageChange={handleChangePage}
      rowsPerPage={limit}
      onRowsPerPageChange={handleChangeRowsPerPage}
      rowsPerPageOptions={[10]} // Por ahora solo permitimos 10 items por página
      labelDisplayedRows={({ from, to, count }) =>
        `${from}-${to} de ${count !== -1 ? count : `más de ${to}`}`
      }
      labelRowsPerPage="Registros por página:"
    />
  );
};

PaginationControls.propTypes = {
  pagination: PropTypes.shape({
    page: PropTypes.number.isRequired,
    limit: PropTypes.number.isRequired,
    totalItems: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    hasNextPage: PropTypes.bool.isRequired,
    hasPrevPage: PropTypes.bool.isRequired
  }).isRequired,
  onPageChange: PropTypes.func.isRequired
};

export default PaginationControls;
