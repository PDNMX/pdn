import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import axios from 'axios';

import Tooltip from '@material-ui/core/Tooltip';
import IconSunny from '@material-ui/icons/WbSunny';

import CircularProgress from '@material-ui/core/CircularProgress';
import Tabla from './Tabla';
import Perfil from './Perfil';
import styles from './style';

import FormSearch from './formSearch';

import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

class Busqueda extends React.Component {
	defaultSelect = [
		{
			clave: 0,
			valor: 'Todos'
		}
	];

	query2 = {
		nombres: 'Juan Pedro',
		primerApellido: 'Tenorio',
		segundoApellido: 'Calderón',
		escolaridadNivel: 'DOC',
		nivelOrdenGobierno: 'ESTATAL',
		nombreEntePublico: 'Instituto Federal de Telecomunicaciones',
		entidadFederativa: '01',
		municipioAlcaldia: '001',
		empleoCargoComision: 'Director del Sistema Nacional de Infraestructura',
		nivelEmpleoCargoComision: 'CA0001',
		superficieConstruccionMin: 2000,
		superficieConstruccionMax: 4000,
		superficieTerrenoMin: 2000,
		superficieTerrenoMax: 4000,
		valorAdquisicionMin: 2000,
		valorAdquisicionMax: 4000,
		formaAdquisicion: 'CSN',
		totalIngresosNetosMin: 2000,
		totalIngresosNetosMax: 4000
	};

	query = {
		nombres: '',
		primerApellido: '',
		segundoApellido: '',
		escolaridadNivel: '0',
		nivelOrdenGobierno: '',
		nombreEntePublico: '',
		entidadFederativa: '0',
		municipioAlcaldia: '0',
		empleoCargoComision: '',
		nivelEmpleoCargoComision: '',
		superficieConstruccionMin: '',
		superficieConstruccionMax: '',
		superficieTerrenoMin: '',
		superficieTerrenoMax: '',
		valorAdquisicionMin: '',
		valorAdquisicionMax: '',
		formaAdquisicion: '0',
		totalIngresosNetosMin: '',
		totalIngresosNetosMax: ''
	};

	state = {
		query: { ...this.query },
		institucion: '',
		nivel: '',
		btnSearch: false,
		providers: [],
		prov: [],
		catEscolaridadNivel: [ ...this.defaultSelect ],
		catFormaAdquisicion: [ ...this.defaultSelect ],
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
		this.setState((prevState) => ({
			...prevState,
			btnSearch: false,
			query: { ...this.query },
			prov: []
		}));
	};

	handleInputChange = (event) => {
		const { name, value } = event.target;

		this.setState((prevState) => {
			let { query } = prevState;

			query[name] = value;

			if (name === 'entidadFederativa') {
				this.getMunicipios(value);
				query['municipioAlcaldia'] = '0';
			}

			return {
				...prevState,
				query: query,
				btnSearch: false
			};
		});
	};

	handleDataSelect = (data) => {
		this.setState((prevState) => ({
			...prevState,
			dataSelect: data
		}));
	};

