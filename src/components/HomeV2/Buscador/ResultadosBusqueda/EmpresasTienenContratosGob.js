import React from "react";
import TablaResultados from "../../../Sistema6/TablaResultados";
import axios from "axios";

export function ResultadosEmpresasTienenContratosGob(props) {
  const data = JSON.parse(props.data);
  /*
  5.- Empresas que tienen contratos con el gobierno
  - Nombre / Razón social (parties[].roles[supplier])
  - Bien o servicio que se otorgo al gobierno (tender.description) (TOOLTIP con descripción o botón informativo)
  */
  const [state, setState] = React.useState({
    dataSupplier: "SHCP",
    inputText: data.bienServicioOtorgado,
    pagination: {
      pageSize: 10,
      page: 0,
      total: 0,
    },
    results: [],
    loading: false,
    buyers: [],
    buyer_id: "any",
    procurementMethod: "any",
    supplierName: data.nombreRazonSocial,
    cycle: "any",
    cycles: [],
  });

  React.useEffect(() => {
    //fetch data
    //const supplier_id = props.dataSupplier; //state.dataSupplier;
    //console.log(state);
    search();
  }, []);

  React.useEffect(() => {
    if (state.loading) {
      search();
    }
  }, [
    state.loading,
  ]);

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

    const supplier_id = state.dataSupplier;
    try {
      const res = await axios({
        url: process.env.REACT_APP_S6_BACKEND + "/api/v1/search",
        params: {
          supplier_id,
        },
        method: "POST",
        data: body,
        json: true,
      });

      //console.log(data)
      setState({
        ...state,
        loading: false,
        results: res.data.data,
        pagination: res.data.pagination, //solo debe actualizarse el total
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
    <div>
      <div style={{ overflow: "auto" }}>
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
}

export default ResultadosEmpresasTienenContratosGob;
