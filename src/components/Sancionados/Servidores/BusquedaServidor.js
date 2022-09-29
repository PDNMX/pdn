//PANTALLA DE BUSQUEDASERVIDOR, CON SELECT PARA SORT
import React, { useEffect, useState } from 'react';
import withStyles from '@mui/styles/withStyles';
import PropTypes from 'prop-types';
import { Typography, Grid, Button, Modal, CircularProgress } from '@mui/material';
import MensajeErrorDatos from '../../Mensajes/MensajeErrorDatos';
import Previos from '../../Compartidos/Previos';
import TablaServidoresSancionados from './TablaServidoresSancionados';
import DetalleServidorSancionado from './DetalleServidorSancionado';

import ReactGA from 'react-ga';
import { getDataAPI, getInstitutions, getProviders, getSummary } from '../utils';
import FormServidoresSancionados from './FormServidoresSancionados';

const styles = theme => ({
  'formControl': {
    width: '100%'
  },
  '&$focus': {
    //color: theme.palette.black.color,
  },
  'centrado': {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  'progress': {
    position: 'fixed',
    margin: 'auto',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
  },
  'desc': {
    color: theme.palette.text.contrastText
  },
  'container': {
    /* marginTop: '30px',
        marginBottom: '30px',*/
    overflowX: 'auto'
  },
  'section': {
    maxWidth: '1200px',
    overflowX: 'auto',
    padding: theme.spacing(1)
  },
  'button': {
    padding: theme.spacing(1),
    fontWeight: 'bold'
  }
});

const initialQuery = {
  nombres: '',
  primerApellido: '',
  segundoApellido: '',
  tipoSancion: [],
  institucionDependencia: 'any',
  nivel: 'any',
  provider: 'any'
};

const initialOrder = {
  orderCamp: 'any',
  orderType: 'any'
};

function BusquedaServidor({ classes }) {
  const [filterData, setFilterData] = useState({});
  const [previos, setPrevios] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const [institutionsList, setInstitutionsList] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [providersList, setProvidersList] = useState([]);
  const [view, setView] = useState(0);

  const [query, setQuery] = useState(initialQuery);
  const [order, setOrder] = useState(initialOrder);
  const [activeSearch, setActiveSearch] = useState(true);
  const [activeClean, setActiveClean] = useState(false);
  const [provider, setProvider] = useState('');

  const loadInstituciones = async query => {
    try {
      const data = await getInstitutions(query);
      setInstitutionsList(data);
    } catch (e) {
      console.log('getInstitutions: ', e);
      setError(true);
    }
    setLoading(false);
  };

  const loadProviders = async query => {
    try {
      const data = await getProviders(query);
      setProvidersList(data);
    } catch (e) {
      console.log('getProviders: ', e);
      setError(true);
    }
  };

  const handleForm = e => {
    const { name, value } = e.target;
    setActiveClean(true);

    switch (name) {
      case 'nivel':
        setQuery(q => {
          const nq = { ...q, [name]: value, provider: 'any', institucionDependencia: 'any' };
          setLoading(true);
          loadProviders(nq);
          loadInstituciones(nq);

          return nq;
        });
        break;
      case 'provider':
        setQuery(q => {
          const nq = { ...q, [name]: value, institucionDependencia: 'any' };
          setLoading(true);
          loadInstituciones(nq);

          return nq;
        });
        break;
      default:
        setQuery(q => ({ ...q, [name]: value }));
        break;
    }
  };

  const handleOrder = e => {
    const { name, value } = e.target;
    setOrder(o => ({ ...o, [name]: value }));
  };

  useEffect(() => {
    setActiveSearch(true);
  }, [query, order]);

  useEffect(() => {
    setLoading(true);
    loadProviders(query);
    loadInstituciones(query);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCleanAll = () => {
    setQuery(initialQuery);
    setOrder(initialOrder);

    setActiveClean(false);
    setActiveSearch(true);

    setFilterData({});
    setView(0);
  };

  const getQuery = () => {
    const camps = Object.keys(query).filter(k => query[k] !== '' && query[k] !== 'any');
    const finalQuery = {};

    camps.forEach(c => {
      switch (c) {
        case 'tipoSancion':
          if (query[c].length > 0) {
            finalQuery[c] = query[c].map(s => s.value);
          }
          break;
        case 'nivel':
          finalQuery['nivel_gobierno'] = query[c];
          break;
        case 'provider':
          finalQuery['proveedor'] = query[c];
          break;

        default:
          finalQuery[c] = query[c];
          break;
      }
    });
    return finalQuery;
  };

  const getOrder = () => {
    const { orderCamp, orderType } = order;
    return orderCamp !== 'any' && orderType !== 'any' ? { [orderCamp]: orderType } : {};
  };

  const createDataQuery = () => {
    const finalQuery = getQuery();
    const finalOrder = getOrder();

    let data = {};

    if (Object.keys(finalQuery).length > 0) {
      data.query = finalQuery;
      if (data.query.nivel_gobierno) {
        data.nivel_gobierno = data.query.nivel_gobierno;
        delete data.query.nivel_gobierno;
      }

      if (data.query.proveedor) {
        data.proveedor = data.query.proveedor;
        delete data.query.proveedor;
      }

      if (data.query.institucionDependencia) {
        data.institucion = data.query.institucionDependencia;
      }
    }

    if (Object.keys(finalOrder).length > 0) data.sort = finalOrder;

    return data;
  };

  const handleSearchPrevios = async () => {
    ReactGA.event({ category: 'busqueda-s3SP', action: 'click' });

    setLoading(true);
    setActiveSearch(false);
    setActiveClean(true);

    const data = createDataQuery();

    try {
      const datos = await getSummary(data);
      setPrevios(datos);
      setError(false);
      setView(1);
    } catch (e) {
      console.log('handleSearchPrevios: ', e);
      setError(true);
    }

    setLoading(false);
  };

  const handleChangeAPI = async val => {
    setLoading(true);
    const data = createDataQuery();
    data.supplier_id = val;
    setProvider(val);

    try {
      const info = await getDataAPI(data);
      setFilterData(info);
      setError(false);
      setView(2);
    } catch (e) {
      console.log('handleChangeAPI: ', e);
      setError(true);
    }

    setLoading(false);
  };

  const handleChangePage = async (event, page) => {
    setLoading(true);
    const data = createDataQuery();
    data.page = page + 1;
    data.pageSize = filterData.pagination.pageSize;
    data.supplier_id = provider;
    try {
      const info = await getDataAPI(data);
      setFilterData(info);
      setError(false);
      setView(2);
    } catch (e) {
      console.log('handleChangeAPI: ', e);
      setError(true);
    }

    setLoading(false);
  };

  const handleChangeRowsPerPage = async event => {
    setLoading(true);
    const data = createDataQuery();
    data.page = 1;
    data.pageSize = event.target.value;
    data.supplier_id = provider;
    try {
      const info = await getDataAPI(data);
      setFilterData(info);
      setError(false);
      setView(2);
    } catch (e) {
      console.log('handleChangeAPI: ', e);
      setError(true);
    }

    setLoading(false);
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
  };

  return (
    <React.Fragment>
      {/*Buscador*/}
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Typography>
            <b>Busca un servidor público sancionado</b>
          </Typography>
        </Grid>
        <FormServidoresSancionados handleForm={handleForm} handleOrder={handleOrder} query={query} order={order} providersList={providersList} institutionsList={institutionsList} />

        <Grid item md={10} />

        <Grid item xs={12} md={1}>
          <Button variant='contained' color='secundario' disabled={!activeClean} className={classes.button} onClick={() => handleCleanAll()}>
            Limpiar
          </Button>
        </Grid>
        <Grid item xs={12} md={1}>
          <Button variant='contained' color='secundario' disabled={!activeSearch} className={classes.button} onClick={() => handleSearchPrevios()}>
            Buscar
          </Button>
        </Grid>
        <Grid item xs={12}>
          {loading && (
            <Modal open={loading} disableAutoFocus={true}>
              <CircularProgress className={classes.progress} id='spinnerLoading' size={200} />
            </Modal>
          )}
          {error && <MensajeErrorDatos />}
        </Grid>
      </Grid>
      {/*PREVIOS*/}
      {view === 1 && previos.length > 0 && (
        <Grid container>
          <Grid item xs={12} className={classes.section}>
            <Previos data={previos} handleChangeSujetoObligado={handleChangeAPI} />
          </Grid>
        </Grid>
      )}
      {/*TABLA*/}
      {view === 2 && Object.keys(filterData).length > 0 && (
        <Grid container>
          <Grid item xs={12}>
            <TablaServidoresSancionados info={filterData} handleChangePage={handleChangePage} handleChangeRowsPerPage={handleChangeRowsPerPage} verDetalle={verDetalle} returnToPrevios={returnToPrevios} />
          </Grid>
        </Grid>
      )}
      {view === 3 && selectedItem !== null && <DetalleServidorSancionado handleChangeDetail={handleChangeDetail} servidor={selectedItem} />}
    </React.Fragment>
  );
}

BusquedaServidor.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(BusquedaServidor);
