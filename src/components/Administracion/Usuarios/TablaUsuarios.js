import React from 'react';
import Table from "@material-ui/core/Table/Table";
import EnhancedTableHead from "../../Tablas/EnhancedTableHead";
import TableBody from "@material-ui/core/TableBody/TableBody";
import TableRow from "@material-ui/core/TableRow/TableRow";
import TableCell from "@material-ui/core/TableCell/TableCell";
import {withStyles} from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography/Typography";
import ArchiveIcon from '@material-ui/icons/Archive';
import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import AcceptIcon from '@material-ui/icons/AssignmentTurnedIn';
import RejectIcon from '@material-ui/icons/NotInterested';
import TablePagination from "@material-ui/core/TablePagination/TablePagination";
import Mensaje from "../../Mensajes/Mensaje";
import Grid from "@material-ui/core/Grid/Grid";
import DetalleUsuario from './DetalleUsuario';
import app from "../../../config/firebase";

let counter = 0;
let createData = (item) => {
    counter += 1;
    let leyenda = "SIN DATO";

    return {
        id: counter,
        nombre: item.nombre ? item.nombre : leyenda,
        apellido1: item.apellido1 ? item.apellido1 : leyenda,
        apellido2: item.apellido2 ? item.apellido2 : leyenda,
        cargo: item.cargo ? item.cargo : leyenda,
        dependencia: item.dependencia ? item.dependencia : leyenda,
        correo: item.correo ? item.correo : leyenda,
        telefono_personal: item.telefono_personal ? item.telefono_personal : leyenda,
        telefono_oficina: item.telefono_oficina ? item.telefono_oficina : leyenda,
        extension: item.extension ? item.extension : leyenda,
        fecha_solicitud: item.fecha_solicitud ? new Date(item.fecha_solicitud.seconds * 1000).toLocaleString() : leyenda,
        rol: item.rol ? item.rol : leyenda
    };
};
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
        label: 'Cargo/Ocupación',
        position: 5,
        mostrar: false,
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
        mostrar: false,
        key: 'correo'
    },
    {
        id: 'telefonoPersonal',
        label: 'Teléfono personal',
        position: 8,
        mostrar: false,
        key: 'telefonoPersonal'
    },

    {
        id: 'telefonoOficina',
        label: 'Teléfono oficina',
        position: 9,
        mostrar: false,
        key: 'telefonoOficina'
    },
    {
        id: 'extension',
        label: 'Extensión',
        position: 10,
        mostrar: false,
        key: 'extension'
    },
    {
        id: 'fecha_solicitud',
        label: 'Fecha solicitud',
        position: 11,
        mostrar: true,
        key: 'fecha_solicitud'
    },
    {
        id: 'rol',
        label: 'Rol',
        position: 12,
        mostrar: true,
        key: 'rol'
    }
];

function getSorting(order, orderBy) {
    return order === 'desc'
        ? (a, b) => (b[orderBy] < a[orderBy] ? -1 : 1)
        : (a, b) => (a[orderBy] < b[orderBy] ? -1 : 1);
};


const styles = theme => ({
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
    title: {
        color: theme.palette.primary.main,
        textAlign: 'center'
    },
    text: {
        color: theme.palette.primary.dark,
    },
    containerTable: {
        overflowX: 'scroll',
    },
    textGrey: {
        color: theme.palette.textGrey.color
    }
});


