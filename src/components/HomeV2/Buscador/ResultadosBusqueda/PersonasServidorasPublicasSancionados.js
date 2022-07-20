import React from "react";
import withStyles from "@mui/styles/withStyles";
import { Grid, Modal, CircularProgress } from "@mui/material";
import MensajeErrorDatos from "../../../Mensajes/MensajeError";
import Previos from "../../../Compartidos/Previos";
import TablaServidoresSancionados from "../../../Sancionados/Servidores/TablaServidoresSancionados";
import DetalleServidorSancionado from "../../../Sancionados/Servidores//DetalleServidorSancionado";

//import ReactGA from "react-ga";

const axios = require("axios");

const styles = (theme) => ({
  formControl: {
    width: "100%",
  },
  "&$focus": {
    //color: theme.palette.black.color,
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
});

const initialPagination = {
  page: 1,
  rowsPerPage: 10,
  totalRows: 0,
};

const initialSort = {
  campoOrden: "any",
  tipoOrden: "any",
};

export function ResultadosPersonasServidorasPublicasSancionados(props) {
  const data = JSON.parse(props.data);
  /*
  1.- Servidores publicos sancionados
  - Nombre
  - AP1
  - AP2
  - Institución
  - Tipo de sanción (select)

  console.log(data.nombres);
  console.log(data.primerApellido);
  console.log(data.segundoApellido);
  console.log(data.institucion);
  console.log(data.tipoSancion); 
  */
  const initialFilter = {
    nombres: data.nombres,
    primerApellido: data.primerApellido,
    segundoApellido: data.segundoApellido,
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

  React.useEffect(() => {
    //loadInstitutions();
    //loadProviders();
    handleSearchPrevios();
    
  }, []);

 /*  React.useEffect(() => {
    loadInstitutions();
    loadProviders();
  }, [filter?.nivel]);

  React.useEffect(() => {
    loadInstitutions();
  }, [filter?.provider]); */

  React.useEffect(() => {
    if (provider !== "any") {
      setPagination({ ...pagination, page: 1 });
      setSelectedItem(null);
      handleSearchAPI();
    }
  }, [provider]);

/*   const loadInstitutions = () => {
    let sug = [];
    let options = {
      url: process.env.REACT_APP_S3S_BACKEND + "/api/v1/entities",
      json: true,
      method: "post",
      data: {},
    };
    if (filter.nivel !== "any") options.data.nivel_gobierno = filter.nivel;
    if (filter.provider !== "any")
      options.data.supplier_id = filter.provider.key;

    axios(options)
      .then((data) => {
        data.data.forEach((item, index) => {
          sug.push({ value: item.nombre, label: item.nombre, key: index });
        });
        setInstitutionsList(sug);
        setFilter({ ...filter, institucionDependencia: "any" });
      })
      .catch((err) => {
        setError(true);
      });
  }; */

/*   const loadProviders = () => {
    let sug = [];
    let options = {
      url: process.env.REACT_APP_S3S_BACKEND + "/api/v1/getProviders",
      json: true,
      method: "post",
      data: {},
    };
    if (filter.nivel !== "any") options.data.nivel_gobierno = filter.nivel;
    axios(options)
      .then((data) => {
        data.data.forEach((provider) => {
          sug.push({
            value: provider.supplier_id,
            label: provider.supplier_name,
            key: provider.supplier_id,
          });
        });
        setProvidersList(sug);
        setProvider("any");
      })
      .catch((err) => {
        setError(true);
      });
  }; */

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
    //ReactGA.event({category: 'busqueda-s3SP', action: 'click'});
    setLoading(true);
    setFilterData([]);
    setSelectedItem(null);
    setPagination({ ...pagination, rowsPerPage: 10 });
    setProvider("any");
    
    let body = {
      query: makeFiltros(),
      institucion: filter.institucionDependencia,
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
      filtros.institucionDependencia = filter.institucionDependencia;
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
        setFilterData(resultado.results);
        setLoading(false);
        setPagination({
          ...pagination,
          totalRows: resultado.pagination.totalRows,
        });
        setError(false);
        setView(2);
      })
      .catch((err) => {
        setLoading(false);
        setError(true);
      });
  };

  const handleChangeAPI = (val) => {
    setProvider(val);
  };

  const handleChangePage = (event, page) => {
    setPagination({ ...pagination, page: page + 1 });
  };

  const handleChangeRowsPerPage = (event) => {
    setPagination({ ...pagination, rowsPerPage: event.target.value, page: 1 });
  };

  const verDetalle = (event, elemento) => {
    setSelectedItem(elemento);
    setView(3);
    setProvider("any");
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
      <React.Fragment>
        {/*Buscador*/}
        <Grid container spacing={0}>
          <Grid item xs={12}>
            {loading && (
              <Modal open={loading} disableAutoFocus={true}>
                <CircularProgress id="spinnerLoading" size={200} />
              </Modal>
            )}
            {error && <MensajeErrorDatos />}
          </Grid>
        </Grid>
        {/*PREVIOS*/}
        {view === 1 && previos && previos.length > 0 && (
          <Grid container>
            <Grid item xs={12}>
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
          filterData.length > 0 &&
          selectedItem === null && (
            <Grid container>
              <Grid item xs={12}>
                <TablaServidoresSancionados
                  data={filterData}
                  page={pagination.page}
                  rowsPerPage={pagination.rowsPerPage}
                  totalRows={pagination.totalRows}
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
      </React.Fragment>
  );
}

export default withStyles(styles, { withTheme: false })(
  ResultadosPersonasServidorasPublicasSancionados
);