	handleGoBack = () => {
		this.setState((prevState) => ({
			...prevState,
			dataSelect: ''
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
			(prevState) => {
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

	find = (id) => {
		let url = process.env.REACT_APP_S1_BACKEND + '/search';
		let p = this.state.prov[id];

		let data = {
			page: p.pagination.page,
			pageSize: p.pagination.pageSize,
			query: this.state.query,
			supplier_id: p.supplier_id
		};

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
				if (typeof data.error === 'undefined') {
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
						prov: prov
					};
				});
			})
			.catch((err) => {
				// this.setState((prevState) => ({
				//   ...prevState,
				//   providers: [
				//     {
				//       clave: -1,
				//       valor: "ERROR AL CARGAR LOS PROVEEDORES",
				//     },
				//   ],
				// }));
				console.log('providers: ', err);
			});
	};

	handlerFind = () => {
		let { institucion, providers } = this.state;

		let prov = institucion
			? providers.filter((p) => p.supplier_id === institucion)
			: providers.filter((p) => p.supplier_id);

		prov = prov.map((p) => {
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
			(prevState) => ({
				...prevState,
				prov: prov,
				btnSearch: true
			}),
			() => {
				for (let i = 0; i < prov.length; i++) {
					this.find(i);
				}
			}
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
			.then((resp) => {
				this.setState((prevState) => ({
					...prevState,
					providers: [ ...defProviders, ...resp.data ]
				}));
			})
			.catch((err) => {
				this.setState((prevState) => ({
					...prevState,
					providers: [
						{
							supplier_id: -1,
							supplier_name: 'ERROR AL CARGAR LOS PROVEEDORES'
						}
					]
				}));
				console.log('providers: ', err);
			});
	};

	getEscolaridadNivel = () => {
		let url = 'https://raw.githubusercontent.com/PDNMX/catalogos/master/S1%20-%20Declaraciones/nivel.json';

		let defaultOps = [
			{
				clave: 0,
				valor: 'Todos'
			}
		];

		axios
			.get(url)
			.then((resp) => {
				this.setState((prevState) => ({
					...prevState,
					catEscolaridadNivel: [ ...defaultOps, ...resp.data ]
				}));
			})
			.catch((err) => {
				this.setState((prevState) => ({
					...prevState,
					catEscolaridadNivel: [
						{
							clave: -1,
							valor: 'ERROR AL CARGAR LAS ESCOLARIDADES'
						}
					]
				}));
				console.log('getEscolaridadNivel: ', err);
			});
	};

	getFormaAdquisicion = () => {
		let url =
			'https://raw.githubusercontent.com/PDNMX/catalogos/master/S1%20-%20Declaraciones/formaAdquisicion.json';

		let defaultOps = [
			{
				clave: 0,
				valor: 'Todos'
			}
		];

		axios
			.get(url)
			.then((resp) => {
				this.setState((prevState) => ({
					...prevState,
					catFormaAdquisicion: [ ...defaultOps, ...resp.data ]
				}));
			})
			.catch((err) => {
				this.setState((prevState) => ({
					...prevState,
					catFormaAdquisicion: [
						{
							clave: -1,
							valor: 'ERROR AL CARGAR LAS FORMAS DE ADQUISICIÓN'
						}
					]
				}));
				console.log('catFormaAdquisicion: ', err);
			});
	};

	getEntidadesFederativas = () => {
		let url = 'https://gaia.inegi.org.mx/wscatgeo/mgee/';

		let defaultOps = [
			{
				cve_agee: 0,
				nom_agee: 'Todos'
			}
		];

		axios
			.get(url)
			.then((resp) => {
				this.setState((prevState) => ({
					...prevState,
					catEntidadesFederativas: [ ...defaultOps, ...resp.data.datos ]
				}));
			})
			.catch((err) => {
				this.setState((prevState) => ({
					...prevState,
					catEntidadesFederativas: [
						{
							cve_agee: -1,
							nom_agee: 'ERROR AL CARGAR LAS ENTIDADES FEDERATIVAS'
						}
					]
				}));
				console.log('catEntidadesFederativas: ', err);
			});
	};

	getMunicipios = (cve_agee) => {
		let url = 'https://gaia.inegi.org.mx/wscatgeo/mgem/' + cve_agee;

		let defaultOps = [
			{
				cve_agem: 0,
				nom_agem: 'Todos'
			}
		];

		axios
			.get(url)
			.then((resp) => {
				this.setState((prevState) => ({
					...prevState,
					catMunicipios: [ ...defaultOps, ...resp.data.datos ]
				}));
			})
			.catch((err) => {
				this.setState((prevState) => ({
					...prevState,
					catMunicipios: [
						{
							cve_agem: -1,
							nom_agem: 'ERROR AL CARGAR LOS MUNICIPIOS'
						}
					]
				}));
				console.log('catMunicipios: ', err);
			});
	};

	componentDidMount() {
		this.getEscolaridadNivel();
		this.getFormaAdquisicion();
		this.getProviders();
		this.getEntidadesFederativas();
	}

	render() {
		let { classes } = this.props;

		return (
			<div>
				{!this.state.dataSelect && (
					<div>
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
						/>

						<Grid container spacing={0} className={classes.root}>
							<div className={classes.resultadosRoot}>
								{this.state.prov.map((p, i) => {
									return (
										<ExpansionPanel key={'res-' + i}>
											<ExpansionPanelSummary
												expandIcon={<ExpandMoreIcon />}
												aria-controls="panel1a-content"
												id="panel1a-header"
												className={classes.resultadosTitulo}
											>
												<Grid container spacing={0}>
													<Grid item xs={8}>
														<Typography className={classes.resultadosHeading}>
															{p.supplier_name} [{p.levels.join(', ')}]
														</Typography>
													</Grid>
													{p.finding ? (
														<Grid item xs={4}>
															<Grid container spacing={0}>
																<Grid item xs={11} />
																<Grid item xs={1}>
																	<CircularProgress color="secondary" size={20} />
																</Grid>
															</Grid>
														</Grid>
													) : (
														<Grid item xs={4}>
															<Grid container spacing={0}>
																<Grid item xs={6}>
																	<Typography className={classes.resultadosHeading}>
																		<Tooltip
																			title={
																				p.estatus ? (
																					'Con respuesta'
																				) : (
																					'Sin respuesta: ' +
																					p.error.status +
																					' ' +
																					p.error.statusText
																				)
																			}
																		>
																			<IconSunny
																				color={
																					p.estatus ? 'secondary' : 'inherit'
																				}
																			/>
																		</Tooltip>
																	</Typography>
																</Grid>
																<Grid item xs={6}>
																	<Typography className={classes.resultadosHeading}>
																		Total de registros: {p.total}
																	</Typography>
																</Grid>
															</Grid>
														</Grid>
													)}
												</Grid>
											</ExpansionPanelSummary>
											{!p.finding && (
												<ExpansionPanelDetails className={classes.resultadoContenido}>
													{p.data.length > 0 && (
														<Tabla
															rows={p.data}
															pagination={p.pagination}
															handleDataSelect={this.handleDataSelect}
															handleSetPage={this.handleSetPage}
															handleChangeRowsPerPage={this.handleChangeRowsPerPage}
															posicion={i}
														/>
													)}

													{p.error && (
														<Grid container spacing={1}>
															<Grid item xs={12}>
																<Typography
																	className={classes.alertWarning}
																	align="center"
																>
																	No se logro establecer la conexión con el proveedor,
																	por favor intenta nuevamente mas tarde.
																</Typography>
															</Grid>
														</Grid>
													)}
												</ExpansionPanelDetails>
											)}
										</ExpansionPanel>
									);
								})}
							</div>
						</Grid>
					</div>
				)}
				{this.state.dataSelect && <Perfil data={this.state.dataSelect} handleGoBack={this.handleGoBack} />}
			</div>
		);
	}
}

export default withStyles(styles)(Busqueda);
