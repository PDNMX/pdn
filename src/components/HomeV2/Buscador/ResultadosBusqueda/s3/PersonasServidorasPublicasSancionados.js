import React from "react";
import withStyles from "@mui/styles/withStyles";
import { Grid, Modal, CircularProgress } from "@mui/material";
import MensajeErrorDatos from "../../../../Mensajes/MensajeError";
import Previos from "../Previos";
import TablaServidoresSancionados from "../../../../Sancionados/Servidores/TablaServidoresSancionados";
import DetalleServidorSancionado from "../../../../Sancionados/Servidores//DetalleServidorSancionado";
import { makeStyles } from '@mui/styles';
import ReactGA from "react-ga";
import Chips from '../Chips';

import {ThemeProvider} from '@mui/material/styles';
import ThemeV2 from "../../../../../ThemeV2";

const axios = require("axios");

const useStyles = makeStyles(theme => ({
  formControl: {
    width: "100%",
  },
  centrado: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  progress: {
    position: "fixed",
    margin: "auto",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  desc: {
    color: theme.palette.text.contrastText,
  },
  container: {
    /* marginTop: '30px',
        marginBottom: '30px',*/
    overflowX: "auto",
  },
  section: {
    maxWidth: "1200px",
    overflowX: "auto",
    padding: theme.spacing(1),
  },
  button: {
    padding: theme.spacing(1),
    fontWeight: "bold",
  },
}));


const initialPagination = {
  page: 1,
  rowsPerPage: 10,
  totalRows: 0,
};

const initialSort = {
  campoOrden: "any",
  tipoOrden: "any",
};

export function ResultadosS3s(props) {
  const dataProps = JSON.parse(props.data);
  const data = dataProps["psp-sancionados"];
  const classes = useStyles();
  /*
  1.- Servidores publicos sancionados
  - Nombre
  - AP1
  - AP2
  - Institución
  - Tipo de sanción (select)

  */
  const initialFilter = {
    nombres: data.nombres.trim(),
    primerApellido: data.primerApellido.trim(),
    segundoApellido: data.segundoApellido.trim(),
    tipoSancion: data.tipoSancion,
    institucionDependencia: data.institucion,
    nivel: "any",
    provider: "any",
  };

  const [filterData, setFilterData] = React.useState([]);
  const [previos, setPrevios] = React.useState(null);
  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState(null);
  const [provider, setProvider] = React.useState("any");
  const [pagination, setPagination] = React.useState(initialPagination);
  const [filter, setFilter] = React.useState(initialFilter);
  const [sort, setSort] = React.useState(initialSort);
  const [view, setView] = React.useState(0);

  const [fixpaginador, setFixpaginador] = React.useState(false);

  React.useEffect(() => {
    //loadInstitutions();
    //loadProviders();
    handleSearchPrevios();
  }, []);

  React.useEffect(() => {
    if (provider !== "any") {
      setPagination({ ...pagination, page: 1 });
      setSelectedItem(null);
      handleSearchAPI();
    }
  }, [provider]);

  React.useEffect(() => {
    if (provider !== "any" && fixpaginador === true)  {
        /* setPagination({ ...pagination }); */
        setSelectedItem(null);
        handleSearchAPI();
    }
}, [fixpaginador]);

  /*   const handleCleanAll = () => {
    setFilter(initialFilter);
    setProvidersList([]);
    setPagination(initialPagination);
    setSort(initialSort);
    setFilterData(null);
    setPrevios([]);
    setInstitutionsList([]);
    setSelectedItem(null);
    setView(0);
  }; */
  const handleSearchPrevios = () => {
    ReactGA.event({ category: 'wizard_psp-sancionados', action: 'click' });
    setLoading(true);
    setFilterData([]);
    setSelectedItem(null);
    setPagination({ ...pagination, rowsPerPage: 10 });
    setProvider("any");
    

    let body = {
      query: makeFiltros(),
      /* institucion: filter.institucionDependencia, */
    };

    if (filter.nivel !== "any") body.nivel_gobierno = filter.nivel;
    if (filter.provider !== "any") body.proveedor = filter.provider.key;
    let options = {
      method: "POST",
      url: process.env.REACT_APP_S3S_BACKEND + "/api/v1/summary",
      json: true,
      data: body,
    };
    axios(options)
      .then((res) => {
        setPrevios(res.data);
        setLoading(false);
        setError(false);
        setView(1);
        setFixpaginador(false);
      })
      .catch((err) => {
        setError(true);
        setLoading(false);
      });
  };

  const makeFiltros = () => {
    /*  - Nombre
    - AP1
    - AP2
    - Institución
    - Tipo de sanción (select) */

    let filtros = {};
    if (filter.nombres) filtros.nombres = filter.nombres;
    if (filter.primerApellido) filtros.primerApellido = filter.primerApellido;
    if (filter.segundoApellido)
      filtros.segundoApellido = filter.segundoApellido;
    if (
      filter.institucionDependencia &&
      filter.institucionDependencia !== "any"
    )
      filtros.institucionDependencia = filter.institucionDependencia.nombre;
      /* filtros.institucion = filter.institucionDependencia.nombre; */

    if (filter.tipoSancion.length > 0)
      filtros.tipoSancion = filter.tipoSancion.map((item) => item.value);
    return filtros;
  };

  const makeSort = () => {
    let sort_ = {};
    if (sort.campoOrden !== "any" && sort.tipoOrden !== "any")
      sort_[sort.campoOrden.value] = sort.tipoOrden.value;
    return sort_;
  };

  const handleSearchAPI = () => {
    setLoading(true);
    let body = {
      query: makeFiltros(),
      pageSize: pagination.rowsPerPage,
      page: pagination.page,
      supplier_id: provider,
      sort: makeSort(),
    };

    let options = {
      method: "POST",
      url: process.env.REACT_APP_S3S_BACKEND + "/api/v1/search",
      json: true,
      data: body,
    };

    axios(options)
      .then((res) => {
        let resultado = res.data;
        setFilterData(resultado);
        setLoading(false);
        setPagination({
          ...pagination,
          totalRows: resultado.pagination.totalRows,
        });
        setError(false);
        setView(2);
        setFixpaginador(false);
      })
      .catch((err) => {
        setLoading(false);
        setError(true);
      });
  };

  const handleChangeAPI = (val) => {
    setProvider(val);
    setPagination({...pagination, page: 1});
  };

  const handleChangePage = (event, page) => {
    setPagination({ ...pagination, page: page + 1 });
    setFixpaginador(true);
  };

  const handleChangeRowsPerPage = (event) => {
    setPagination({ ...pagination, rowsPerPage: event.target.value, page: 1 });
    setFixpaginador(true);
  };

  const verDetalle = (event, elemento) => {
    setSelectedItem(elemento);
    setView(3);
  };

  const handleChangeDetail = () => {
    setSelectedItem(null);
    setView(2);
  };

  const returnToPrevios = () => {
    setView(1);
    setProvider("any");
  };

  return (
    <ThemeProvider theme={ThemeV2}>
      {/*Buscador*/}
      <Grid container spacing={0}>
        <Grid item xs={12}>
          {loading && (
            <Modal open={loading} disableAutoFocus={true}>
              <CircularProgress id="spinnerLoading" size={200} className={classes.progress} />
            </Modal>
          )}
          {error && <MensajeErrorDatos />}
        </Grid>
      </Grid>
      {/*PREVIOS*/}
      {view === 1 && previos && previos.length > 0 && (
        <Grid container>
          <Grid item xs={12}>
            {/* {console.log} */}
            <Chips criterios={JSON.stringify(data)}/>
            <Previos
              data={previos}
              handleChangeSujetoObligado={handleChangeAPI}
            />
          </Grid>
        </Grid>
      )}
      {/*TABLA*/}
      {view === 2 &&
        filterData &&

        selectedItem === null && (
          <Grid container>
            <Grid item xs={12}>
              <TablaServidoresSancionados
                info={filterData}
                /* page={pagination.page}
                rowsPerPage={pagination.rowsPerPage}
                totalRows={pagination.totalRows} */
                handleChangePage={handleChangePage}
                handleChangeRowsPerPage={handleChangeRowsPerPage}
                verDetalle={verDetalle}
                returnToPrevios={returnToPrevios}
              />
            </Grid>
          </Grid>
        )}
      {view === 3 && selectedItem !== null && (
        <DetalleServidorSancionado
          handleChangeDetail={handleChangeDetail}
          servidor={selectedItem}
        />
      )}
    </ThemeProvider>
  );
}

export default withStyles(useStyles, { withTheme: false })(
  ResultadosS3s
);

