import React from 'react';
import Table from "@material-ui/core/Table/Table";
import EnhancedTableHead from "../../Tablas/EnhancedTableHead";
import TableBody from "@material-ui/core/TableBody/TableBody";
import TableRow from "@material-ui/core/TableRow/TableRow";
import TableCell from "@material-ui/core/TableCell/TableCell";
import {withStyles} from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography/Typography";
import DeleteIcon from '@material-ui/icons/Delete';
import Tooltip from "@material-ui/core/Tooltip/Tooltip";

const columnData = [
    {
        id: 'nombre',
        label: 'Nombre',
        position: 2,
        mostrar: true,
        key: 'nombre'
    },
    {
        id: 'apellido1',
        label: 'Apellido Uno',
        position: 3,
        mostrar: true,
        key: 'apellido1'
    },
    {
        id: 'apellido2',
        label: 'Apellido Dos',
        position: 4,
        mostrar: true,
        key: 'apellido2'
    },
    {
        id: 'cargo',
        label: 'Cargo',
        position: 5,
        mostrar: true,
        key: 'cargo'
    },
    {
        id: 'dependencia',
        label: 'Dependencia',
        position: 6,
        mostrar: true,
        key: 'dependencia'
    },
    {
        id: 'correo',
        label: 'Correo electrónico',
        position: 7,
        mostrar: true,
        key: 'correo'
    },
    {
        id: 'telefonoPersonal',
        label: 'Teléfono personal',
        position: 8,
        mostrar: true,
        key: 'telefonoPersonal'
    },

    {
        id: 'telefonoOficina',
        label: 'Teléfono oficina',
        position: 9,
        mostrar: true,
        key: 'telefonoOficina'
    },

    {
        id: 'extension',
        label: 'Extensión',
        position: 10,
        mostrar: true,
        key: 'extension'
    },
];

function getSorting(order, orderBy) {
    return order === 'desc'
        ? (a, b) => (b[orderBy] < a[orderBy] ? -1 : 1)
        : (a, b) => (a[orderBy] < b[orderBy] ? -1 : 1);
};


const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
    },
    tableWrapper: {
        overflowX: 'auto',
    },
    tableFooter: {
        display: 'flow-root',
        flexWrap: 'wrap',
    },
    progress: {
        position: 'fixed',
        margin: 'auto',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
    },
    container: {
        marginTop: '30px',
        marginBottom: '30px',
    },
    section: {
        maxWidth: '1200px',
        overflowX: 'auto'
    },
    table: {
        tableLayout: 'fixed',
        marginTop: theme.spacing.unit * 3,
        marginBottom: theme.spacing.unit * 3,
    },
    tablePagination: {
        overflowX: 'auto',
        fontSize: '0.75rem'
    },
    gridTable: {
        marginBottom: '27px'
    },
    titleTable: {
        marginBottom: '61px'
    },
    desc: {
        color: theme.palette.primary.dark,
    },
    text: {
        color: theme.palette.primary.dark,

    }
});

class TablaRegistros extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            order: 'asc',
            orderBy: 'nombre',
            selected: [],
            page: 0,
            rowsPerPage: 10,
            open: false,
            elementoSeleccionado: {},
            totalRows: 0,
        };
    };

    handleRequestSort = (event, property) => {
        const orderBy = property;
        let order = 'desc';
        if (this.state.orderBy === property && this.state.order === 'desc') {
            order = 'asc';
        }
        this.setState({order, orderBy});
    };
    handleSelectAllClick = (event, checked) => {
        if (checked) {
            this.setState(state => ({selected: state.data.map(n => n.id)}));
            return;
        }
        this.setState({selected: []});
    };

    isSelected = id => this.state.selected.indexOf(id) !== -1;

    render() {
        const {registros, classes} = this.props;
        const {order, orderBy, selected, rowsPerPage, page, filterData, totalRows, filterDataAll} = this.state;
        let index = 0;
        return (
            <div>
                <Typography variant={"h6"} className={classes.text}>Encargado a registrar</Typography>
                <Table className={classes.table} aria-describedby="spinnerLoading"
                       aria-busy={this.state.loading} aria-labelledby="tableTitle">
                    <EnhancedTableHead
                        numSelected={selected.length}
                        order={order}
                        orderBy={orderBy}
                        onSelectAllClick={this.handleSelectAllClick}
                        onRequestSort={this.handleRequestSort}
                        rowCount={registros.length}
                        columnData={columnData}
                        acciones={true}
                    />
                    <TableBody>
                        {
                            registros
                                .sort(getSorting(order, orderBy))
                                .map(n => {
                                    return (
                                        <TableRow
                                            hover
                                            tabIndex={-1}
                                            key={index++}
                                        >
                                            <TableCell>{n.nombre}</TableCell>
                                            <TableCell>{n.apellido1}</TableCell>
                                            <TableCell>{n.apellido2}</TableCell>
                                            <TableCell>{n.cargo}</TableCell>
                                            <TableCell>{n.dependencia}</TableCell>
                                            <TableCell>{n.correo}</TableCell>
                                            <TableCell>{n.telefono_personal}</TableCell>
                                            <TableCell>{n.telefono_oficina}</TableCell>
                                            <TableCell>{n.extension}</TableCell>
                                            <TableCell>
                                                <Tooltip title={"Eliminar"}>
                                                    <DeleteIcon onClick={() => this.props.remove(n)}/>
                                                </Tooltip>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })
                        }
                    </TableBody>
                </Table>
            </div>
        );
    }
}

export default withStyles(styles)(TablaRegistros)