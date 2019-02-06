import React from 'react';
import Table from "@material-ui/core/Table/Table";
import EnhancedTableHead from "../Tablas/EnhancedTableHead";
import TableBody from "@material-ui/core/TableBody/TableBody";
import TableRow from "@material-ui/core/TableRow/TableRow";
import TableCell from "@material-ui/core/TableCell/TableCell";
import {withStyles} from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography/Typography";
import ArchiveIcon from '@material-ui/icons/Archive';
import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import rp from "request-promise";
import AcceptIcon from '@material-ui/icons/AssignmentTurnedIn';
import DetalleSolicitud from './DetalleSolicitud';
import axios from "axios";
import Grid from "@material-ui/core/Grid/Grid";
import Modal from "@material-ui/core/Modal/Modal";

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
        fecha_solicitud: item.fecha_solicitud ? item.fecha_solicitud.substring(0, 10) : leyenda,
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
        id: 'estatus',
        label: 'Estatus',
        position: 12,
        mostrar: true,
        key: 'estatus'
    },
    {
        id: 'oficio',
        label: 'Oficio',
        position: 10,
        mostrar: false,
        key: 'oficio'
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
        textAlign:'center'
    },
    text: {
        color: theme.palette.primary.dark,
    },
    mensaje:{
        marginTop : theme.spacing.unit *2
    },
    paperCaptcha: {
        position: 'absolute',
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing.unit * 50,
        },
        [theme.breakpoints.down('sm')]: {
            width: '80%',
            height: '80%',
            overflowY: 'scroll',
        },
        [theme.breakpoints.up('xl')]: {
            width: theme.spacing.unit * 70,
        },
    }
});

function getModalStyle() {
    const top = 50;
    const left = 50;
    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

class TablaSolicitudes extends React.Component {
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
        };
    };

    handleClose = () => {
        this.setState({open: false});
    };

    componentDidMount() {
        this.getSolicitudes();
    }

    getSolicitudes = () => {
        let params = {};
        let options = {
            uri: 'https://plataformadigitalnacional.org/api/solicitudes',
            json: true,
            qs: params
        };
        rp(options)
            .then(data => {
                let dataAux = data.map(item => {
                    return createData(item);
                });
                let typeSearch = 'FIELD_FILTER';
                typeSearch === 'ALL' ? this.setState({data: dataAux, loading: false}, () => {
                    this.btnDownloadAll.triggerDown();
                }) : (typeSearch === 'FIELD_FILTER' || typeSearch === 'CHANGE_PAGE') ? this.setState({
                        filterData: dataAux,
                        loading: false
                    }) :
                    this.setState({filterDataAll: dataAux, loading: false}, () => {
                        this.child.triggerDown();
                    });
                return true;
            })
            .catch(err => {
                this.setState({loading: false});
                alert("_No se pudó obtener la información");
                console.log(err);
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

    viewOficio = (solicitud) => {
        let fd = new FormData();
        fd.append('idDocument', solicitud.id_oficio);
        axios
            .post('https://demospdn.host/pdn/getOficio', fd, {responseType: 'arraybuffer'})
            .then(res => {
                console.log("res: ", res);
                if (res && res.status === 200) {
                    let fileName = 'Oficio.pdf';
                    const a = document.createElement('a');
                    a.download = fileName;
                    let blob = new Blob([res.data], {type: 'application/pdf'});
                    a.href = URL.createObjectURL(blob);
                    //window.open(URL.createObjectURL(blob));
                    a.click();
                    URL.revokeObjectURL(a.href);
                }
            })
            .catch(err => {
                console.log("err:", err);
            })
    };
    handleCloseMsj = () => {
        this.setState({flag_msj: false});
    };

    acceptSolicitud = (n) => {
        if (n.estatus !== 'ALTA') {
            let params = {};
            params.correo = 'eq.' + n.correo;

            let options = {
                method: 'PATCH',
                uri: 'https://plataformadigitalnacional.org/api/solicitudes',
                qs: params,
                headers: {
                    'Prefer': 'return = representation',
                    'Content-Type': 'application/json'
                },
                body: {'estatus': 'ALTA'},
                json: true
            };
            rp(options)
                .then(data => {
                    this.setState({
                        flag_msj: true
                    })
                })
                .catch(err => {
                    alert("_No se pudó completar la operación");
                    console.log(err);
                });
        }
    };

    render() {
        const {classes} = this.props;
        const {order, orderBy, selected, rowsPerPage, page, filterData, totalRows, filterDataAll} = this.state;
        let index = 0;
        return (
            <div>
                <Modal
                    open={this.state.flag_msj}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    onClose={this.handleCloseMsj}
                >
                    <div style={getModalStyle()} className={classes.paperCaptcha}>
                        <Grid container justify={"center"}>
                            <Grid item xs={12}>
                                <Typography variant={"h5"} className={classes.title}>Solicitud
                                    aprobada</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant={"subtitle1"} className={classes.mensaje}>La solicitud ha sido aceptada</Typography>
                            </Grid>
                        </Grid>
                    </div>
                </Modal>
                <DetalleSolicitud handleClose={this.handleClose} solicitud={this.state.elementoSeleccionado}
                                  control={this.state.open}/>
                <Typography variant={"h6"} className={classes.text}>Solicitudes</Typography>
                <Table className={classes.table} aria-describedby="spinnerLoading"
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
                                                onClick={(event) => this.handleClick(event, n)}>{n.cargo}</TableCell>
                                            <TableCell
                                                onClick={(event) => this.handleClick(event, n)}>{n.dependencia}</TableCell>
                                            <TableCell
                                                onClick={(event) => this.handleClick(event, n)}>{n.fecha_solicitud}</TableCell>
                                            <TableCell
                                                onClick={(event) => this.handleClick(event, n)}>{n.estatus}</TableCell>
                                            <TableCell>
                                                <Tooltip title={"Descargar oficio"}>
                                                    <ArchiveIcon onClick={() => this.viewOficio(n)}
                                                                 color={"secondary"}/>
                                                </Tooltip>
                                                <Tooltip title={"Aceptar solicitud"}>
                                                    <AcceptIcon onClick={() => this.acceptSolicitud(n)}
                                                                color={n.estatus === 'ALTA' ? 'disabled' : 'primary'}/>
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

export default withStyles(styles)(TablaSolicitudes)