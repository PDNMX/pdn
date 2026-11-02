import React from 'react'
import { Grid, Paper, Typography } from '@mui/material'
import { withStyles } from 'tss-react/mui';

import axios from 'axios'

import Perfil from './Perfil'
import styles from '../style'

import FormSearch from './formSearch'
import { error } from './utils'
import ActiveResultProv from './ActiveResultProv'
import Descarga from '../Compartidos/Descarga'
import MantenimentResultProv from './MantenimentResultProv'

import dataEntidadesFederativas from './data/entidades.json'
import dataMunicipios from './data/municipios.json'

class Busqueda extends React.Component {
  listado = []
  defaultSelect = [
    {
      clave: 0,
      valor: 'Todos'
    }
  ]

  // query2 = {
  // 	nombres: 'Juan Pedro',
  // 	primerApellido: 'Tenorio',
  // 	segundoApellido: 'Calderón',
  // 	escolaridadNivel: 'DOC',
  // 	nivelOrdenGobierno: 'ESTATAL',
  // 	nombreEntePublico: 'Instituto Federal de Telecomunicaciones',
  // 	entidadFederativa: '01',
  // 	municipioAlcaldia: '001',
  // 	empleoCargoComision: 'Director del Sistema Nacional de Infraestructura',
  // 	nivelEmpleoCargoComision: 'CA0001',
  // 	superficieConstruccionMin: 2000,
  // 	superficieConstruccionMax: 4000,
  // 	superficieTerrenoMin: 2000,
  // 	superficieTerrenoMax: 4000,
  // 	valorAdquisicionMin: 2000,
  // 	valorAdquisicionMax: 4000,
  // 	formaAdquisicion: 'CSN',
  // 	totalIngresosNetosMin: 2000,
  // 	totalIngresosNetosMax: 4000
  // }

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
  }

  state = {
    ordenamiento: {},
    query: { ...this.query },
    btnSearch: false,
    providers: [],
    providersError: false,
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
  }

  print_results = p => {
    this.listado.push({ supplier_id: p.supplier_id, total: p.total })

    if (this.listado.length !== this.state.prov.length) return

    // All providers have answered, so the search can be triggered again.
    this.setState({ btnSearch: false })

    if (process.env.NODE_ENV !== 'production') {
      console.table(this.listado.sort((a, b) => String(a.supplier_id).localeCompare(String(b.supplier_id), 'es-mx')))
    }
  }

  cleanForm = () => {
    this.listado = []
    this.setState(prevState => ({
      ...prevState,
      btnSearch: false,
      query: { ...this.query },
      prov: []
    }))
  }

  handleOrdenamiento = (e, property) => {
    let ordena = { ...this.state.ordenamiento }

    if (typeof ordena[property] === 'undefined') {
      ordena = {
        ...ordena,
        [property]: 'asc'
      }
    } else {
      switch (ordena[property]) {
        case 'asc':
          ordena = {
            ...ordena,
            [property]: 'desc'
          }
          break

        default:
          delete ordena[property]
          break
      }
    }

    this.setState(prevState => ({
      ...prevState,
      btnSearch: false,
      ordenamiento: ordena
    }))
  }

  handleInputChange = event => {
    const { name, value } = event.target
    let catMunicipios = [
      {
        cve_agem: 0,
        nom_agem: 'Todos'
      }
    ]

    this.setState(prevState => {
      const query = { ...prevState.query, [name]: value }

      if (name === 'entidadFederativa') {
        catMunicipios = this.getMunicipios(value)
        query.municipioAlcaldia = 0
      } else {
        catMunicipios = this.getMunicipios(query.entidadFederativa)
      }

      return {
        ...prevState,
        query,
        btnSearch: false,
        catMunicipios
      }
    })
  }

  handleDataSelect = data => {
    // console.log('data: ', data)
    this.setState(
      prevState => ({
        ...prevState,
        dataSelect: data
      }),
      () => {
        this.perfil?.scrollIntoView({ block: 'start' })
      }
    )
  }

  handleGoBack = () => {
    this.setState(prevState => ({
      ...prevState,
      dataSelect: ''
    }))
  }

  handleSetPage = (id, page) => {
    this.setState(
      prevState => ({
        ...prevState,
        prov: prevState.prov.map((item, index) => {
          if (index !== id) return item

          return {
            ...item,
            finding: true,
            data: [],
            pagination: { ...item.pagination, page: page + 1 }
          }
        })
      }),
      () => {
        this.find(id)
      }
    )
  }

  handleChangeRowsPerPage = (event, id) => {
    const rowsPerPage = parseInt(event.target.value, 10)

    this.setState(
      prevState => ({
        ...prevState,
        prov: prevState.prov.map((item, index) => {
          if (index !== id) return item

          return {
            ...item,
            finding: true,
            data: [],
            pagination: { ...item.pagination, page: 1, pageSize: rowsPerPage }
          }
        })
      }),
      () => {
        this.find(id)
      }
    )
  }

  setProvider = (id, changes, callback) => {
    this.setState(
      prevState => ({
        ...prevState,
        prov: prevState.prov.map((item, index) => (index === id ? { ...item, ...changes } : item))
      }),
      callback
    )
  }

  find = id => {
    const url = process.env.REACT_APP_S1_BACKEND + '/search'
    const p = this.state.prov[id]

    if (!p) return

    if (p.status === 'MANTENIMENT') {
      this.setProvider(
        id,
        { finding: false, estatus: true, total: 0, data: [], pagination: {} },
        () => this.print_results(this.state.prov[id])
      )
      return
    }

    // The provider catalog only exposes MANTENIMENT and ACTIVE.
    const data = {
      page: p.pagination?.page || 1,
      pageSize: p.pagination?.pageSize || 10,
      query: this.state.query,
      sort: this.state.ordenamiento,
      supplier_id: p.supplier_id
    }

    axios
      .post(url, data)
      .then(resp => {
        const { data } = resp

        const changes =
          typeof data.error === 'undefined'
            ? {
                finding: false,
                estatus: true,
                total: data.pagination?.totalRows ?? 0,
                data: data.results ?? [],
                pagination: data.pagination ?? {}
              }
            : {
                finding: false,
                estatus: false,
                total: 0,
                data: [],
                pagination: {},
                error: data.error
              }

        this.setProvider(id, changes, () => this.print_results(this.state.prov[id]))
      })
      .catch(err => {
        // `err.response` is undefined for network/CORS errors, so destructuring
        // it directly made this catch throw and left the provider loading.
        const status = err.response?.status
        const statusText = err.response?.statusText || err.message

        this.setProvider(
          id,
          {
            finding: false,
            estatus: false,
            total: 0,
            data: [],
            pagination: {},
            error: { status, statusText }
          },
          () => this.print_results(this.state.prov[id])
        )
        error('find' + err)
      })
  }

  handlerFind = () => {
    const { providers } = this.state

    // provider 0 is the "Todos" placeholder and never has data.
    let prov = providers.filter(p => p.supplier_id !== 0)

    if (prov.length === 0) return

    this.listado = []

    prov = prov.map(p => {
      return {
        ...p,
        finding: true,
        estatus: false,
        total: 0,
        data: [],
        pagination: { page: 1, pageSize: 10 }
      }
    })

    this.setState(
      prevState => ({
        ...prevState,
        prov,
        btnSearch: true
      }),
      () => prov.forEach((p, index) => this.find(index))
    )
  }

  getProviders = () => {
    const defProviders = [
      {
        supplier_id: 0,
        supplier_name: 'Todos'
      }
    ]
    const url = process.env.REACT_APP_S1_BACKEND + '/providers'

    axios
      .get(url)
      .then(resp => {
        this.setState(
          prevState => ({
            ...prevState,
            providers: [...defProviders, ...resp.data],
            providersError: false
          }),
          () => {}
        )
      })
      .catch(err => {
        this.setState(prevState => ({
          ...prevState,
          providers: [],
          providersError: true
        }))
        error('getProviders' + err)
      })
  }

  getEscolaridadNivel = () => {
    const url = 'https://raw.githubusercontent.com/PDNMX/catalogos/master/S1%20-%20Declaraciones/nivel.json'

    const defaultOps = [
      {
        clave: 0,
        valor: 'Todos'
      }
    ]

    axios
      .get(url)
      .then(resp => {
        this.setState(prevState => ({
          ...prevState,
          catEscolaridadNivel: [...defaultOps, ...resp.data]
        }))
      })
      .catch(err => {
        this.setState(prevState => ({
          ...prevState,
          catEscolaridadNivel: [
            {
              clave: -1,
              valor: 'ERROR AL CARGAR LAS ESCOLARIDADES'
            }
          ]
        }))
        error('getEscolaridadNivel' + err)
      })
  }

  getFormaAdquisicion = () => {
    const url = 'https://raw.githubusercontent.com/PDNMX/catalogos/master/S1%20-%20Declaraciones/formaAdquisicion.json'

    const defaultOps = [
      {
        clave: 0,
        valor: 'Todos'
      }
    ]

    axios
      .get(url)
      .then(resp => {
        this.setState(prevState => ({
          ...prevState,
          catFormaAdquisicion: [...defaultOps, ...resp.data]
        }))
      })
      .catch(err => {
        this.setState(prevState => ({
          ...prevState,
          catFormaAdquisicion: [
            {
              clave: -1,
              valor: 'ERROR AL CARGAR LAS FORMAS DE ADQUISICIÓN'
            }
          ]
        }))

        error('catFormaAdquisicion' + err)
      })
  }

  getEntidadesFederativas = () => {
    // let url = 'https://gaia.inegi.org.mx/wscatgeo/mgee/'

    const defaultOps = [
      {
        cve_agee: 0,
        nom_agee: 'Todos'
      }
    ]

    this.setState(prevState => ({
      ...prevState,
      catEntidadesFederativas: [...defaultOps, ...dataEntidadesFederativas]
    }))
    // catEntidadesFederativas
    // axios
    //   .get(url, {
    //     crossdomain: true
    //   })
    //   .then(resp => {
    //     this.setState(prevState => ({
    //       ...prevState,
    //       catEntidadesFederativas: [...defaultOps, ...resp.data.datos]
    //     }))
    //   })
    //   .catch(err => {
    //     this.setState(prevState => ({
    //       ...prevState,
    //       catEntidadesFederativas: [
    //         {
    //           cve_agee: -1,
    //           nom_agee: 'ERROR AL CARGAR LAS ENTIDADES FEDERATIVAS'
    //         }
    //       ]
    //     }))

    //     error('catEntidadesFederativas' + err)
    //   })
  }

  getMunicipios = cve_agee => {
    // let url = 'https://gaia.inegi.org.mx/wscatgeo/mgem/' + cve_agee

    const defaultOps = [
      {
        cve_agem: 0,
        nom_agem: 'Todos'
      }
    ]

    return [...defaultOps, ...dataMunicipios.filter(d => d.cve_agee === cve_agee)]

    // catMunicipios
    // axios
    //   .get(url, {
    //     crossdomain: true
    //   })
    //   .then(resp => {
    //     this.setState(prevState => ({
    //       ...prevState,
    //       catMunicipios: [...defaultOps, ...resp.data.datos]
    //     }))
    //   })
    //   .catch(err => {
    //     this.setState(prevState => ({
    //       ...prevState,
    //       catMunicipios: [
    //         {
    //           cve_agem: -1,
    //           nom_agem: 'ERROR AL CARGAR LOS MUNICIPIOS'
    //         }
    //       ]
    //     }))

    //     error('catMunicipios' + err)
    //   })
  }

  componentDidMount() {
    this.getEscolaridadNivel()
    this.getFormaAdquisicion()
    this.getProviders()
    this.getEntidadesFederativas()
  }

  render() {
    const { classes } = this.props

    return (
      <div>
        {!this.state.dataSelect && (
          <Paper className={classes.paper_search} elevation={15} style={{ borderRadius: '0px 10px 10px 10px' }}>
            <Grid container spacing={0} className={classes.root}>
              <FormSearch
                query={this.state.query}
                handleInputChange={this.handleInputChange}
                catEscolaridadNivel={this.state.catEscolaridadNivel}
                catFormaAdquisicion={this.state.catFormaAdquisicion}
                catEntidadesFederativas={this.state.catEntidadesFederativas}
                catMunicipios={this.state.catMunicipios}
                btnSearch={this.state.btnSearch}
                handlerFind={this.handlerFind}
                cleanForm={this.cleanForm}
                handleOrdenamiento={this.handleOrdenamiento}
                ordenamiento={this.state.ordenamiento}
              />
            </Grid>
            <Grid container spacing={0} className={classes.infoBusqueda}>
              <div className={classes.resultadosRoot}>
                {this.state.providersError && (
                  <Typography className={classes.alertWarning} align='center'>
                    No se logró cargar la lista de proveedores. Por favor intenta recargar la página.
                  </Typography>
                )}
                {this.state.prov.map((p, i) => {
                  if (p.status !== 'ACTIVE') return null

                  // `i` is the index inside `prov`, which is what find() and
                  // the pagination handlers expect.
                  return <ActiveResultProv key={'res-' + p.supplier_id} p={p} i={i} handleDataSelect={this.handleDataSelect} handleSetPage={this.handleSetPage} handleChangeRowsPerPage={this.handleChangeRowsPerPage} />
                })}
                {this.state.prov.map(p => {
                  if (p.status !== 'MANTENIMENT') return null

                  return <MantenimentResultProv key={'man-' + p.supplier_id} p={p} />
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
              this.perfil = section
            }}
          />
        )}
        {/* DESCARGA */}
        <Grid container spacing={0} sx={{
          justifyContent: 'center'
        }}>
          <Grid className={classes.itemD} size={12}>
            <Descarga url={process.env.REACT_APP_S1_BULK} tipoGA='bulk-s1' />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(Busqueda, styles);
