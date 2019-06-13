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
import CircularProgress from '@material-ui/core/CircularProgress';
import BajarCSV from "../../Tablas/BajarCSV";
import BusquedaParticular from "./BusquedaParticular";
import DetalleParticular from "./DetalleParticular";
import Grid from "@material-ui/core/Grid/Grid";
import EnhancedTableHead from '../../Tablas/EnhancedTableHead';
import Typography from "@material-ui/core/Typography/Typography";
import Modal from "@material-ui/core/Modal/Modal";
import rp from "request-promise";

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
    {id: 'plazo', disablePadding: false, label: 'Plazo', position: 9, mostrar: false},
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
        padding: theme.spacing(1)
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
        padding: theme.spacing(1),
    },
    toolBarStyle: {
        backgroundColor: 'transparent',
        position: 'relative',
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
    const {classes, handleChangeCampo, nombreParticular, numeroExpediente, institucion, handleCleanAll, handleSearch} = props;
    return (
        <Toolbar className={classes.toolBarStyle}>
            <BusquedaParticular handleCleanAll={handleCleanAll} handleSearch={handleSearch}
                                handleChangeCampo={handleChangeCampo} nombreParticular={nombreParticular}
                                numeroExpediente={numeroExpediente}
                                institucion={institucion}/>

        </Toolbar>
    );
};

EnhancedTableToolbar.propTypes = {
    classes: PropTypes.object.isRequired
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);


class EnhancedTable extends React.Component {

    constructor(props) {
        super(props);
        this.child = React.createRef();
        this.btnDownloadAll = React.createRef();
        this.state = {
            order: 'asc',
            orderBy: 'proveedor',
            selected: [],
            nombreParticular: '',
            numeroExpediente: '',
            data: [],
            filterData: [],
            page: 0,
            rowsPerPage: 10,
            open: false,
            elementoSeleccionado: {},
            institucion: '',
            loading: false,
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

    handleSearchAPI = (typeSearch) => {
        let {institucion, nombreParticular, numeroExpediente} = this.state;
        this.setState({loading: true});
        let filtros = {};
        let offset = 0;
        if (typeSearch !== 'ALL') {
            if (nombreParticular) filtros.nombre_razon_social = '%' + nombreParticular + '%';
            if (numeroExpediente) filtros.numero_expediente = '%' + numeroExpediente + '%';
            if (institucion && institucion!== 'TODAS') filtros.nombre = '%' + institucion + '%';

        }

        if (typeSearch === 'FIELD_FILTER' || typeSearch === 'CHANGE_PAGE') offset = (this.state.rowsPerPage * this.state.page);
        let limit = (typeSearch === 'FIELD_FILTER' || typeSearch === 'CHANGE_PAGE') ? this.state.rowsPerPage : null;

        let body = {
            "filtros": filtros,
            "limit" : limit,
            "offset" : offset
        };
        let options = {
            method : 'POST',
            uri: process.env.REACT_APP_HOST_PDNBACK+'/apis/getParticularesSancionados',
            json: true,
            body: typeSearch==='ALL'?{}:body
        };
        rp(options)
            .then(res => {
                let dataAux = res.data;
                let total = res.totalRows;
                typeSearch === 'ALL' ? this.setState({data: dataAux, loading: false}, () => {
                    this.btnDownloadAll.triggerDown();
                }) : (typeSearch === 'FIELD_FILTER' || typeSearch === 'CHANGE_PAGE') ? this.setState({
                        filterData: dataAux,
                        loading: false,
                        totalRows : total
                    }) :
                    this.setState({filterDataAll: dataAux, loading: false, totalRows : total}, () => {
                        this.child.triggerDown();
                    });
            }).catch(err => {
            this.setState({loading: false});
            alert("_No se puedó obtener la información");
            console.log(err);
        });
    };

    handleChangeCampo = (varState, event) => {
        this.setState({
            [varState]: event ? (event.target ? event.target.value : event.value) : ''
        });
    };
    handleCleanAll = () => {
        this.setState(
            {
                filterData: []
            }, () => {
                this.handleChangeCampo('nombreParticular');
                this.handleChangeCampo('institucion');
            })
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
                                              handleCleanAll={this.handleCleanAll}
                                              handleSearch={this.handleSearchAPI}
                                              nombreParticular={this.state.nombreParticular}
                                              numeroExpediente={this.state.numeroExpediente}
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
                        {filterData.length > 0 &&
                        <Typography variant="h6" className={classes.desc}>Pulsa sobre el registro para ver su
                            detalle<br/></Typography>
                        }
                    </Grid>
                    <Grid item xs={12}>
                        {filterData.length > 0 &&
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
                                                    <TableCell component="th" scope="row" style={{width: '25%'}}
                                                               padding="default">{n.nombre_razon_social}</TableCell>
                                                    <TableCell>{n.institucion_dependencia.nombre}</TableCell>
                                                    <TableCell>{n.numero_expediente}</TableCell>
                                                    <TableCell>{n.resolucion.sentido}</TableCell>
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
                                            <BajarCSV innerRef={comp => this.btnDownloadAll = comp} data={data}
                                                      filtrado={false}
                                                      columnas={columnData} fnSearch={this.handleSearchAPI}
                                                      fileName={'Particulares sancionados'}/>
                                        </TableCell>
                                        <TableCell>
                                            <BajarCSV innerRef={comp => this.child = comp} data={filterDataAll}
                                                      filtrado={true}
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
                        }

                    </Grid>
                    <Grid item xs={12} className={classes.item}>
                        {filterData.length > 0 &&
                        <Typography variant={"caption"} style={{fontStyle: 'italic'}}>Fuente:
                            https://datos.gob.mx/busca/dataset/proveedores-y-contratistas-sancionados</Typography>
                        }

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
