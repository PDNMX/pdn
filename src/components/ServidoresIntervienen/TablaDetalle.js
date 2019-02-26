import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
//import Paper from '@material-ui/core/Paper';
import rp from "request-promise";
import CircularProgress from '@material-ui/core/CircularProgress';
import BajarCSV from "../Tablas/BajarCSV";
//import DetalleParticular from "./DetalleParticular";
import Grid from "@material-ui/core/Grid/Grid";
import EnhancedTableHead from '../Tablas/EnhancedTableHead';
import Typography from "@material-ui/core/Typography/Typography";
import DetalleServidor from "./DetalleServidor";
import Modal from "@material-ui/core/Modal/Modal";

let counter = 0;

let createData = (item) => {
    let leyenda = "NO EXISTE DATO EN LA BASE DE DATOS RENIRESP";
    let tipoArea = item.area_requirente === 1 ? "REQUIRENTE" : "" +
    item.area_contratante === 1 ? "CONTRATANTE" : "" +
    item.area_recnica === 1 ? "TÉCNICA" : "" +
    item.area_responsable === 1 ? "RESPONSABLE" : "" +
    item.area_otra === 1 ? "OTRA" : "";
    let nivel = item.id_nivel === 1 ? "ATENCIÓN O TRAMITACIÓN" : item.id_nivel === 2 ? "RESOLUCIÓN" : "ATENCIÓN O TRAMITACIÓN Y RESOLUCIÓN";
    counter += 1;
    return {
        id: counter,
        servidor: item.nombre ? item.nombre : leyenda,
        institucion: item.institucion ? item.institucion : leyenda,
        puesto: item.puesto ? item.puesto : leyenda,
        tipoArea: tipoArea ? tipoArea : leyenda,
        contrataciones: item.id_procedimiento === 1 ? nivel : "NO APLICA",
        concesionesLicencias: item.id_procedimiento === 2 ? nivel : "NO APLICA",
        enajenacion: item.id_procedimiento === 3 ? nivel : "NO APLICA",
        dictamenes: item.id_procedimiento === 4 ? nivel : "NO APLICA"
    };
};

function getSorting(order, orderBy) {
    return order === 'desc'
        ? (a, b) => (b[orderBy] < a[orderBy] ? -1 : 1)
        : (a, b) => (a[orderBy] < b[orderBy] ? -1 : 1);
}

const columnData = [
    {
        id: 'servidor',
        numeric: false,
        disablePadding: false,
        label: 'Servidor público',
        position: 2,
        mostrar: true,
        key: 'servidor'
    },
    {
        id: 'institucion',
        numeric: false,
        disablePadding: false,
        label: 'Institución',
        position: 3,
        mostrar: true,
        key: 'institucion'
    },
    {id: 'puesto', numeric: false, disablePadding: false, label: 'Puesto', position: 4, mostrar: true, key: 'puesto'},
    {
        id: 'tipoArea',
        numeric: false,
        disablePadding: false,
        label: 'Tipo de área',
        position: 5,
        mostrar: true,
        key: 'tipoArea'
    },
    {
        id: 'contrataciones',
        numeric: false,
        disablePadding: false,
        label: 'Contrataciones públicas',
        position: 6,
        mostrar: false,
        key: 'contrataciones'
    },
    {
        id: 'concesionesLicencias',
        numeric: false,
        disablePadding: false,
        label: 'Concesiones, licencias, permisos, autorizaciones y prórrogas',
        position: 7,
        mostrar: false,
        key: 'concesionesLicencias'
    },
    {
        id: 'enajenacion',
        numeric: false,
        disablePadding: false,
        label: 'Enajenación de bienes muebles',
        position: 8,
        mostrar: false,
        key: 'enajenacion'
    },
    {
        id: 'dictamenes',
        numeric: false,
        disablePadding: false,
        label: 'Asignación y emisión de dictámenes de avalúos nacionales',
        position: 9,
        mostrar: false,
        key: 'dictamenes'
    },
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
    },
    gridTable: {
        marginBottom: '27px'
    },
    titleTable: {
        marginBottom: '61px'
    },
    desc:{
        color : theme.palette.primary.dark,
    }
});


class EnhancedTable extends React.Component {

