import React from "react";
import { Grid, Paper, Modal } from "@mui/material";

import axios from "axios";

import Perfil from "../../../../Declaraciones2/Perfil";
//import styles from '../../../../Declaraciones2/style';

import { error } from "../../../../Declaraciones2/utils";
import scrollToComponent from "react-scroll-to-component";

import ActiveResultProv from "../../../../Declaraciones2/ActiveResultProv";
/* import Descarga from '../../../../Compartidos/Descarga'; */
import MantenimentResultProv from "../../../../Declaraciones2/MantenimentResultProv";

import CircularProgress from "@mui/material/CircularProgress";
import Chips from "../Chips";

export class ResultadosS1 extends React.Component {
  /*
  3.- Personas servidoras pub y declaraciones patri
  - Nombre
  - AP1
  - AP2
  - Institución
  - Empleo, cargo, comisión
  */
  defaultSelect = [
    {
      clave: 0,
      valor: "Todos",
    },
  ];

  query = {
    nombres: "",
    primerApellido: "",
    segundoApellido: "",
    escolaridadNivel: "",
    nivelOrdenGobierno: "",
    nombreEntePublico: "",
    entidadFederativa: "",
    municipioAlcaldia: "",
    empleoCargoComision: "",
    nivelEmpleoCargoComision: "",
    superficieConstruccionMin: "",
    superficieConstruccionMax: "",
    superficieTerrenoMin: "",
    superficieTerrenoMax: "",
    valorAdquisicionMin: "",
    valorAdquisicionMax: "",
    formaAdquisicion: "",
    totalIngresosNetosMin: "",
    totalIngresosNetosMax: "",
  };

  state = {
    loading: false,
    ordenamiento: {},
    query: { ...this.query },
    institucion: "",
    nivel: "",
    btnSearch: false,
    providers: [],
    prov: [],
    catEscolaridadNivel: [...this.defaultSelect],
    catFormaAdquisicion: [...this.defaultSelect],
    catEntidadesFederativas: [
      {
        cve_agee: 0,
        nom_agee: "Todos",
      },
    ],
    catMunicipios: [
      {
        cve_agem: 0,
        nom_agem: "Todos",
      },
    ],
    // dataSelect: inicial,
    dataSelect: "",
  };

  handleChangeRowsPerPage = (event, id) => {
    let rowsPerPage = parseInt(event.target.value, 10);

    this.setState(
      (prevState) => {
        let { prov } = prevState;

        prov[id].pagination.pageSize = rowsPerPage;
        prov[id].pagination.page = 1;
        prov[id].finding = true;
        prov[id].data = [];

        return {
          ...prevState,
          prov: prov,
          loading: true,
        };
      },
      () => {
        this.find(id);
      }
    );
  };

  handleDataSelect = (data) => {
    // console.log('data: ', data);
    this.setState(
      (prevState) => ({
        ...prevState,
        dataSelect: data,
      }),
      () => {
        scrollToComponent(this.perfil, { align: "top" });
      }
    );
  };

  handleGoBack = () => {
    this.setState((prevState) => ({
      ...prevState,
      dataSelect: "",
    }));
  };

  handleSetPage = (id, page) => {
    this.setState(
      (prevState) => {
        let { prov } = prevState;

        prov[id].pagination.page = page + 1;
        prov[id].finding = true;
        prov[id].data = [];

        return {
          ...prevState,
          prov: prov,
          loading: true,
        };
      },
      () => {
        this.find(id);
      }
    );
  };

  find = (id) => {
    let url = process.env.REACT_APP_S1_BACKEND + "/search";
    let p = this.state.prov[id];
    /* console.log(p) */

    if (p.status === "MANTENIMENT") {
      // defaults
      p.finding = false;
      p.estatus = true;
      p.total = 0;
      p.data = [];
      p.pagination = {};

      this.setState((prevState) => {
        let { prov } = prevState;

        prov[id] = p;

        return {
          ...prevState,
          prov: prov,
        };
      });
    }

    if (p.status === "ACTIVE") {
      let data = {
        page: p.pagination.page,
        pageSize: p.pagination.pageSize,
        query: this.state.query,
        sort: this.state.ordenamiento,
        supplier_id: p.supplier_id,
      };

      /* console.log(data) */

      axios
        .post(url, data)
        .then((resp) => {
          let { data } = resp;

          // defaults
          p.finding = false;
          p.estatus = false;
          p.total = 0;
          p.data = [];
          p.pagination = {};

          // no hay error
          if (typeof data.error === "undefined") {
            p.finding = false;
            p.estatus = true;
            p.total = data.pagination.totalRows;
            p.data = data.results;
            p.pagination = data.pagination;
          } else {
            p.error = data.error;
          }

          this.setState((prevState) => {
            let { prov } = prevState;

            prov[id] = p;

            return {
              ...prevState,
              prov: prov,
              loading: false,
            };
          });
        })
        .catch((err) => {
          let { status, statusText } = err.response;
          p = {
            ...p,
            finding: false,
            estatus: false,
            total: 0,
            data: [],
            pagination: {},
            error: {
              status,
              statusText,
            },
          };
          this.setState((prevState) => {
            let { prov } = prevState;

            prov[id] = p;

            return {
              ...prevState,
              prov: prov,
              loading: false,
            };
          });
          error("find" + err);
        });
    }
  };

