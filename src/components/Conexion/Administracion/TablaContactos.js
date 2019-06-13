import React from 'react';
import Table from "@material-ui/core/Table/Table";
import EnhancedTableHead from "../../Tablas/EnhancedTableHead";
import TableBody from "@material-ui/core/TableBody/TableBody";
import TableRow from "@material-ui/core/TableRow/TableRow";
import TableCell from "@material-ui/core/TableCell/TableCell";
import {withStyles} from '@material-ui/core/styles';
import {Typography} from "@material-ui/core"
import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import rp from "request-promise";
import HowToReg from '@material-ui/icons/HowToReg';
import ReportOff from '@material-ui/icons/ReportOff';
import Create from '@material-ui/icons/Create';
import TablePagination from "@material-ui/core/TablePagination/TablePagination";
import Mensaje from "../../Mensajes/Mensaje";
import EditarContacto from './EditarContacto';
import Grid from "@material-ui/core/Grid/Grid";
import {getCurrentUser} from "../../Seguridad/seguridad";

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
        fecha_alta: item.fecha_alta ? item.fecha_alta.substring(0, 10) : leyenda,
        estatus: item.estatus ? item.estatus : leyenda,
        id_oficio: item.id_oficio ? item.id_oficio : leyenda
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
        label: 'Cargo',
        position: 5,
        mostrar: true,
        key: 'cargo'
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
    {
        id: 'fecha_solicitud',
        label: 'Fecha alta',
        position: 11,
        mostrar: true,
        key: 'fecha_solicitud'
    },
    {
        id: 'estatus',
        label: 'Estatus',
        position: 12,
        mostrar: true,
        key: 'estatus'
    },
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
    },
    table: {
        width: '100%',
    },
    tablePagination: {
        overflowX: 'auto',
        fontSize: '0.75rem'
    },
    gridTable: {
        marginBottom: theme.spacing(3),
    },
    titleTable: {
        marginBottom: '61px'
    },
    title: {
        color: theme.palette.primary.main,
        textAlign: 'center'
    },
    text: {
        color: theme.palette.secondary.dark,
    },
    tableContainer: {},
    rootT: {
        width: '100%',
        marginTop: theme.spacing(3),
        overflowX: 'auto',
    },
    containerTable: {
        overflowX: 'scroll'
    }
});


