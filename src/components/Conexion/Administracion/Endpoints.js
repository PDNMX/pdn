import React from 'react';
import Table from "@material-ui/core/Table/Table";
import EnhancedTableHead from "../../Tablas/EnhancedTableHead";
import TableBody from "@material-ui/core/TableBody/TableBody";
import TableRow from "@material-ui/core/TableRow/TableRow";
import TableCell from "@material-ui/core/TableCell/TableCell";
import {withStyles} from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography/Typography";
import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import Create from '@material-ui/icons/Create';
import rp from "request-promise";
import Mensaje from "../../Mensajes/Mensaje";
import EditarEndpoint from "./EditarEndpoint";
import TablePagination from "@material-ui/core/TablePagination/TablePagination";
import Grid from "@material-ui/core/Grid/Grid";
import {getCurrentUser} from "../../Seguridad/seguridad";

let counter = 0;
let createData = (item) => {
    counter += 1;
    let leyenda = "SIN DATO";
    return {
        id: counter,
        url: item.url ? item.url : leyenda,
        metodo: item.metodo ? item.metodo : leyenda,
        sistema: item.sistema ? item.sistema : leyenda,
        descripcion: item.descripcion ? item.descripcion : leyenda,
        estatus: item.estatus ? item.estatus : leyenda,
        fecha_registro: item.fecha_registro ? item.fecha_registro : leyenda,
    };
};
const columnData = [
    {
        id: 'URL',
        label: 'URL',
        position: 2,
        mostrar: true,
        key: 'URL'
    },
    {
        id: 'metodo',
        label: 'Método',
        position: 3,
        mostrar: true,
        key: 'metodo'
    },
    {
        id: 'sistema',
        label: 'Sistema',
        position: 4,
        mostrar: true,
        key: 'sistema'
    },
    {
        id: 'descripcion',
        label: 'Descripción',
        position: 5,
        mostrar: true,
        key: 'descripcion'
    },
    {
        id: 'estatus',
        label: 'Estatus',
        position: 6,
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
        marginBottom: theme.spacing.unit * 3,
    },
    titleTable: {
        marginBottom: '61px'
    },
    desc: {
        color: theme.palette.primary.dark,
    },
    text: {
        color: theme.palette.secondary.dark,
    },
    containerTable: {
        overflowX: 'scroll'
    }
});

class Endpoints extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            order: 'asc',
            orderBy: 'URL',
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
                this.getEndpoints('FIELD_FILTER');
            });
        });
        return null;
    }

    componentDidUpdate(prevProps) {
        if (this.props.update !== prevProps.update) {
            return this.getEndpoints('FIELD_FILTER');
        }
        return true;
    }

    getEndpoints = (typeSearch) => {
        let params = {};
        (typeSearch === 'FIELD_FILTER' || typeSearch === 'CHANGE_PAGE') ? params.limit = this.state.rowsPerPage : null;
        (typeSearch === 'FIELD_FILTER' || typeSearch === 'CHANGE_PAGE') ? params.offset = (this.state.rowsPerPage * this.state.page) : null;
        params.dependencia = 'eq.' + this.state.currentUser.dependencia;
        if(typeSearch === 'FIELD_FILTER') this.getTotalRows(params);

        let options = {
            uri: 'https://plataformadigitalnacional.org/api/apis_conexion',
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
            uri: 'https://plataformadigitalnacional.org/api/apis_conexion?select=count=eq.exact',
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
            this.getEndpoints('FIELD_FILTER');
        });
        return null;
    };

    handleChangePage = (event, page) => {
        this.setState({page}, () => {
            this.getEndpoints('CHANGE_PAGE');
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

    handleClose = () => {
        this.setState({open: false});
        if (this.props.updateView) this.props.updateView();
    };

    changeEstatus = (n) => {
        let params = {};
        params.correo = 'eq.' + n.correo;

        let options = {
            method: 'PATCH',
            uri: 'https://plataformadigitalnacional.org/api/apis_conexion',
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
                <Grid container justify={'center'} className={classes.gridTable}>
                    <Grid item xs={12}>
                        <Mensaje mensaje={this.state.mensaje} titulo={this.state.tituloMensaje}
                                 open={this.state.flag_msj} handleClose={this.handleCloseMsj}/>
                    </Grid>
                    <Grid item xs={12}>
                        <EditarEndpoint control={this.state.open} endpoint={this.state.elementoSeleccionado}
                                        handleClose={this.handleClose}/>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant={"h6"} className={classes.text}>API's registradas</Typography>
                    </Grid>
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
                                                    <TableCell>{n.url}</TableCell>
                                                    <TableCell>{n.metodo}</TableCell>
                                                    <TableCell>{n.sistema}</TableCell>
                                                    <TableCell>{n.descripcion}</TableCell>
                                                    <TableCell>{n.estatus}</TableCell>
                                                    <TableCell>
                                                        {
                                                            n.estatus === 'EN REVISIÓN' &&
                                                            <Tooltip title={'EDITAR'}>
                                                                <Create color={"secondary"}
                                                                        onClick={(event) => this.handleClick(event, n)}/>
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

export default withStyles(styles)(Endpoints)