  findAll = (providers) => {
    let url = process.env.REACT_APP_S1_BACKEND + "/search";
    const dataProps = JSON.parse(this.props.data);
    const data = dataProps["psp-declaraciones"];
    let requests = providers.map(function(provider) {
      let dataRequest = {
        query: {
          nombres: data.nombres.trim(),
          primerApellido: data.primerApellido.trim(),
          segundoApellido: data.segundoApellido.trim(),
          escolaridadNivel: "",
          nivelOrdenGobierno: "",
          nombreEntePublico: "",
          entidadFederativa: "",
          municipioAlcaldia: "",
          empleoCargoComision: data.empleoCargoComision.trim(),
          nivelEmpleoCargoComision: "",
          superficieConstruccionMin: "",
          superficieConstruccionMax: "",
          superficieTerrenoMin: "",
          superficieTerrenoMax: "",
          valorAdquisicionMin: "",
          valorAdquisicionMax: "",
          formaAdquisicion: "",
          totalIngresosNetosMin: "",
          totalIngresosNetosMax: "",
        },
        sort: {},
        page: provider.pagination.page,
        pageSize: provider.pagination.pageSize,
        supplier_id: provider.supplier_id,
      };

      return axios.post(url, dataRequest);
    });

    Promise.allSettled(requests)
      .then((results) => {
        // (*)
        //console.log(results)
        results.forEach((result, id) => {
          const p = this.state.prov[id];
          /* console.log(p) */

          if (p.status === "MANTENIMENT") {
            // defaults
            p.finding = false;
            p.estatus = true;
            p.total = 0;
            p.data = [];
            p.pagination = {};

            this.setState((prevState) => {
              let { prov } = prevState;

              prov[id] = p;

              return {
                ...prevState,
                prov: prov,
              };
            });
          }

          // defaults
          p.finding = false;
          p.estatus = false;
          p.total = 0;
          p.data = [];
          p.pagination = {};

          // no hay error
          if (typeof result.value.data.error === "undefined") {
            p.finding = false;
            p.estatus = true;
            p.total = result.value.data.pagination.totalRows;
            p.data = result.value.data.results;
            p.pagination = result.value.data.pagination;
          } else {
            p.error = result.value.data.error;
          }

          this.setState((prevState) => {
            let { prov } = prevState;

            prov[id] = p;

            return {
              ...prevState,
              prov: prov,
            };
          });
        });
      })
      .then(() => {
        this.setState({ loading: false });
        console.log("terminamos los requests");
      });
  };

  handlerFind = () => {
    let { institucion, providers } = this.state;

    let prov = institucion
      ? providers.filter((p) => p.supplier_id === institucion)
      : providers.filter((p) => typeof p.supplier_id === "string");

    prov = prov.map((p) => {
      return {
        ...p,
        finding: true,
        estatus: false,
        total: 0,
        data: [],
        pagination: [],
      };
    });

    this.setState(
      (prevState) => ({
        ...prevState,
        prov: prov,
      }),
      () => this.findAll(prov, this.props.data)
    );
  };

  getProviders = () => {
    let defProviders = [
      {
        supplier_id: 0,
        supplier_name: "Todos",
      },
    ];
    let url = process.env.REACT_APP_S1_BACKEND + "/providers";

    axios
      .get(url)
      .then((resp) => {
        this.setState(
          (prevState) => ({
            ...prevState,
            providers: [...defProviders, ...resp.data],
          }),
          () => {
            this.handlerFind();
          }
        );
      })
      .catch((err) => {
        this.setState((prevState) => ({
          ...prevState,
          providers: [
            {
              supplier_id: -1,
              supplier_name: "ERROR AL CARGAR LOS PROVEEDORES",
            },
          ],
        }));
        error("getProviders" + err);
      });
  };

  componentDidMount() {
    this.setState(
      () => ({
        loading: true,
      }),
      () => this.getProviders()
    );
  }

  render() {
    const dataProps = JSON.parse(this.props.data);
    const data = dataProps["psp-declaraciones"];
    return (
      <>
        <Chips criterios={JSON.stringify(data)} />
        {!this.state.dataSelect && (
          <>
            {this.state.prov
              .filter((p) => p.status === "ACTIVE")
              .map((p, i) => {
                if (p.total > 0) {
                  return (
                    <ActiveResultProv
                      key={"res-wizard-" + i}
                      p={p}
                      i={i}
                      handleDataSelect={this.handleDataSelect}
                      handleSetPage={this.handleSetPage}
                      handleChangeRowsPerPage={this.handleChangeRowsPerPage}
                    />
                  );
                }
              })}
            {this.state.prov
              .filter((p) => p.status === "MANTENIMENT")
              .map((p, i) => {
                return <MantenimentResultProv key={"man-" + i} p={p} />;
              })}
          </>
        )}
        {this.state.dataSelect && (
          <Perfil
            data={this.state.dataSelect}
            handleGoBack={this.handleGoBack}
            refPerfil={(section) => {
              this.perfil = section;
            }}
          />
        )}
        {this.state.loading && (
          <Modal open={this.state.loading} disableAutoFocus={true}>
            <CircularProgress
              style={{
                position: "fixed",
                margin: "auto",
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
              }}
              id="spinnerLoading"
              size={200}
            />
          </Modal>
        )}
      </>
    );
  }
}