class TablaContactos extends React.Component {
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
            flag_msj: false,
            controlDetalle: false,
            mensaje: '',
            tituloMensaje: '',
        };
    };

    componentDidMount() {
        let _this = this;
        getCurrentUser().then((user)=>{
            _this.setState({
                currentUser : user,
            },()=>{
                this.getContactos('FIELD_FILTER');
            });
        });
    }

    componentDidUpdate(prevProps) {
        if (this.props.update !== prevProps.update) {
            return this.getContactos('FIELD_FILTER');
        }
        return true;
    }

    handleClose = () => {
        this.setState({open: false});
    };

    getContactos = (typeSearch) => {
        let params = {};
        if(typeSearch === 'FIELD_FILTER' || typeSearch === 'CHANGE_PAGE')  params.limit = this.state.rowsPerPage;
        if(typeSearch === 'FIELD_FILTER' || typeSearch === 'CHANGE_PAGE')  params.offset = (this.state.rowsPerPage * this.state.page);
        params.dependencia = 'eq.' + this.state.currentUser.dependencia;
        if(typeSearch === 'FIELD_FILTER')  this.getTotalRows(params);


        let options = {
            uri: 'https://plataformadigitalnacional.org/api/contactos_conexion',
            json: true,
            qs: params
        };
        rp(options)
            .then(data => {
                let dataAux = data.map(item => {
                    return createData(item);
                });
                this.setState({
                    filterData: dataAux,
                    loading: false
                });
                return true;
            })
            .catch(err => {
                this.setState({loading: false});
                alert("_No se pudó obtener la información");
                console.log(err);
                return true;
            });
    };

    getTotalRows = (params) => {
        let options = {
            uri: 'https://plataformadigitalnacional.org/api/contactos_conexion?select=count=eq.exact',
            json: true,
            qs: params
        };
        rp(options)
            .then(data => {
                this.setState({totalRows: data[0].count, loading: false});
                return true;
            }).catch(err => {
            this.setState({loading: false});
            alert("_No se pudó obtener la información");
            console.log(err);
            return true;
        });
    };

    handleChangeRowsPerPage = event => {
        this.setState({rowsPerPage: event.target.value, page: 0}, () => {
            this.getContactos('FIELD_FILTER');
        });
        return null;
    };

    handleChangePage = (event, page) => {
        this.setState({page}, () => {
            this.getContactos('CHANGE_PAGE');
        });
        return null;
    };

    handleRequestSort = (event, property) => {
        const orderBy = property;
        let order = 'desc';
        if (this.state.orderBy === property && this.state.order === 'desc') {
            order = 'asc';
        }
        this.setState({order, orderBy});
        return null;
    };

    handleSelectAllClick = (event, checked) => {
        if (checked) {
            this.setState(state => ({selected: state.data.map(n => n.id)}));
            return;
        }
        this.setState({selected: []});
        return null;
    };

    isSelected = id => this.state.selected.indexOf(id) !== -1;

    handleClick = (event, elemento) => {
        this.setState({elementoSeleccionado: elemento});
        this.setState({open: true});
    };

    handleCloseMsj = () => {
        this.setState({flag_msj: false});
    };

    handleClose = () => {
        this.setState({open: false});
        if (this.props.updateView) this.props.updateView();
    };

    changeEstatus = (n) => {
        let params = {};
        params.correo = 'eq.' + n.correo;

        let options = {
            method: 'PATCH',
            uri: 'https://plataformadigitalnacional.org/api/contactos_conexion',
            qs: params,
            headers: {
                'Prefer': 'return = representation',
                'Content-Type': 'application/json'
            },
            body: {'estatus': n.estatus === 'ACTIVO' ? 'INACTIVO' : 'ACTIVO'},
            json: true
        };
        rp(options)
            .then(data => {
                this.setState({
                    tituloMensaje: 'Cambio realizado correctamente',
                    mensaje: 'El estatus ha cambiado',
                    flag_msj: true
                }, () => {
                    this.getContactos('FIELD_FILTER');
                });
                return true;
            })
            .catch(err => {
                alert("_No se pudó completar la operación");
                console.log(err);
            });
    };

    render() {
        const {classes} = this.props;
        const {order, orderBy, selected, rowsPerPage, page, filterData, totalRows} = this.state;
        let index = 0;
        return (
            <div>
                <Grid container justify={'center'} spacing={0} className={classes.gridTable}>
                    <Grid item xs={12}>
                        <Mensaje mensaje={this.state.mensaje} titulo={this.state.tituloMensaje}
                                 open={this.state.flag_msj} handleClose={this.handleCloseMsj}/>
                    </Grid>
                    <Grid item xs={12}>
                        <EditarContacto control={this.state.open} contacto={this.state.elementoSeleccionado}
                                        handleClose={this.handleClose}/>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant={"h6"} className={classes.text}>Contactos registrados</Typography>
                    </Grid>

                    <Grid item xs={12}  className={classes.containerTable}>
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
                                                    <TableCell>{n.nombre}</TableCell>
                                                    <TableCell>{n.apellido1}</TableCell>
                                                    <TableCell>{n.apellido2}</TableCell>
                                                    <TableCell>{n.cargo}</TableCell>
                                                    <TableCell>{n.correo}</TableCell>
                                                    <TableCell>{n.telefono_personal}</TableCell>
                                                    <TableCell>{n.telefono_oficina}</TableCell>
                                                    <TableCell>{n.extension}</TableCell>
                                                    <TableCell>{n.fecha_alta}</TableCell>
                                                    <TableCell>{n.estatus}</TableCell>
                                                    <TableCell>
                                                        {
                                                            n.estatus === 'ACTIVO' &&
                                                            <Tooltip title={'Desactivar'}>
                                                                <ReportOff color={"error"}
                                                                           onClick={() => this.changeEstatus(n)}/>
                                                            </Tooltip>
                                                        }
                                                        {
                                                            n.estatus === 'INACTIVO' &&
                                                            <Tooltip title={'ACTIVAR'}>
                                                                <HowToReg color={"primary"}
                                                                          onClick={() => this.changeEstatus(n)}/>
                                                            </Tooltip>
                                                        }
                                                        <Tooltip title={'EDITAR'}>
                                                            <Create color={"secondary"}
                                                                    onClick={(event) => this.handleClick(event, n)}/>
                                                        </Tooltip>
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })
                                }
                            </TableBody>
                        </Table>
                    </Grid>
                    <Grid item xs={12}>
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

export default withStyles(styles)(TablaContactos)