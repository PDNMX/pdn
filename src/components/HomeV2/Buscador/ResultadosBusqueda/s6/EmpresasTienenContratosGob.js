import React from "react";
import TablaResultados from "./TablaResultados";
import axios from "axios";

import { Modal, CircularProgress } from '@mui/material';
import ReactGA from "react-ga";
import Chips from '../Chips';

export function ResultadosS6v1(props) {
  const dataProps = JSON.parse(props.data);
  const data = dataProps["empresas-contratos"]
  /*
  5.- Empresas que tienen contratos con el gobierno
  - Nombre / Razón social (parties[].roles[supplier])
  - Bien o servicio que se otorgo al gobierno (tender.description) (TOOLTIP con descripción o botón informativo)
  */
  const [state, setState] = React.useState({
    dataSupplier: data.supplier.trim(),
    inputText: data.bienServicioOtorgado.trim(),
    pagination: {
      pageSize: 10,
      page: 0,
      total: 0,
    },
    results: [],
    loading: true,
    buyers: [],
    buyer_id: "any",
    procurementMethod: "any",
    supplierName: data.nombreRazonSocial.trim(),
    cycle: "any",
    cycles: [],
    terminado: false
  });

  React.useEffect(() => {
    if (state.loading !== false) {
      search();
    }
  }, [state.pagination.pageSize, state.pagination.page]);

  const handleChangeRowsPerPage = (pageSize) => {
    setState({
      ...state,
      loading: true,
      pagination: {
        page: 0,
        pageSize: pageSize,
        //total: 0
      },
    });
  };

  const handlePageChange = (page) => {
    setState({
      ...state,
      loading: true,
      pagination: {
        page: page, //incrementar página
        pageSize: state.pagination.pageSize,
        //total: 0
      },
    });
  };

  //buscar
  const search = async () => {
    ReactGA.event({ category: 'wizard_empresas-contratos', action: 'click' });
    let body = {
      page: state.pagination.page,
      pageSize: state.pagination.pageSize,
    };

    if (state.buyer_id !== "any") {
      body.buyer_id = state.buyer_id;
    }

    if (state.procurementMethod !== "any") {
      body.procurementMethod = state.procurementMethod;
    }

    if (state.supplierName !== "") {
      body.supplierName = state.supplierName;
    }

    if (state.inputText !== "") {
      body.tender_title = state.inputText;
    }

    if (state.cycle !== "any") {
      body.cycle = state.cycle;
    }

    const supplier_id = data.supplier.trim();
    try {
      await axios({
        url: process.env.REACT_APP_S6_BACKEND + "/api/v1/search",
        params: {
          supplier_id,
        },
        method: "POST",
        data: body,
        json: true,
      }).then((res) => {
        setState({
          /* ...state, */
          loading: false,
          results: res.data.data,
          pagination: res.data.pagination, //solo debe actualizarse el total
          terminado: true
        });
    });
    } catch (error) {
      console.log(error);
      setState({
        ...state,
        loading: false,
      });
    }
  };

  return (
    <>
      <Chips criterios={JSON.stringify(data)} />
      {state.loading && (
        <Modal id={"modalIsela"} open={state.loading}>
          <CircularProgress size={200} style={{position: 'fixed', margin: 'auto', left: 0, right: 0, top: 0, bottom: 0}}/>
        </Modal>
      )}
        <div style={{ overflow: "auto" }}>
        <TablaResultados
          data={state.results}
          pagination={state.pagination}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          handleChangePage={handlePageChange}
        />
      </div>
    </>
  );
}

export default ResultadosS6v1;
