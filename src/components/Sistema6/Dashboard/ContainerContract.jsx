import React, { useState, useEffect, useRef } from "react";
import { Grid, Typography, Box } from "@mui/material";
import withStyles from "@mui/styles/withStyles";
import axios from "axios";
import TotalProcedimientos from "./Components/TotalProcedimientos";
import TotalPorEstado from "./Components/TotalPorEstado";
import TotalTipo from "./Components/TotalTipo";
import TotalMonto from "./Components/TotalMonto";
import TablaResultados from "./Components/TablaResultados";
import SearchButtons from "./Components/SearchButtons";
import FooterPage from "./FooterPage";
import IconoS6 from "../../../assets/rediseno2023/imgs/iconos/sistemas/ico_s6.svg";
import { estadosData, getTotalData } from "./mockData";
import { useFetchApi } from "../../Utils/apiContratos";
import { set } from "react-hook-form";


const styles = (theme) => ({
  root: {
    padding: theme.spacing(3),
    marginBottom: theme.spacing(0),
    minHeight: "100vh",
    background: "linear-gradient(135deg, #F5F7FA 0%, #f6fcff 100%)",
  },
  title: {
    color: "#42a5cc",
    marginBottom: theme.spacing(3),
    fontWeight: 500,
    textShadow: "1px 1px 2px rgba(0,0,0,0.1)",
  },
  gridContainer: {
    padding: theme.spacing(2),
  },
  logo: {
    maxWidth: "180px",
  },
  logoTitulo: {
    marginLeft: theme.spacing(13),
    color: "#1b6887",
  },
});

