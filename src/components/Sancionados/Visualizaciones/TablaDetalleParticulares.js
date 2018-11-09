import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import rp from "request-promise";
import CircularProgress from '@material-ui/core/CircularProgress';
import BajarCSV from "../../Tablas/BajarCSV";
import Grid from "@material-ui/core/Grid/Grid";
import EnhancedTableHead from '../../Tablas/EnhancedTableHead';
import Typography from "@material-ui/core/Typography/Typography";
import DetalleServidorSancionado from "../Servidores/DetalleServidorSancionado";
import DetalleParticular from "../Particulares/DetalleParticular";

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
        numeric: false,
        disablePadding: false,
        label: 'Proveedor o contratista',
        position: 1,
        mostrar: true
    },
    {id: 'institucion', numeric: false, disablePadding: false, label: 'Institución', position: 2, mostrar: true},
    {
        id: 'expediente',
        numeric: false,
        disablePadding: false,
        label: 'Número de expediente',
        position: 3,
        mostrar: true
    },
    {
        id: 'hechos',
        numeric: false,
        disablePadding: false,
        label: 'Hechos de la irregularidad',
        position: 4,
        mostrar: false
    },
    {id: 'objetoSocial', numeric: false, disablePadding: false, label: 'Objeto social', position: 5, mostrar: false},
    {
        id: 'sentidoResolucion',
        numeric: false,
        disablePadding: false,
        label: 'Sentido de la resolución',
        position: 6,
        mostrar: true
    },
    {
        id: 'fechaNotificacion',
        numeric: false,
        disablePadding: false,
        label: 'Fecha notificación',
        position: 7,
        mostrar: false
    },
    {
        id: 'fechaResolucion',
        numeric: false,
        disablePadding: false,
        label: 'Fecha resolución',
        position: 8,
        mostrar: false
    },
    {id: 'plazo', numeric: false, disablePadding: false, label: 'Plazo', position: 9, mostrar: false},
    {id: 'monto', numeric: false, disablePadding: false, label: 'Monto', position: 10, mostrar: false},
    {
        id: 'responsableInformacion',
        numeric: false,
        disablePadding: false,
        label: 'Responsable de información',
        position: 11,
        mostrar: false
    },
    {
        id: 'fechaActualizacion',
        numeric: false,
        disablePadding: false,
        label: 'Fecha actualización',
        position: 12,
        mostrar: false
    }
];

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
        position: 'absolute',
        margin: 'auto',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
    },
    container: {
        width: '100%',
        borderRadius: '6px',
        display: 'flex',
        position: 'relative',
        marginTop: '30px',
        marginBottom: '30px',
        flexDirection: 'column',
    },
    section: {
        maxWidth: '1024px',
        overflowX: 'auto'
    },
    table: {
        tableLayout: 'fixed',
    },
    tablePagination:{
        overflowX : 'auto',
        fontSize:'0.75rem'
    },
    title: {
        color: theme.palette.textPrincipal.color,
        textAlign: 'center',
        marginTop: theme.spacing.unit * 2,
    }

});


class EnhancedTable extends React.Component {

    componentDidMount() {
        this.handleSearchAPI();
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.institucion !== this.props.institucion){
            this.handleSearchAPI(nextProps.institucion);
        }
    }


    constructor(props) {
        super(props);
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

    getTotalRows = (URL) => {
        let options = {
            uri: URL ? URL : 'https://plataformadigitalnacional.org/api/proveedores_sancionados?select=count=eq.exact',
            json: true
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
    handleSearchAPI = (inst) => {
        console.log("Inst: ",inst);
        this.setState({loading: true});

        let institucion = inst&&inst!=='ALL'&&inst!=='CHANGE_PAGE'?inst:this.props.institucion;
        let URI = 'https://plataformadigitalnacional.org/api/proveedores_sancionados?';
        (inst !== "ALL") ? URI = URI+ '&&limit='+this.state.rowsPerPage+'&&offset='+(this.state.rowsPerPage * this.state.page): null;
        let vUri = URI + ((institucion) ? '&&dependencia=eq.' + institucion: '');

        (inst !== 'ALL' && inst !=="CHANGE_PAGE") ? this.getTotalRows(vUri + '&&select=count=eq.exact'):null;

        let options = {
            uri: vUri,
            json: true,


        };
        rp(options)
            .then(data => {
                let dataAux = data.map(item => {
                    return createData(item);
                });

                this.setState({
                    filterData : dataAux,
                    loading : false
                },()=>{
                    inst ==="ALL"?this.btnDownloadAll.triggerDown():null;
                });
                return true;
            })
            .catch(err => {
                this.setState({loading: false});
                alert("_No se pudó obtener la información");
                console.log(err);
            });

    };

    render() {
        const {classes,institucion} = this.props;
        const {data, order, orderBy, selected, rowsPerPage, page, filterData, totalRows, filterDataAll} = this.state;
        const emptyRows = rowsPerPage - filterData.length;
        return (
            <div className={classes.container}>
                <Paper>
                    <div className={classes.tableWrapper}>
                        <DetalleParticular handleClose={this.handleClose} particular={this.state.elementoSeleccionado}
                                           control={this.state.open}/>
                        {
                            this.state.loading &&
                            <CircularProgress className={classes.progress} id="spinnerLoading" size={100}/>
                        }
                        <Grid container justify={'center'} spacing={0}>
                            <Grid item xs={12}>
                                <Typography variant={'title'} className={classes.title}>
                                    Detalle</Typography>
                            </Grid>
                            <Grid item xs={12} className={classes.section}>
                                <Table className={classes.table} aria-describedby="spinnerLoading"
                                       aria-busy={this.state.loading} aria-labelledby="tableTitle">
                                    <EnhancedTableHead
                                        numSelected={selected.length}
                                        order={order}
                                        orderBy={orderBy}
                                        onSelectAllClick={this.handleSelectAllClick}
                                        onRequestSort={this.handleRequestSort}
                                        rowCount={data.length}
                                        columnData = {columnData}
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

                                </Table>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item md={3} xs={12}>
                                <BajarCSV innerRef={comp => this.btnDownloadAll = comp} data={filterData} filtrado={false}
                                          columnas={columnData} fnSearch = {this.handleSearchAPI}
                                          fileName={'Detalle'}/>
                            </Grid>
                            <Grid item md={3} xs={12}/>
                            <Grid item md={6} xs={12}>
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
                </Paper>
            </div>
        );
    }
}

EnhancedTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EnhancedTable);