class TablaUsuarios extends React.Component {
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
            data: [],
            filterData: [],
            oficio: null,
            flag_msj: false,
            previousPage: 0,
        };
    };

    handleClose = () => {
        this.setState({open: false});
    };

    componentDidMount() {
        this.getTotalUsuarios();
        this.getUsuarios();
    }

    getUsuarios = (paginar) => {
        let db = app.firestore();
        const settings = {timestampsInSnapshots: true};
        db.settings(settings);

        let after = "";

        if (this.state.previousPage <= this.state.page) {
            let indice = this.state.previousPage >= this.state.page ? 0 : this.state.rowsPerPage - 1;
            if (paginar)
                after = this.state.filterData[indice] ? this.state.filterData[indice].correo : "";
            db.collection('/users_pdn').orderBy('correo').startAfter(after).limit(this.state.rowsPerPage).get().then((querySnapshot) => {
                let dataAux = [];
                let count = 0;
                querySnapshot.forEach(doc => {
                    dataAux[count++] = createData(doc.data());
                });

                this.setState({
                    filterData: dataAux,
                });
            });
        } else {
            let indice = this.state.previousPage >= this.state.page ? 0 : this.state.rowsPerPage - 1;
            if (paginar)
                after = this.state.filterData[indice] ? this.state.filterData[indice].correo : "";

            db.collection('/users_pdn').orderBy('correo').endAt(after).limit(this.state.rowsPerPage).get().then((querySnapshot) => {
                let dataAux = [];
                let count = 0;
                querySnapshot.forEach(doc => {
                    dataAux[count++] = createData(doc.data());
                });

                this.setState({
                    filterData: dataAux,
                });
            });

        }


    };

    getTotalUsuarios = () => {
        let db = app.firestore();
        const settings = {timestampsInSnapshots: true};
        db.settings(settings);

        db.collection('/users_pdn').get().then((querySnapshot) => {
            this.setState({
                totalRows: querySnapshot.size,
            });
        });
    };

    handleChangeRowsPerPage = event => {
        this.setState(
            {
                rowsPerPage: event.target.value,
                page: 0,
            }, () => {
                this.getUsuarios();
            });
    };

    handleChangePage = (event, page) => {
        this.setState({
            previousPage: this.state.page,
            page: page
        }, () => {
            this.getUsuarios(true);
        });
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

    handleClick = (event, elemento) => {
        this.setState({elementoSeleccionado: elemento});
        this.setState({open: true});
    };

    handleCloseMsj = () => {
        this.setState({flag_msj: false});
    };


    render() {
        const {classes} = this.props;
        const {order, orderBy, selected, rowsPerPage, page, filterData, totalRows, filterDataAll} = this.state;
        let index = 0;
        return (
            <div>
                <Grid container>
                    <Grid item xs={12}>
                        <Mensaje mensaje={'El estatus de la solicitud ha sido modificado'} titulo={'Cambio de estatus'}
                                 open={this.state.flag_msj} handleClose={this.handleCloseMsj}/>
                    </Grid>
                    <Grid item xs={12}>
                        <DetalleUsuario handleClose={this.handleClose} solicitud={this.state.elementoSeleccionado}
                                        control={this.state.open}/>
                    </Grid>
                    <Grid item xs={12}><Typography variant={"h6"}
                                                   className={classes.text}>Usuarios<br/></Typography></Grid>
                    <Grid item xs={12}>
                        <Typography variant={"subtitle2"} className={classes.textGrey}>
                            Pulsa sobre el registro para ver el detalle <br/><br/>
                        </Typography></Grid>
                    <Grid item xs={12} className={classes.containerTable}>
                        <Table aria-describedby="spinnerLoading"
                               aria-busy={this.state.loading} aria-labelledby="tableTitle">
                            <EnhancedTableHead
                                numSelected={selected.length}
                                order={order}
                                orderBy={orderBy}
                                onSelectAllClick={this.handleSelectAllClick}
                                onRequestSort={this.handleRequestSort}
                                rowCount={filterData.length}
                                columnData={columnData}
                                acciones={true}
                            />
                            <TableBody>
                                {
                                    filterData
                                        .sort(getSorting(order, orderBy))
                                        .map(n => {
                                            return (
                                                <TableRow
                                                    hover
                                                    tabIndex={-1}
                                                    key={index++}
                                                >
                                                    <TableCell
                                                        onClick={(event) => this.handleClick(event, n)}>{n.nombre}</TableCell>
                                                    <TableCell
                                                        onClick={(event) => this.handleClick(event, n)}>{n.apellido1}</TableCell>
                                                    <TableCell
                                                        onClick={(event) => this.handleClick(event, n)}>{n.apellido2}</TableCell>
                                                    <TableCell
                                                        onClick={(event) => this.handleClick(event, n)}>{n.dependencia}</TableCell>
                                                    <TableCell
                                                        onClick={(event) => this.handleClick(event, n)}>{n.fecha_solicitud}</TableCell>
                                                    <TableCell
                                                        onClick={(event) => this.handleClick(event, n)}>{n.rol}</TableCell>
                                                    <TableCell>
                                                        {
                                                            n.id_oficio &&
                                                            <Tooltip title={"Descargar oficio"}>
                                                                <ArchiveIcon onClick={() => this.viewOficio(n)}
                                                                             color={n.id_oficio ? "secondary" : 'disabled'}/>
                                                            </Tooltip>
                                                        }
                                                        {
                                                            (n.estatus === 'ENVIADA' || n.estatus === 'REVOCADA') &&
                                                            <Tooltip title={"Aprobar solicitud"}>
                                                                <AcceptIcon onClick={() => this.changeEstatus(n, 0)}
                                                                            color={'primary'}/>
                                                            </Tooltip>
                                                        }
                                                        {
                                                            n.estatus === 'ENVIADA' &&
                                                            <Tooltip title={"Rechazar solicitud"}>
                                                                <RejectIcon onClick={() => this.changeEstatus(n, 1)}
                                                                            color={'error'}/>
                                                            </Tooltip>
                                                        }
                                                        {
                                                            (n.estatus === 'APROBADA') &&
                                                            <Tooltip title={"Revocar solicitud"}>
                                                                <RejectIcon onClick={() => this.changeEstatus(n, 2)}
                                                                            color={'error'}/>
                                                            </Tooltip>
                                                        }

                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })
                                }
                            </TableBody>
                        </Table>
                        <TablePagination
                            className={classes.tablePagination}
                            component="div"
                            count={totalRows}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            backIconButtonProps={{
                                'aria-label': 'Previous Page',
                            }}
                            nextIconButtonProps={{
                                'aria-label': 'Next Page',
                            }}
                            onChangePage={this.handleChangePage}
                            onChangeRowsPerPage={this.handleChangeRowsPerPage}
                            labelRowsPerPage='Registros por página'
                            labelDisplayedRows={({from, to, count}) => {
                                return `${from}-${to} de ${count}`;
                            }}
                        />
                    </Grid>
                </Grid>


            </div>
        );
    }
}

export default withStyles(styles)(TablaUsuarios)