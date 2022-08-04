import React from 'react';
import { Grid, Paper } from '@mui/material';

import axios from 'axios';

import Perfil from '../../../../Declaraciones2/Perfil';
//import styles from '../../../../Declaraciones2/style';

import { error } from '../../../../Declaraciones2/utils';
import scrollToComponent from 'react-scroll-to-component';

import ActiveResultProv from '../../../../Declaraciones2/ActiveResultProv';
/* import Descarga from '../../../../Compartidos/Descarga'; */
import MantenimentResultProv from '../../../../Declaraciones2/MantenimentResultProv';

import Chips from '../Chips';

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
      valor: 'Todos'
    }
  ];

  query = {
    nombres: '',
    primerApellido: '',
    segundoApellido: '',
    escolaridadNivel: '',
    nivelOrdenGobierno: '',
    nombreEntePublico: '',
    entidadFederativa: '',
    municipioAlcaldia: '',
    empleoCargoComision: '',
    nivelEmpleoCargoComision: '',
    superficieConstruccionMin: '',
    superficieConstruccionMax: '',
    superficieTerrenoMin: '',
    superficieTerrenoMax: '',
    valorAdquisicionMin: '',
    valorAdquisicionMax: '',
    formaAdquisicion: '',
    totalIngresosNetosMin: '',
    totalIngresosNetosMax: ''
  };

  state = {
    ordenamiento: {},
    query: { ...this.query },
    institucion: '',
    nivel: '',
    btnSearch: false,
    providers: [],
    prov: [],
    catEscolaridadNivel: [...this.defaultSelect],
    catFormaAdquisicion: [...this.defaultSelect],
    catEntidadesFederativas: [
      {
        cve_agee: 0,
        nom_agee: 'Todos'
      }
    ],
    catMunicipios: [
      {
        cve_agem: 0,
        nom_agem: 'Todos'
      }
    ],
    // dataSelect: inicial,
    dataSelect: ''
  };

  cleanForm = () => {
    this.setState(prevState => ({
      ...prevState,
      btnSearch: false,
      query: { ...this.query },
      prov: []
    }));
  };

  handleOrdenamiento = (e, property) => {
    let ordena = this.state.ordenamiento;

    if (typeof ordena[property] === 'undefined') {
      ordena = {
        ...ordena,
        [property]: 'asc'
      };
    } else {
      switch (ordena[property]) {
        case 'asc':
          ordena = {
            ...ordena,
            [property]: 'desc'
          };
          break;

        default:
          delete ordena[property];
          break;
      }
    }

    this.setState(prevState => ({
      ...prevState,
      btnSearch: false,
      ordenamiento: ordena
    }));
  };



  handleDataSelect = data => {
    // console.log('data: ', data);
    this.setState(
      prevState => ({
        ...prevState,
        dataSelect: data
      }),
      () => {
        scrollToComponent(this.perfil, { align: 'top' });
      }
    );
  };

  handleGoBack = () => {
    this.setState(prevState => ({
      ...prevState,
      dataSelect: ''
    }));
  };

  handleSetPage = (id, page) => {
    this.setState(
      prevState => {
        let { prov } = prevState;

        prov[id].pagination.page = page + 1;
        prov[id].finding = true;
        prov[id].data = [];

        return {
          ...prevState,
          prov: prov
        };
      },
      () => {
        this.find(id);
      }
    );
  };

  handleChangeRowsPerPage = (event, id) => {
    let rowsPerPage = parseInt(event.target.value, 10);

    this.setState(
      prevState => {
        let { prov } = prevState;

        prov[id].pagination.pageSize = rowsPerPage;
        prov[id].pagination.page = 1;
        prov[id].finding = true;
        prov[id].data = [];

        return {
          ...prevState,
          prov: prov
        };
      },
      () => {
        this.find(id);
      }
    );
  };

  find = id => {
    let url = process.env.REACT_APP_S1_BACKEND + '/search';
    let p = this.state.prov[id];

    if (p.status === 'MANTENIMENT') {
      // defaults
      p.finding = false;
      p.estatus = true;
      p.total = 0;
      p.data = [];
      p.pagination = {};

      this.setState(prevState => {
        let { prov } = prevState;

        prov[id] = p;

        return {
          ...prevState,
          prov: prov
        };
      });
    }

    if (p.status === 'ACTIVE') {
      let data = {
        page: p.pagination.page,
        pageSize: p.pagination.pageSize,
        query: this.state.query,
        sort: this.state.ordenamiento,
        supplier_id: p.supplier_id
      };

      axios
        .post(url, data)
        .then(resp => {
          let { data } = resp;

          // defaults
          p.finding = false;
          p.estatus = false;
          p.total = 0;
          p.data = [];
          p.pagination = {};

          // no hay error
          if (typeof data.error === 'undefined') {
            p.finding = false;
            p.estatus = true;
            p.total = data.pagination.totalRows;
            p.data = data.results;
            p.pagination = data.pagination;
          } else {
            p.error = data.error;
          }

          this.setState(prevState => {
            let { prov } = prevState;

            prov[id] = p;

            return {
              ...prevState,
              prov: prov
            };
          });
        })
        .catch(err => {
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
              statusText
            }
          };
          this.setState(prevState => {
            let { prov } = prevState;

            prov[id] = p;

            return {
              ...prevState,
              prov: prov
            };
          });
          error('find' + err);
        });
    }
  };

  handlerFind = () => {
    let { institucion, providers } = this.state;

    let prov = institucion ? providers.filter(p => p.supplier_id === institucion) : providers.filter(p => typeof p.supplier_id === 'string');

    prov = prov.map(p => {
      return {
        ...p,
        finding: true,
        estatus: false,
        total: 0,
        data: [],
        pagination: []
      };
    });

    this.setState(
      prevState => ({
        ...prevState,
        prov: prov,
        btnSearch: true
      }),
      () => prov.forEach((p, index) => this.find(index))
    );
  };

  getProviders = () => {
    let defProviders = [
      {
        supplier_id: 0,
        supplier_name: 'Todos'
      }
    ];
    let url = process.env.REACT_APP_S1_BACKEND + '/providers';

    axios
      .get(url)
      .then(resp => {
        this.setState(
          prevState => ({
            ...prevState,
            providers: [...defProviders, ...resp.data]
          }),
          () => {this.handlerFind()}
          
        );
      })
      .catch(err => {
        this.setState(prevState => ({
          ...prevState,
          providers: [
            {
              supplier_id: -1,
              supplier_name: 'ERROR AL CARGAR LOS PROVEEDORES'
            }
          ]
        }));
        error('getProviders' + err);
      });
  };

  componentDidMount() {
    this.getProviders();
    //this.handlerFind();
  }

  render() {
    /* let { classes } = this.props; */
    const dataProps = JSON.parse(this.props.data);
    const data= dataProps["psp-declaraciones"];
    /* console.log(data) */
    this.state.query.nombres = data.nombres.trim();
    this.state.query.primerApellido = data.primerApellido.trim();
    this.state.query.segundoApellido = data.segundoApellido.trim();
    this.state.query.empleoCargoComision = data.empleoCargoComision.trim();
    return (
      <div>
        
        {console.log(data)}
        <Chips criterios={JSON.stringify(data)}/>
        {!this.state.dataSelect && (
          <Paper elevation={0}>
            <Grid container spacing={0}>
              <div>
                {this.state.prov
                  .filter(p => p.status === 'ACTIVE')
                  .map((p, i) => {
                    if (p.total > 0) {
                      return <ActiveResultProv key={'res-' + i} p={p} i={i} handleDataSelect={this.handleDataSelect} handleSetPage={this.handleSetPage} handleChangeRowsPerPage={this.handleChangeRowsPerPage} />;
                    } else {
                      return <h1>No hay registros</h1>
                    }
                  })
                }
                {this.state.prov
                  .filter(p => p.status === 'MANTENIMENT')
                  .map((p, i) => {
                    return <MantenimentResultProv key={'man-' + i} p={p} />;
                  })}
              </div>
            </Grid>
          </Paper>
        )}
        {this.state.dataSelect && (
          <Perfil
            data={this.state.dataSelect}
            handleGoBack={this.handleGoBack}
            refPerfil={section => {
              this.perfil = section;
            }}
          />
        )}
      </div>
    );
  }
}