const ContainerContract = ({ classes }) => {
  const [selectedState, setSelectedState] = useState("todos");
  const [currentData, setCurrentData] = useState(getTotalData());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useState({
    supplier: "",
    institution: "",
    state: "todos",
    contractType: "",
    searchId: "",
  });

  const isMounted = useRef(true); // Usamos useRef para controlar el estado de montaje

  // Tercer efecto para llamar a la API y mostrar datos en la consola
  const [estadosData, setEstadosData] = useState([]);
  /* useEffect(() => {
    const fetchEstadosData = async () => {
      try {
        const response = await axios.get(
          "https://dev-tablero-contrataciones.plataformadigitalnacional.org/back/api/stats/regions"
        );
        const estados = response.data.results.map((result) => ({
          id: result.region,
          name: result.region,
        }));
        setEstadosData(estados);
        console.log("Estados obtenidos de la API:", estados);
      } catch (error) {
        console.error("Error al llamar la API:", error);
      }
    };

    fetchEstadosData();
  }, []);  */// El segundo argumento [] asegura que solo se ejecute una vez al montar el componente

  // Cuarto efecto para llamar a la API y mostrar totalRecords en la consola
  /* useEffect(() => {
    const fetchTotalProcedimientos = async () => {
      try {
        const response = await axios.get(
          "https://dev-tablero-contrataciones.plataformadigitalnacional.org/back/api/stats/totalRecords"
        );
        console.log("Datos de la API MontoTotal:", response.data);
      } catch (error) {
        console.error("Error al llamar la API:", error);
      }
    };

    fetchTotalProcedimientos();
  }, []);  */// El segundo argumento [] asegura que solo se ejecute una vez al montar el componente

  // Función para obtener datos según el estado seleccionado
  const getStateData = () => {
    if (selectedState === "todos") {
      return getTotalData();
    }
    return (
      estadosData.find((estado) => estado.id === selectedState) ||
      getTotalData()
    );
  };

  // Función para manejar la búsqueda
  const handleSearch = async (searchCriteria) => {
    setLoading(true);
    setError(null);

    try {
      let queryParams = {};

      switch (searchCriteria.type) {
        case "supplier":
          setSearchParams((prev) => ({
            ...prev,
            supplier: searchCriteria.value,
            institution: "",
          }));
          queryParams = { supplier_id: searchCriteria.value };
          break;
        case "institution":
          setSearchParams((prev) => ({
            ...prev,
            institution: searchCriteria.value,
          }));
          queryParams = {
            supplier_id: searchCriteria.supplier,
            buyer_id: searchCriteria.value,
          };
          break;
        case "state":
          setSearchParams((prev) => ({ ...prev, state: searchCriteria.value }));
          setSelectedState(searchCriteria.value);
          return setCurrentData(getStateData()); // Para estados usamos los datos mock
        case "contractType":
          setSearchParams((prev) => ({
            ...prev,
            contractType: searchCriteria.value,
          }));
          queryParams = {
            procurement_method: searchCriteria.value,
            ...(searchParams.supplier && {
              supplier_id: searchParams.supplier,
            }),
            ...(searchParams.institution && {
              buyer_id: searchParams.institution,
            }),
          };
          break;
        case "searchId":
          setSearchParams((prev) => ({
            ...prev,
            searchId: searchCriteria.value,
          }));
          queryParams = { search_id: searchCriteria.value };
          break;
        default:
          break;
      }

      // Solo hacer la llamada API si tenemos parámetros de búsqueda
      if (Object.keys(queryParams).length > 0) {
        const response = await axios.post(
          `${process.env.REACT_APP_S6_BACKEND}/api/v1/search`,
          queryParams
        );

        if (response.data && response.data.data) {
          // Actualizar los totales y la tabla con los datos de la API
          const apiData = {
            ...currentData, // Mantener la estructura existente
            contratos: response.data.data, // Actualizar los contratos
            totalCases: response.data.data.length,
            monto: response.data.data.reduce(
              (sum, contract) => sum + (contract.monto || 0),
              0
            ),
            uniqueEstado: [
              ...new Set(response.data.data.map((contract) => contract.estado)),
            ].length,
            uniqueTipo: [
              ...new Set(response.data.data.map((contract) => contract.tipo)),
            ].length,
          };
          setCurrentData(apiData);
        }
      }
    } catch (err) {
      setError(err.message);
      console.error("Error en la búsqueda:", err);
    } finally {
      setLoading(false);
    }
  };

  // Efecto para manejar cambios en el estado seleccionado
  useEffect(() => {
    if (selectedState !== searchParams.state) {
      setCurrentData(getStateData());
    }
  }, [selectedState]);

  // Efecto para hacer la búsqueda inicial al cargar el componente
  useEffect(() => {
    isMounted.current = true;
    const fetchInitialData = async () => {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_S6_BACKEND}/api/v1/search`,
          { page: 1, pageSize: 10 }
        );

        if (response.data && response.data.data && isMounted.current) {
          const initialData = {
            ...getTotalData(),
            contratos: response.data.data,
          };
          setCurrentData(initialData);
        }
      } catch (err) {
        if (isMounted.current) {
          console.error("Error al cargar datos iniciales:", err);
        } 
      }
    };

    fetchInitialData();
    return () => {
      isMounted.current = false; // Al desmontar el componente, cambiamos el estado de montaje
    }
  }, []);

  // Función para limpiar filtros
  const handleClearFilters = () => {
    setSearchParams({
      supplier: "",
      institution: "",
      state: "todos",
      contractType: "",
      searchId: "",
    });
    setSelectedState("todos");
    setCurrentData(getTotalData());
  };

  // Ejemplo de uso:
  /**/

  const [regions , setRegions] = useState([]);
  const { execute, loading: api_loading, error: api_error } = useFetchApi();


  // ESTADOS
  const handleFetch = async () => {
    try {
      const data = await execute("/stats/regions", {
      });
      if (isMounted.current) {
        console.log("newAPI", data);
        setRegions(data.results);
      }
    } catch (err) {
      if (isMounted.current) {
        console.error(err);
      }
    }
  };


  // TOTAL DE PROCEDIMIENTOS
  const [totalRecords, setTotalRecords] = useState([]);
  const handleTotalProcedimientosFetch = async () => {
    try {
      const data = await execute("/stats/totalRecords", { 
        region: selectedState
      });
      if (isMounted.current) {
        console.log("totalRecords", data);
        setTotalRecords(data.totalProcedimientos);
      }
    } catch (err) {
      if (isMounted.current) {
        console.error(err);
      }
    }
  };

  // MONTO TOTAL DE CONTRATACIONES: GENERAL
  const [montoTotalContratos, setMontoTotalContratos] = useState([]);
  const handlemontoTotalContratosFetch = async () => {
    try {
      const data = await execute("/stats/montoTotalContratos", {
        region: selectedState
      });
      if (isMounted.current) {
        console.log("montoTotalContratos", data);
        setMontoTotalContratos(data.montoTotalContratos);
      }
    } catch (err) {
      if (isMounted.current) {
        console.error(err);
      }
    }
  };
  

  // MONTO TOTAL DE CONTRATACIONES: PÚBLICA, RESTRINGIDA, DIRECTA 
  const [montoProcurementMethod, setMontoProcurementMethod] = useState([]);
  const handleMontoProcurementMethodFetch = async () => {
    try {
      const data = await execute("/stats/montoProcurementMethod", {
        region: selectedState
      });
      if (isMounted.current){
        console.log("montoProcurementMethod", data);
        setMontoProcurementMethod(data.montoProcurementMethod);
      }
    } catch (err) {
      if (isMounted.current){
        console.error(err);
      }
    }
  };


  //TIPOS DE PROCEDIMIENTOS
  const [totalProcurementMethod, setTotalProcurementMethod] = useState([]);
  const handletotalProcurementMethodFetch = async () => {
    try {
      const data = await execute("/stats/totalProcurementMethod", {
        region: selectedState
      });
      if (isMounted.current) {
        console.log("totalProcurementMethod", data);
      setTotalProcurementMethod(data.totalProcurementMethod);
      }
    } catch (err) {
      if (isMounted.current) {
        console.error(err);
      }
    }
  };

  // TABLA DE RESULTADOS
  const [records, setRecords] = useState([]);
  const handrecordsFetch = async () => {
    try {
      const data = await execute("/records", {
        region: selectedState
      });
      if (isMounted.current) {
        console.log("records", data);
        console.log("records", data.results);
        setRecords(data.results);
      }    
    } catch (err) {
      if (isMounted.current) {
        console.error(err);
      }
    }
  };

  useEffect(() => {
    isMounted.current = true;
    handrecordsFetch();
    return () => {
      isMounted.current = false; // Al desmontar el componente, cambiamos el estado de montaje
    }
  }, [selectedState]); // El segundo argumento [] asegura que solo se ejecute una vez al montar el componente 


  useEffect(() => { 
    isMounted.current = true;    
    handletotalProcurementMethodFetch();
    return () => {
      isMounted.current = false; 
    }
  }, [selectedState]); // El segundo argumento [] asegura que solo se ejecute una vez al montar el componente


  useEffect(() => {
    isMounted.current = true;
    handleMontoProcurementMethodFetch();
    return () => {
      isMounted.current = false;
    }
  }, [selectedState]); // El segundo argumento [] asegura que solo se ejecute una vez al montar el componente


  useEffect(() => {
    isMounted.current = true;
    handlemontoTotalContratosFetch();
    return () => {
      isMounted.current = false;
    }
  }, [selectedState]); // El segundo argumento [] asegura que solo se ejecute una vez al montar el componente  


  useEffect(() => {
    isMounted.current = true;
    handleTotalProcedimientosFetch();
    return () => {
      isMounted.current = false;
    }
  }, [selectedState]); // El segundo argumento [] asegura que solo se ejecute una vez al montar el componente


  useEffect(() => {
    isMounted.current = true;
    handleFetch();
    return () => {
      isMounted.current = false;
    }
  }, []); // El segundo argumento [] asegura que solo se ejecute una vez al montar el componente

  
  /* return (
    <div>
      {loading && <p>Cargando...</p>}
      {error && <p>Error: {error.message}</p>}
      <button onClick={handleFetch}>Obtener datos</button>
    </div>
  ); */

  return (
    <div className={classes.root}>
      <div className={classes.logoTitulo}>Plataforma Digital Nacional</div>
      <Box align="center">
        <img src={IconoS6} className={classes.logo} alt={"Sistema 6"} />
      </Box>
      <Typography variant="h4" align="center" className={classes.title}>
        Tablero de Seguimiento a la contratación pública
      </Typography>

      <Grid container spacing={3} className={classes.gridContainer}>
        <Grid item xs={12} sm={12} md={4}>
          <TotalProcedimientos totalCases={totalRecords} />
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TotalMonto totalMonto={montoTotalContratos} montoProcurementMethod={montoProcurementMethod} />
        </Grid>
        {/* <Grid item xs={12} sm={12} md={3}>
          <TotalPorEstado totalEstado={currentData.uniqueEstado} />
        </Grid> */}
        <Grid item xs={12} sm={12} md={4}>
          <TotalTipo totalProcurementMethod={totalProcurementMethod} />
        </Grid>
        <Grid item xs={12}>
          <SearchButtons
            selectedState={selectedState}
            setSelectedState={setSelectedState}
            estados={regions}
            onSearch={handleSearch}
            onClearFilters={handleClearFilters}
            searchParams={searchParams}
          />
        </Grid>
        <Grid item xs={12}>
          <TablaResultados
            selectedState={selectedState}
            currentData={records}
            loading={loading}
            error={error}
          />
        </Grid>
        <Grid item xs={12}>
          <FooterPage
            dataSet="Sistema de información pública de contrataciones"
            provider="Plataforma Digital Nacional"
            referenceDate={new Date().toLocaleDateString("es-MX")}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default withStyles(styles)(ContainerContract);
