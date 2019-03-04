import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import Toolbar from '@material-ui/core/Toolbar';
import rp from "request-promise";
import CircularProgress from '@material-ui/core/CircularProgress';
import BajarCSV from "../../Tablas/BajarCSV";
import BusquedaParticular from "./BusquedaParticular";
import DetalleParticular from "./DetalleParticular";
import Grid from "@material-ui/core/Grid/Grid";
import EnhancedTableHead from '../../Tablas/EnhancedTableHead';
import Typography from "@material-ui/core/Typography/Typography";
import Modal from "@material-ui/core/Modal/Modal";

let counter = 0;

let createData = (item) => {
    counter += 1;
    let leyenda = "NO EXISTE DATO EN LA BASE DE DATOS SFP";
    return {
        id: counter,
        proveedor: item.proveedor_o_contratista ? item.proveedor_o_contratista : leyenda,
        dependencia: item.dependencia ? item.dependencia : leyenda,
        expediente: item.numero_de_expediente ? item.numero_de_expediente : leyenda,
        hechos: item.hechos_de_la_irregularidad ? item.hechos_de_la_irregularidad : leyenda,
        objetoSocial: item.objeto_social ? item.objeto_social : leyenda,
        sentidoResolucion: item.sentido_de_resolucion ? item.sentido_de_resolucion : leyenda,
        fechaNotificacion: item.fecha_de_notificacion ? item.fecha_de_notificacion : leyenda,
        fechaResolucion: item.fecha_de_resolucion ? item.fecha_de_resolucion : leyenda,
        plazo: item.plazo ? item.plazo : leyenda,
        monto: item.monto ? item.monto : leyenda,
        responsableInformacion: item.nombre_del_responsable_de_la_informacion ? item.nombre_del_responsable_de_la_informacion : leyenda,
        fechaActualizacion: item.fecha_de_actualizacion ? item.fecha_de_actualizacion : leyenda
    };
};

function getSorting(order, orderBy) {
    return order === 'desc'
        ? (a, b) => (b[orderBy] < a[orderBy] ? -1 : 1)
        : (a, b) => (a[orderBy] < b[orderBy] ? -1 : 1);
}

const columnData = [
    {
        id: 'proveedor',
        disablePadding: false,
        label: 'Proveedor o contratista',
        position: 1,
        mostrar: true
    },
    {id: 'institucion', disablePadding: false, label: 'Institución', position: 2, mostrar: true},
    {
        id: 'expediente',
        disablePadding: false,
        label: 'Número de expediente',
        position: 3,
        mostrar: true
    },
    {
        id: 'hechos',
        disablePadding: false,
        label: 'Hechos de la irregularidad',
        position: 4,
        mostrar: false
    },
    {id: 'objetoSocial', disablePadding: false, label: 'Objeto social', position: 5, mostrar: false},
    {
        id: 'sentidoResolucion',
        disablePadding: false,
        label: 'Sentido de la resolución',
        position: 6,
        mostrar: true
    },
    {
        id: 'fechaNotificacion',
        disablePadding: false,
        label: 'Fecha notificación',
        position: 7,
        mostrar: false
    },
    {
        id: 'fechaResolucion',
        disablePadding: false,
        label: 'Fecha resolución',
        position: 8,
        mostrar: false
    },
    {id: 'plazo',disablePadding: false, label: 'Plazo', position: 9, mostrar: false},
    {id: 'monto', disablePadding: false, label: 'Monto', position: 10, mostrar: false},
    {
        id: 'responsableInformacion',
        disablePadding: false,
        label: 'Responsable de información',
        position: 11,
        mostrar: false
    },
    {
        id: 'fechaActualizacion',
        disablePadding: false,
        label: 'Fecha actualización',
        position: 12,
        mostrar: false
    }
];

