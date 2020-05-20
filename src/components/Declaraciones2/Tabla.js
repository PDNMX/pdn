import React from "react";
import PropTypes from "prop-types";
import { lighten, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableContainer from "@material-ui/core/TableContainer";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

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
  return stabilizedThis.map((el) => el[0]);
}

function getSorting(order, orderBy) {
  return order === "desc"
    ? (a, b) => desc(a, b, orderBy)
    : (a, b) => -desc(a, b, orderBy);
}

const headCells = [
  { id: "nombre", numeric: false, disablePadding: false, label: "NOMBRE" },
  {
    id: "institucion",
    numeric: false,
    disablePadding: false,
    label: "INSTITUCIÓN",
  },
  { id: "area", numeric: false, disablePadding: false, label: "ÁREA" },
  { id: "cargo", numeric: false, disablePadding: false, label: "CARGO" },
];

function EnhancedTableHead(props) {
  const { classes, order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "default"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={order}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
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
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: "1 1 100%",
    color: "#56a3bf",
  },
}));

const EnhancedTableToolbar = () => {
  const classes = useToolbarStyles();

  return (
    <Toolbar>
      <Typography className={classes.title} variant="h6" id="tableTitle">
        Pulsa sobre el registro para ver su detalle
      </Typography>
    </Toolbar>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  tableWrapper: {
    overflowX: "auto",
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
}));

export default function EnhancedTable({
  rows,
  pagination,
  posicion,
  handleDataSelect,
  handleSetPage,
  handleChangeRowsPerPage,
}) {
  const classes = useStyles();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("nombres");

  const handleRequestSort = (event, property) => {
    const isDesc = orderBy === property && order === "desc";
    setOrder(isDesc ? "asc" : "desc");
    setOrderBy(property);
  };

  const handleClick = (event, data) => {
    handleDataSelect(data);
  };

  return (
    <Paper className={classes.paper}>
      <EnhancedTableToolbar />
      <TableContainer>
        <Table
          className={classes.table}
          aria-labelledby="tableTitle"
          aria-label="enhanced table"
        >
          <EnhancedTableHead
            classes={classes}
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            rowCount={pagination.totalRows}
          />
          <TableBody>
            {stableSort(rows, getSorting(order, orderBy)).map((row, index) => {
              const labelId = `enhanced-table-checkbox-${index}`;
              const {
                datosGenerales,
                datosEmpleoCargoComision,
              } = row.declaracion.situacionPatrimonial;
              return (
                <TableRow
                  hover
                  onClick={(event) => handleClick(event, row)}
                  tabIndex={-1}
                  key={row.nombre + "-" + index}
                >
                  <TableCell component="th" id={labelId} scope="row">
                    {datosGenerales.nombre} {datosGenerales.primerApellido}{" "}
                    {datosGenerales.segundoApellido}
                  </TableCell>
                  <TableCell>
                    {datosEmpleoCargoComision.nombreEntePublico}
                  </TableCell>
                  <TableCell>
                    {datosEmpleoCargoComision.areaAdscripcion}
                  </TableCell>
                  <TableCell>
                    {datosEmpleoCargoComision.empleoCargoComision}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        labelRowsPerPage="Registros por pagina:"
        count={pagination.totalRows}
        rowsPerPage={pagination.pageSize}
        rowsPerPageOptions={[5, 10, 50, 100, 150, 200]}
        page={pagination.page - 1}
        backIconButtonProps={{
          "aria-label": "página anterior",
        }}
        nextIconButtonProps={{
          "aria-label": "siguiente página",
        }}
        labelDisplayedRows={({ from, to, count }) =>
          from + "-" + (to === -1 ? count : to) + " de " + count
        }
        onChangePage={(e, page) => {
          handleSetPage(posicion, page);
        }}
        onChangeRowsPerPage={(e) => {
          handleChangeRowsPerPage(e, posicion);
        }}
      />
    </Paper>
  );
}
