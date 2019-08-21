import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import CircularProgress from '@material-ui/core/CircularProgress';
import BusquedaParticular from "./BusquedaParticular";
import DetalleParticular from "./DetalleParticular";
import Grid from "@material-ui/core/Grid/Grid";
import EnhancedTableHead from '../../Tablas/EnhancedTableHead';
import {Typography} from "@material-ui/core"
import Modal from "@material-ui/core/Modal/Modal";
import rp from "request-promise";
import MensajeNoRegistros from "../../Tablas/MensajeNoRegistros";
import MensajeErrorDatos from "../../Tablas/MensajeErrorDatos";
import Previos from "../../Tablas/Previos";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import Collapse from "@material-ui/core/Collapse";

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
        overflowX: 'auto'
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
    containerPrevios: {
        marginLeft: theme.spacing(2)
    } ,
    // informacion sobre buscar funcionario
    bullet: {
        backgroundColor: "#89d4f2",
        height: "10px",
        width: "10px",
        borderRadius: "50%",
        display: "inline-block",
        marginLeft: "-20px",
        marginRight: "10px",
        marginBottom: "1px"
    },
    ul: {
        listStyle: "none",
        //marginLeft: 0,
        paddingLeft: "20px"
    },
    infoBusqueda: {
        paddingRight: theme.spacing(1),
        paddingLeft: theme.spacing(1),
        paddingBottom: theme.spacing(4),
        paddingTop: theme.spacing(4),
        backgroundColor: theme.palette.pestanas.activa

    }, toolBarStyle: {
        backgroundColor: 'transparent',
        position: 'relative',
        zIndex: 3,
        paddingTop: '53px',
        paddingBottom: '61px',
        maxWidth: '1200px',

    },
});


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
            filterData: null,
            page: 0,
            rowsPerPage: 10,
            open: false,
            elementoSeleccionado: {},
            institucion: '',
            loading: false,
            totalRows: 0,
            filterDataAll: [],
            nivel: 'todos',
            previos: [],
            panelPrevios: true,
            api: ''
        };
    }


    handleChange = () => {
        this.setState({
            panelPrevios: !this.state.panelPrevios
        })
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

    handleSearchPrevios = () => {
        this.handleCleanTables();
        this.setState({loading: true});
        let {institucion, nombreParticular, numeroExpediente} = this.state;
        let filtros = {};
        let offset = 0;

        if (nombreParticular) filtros.nombre_razon_social = '%' + nombreParticular + '%';
        if (numeroExpediente) filtros.numero_expediente = '%' + numeroExpediente + '%';
        if (institucion && institucion !== 'TODAS') filtros.nombre = '%' + institucion + '%';


        let limit = this.state.rowsPerPage;

        let body = {
            "filtros": filtros,
            "limit": limit,
            "offset": offset,
            "nivel": this.state.nivel
        };
        let options = {
            method: 'POST',
            uri: process.env.REACT_APP_HOST_PDNBACK + '/apis/getPrevioParticularesSancionados',
            json: true,
            body: body
        };
        rp(options)
            .then(res => {
                this.setState({previos: res, loading: false, error: false})
            }).catch(err => {
            this.setState({loading: false, error: true});
        });
    };


    handleSearchAPI = (typeSearch) => {
        let {institucion, nombreParticular, numeroExpediente} = this.state;
        this.setState({loading: true});
        let filtros = {};
        let offset = 0;
        if (typeSearch !== 'ALL') {
            if (nombreParticular) filtros.nombre_razon_social = '%' + nombreParticular + '%';
            if (numeroExpediente) filtros.numero_expediente = '%' + numeroExpediente + '%';
            if (institucion && institucion !== 'TODAS') filtros.nombre = '%' + institucion + '%';

        }

        if (typeSearch === 'FIELD_FILTER' || typeSearch === 'CHANGE_PAGE') offset = (this.state.rowsPerPage * this.state.page);
        let limit = (typeSearch === 'FIELD_FILTER' || typeSearch === 'CHANGE_PAGE') ? this.state.rowsPerPage : null;

        let body = {
            "filtros": filtros,
            "limit": limit,
            "offset": offset,
            "clave_api": this.state.api
        };
        let options = {
            method: 'POST',
            uri: process.env.REACT_APP_HOST_PDNBACK + '/apis/getParticularesSancionados',
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
            }).catch(err => {
            this.setState({loading: false, error: true});
        });
    };

    handleChangeCampo = (varState, event) => {
        this.setState({
            [varState]: event ? (event.target ? event.target.value : event.value) : ''
        });
    };
    handleChangeAPI = (val) => {
        this.setState({
            api: val
        }, () => {
            this.handleSearchAPI('FIELD_FILTER')
        });
    };
    handleCleanAll = () => {
        this.setState(
            {
                filterData: null,
                previos: null,
                nivel: 'todos'
            }, () => {
                this.handleChangeCampo('nombreParticular');
                this.handleChangeCampo('institucion');
            })
    };
    handleCleanTables = () => {
        this.setState(
            {
                filterData: null,
                previos: null,
            }
        )
    }
    handleError = (val) => {
        this.setState({
            error: val
        })
    }


    render() {
        const {classes} = this.props;
        const {data, order, orderBy, selected, rowsPerPage, page, filterData, totalRows} = this.state;
        //const emptyRows = rowsPerPage - filterData.length;

        return (
            <div>
                <Grid
                    container
                    spacing={0}
                    className={classes.infoBusqueda}
                >
                    <Grid item xs={12} style={{maxWidth: 1200, margin: "0 auto"}}>
                        <Typography paragraph>
                            <b>Aquí encontrarás la siguiente información:</b>
                        </Typography>
                        <Typography component="div">
                            <ul className={classes.ul}>
                                <li className={classes.li}>
                                    <Typography>
                                        <span className={classes.bullet}/>
                                        Consulta los particulares sancionados (inhabilitados) por institución donde cometieron la falta, nombre o razón social, a nivel federal y/o estatal
                                    </Typography>
                                </li>
                                <li className={classes.li}>
                                    <Typography>
                                        <span className={classes.bullet}/>
                                        Obtén datos del particular sancionado como: nombre,  puesto, sanción y causa de la misma
                                    </Typography>
                                </li>
                                <li className={classes.li}>
                                    <Typography>
                                        <span className={classes.bullet}/>
                                        Obtén los datos de la sanción impuesta al particular como: expediente, hechos de la falta, tipo de falta, resolución, entre otros datos
                                        de interes.
                                    </Typography>
                                </li>
                            </ul>
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container justify='center' spacing={0} className={classes.gridTable}>
                    <Grid item xs={12} className={classes.toolBarStyle}>
                        <BusquedaParticular handleCleanAll={this.handleCleanAll} handleSearch={this.handleSearchPrevios}
                                            handleChangeCampo={this.handleChangeCampo} nombreParticular={this.state.nombreParticular}
                                            numeroExpediente={this.state.numeroExpediente}
                                            institucion={this.state.institucion} handleError={this.handleError} nivel={this.state.nivel}/>
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
                        {
                            this.state.error && <MensajeErrorDatos/>
                        }
                    </Grid>
                    <Grid item xs={12} className={classes.section}>
                        {this.state.previos && this.state.previos.length > 0 &&
                        <div>
                            <FormControlLabel
                                control={<Switch className={classes.containerPrevios} checked={this.state.panelPrevios}
                                                 onChange={() => this.handleChange()}/>}
                                label={
                                    <Typography variant="h6" className={classes.desc}>
                                        {this.state.panelPrevios ? 'Ocultar resultados generales' : 'Mostrar resultados generales'}</Typography>}
                            />
                            <div className={classes.container}>
                                <Collapse in={this.state.panelPrevios}>
                                    <Previos previos={this.state.previos} handleChangeAPI={this.handleChangeAPI}/>
                                </Collapse>

                            </div>
                        </div>
                        }

                    </Grid>
                    <Grid item xs={12} className={classes.section}>
                        {(!filterData || filterData.length <= 0) &&
                        <MensajeNoRegistros/>
                        }

                    </Grid>
                    <Grid item xs={12} className={classes.section}>
                        {filterData && filterData.length > 0 &&
                        <Typography variant="h6" className={classes.desc}>Pulsa sobre el registro para ver su
                            detalle<br/></Typography>
                        }
                    </Grid>
                    <Grid item xs={12} className={classes.section}>
                        {filterData && filterData.length > 0 &&
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
                                    {/*emptyRows > 0 && (
                                        <TableRow style={{height: 49 * emptyRows}}>
                                            <TableCell colSpan={4}/>
                                        </TableRow>
                                    )*/}
                                </TableBody>

                                <TableFooter>
                                    <TableRow>
                                        {/* <TableCell>
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

                                        */}
                                        <TablePagination
                                            className={classes.tablePagination}
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
                        </div>
                        }

                    </Grid>

                    <Grid item xs={12} className={classes.section}>
                        {
                            this.state.nivel !== 'estatal' &&
                            <Typography variant={"caption"} style={{fontStyle: 'italic'}}>Nota:
                                Este buscador mostrará en su primera etapa, solamente datos de carácter público,
                                proporcionados por la Secretaría de la Función Pública, relativos a
                                sanciones impuestas a personas físicas o morales, por infracciones a la Ley de
                                Adquisiciones, Arrendamientos y Servicios del Sector Público, Ley de
                                Obras Públicas y Servicios Relacionados con las Mismas, y Ley de Asociaciones Público
                                Privadas.
                            </Typography>
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
