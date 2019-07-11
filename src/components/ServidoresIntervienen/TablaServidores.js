import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Toolbar from '@material-ui/core/Toolbar';
import BusquedaServidor from "./BusquedaServidor";
import DetalleServidor from "./DetalleServidor";
import rp from "request-promise";
import CircularProgress from '@material-ui/core/CircularProgress';
import BajarCSV from "../Tablas/BajarCSV";
import Grid from "@material-ui/core/Grid/Grid";
import EnhancedTableHead from '../Tablas/EnhancedTableHead';
import {Typography} from "@material-ui/core"
import Modal from "@material-ui/core/Modal/Modal";
import TableFooter from "@material-ui/core/TableFooter";
import MensajeNoRegistros from "../Tablas/MensajeNoRegistros";
import MensajeErrorDatos from "../Tablas/MensajeErrorDatos";


function getSorting(order, orderBy) {
    return order === 'desc'
        ? (a, b) => (b[orderBy] < a[orderBy] ? -1 : 1)
        : (a, b) => (a[orderBy] < b[orderBy] ? -1 : 1);
}

const columnData = [
    {
        id: 'servidor',
        disablePadding: false,
        label: 'Servidor público',
        position: 2,
        mostrar: true,
        key: 'servidor'
    },
    {
        id: 'institucion',
        disablePadding: false,
        label: 'Institución',
        position: 3,
        mostrar: true,
        key: 'institucion'
    },
    {id: 'puesto', disablePadding: false, label: 'Puesto', position: 4, mostrar: true, key: 'puesto'},
    {
        id: 'tipoArea',
        disablePadding: false,
        label: 'Tipo de área',
        position: 5,
        mostrar: false,
        key: 'tipoArea'
    },
    {
        id: 'contrataciones',
        disablePadding: false,
        label: 'Contrataciones públicas',
        position: 6,
        mostrar: false,
        key: 'contrataciones'
    },
    {
        id: 'concesionesLicencias',
        disablePadding: false,
        label: 'Concesiones, licencias, permisos, autorizaciones y prórrogas',
        position: 7,
        mostrar: false,
        key: 'concesionesLicencias'
    },
    {
        id: 'enajenacion',
        disablePadding: false,
        label: 'Enajenación de bienes muebles',
        position: 8,
        mostrar: false,
        key: 'enajenacion'
    },
    {
        id: 'dictamenes',
        disablePadding: false,
        label: 'Asignación y emisión de dictámenes de avalúos nacionales',
        position: 9,
        mostrar: false,
        key: 'dictamenes'
    },
    {
        id: 'tipoProcedimiento',
        disablePadding: false,
        label: 'Tipo procedimiento',
        position: 10,
        mostrar: true,
        key: 'tipoProcedimiento'
    }
];

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing(3),
    },
    tableWrapper: {
        //overflowX: 'auto',
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
        bottom: 0,
        lineHeight: 0
    },
    container: {
        marginTop: '30px',
        marginBottom: '30px',
        overflowX: 'auto',
        //width: '90%'
    },
    table: {
        tableLayout: 'fixed',
    },
    gridTable: {
        marginBottom: '27px'
    },
    desc: {
        color: theme.palette.primary.dark,
    },
    item: {
        padding: theme.spacing(1),
        maxWidth: 1200
    }

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
    const {classes, handleChangeCampo, handleCleanAll, nombreServidor, apellidoUno, apellidoDos, procedimiento, institucion, handleSearch,handleError} = props;
    return (
        <Toolbar className={classes.toolBarStyle}>
            <BusquedaServidor handleCleanAll={handleCleanAll} handleSearch={handleSearch}
                              handleChangeCampo={handleChangeCampo}
                              nombreServidor={nombreServidor} apellidoUno={apellidoUno} apellidoDos={apellidoDos}
                              procedimiento={procedimiento}
                              institucion={institucion} handleError={handleError}/>
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
            orderBy: 'servidor',
            selected: [],
            nombreServidor: '',
            apellidoUno: '',
            apellidoDos: '',
            data: [],
            filterData: null,
            page: 0,
            rowsPerPage: 10,
            procedimiento: null,
            open: false,
            elementoSeleccionado: {},
            institucion: null,
            loading: false,
            totalRows: 0,
            filterDataAll: [],
            error : false

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
        this.setState({loading: true}, () => {
            let {procedimiento, institucion, nombreServidor, apellidoUno, apellidoDos} = this.state;

            let filtros = {};
            let offset = 1;

            if (typeSearch !== 'ALL') {
                if(procedimiento) filtros.tipo_actos = procedimiento;
                if (institucion) filtros.institucion = '%' + institucion + '%';
                if (nombreServidor) filtros.nombres = '%' + nombreServidor.toUpperCase() + '%';
                if (apellidoUno) filtros.primer_apellido = '%' + apellidoUno.toUpperCase() + '%';
                if (apellidoDos) filtros.segundo_apellido = '%' + apellidoDos.toUpperCase() + '%';

            }

            let limit = (typeSearch === 'FIELD_FILTER' || typeSearch === 'CHANGE_PAGE') ? this.state.rowsPerPage : null;
            if (typeSearch === 'CHANGE_PAGE') offset = (this.state.rowsPerPage * this.state.page);

            let body = {
                "filtros": filtros,
                "limit": limit,
                "offset": offset
            }


            let options = {
                method: 'POST',
                uri: process.env.REACT_APP_HOST_PDNBACK + '/apis/s2/getSPC',
                json: true,
                body: typeSearch === 'ALL' ? {} : body
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
                            totalRows: total
                        }) :
                        this.setState({filterDataAll: dataAux, loading: false, totalRows: total}, () => {
                            this.child.triggerDown();
                        });
                    return true;
                }).catch(err => {
                this.setState({loading: false, error:true});
                console.log(err);
            });
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
                filterData: null,
                error : false
            }, () => {
                this.handleChangeCampo('nombreServidor');
                this.handleChangeCampo('procedimiento');
                this.handleChangeCampo('institucion');
            })
    };

    handleError = (val )=>{
        this.setState({
            error : val
        })
    }

    render() {
        const {classes} = this.props;
        const {data, order, orderBy, selected, rowsPerPage, page, filterData, totalRows, filterDataAll} = this.state;
        const emptyRows = rowsPerPage - (filterData?filterData.length:0);

        return (
            <div>
                <Grid container justify='center' className={classes.gridTable}>
                    <Grid item xs={12}>
                        <EnhancedTableToolbar categoria={this.state.categoria}
                                              handleChangeCampo={this.handleChangeCampo}
                                              handleCleanAll={this.handleCleanAll}
                                              handleSearch={this.handleSearchAPI}
                                              nombreServidor={this.state.nombreServidor}
                                              procedimiento={this.state.procedimiento} data={filterData}
                                              columnas={columnData} institucion={this.state.institucion}
                                              handleError = {this.handleError}/>
                    </Grid>
                    <Grid item xs={12}>
                        <DetalleServidor handleClose={this.handleClose} servidor={this.state.elementoSeleccionado}
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
                        {
                            this.state.error &&
                            <MensajeErrorDatos/>}
                    </Grid>
                    <Grid item xs={12}>
                        {filterData && filterData.length > 0 &&
                        <Typography variant="h6" className={classes.desc} paragraph>Pulsa sobre el registro para ver su
                            detalle</Typography>
                        }
                    </Grid>
                    <Grid item xs={12}>
                        {filterData && filterData.length > 0 &&
                        <div className={classes.container}>
                            <Table aria-describedby="spinnerLoading" id={'tableServidores'}
                                   aria-busy={this.state.loading} aria-labelledby="tableTitle"
                            >
                                <EnhancedTableHead
                                    numSelected={selected.length}
                                    order={order}
                                    orderBy={orderBy}
                                    onSelectAllClick={this.handleSelectAllClick}
                                    onRequestSort={this.handleRequestSort}
                                    rowCount={data.length}
                                    columnData={columnData}
                                />
                                <TableBody>
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
                                                               padding="default">{n.nombre +  " "+ n.apellidoUno+ " "+ n.apellidoDos}</TableCell>
                                                    <TableCell>{n.institucion.nombre}</TableCell>
                                                    <TableCell>{n.puesto.nombre}</TableCell>
                                                    <TableCell>{n.tipo_actos}</TableCell>
                                                </TableRow>
                                            );
                                        })}
                                    {/*emptyRows > 0 && (
                                        <TableRow style={{height: 49 * emptyRows}}>
                                            <TableCell colSpan={4}/>
                                        </TableRow>
                                    )*/}

                                </TableBody>

                                <TableFooter>
                                    <TableRow>
                                        <TableCell> <BajarCSV innerRef={comp => this.btnDownloadAll = comp} data={data}
                                                              filtrado={false}
                                                              columnas={columnData} fnSearch={this.handleSearchAPI}
                                                              fileName={'ServidoresAll'}/></TableCell>
                                        <TableCell>
                                            <BajarCSV innerRef={comp => this.child = comp} data={filterDataAll}
                                                      filtrado={true}
                                                      columnas={columnData} fnSearch={this.handleSearchAPI}
                                                      fileName={'ServidoresFilter'}/>
                                        </TableCell>
                                        <TablePagination
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
                    <Grid item xs={12}>
                        {
                            filterData && filterData.length==0 &&
                            <MensajeNoRegistros/>
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
