import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';

// function createData(name, calories, fat, carbs, protein) {
// 	return { name, calories, fat, carbs, protein };
// }

// const rows = [
// 	createData('Cupcake', 305, 3.7, 67, 4.3),
// 	createData('Donut', 452, 25.0, 51, 4.9),
// 	createData('Eclair', 262, 16.0, 24, 6.0),
// 	createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
// 	createData('Gingerbread', 356, 16.0, 49, 3.9),
// 	createData('Honeycomb', 408, 3.2, 87, 6.5),
// 	createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
// 	createData('Jelly Bean', 375, 0.0, 94, 0.0),
// 	createData('KitKat', 518, 26.0, 65, 7.0),
// 	createData('Lollipop', 392, 0.2, 98, 0.0),
// 	createData('Marshmallow', 318, 0, 81, 2.0),
// 	createData('Nougat', 360, 19.0, 9, 37.0),
// 	createData('Oreo', 437, 18.0, 63, 4.0)
// ];

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
	const stabilizedThis = array.map((el, index) => [ el, index ]);
	stabilizedThis.sort((a, b) => {
		const order = cmp(a[0], b[0]);
		if (order !== 0) return order;
		return a[1] - b[1];
	});
	return stabilizedThis.map((el) => el[0]);
}

function getSorting(order, orderBy) {
	return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

const headCells = [
	{ id: 'nombres', numeric: false, disablePadding: false, label: 'NOMBRE' },
	{ id: 'institucion', numeric: false, disablePadding: false, label: 'INSTITUCIÓN' },
	{ id: 'cargo', numeric: false, disablePadding: false, label: 'CARGO' },
	{ id: 'estado', numeric: false, disablePadding: false, label: 'ESTADO' },
	{ id: 'municipio', numeric: false, disablePadding: false, label: 'MUNICIPIO' }
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
						align={headCell.numeric ? 'right' : 'left'}
						padding={headCell.disablePadding ? 'none' : 'default'}
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
									{order === 'desc' ? 'sorted descending' : 'sorted ascending'}
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
	order: PropTypes.oneOf([ 'asc', 'desc' ]).isRequired,
	orderBy: PropTypes.string.isRequired
};

const useToolbarStyles = makeStyles((theme) => ({
	root: {
		paddingLeft: theme.spacing(2),
		paddingRight: theme.spacing(1)
	},
	highlight:
		theme.palette.type === 'light'
			? {
					color: theme.palette.secondary.main,
					backgroundColor: lighten(theme.palette.secondary.light, 0.85)
				}
			: {
					color: theme.palette.text.primary,
					backgroundColor: theme.palette.secondary.dark
				},
	title: {
		flex: '1 1 100%',
		color: '#56a3bf'
	}
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

export default function EnhancedTable(props) {
	const data = props.data;
	const rows = data;

	const classes = useStyles();
	const [ order, setOrder ] = React.useState('asc');
	const [ orderBy, setOrderBy ] = React.useState('nombres');
	const [ page, setPage ] = React.useState(0);
	const [ rowsPerPage, setRowsPerPage ] = React.useState(10);

	const handleRequestSort = (event, property) => {
		const isDesc = orderBy === property && order === 'desc';
		setOrder(isDesc ? 'asc' : 'desc');
		setOrderBy(property);
	};

	const handleClick = (event, name) => {
		console.log(name);
		props.handleDataSelect(name);
	};

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

	return (
		<div className={classes.root}>
			<Paper className={classes.paper}>
				<EnhancedTableToolbar />
				<div className={classes.tableWrapper}>
					<Table className={classes.table} aria-labelledby="tableTitle" aria-label="enhanced table">
						<EnhancedTableHead
							classes={classes}
							order={order}
							orderBy={orderBy}
							onRequestSort={handleRequestSort}
							rowCount={rows.length}
						/>
						<TableBody>
							{stableSort(rows, getSorting(order, orderBy))
								.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
								.map((row, index) => {
									const labelId = `enhanced-table-checkbox-${index}`;

									return (
										<TableRow
											hover
											onClick={(event) => handleClick(event, row.nombres)}
											tabIndex={-1}
											key={row.nombres + '-' + index}
										>
											<TableCell component="th" id={labelId} scope="row">
												{row.nombres}
											</TableCell>
											<TableCell>{row.primerApellido}</TableCell>
											<TableCell>{row.segundoApellido}</TableCell>
											<TableCell>{row.curp}</TableCell>
											<TableCell>{row.rfc.rfc}</TableCell>
										</TableRow>
									);
								})}
							{emptyRows > 0 && (
								<TableRow style={{ height: 53 * emptyRows }}>
									<TableCell colSpan={6} />
								</TableRow>
							)}
						</TableBody>
					</Table>
				</div>
				<TablePagination
					component="div"
					labelRowsPerPage="Número de registros:"
					count={rows.length}
					rowsPerPage={rowsPerPage}
					rowsPerPageOptions={[ 5, 10, 50, 100, 150, 200 ]}
					page={page}
					backIconButtonProps={{
						'aria-label': 'página anterior'
					}}
					nextIconButtonProps={{
						'aria-label': 'siguiente página'
					}}
					labelDisplayedRows={({ from, to, count }) => from + '-' + (to === -1 ? count : to) + ' de ' + count}
					onChangePage={handleChangePage}
					onChangeRowsPerPage={handleChangeRowsPerPage}
				/>
			</Paper>
		</div>
	);
}