    componentDidMount() {
        this.handleSearchAPI('FIELD_FILTER', this.props.institucion);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.institucion !== this.props.institucion) {
            this.handleSearchAPI('FIELD_FILTER', nextProps.institucion);
        }
    }


    constructor(props) {
        super(props);
        this.btnDownloadAll = React.createRef();
        this.state = {
            order: 'asc',
            orderBy: 'servidor',
            selected: [],
            nombreServidor: '',
            data: [],
            filterData: [],
            page: 0,
            rowsPerPage: 10,
            procedimiento: 0,
            open: false,
            elementoSeleccionado: {},
            institucion: null,
            loading: true,
            totalRows: 0,
            filterDataAll: [],

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
            this.handleSearchAPI('CHANGE_PAGE', this.props.institucion);
        });
    };

    handleChangeRowsPerPage = event => {
        this.setState({rowsPerPage: event.target.value}, () => {
            this.handleSearchAPI('FIELD_FILTER', null);
        });
    };

    isSelected = id => this.state.selected.indexOf(id) !== -1;

    getTotalRows = (params) => {
        let options = {
            uri: 'https://plataformadigitalnacional.org/api/reniresp?select=count=eq.exact&',
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
    handleSearchAPI = (typeSearch, inst) => {
        inst = inst ? inst : this.props.institucion;
        this.setState({loading: true});
        const URI = 'https://plataformadigitalnacional.org/api/reniresp';
        let {procedimiento, nombreServidor} = this.state;
        let params = {};

        (procedimiento && procedimiento) > 0 ? params.id_procedimiento = 'eq.' + procedimiento : null;
        inst ? params.institucion = 'eq.' + inst : null;
        nombreServidor ? params.nombre = 'like.*' + nombreServidor.toUpperCase() + '*' : null;
        (typeSearch === 'FIELD_FILTER' || typeSearch === 'CHANGE_PAGE') ? params.limit = this.state.rowsPerPage : null;
        (typeSearch === 'CHANGE_PAGE') ? params.offset = (this.state.rowsPerPage * this.state.page) : null;
        (typeSearch === 'FIELD_FILTER') ? this.getTotalRows(params) : null;


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
            }).catch(err => {
            this.setState({loading: false});
            alert("_No se pudó obtener la información");
            console.log(err);
        });

    };

    render() {
        const {classes, institucion} = this.props;
        const {data, order, orderBy, selected, rowsPerPage, page, filterData, totalRows, filterDataAll} = this.state;
        const emptyRows = rowsPerPage - filterData.length;
        return (
            <div className={classes.container}>

                    <div className={classes.tableWrapper}>
                        <DetalleServidor handleClose={this.handleClose} servidor={this.state.elementoSeleccionado}
                                         control={this.state.open}/>
                        {
                            this.state.loading &&
                            <Modal
                                open={this.state.loading}
                                disableAutoFocus={true}
                            >
                                <CircularProgress className={classes.progress} id="spinnerLoading" size={200}/>
                            </Modal>
                        }
                        <Grid container justify={'center'} spacing={0} className={classes.gridTable}>
                            <Grid item xs={12} className={classes.titleTable}>
                                <Typography variant={'title'} className={classes.title}>
                                    Detalle</Typography>
                            </Grid>
                            <Grid item xs={12} className={classes.section}>
                                <Typography variant={"h6"} className={classes.desc}>Pulsa sobre el registro para ver su detalle<br/></Typography>

                                <Table className={classes.table} aria-describedby="spinnerLoading"
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
                                                                   padding="default">{n.servidor}</TableCell>
                                                        <TableCell>{n.institucion}</TableCell>
                                                        <TableCell>{n.puesto}</TableCell>
                                                        <TableCell>{n.tipoArea}</TableCell>
                                                    </TableRow>
                                                );
                                            })}

                                    </TableBody>

                                    <TableFooter>
                                        <TableRow>

                                            <TablePagination
                                                colSpan={4}
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
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item md={3} xs={12}>
                                <BajarCSV innerRef={comp => this.btnDownloadAll = comp} data={data} filtrado={false}
                                          columnas={columnData} fnSearch={this.handleSearchAPI}
                                          fileName={'Detalle'}/>
                            </Grid>
                            <Grid item md={3} xs={12}/>
                            <Grid item md={6} xs={12}/>
                            <Grid item xs={12}>
                                <Typography variant={"caption"} style={{fontStyle:'italic'}}>Fuente: https://reniresp.funcionpublica.gob.mx/ppcapf/consulta/informacion.jsf</Typography>
                            </Grid>
                        </Grid>


                    </div>
            </div>
        );
    }
}

EnhancedTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EnhancedTable);