const styles = theme => ({
    root: {
        marginTop: '30px',
        marginBottom: '30px',
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

    section: {
        maxWidth: '1200px',
    },
    table: {
        tableLayout: 'fixed',
    },
    tablePagination: {
        overflowX: 'auto',
        fontSize: '0.75rem'
    },
    gridTable: {
        marginBottom: '27px'
    },
    desc: {
        color: theme.palette.primary.dark,
    },
    item: {
        padding: theme.spacing.unit
    },
    container: {
        marginTop: '30px',
        marginBottom: '30px',
        overflowX: 'auto',
    },
});


const toolbarStyles = theme => ({
    root: {
        width: '100%',
        padding: theme.spacing.unit,
    },
    toolBarStyle: {
        backgroundColor: 'transparent',
        position: 'relative',
        padding: 0,
        margin: '0 15px',
        zIndex: 3,
        paddingTop: '53px',
        paddingBottom: '61px',
    },
    toolBarFloat: {
        paddingTop: '53px',
        paddingBottom: '61px',
        marginTop: '-30px',
        borderRadius: '3px',
        background: '#fff',
        boxShadow: '0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 10px -5px rgb(41, 92, 83)',
        width: '100%',

    },
    spacer: {
        flex: '1 1 100%',
    },
    actions: {
        color: theme.palette.text.secondary,
    },
    title: {
        flex: '0 0 auto',
    },
    flex: {
        flexGrow: 1,
    },
});


let EnhancedTableToolbar = props => {
    const {classes, handleChangeCampo, nombreParticular, institucion} = props;
    return (
        <Toolbar className={classes.toolBarStyle}>
            <BusquedaParticular handleChangeCampo={handleChangeCampo} nombreParticular={nombreParticular}
                                institucion={institucion}/>

        </Toolbar>
    );
};

EnhancedTableToolbar.propTypes = {
    classes: PropTypes.object.isRequired
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);


class EnhancedTable extends React.Component {

    componentDidMount() {
        this.handleSearchAPI('FIELD_FILTER');
    }

    constructor(props) {
        super(props);
        this.child = React.createRef();
        this.btnDownloadAll = React.createRef();
        this.state = {
            order: 'asc',
            orderBy: 'proveedor',
            selected: [],
            nombreParticular: '',
            data: [],
            filterData: [],
            page: 0,
            rowsPerPage: 10,
            open: false,
            elementoSeleccionado: {},
            institucion: '',
            loading: true,
            totalRows: 0,
            filterDataAll: []
        };
    }

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

    handleClose = () => {
        this.setState({open: false});
    };

    handleClick = (event, elemento) => {
        this.setState({elementoSeleccionado: elemento});
        this.setState({open: true});
    };

    handleChangePage = (event, page) => {
        this.setState({page}, () => {
            this.handleSearchAPI('CHANGE_PAGE');
        });

    };

    handleChangeRowsPerPage = event => {
        this.setState({rowsPerPage: event.target.value}, () => {
            this.handleSearchAPI('FIELD_FILTER');
        });
    };

    isSelected = id => this.state.selected.indexOf(id) !== -1;

    getTotalRows = (params) => {
        let options = {
            uri: 'https://plataformadigitalnacional.org/api/proveedores_sancionados?select=count=eq.exact',
            json: true,
            qs: params
        };
        rp(options)
            .then(data => {
                this.setState({totalRows: data[0].count, loading: false});
            }).catch(err => {
            this.setState({loading: false});
            alert("_No se pudó obtener la información");
            console.log(err);
        });
    };
    handleSearchAPI = (typeSearch) => {
        this.setState({loading: true});
        let {institucion, nombreParticular} = this.state;
        const URI = 'https://plataformadigitalnacional.org/api/proveedores_sancionados?';

        let params = {};

        if (typeSearch !== 'ALL') {
            (typeSearch === 'FIELD_FILTER' || typeSearch === 'CHANGE_PAGE') ? params.limit = this.state.rowsPerPage : null;
            (typeSearch === 'FIELD_FILTER' || typeSearch === 'CHANGE_PAGE') ? params.offset = (this.state.rowsPerPage * this.state.page) : null;
            (institucion) ? params.dependencia = 'eq.' + institucion : null;
            (nombreParticular) ? params.proveedor_o_contratista = 'like.*' + nombreParticular.toUpperCase() + '*' : null;
            (typeSearch === 'FIELD_FILTER') ? this.getTotalRows(params) : null;

        }

        let options = {
            uri: URI,
            json: true,
            qs: params
        };
        rp(options)
            .then(data => {
                let dataAux = data.map(item => {
                    return createData(item);
                });
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

    handleChangeCampo = (varState, event) => {
        this.setState({
            loading: true,
            [varState]: event ? (event.target ? event.target.value : event.value) : ''
        }, () => {
            this.handleSearchAPI('FIELD_FILTER');
        });
    };


    render() {
        const {classes} = this.props;
        const {data, order, orderBy, selected, rowsPerPage, page, filterData, totalRows, filterDataAll} = this.state;
        const emptyRows = rowsPerPage - filterData.length;
        return (
            <div>
                <Grid container justify='center' spacing={0} className={classes.gridTable}>
                    <Grid item xs={12}>
                        <EnhancedTableToolbar handleChangeCampo={this.handleChangeCampo}
                                              nombreParticular={this.state.nombreParticular}
                                              institucion={this.state.institucion}/>
                    </Grid>
                    <Grid item xs={12}>
                        <DetalleParticular handleClose={this.handleClose} particular={this.state.elementoSeleccionado}
                                           control={this.state.open}/>
                    </Grid>
                    <Grid item xs={12}>
                        {
                            this.state.loading &&
                            <Modal
                                open={this.state.loading}
                                disableAutoFocus={true}
                            >
                                <CircularProgress className={classes.progress} id="spinnerLoading" size={200}/>
                            </Modal>

                        }
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h6" className={classes.desc}>Pulsa sobre el registro para ver su
                            detalle<br/></Typography>
                    </Grid>
                    <Grid item xs={12} >
                        <div className={classes.container}>
                            <Table aria-describedby="spinnerLoading"
                                   aria-busy={this.state.loading} aria-labelledby="tableTitle">
                                <EnhancedTableHead
                                    numSelected={selected.length}
                                    order={order}
                                    orderBy={orderBy}
                                    onSelectAllClick={this.handleSelectAllClick}
                                    onRequestSort={this.handleRequestSort}
                                    rowCount={data.length}
                                    columnData={columnData}
                                />
                                <TableBody id="tableParticulares">
                                    {filterData
                                        .sort(getSorting(order, orderBy))
                                        .map(n => {
                                            const isSelected = this.isSelected(n.id);
                                            return (
                                                <TableRow
                                                    hover
                                                    onClick={event => this.handleClick(event, n)}
                                                    role="checkbox"
                                                    aria-checked={isSelected}
                                                    tabIndex={-1}
                                                    key={n.id}
                                                    selected={isSelected}
                                                >
                                                    <TableCell component="th" scope="row"
                                                               padding="default">{n.proveedor}</TableCell>
                                                    <TableCell>{n.dependencia}</TableCell>
                                                    <TableCell>{n.expediente}</TableCell>
                                                    <TableCell>{n.sentidoResolucion}</TableCell>
                                                </TableRow>
                                            );
                                        })}
                                    {emptyRows > 0 && (
                                        <TableRow style={{height: 49 * emptyRows}}>
                                            <TableCell colSpan={4}/>
                                        </TableRow>
                                    )}
                                </TableBody>

                                <TableFooter>
                                    <TableRow>
                                        <TableCell>
                                            <BajarCSV innerRef={comp => this.btnDownloadAll = comp} data={data} filtrado={false}
                                                      columnas={columnData} fnSearch={this.handleSearchAPI}
                                                      fileName={'Particulares sancionados'}/>
                                        </TableCell>
                                        <TableCell>
                                            <BajarCSV innerRef={comp => this.child = comp} data={filterDataAll} filtrado={true}
                                                      columnas={columnData} fnSearch={this.handleSearchAPI}
                                                      fileName={'Particulares sancionados'}/>
                                        </TableCell>
                                        <TablePagination
                                            className={classes.tablePagination}
                                            colSpan={2}
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
                                    </TableRow>
                                </TableFooter>
                            </Table>
                        </div>
                    </Grid>
                </Grid>

                <Grid container spacing={0}>
                    <Grid item xs={12} className={classes.item}>
                        <Typography variant={"caption"} style={{fontStyle: 'italic'}}>Fuente:
                            https://datos.gob.mx/busca/dataset/proveedores-y-contratistas-sancionados</Typography>
                    </Grid>
                </Grid>

            </div>
        );
    }
}

EnhancedTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EnhancedTable);
