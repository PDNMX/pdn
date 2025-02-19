import React from 'react';
import { withStyles } from '@mui/styles';
import TablaResultados from './TablaResultados';
import SearchButtons from './SearchButtons';
import axios from 'axios';
import Box from '@mui/material/Box';

const styles = () => ({
  root: {
    flexGrow: 1
  }
});

const BusquedaTablero = props => {
  const [state, setState] = React.useState({
    dataSupplier: 'SHCP',
    inputText: '',
    pagination: {
      pageSize: 10,
      page: 0,
      total: 0
    },
    results: [],
    loading: false,
    buyers: [],
    buyer_id: 'any',
    procurementMethod: 'any',
    supplierName: '',
    cycle: 'any',
    cycles: []
  });

  // Efecto inicial para cargar datos
  React.useEffect(() => {
    const fetchInitialData = async () => {
      const supplier_id = props.dataSupplier;

      try {
        const [buyersRes, searchRes, cyclesRes] = await Promise.all([
          axios({
            url: `${process.env.REACT_APP_S6_BACKEND}/api/v1/buyers`,
            params: { supplier_id },
            method: 'GET',
            json: true
          }),
          axios({
            url: `${process.env.REACT_APP_S6_BACKEND}/api/v1/search`,
            params: { supplier_id },
            method: 'POST',
            json: true
          }),
          axios({
            url: `${process.env.REACT_APP_S6_BACKEND}/api/v1/cycles`,
            params: { supplier_id },
            method: 'GET',
            json: true
          })
        ]);

        setState(prev => ({
          ...prev,
          dataSupplier: supplier_id,
          buyers: buyersRes.data,
          pagination: searchRes.data.pagination,
          results: searchRes.data.data,
          cycles: cyclesRes.data,
          loading: false
        }));
      } catch (error) {
        console.error('Error cargando datos iniciales:', error);
        setState(prev => ({ ...prev, loading: false }));
      }
    };

    fetchInitialData();
  }, [props.dataSupplier]);

  // Efecto para realizar búsqueda cuando cambia loading
  React.useEffect(() => {
    if (state.loading) {
      search();
    }
  }, [state.loading]);

  // Manejador para cambio de proveedor
  const handleSearchCriteria = async (searchCriteria) => {
    setState(prev => ({ ...prev, loading: true }));

    switch (searchCriteria.type) {
      case 'supplier':
        const supplier_id = searchCriteria.value;
        try {
          const buyersRes = await axios({
            url: `${process.env.REACT_APP_S6_BACKEND}/api/v1/buyers`,
            params: { supplier_id },
            method: 'GET',
            json: true
          });

          setState(prev => ({
            ...prev,
            dataSupplier: supplier_id,
            buyers: buyersRes.data,
            buyer_id: 'any',
            loading: true
          }));
        } catch (error) {
          console.error('Error al cambiar proveedor:', error);
          setState(prev => ({ ...prev, loading: false }));
        }
        break;

      case 'institution':
        setState(prev => ({
          ...prev,
          buyer_id: searchCriteria.value,
          loading: true
        }));
        break;

      case 'contractType':
        setState(prev => ({
          ...prev,
          procurementMethod: searchCriteria.value,
          loading: true
        }));
        break;

      case 'searchId':
        setState(prev => ({
          ...prev,
          inputText: searchCriteria.value,
          loading: true
        }));
        break;
    }
  };

  // Función de búsqueda
  const search = async () => {
    const body = {
      page: state.pagination.page,
      pageSize: state.pagination.pageSize
    };

    if (state.buyer_id !== 'any') {
      const byr = state.buyers.find(b => b.id === state.buyer_id);
      body.buyer_name = byr?.name;
    }

    if (state.procurementMethod !== 'any') {
      body.procurementMethod = state.procurementMethod;
    }

    if (state.supplierName !== '') {
      body.supplierName = state.supplierName;
    }

    if (state.inputText !== '') {
      body.tender_title = state.inputText;
    }

    if (state.cycle !== 'any') {
      body.cycle = state.cycle;
    }

    try {
      const res = await axios({
        url: `${process.env.REACT_APP_S6_BACKEND}/api/v1/search`,
        params: { supplier_id: state.dataSupplier },
        method: 'POST',
        data: body,
        json: true
      });

      setState(prev => ({
        ...prev,
        loading: false,
        results: res.data.data,
        pagination: res.data.pagination
      }));
    } catch (error) {
      console.error('Error en búsqueda:', error);
      setState(prev => ({ ...prev, loading: false }));
    }
  };

  // Manejadores de paginación
  const handleChangeRowsPerPage = (pageSize) => {
    setState(prev => ({
      ...prev,
      loading: true,
      pagination: { ...prev.pagination, page: 0, pageSize }
    }));
  };

  const handlePageChange = (page) => {
    setState(prev => ({
      ...prev,
      loading: true,
      pagination: { ...prev.pagination, page }
    }));
  };

  // Limpieza de filtros
  const cleanup = () => {
    setState(prev => ({
      ...prev,
      loading: true,
      pagination: { pageSize: 10, page: 0, total: 0 },
      results: [],
      buyer_id: 'any',
      procurementMethod: 'any',
      inputText: '',
      supplierName: '',
      cycle: 'any'
    }));
  };

  const { classes } = props;

  return (
    <div className={classes.root}>
      <Box>
        <SearchButtons 
          selectedState={props.selectedState}
          setSelectedState={props.setSelectedState}
          estados={props.estados}
          onSearch={handleSearchCriteria}
          buyers={state.buyers}
          dataSupplier={state.dataSupplier}
          onCleanup={cleanup}
        />
      </Box>

      <div style={{ overflow: 'auto' }}>
        <TablaResultados
          data={state.results}
          pagination={state.pagination}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          handleChangePage={handlePageChange}
          loading={state.loading}
        />
      </div>
    </div>
  );
};

export default withStyles(styles)(BusquedaTablero);