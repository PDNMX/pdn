import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import Tabla from './Tabla';
import Perfil from './Perfil';
import styles from './style';

import {
	TextField,
	Radio,
	FormControlLabel,
	FormControl,
	MenuItem,
	Button,
	FormLabel,
	RadioGroup,
	InputLabel,
	Select
} from '@material-ui/core';

import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { inicial, modificacion, conclusion } from './data';

class Busqueda extends React.Component {
	state = {
		nombres: '',
		apellidoUno: '',
		apellidoDos: '',
		escolaridadNivel: '',
		institucion: '',
		nivel: '',
		escolaridadNivelArray: [],
		dataArray: [
			{
				sujetoObligado: 'Estado de México',
				data: [
					{
						nombres: 'JORGE ',
						primerApellido: 'YAMAWAKI ',
						segundoApellido: 'MAMANI ',
						curp: 'LUTC920630HASLLB00',
						rfc: {
							rfc: 'LUTC920630',
							homoClave: 'LCU'
						},
						correoElectronico: {
							institucional: 'LUTC920630@correo.org',
							personal: 'LUTC920630@correo.org'
						},
						telefono: {
							casa: '4499876532',
							celularPersonal: ''
						},
						situacionPersonalEstadoCivil: {
							clave: 'SOL',
							valor: 'SOLTERO (A)'
						},
						paisNacimiento: {
							clave: 'MX',
							valor: 'MEXICO'
						},
						nacionalidad: {
							clave: 'MX',
							valor: 'MEXICO'
						},
						aclaracionesObservaciones: 'NADA'
					},
					{
						nombres: 'JORGE ',
						primerApellido: 'HERRERA ',
						segundoApellido: 'FLORES ',
						curp: 'MITD700309HASLLB00',
						rfc: {
							rfc: 'MITD700309',
							homoClave: 'MDI'
						},
						correoElectronico: {
							institucional: 'MITD700309@correo.org',
							personal: 'MITD700309@correo.org'
						},
						telefono: {
							casa: '4499876532',
							celularPersonal: ''
						},
						situacionPersonalEstadoCivil: {
							clave: 'SOL',
							valor: 'SOLTERO (A)'
						},
						paisNacimiento: {
							clave: 'MX',
							valor: 'MEXICO'
						},
						nacionalidad: {
							clave: 'MX',
							valor: 'MEXICO'
						},
						aclaracionesObservaciones: 'NADA'
					},
					{
						nombres: 'ZARITA',
						primerApellido: 'CHIRINOS ',
						segundoApellido: 'BOZA ',
						curp: 'XOVO951224HASLLB00',
						rfc: {
							rfc: 'XOVO951224',
							homoClave: 'XOO'
						},
						correoElectronico: {
							institucional: 'XOVO951224@correo.org',
							personal: 'XOVO951224@correo.org'
						},
						telefono: {
							casa: '4499876532',
							celularPersonal: ''
						},
						situacionPersonalEstadoCivil: {
							clave: 'SOL',
							valor: 'SOLTERO (A)'
						},
						paisNacimiento: {
							clave: 'MX',
							valor: 'MEXICO'
						},
						nacionalidad: {
							clave: 'MX',
							valor: 'MEXICO'
						},
						aclaracionesObservaciones: 'NADA'
					},
					{
						nombres: 'MARCO ',
						primerApellido: 'ALOCEN ',
						segundoApellido: 'TEJEDO ',
						curp: 'JUYA861010HASLLB00',
						rfc: {
							rfc: 'JUYA861010',
							homoClave: 'JAU'
						},
						correoElectronico: {
							institucional: 'JUYA861010@correo.org',
							personal: 'JUYA861010@correo.org'
						},
						telefono: {
							casa: '4499876532',
							celularPersonal: ''
						},
						situacionPersonalEstadoCivil: {
							clave: 'SOL',
							valor: 'SOLTERO (A)'
						},
						paisNacimiento: {
							clave: 'MX',
							valor: 'MEXICO'
						},
						nacionalidad: {
							clave: 'MX',
							valor: 'MEXICO'
						},
						aclaracionesObservaciones: 'NADA'
					},
					{
						nombres: 'LEONCIA',
						primerApellido: 'BEDOYA ',
						segundoApellido: 'ZAMALLOA ',
						curp: 'MIBD970113HASLLB00',
						rfc: {
							rfc: 'MIBD970113',
							homoClave: 'MDI'
						},
						correoElectronico: {
							institucional: 'MIBD970113@correo.org',
							personal: 'MIBD970113@correo.org'
						},
						telefono: {
							casa: '4499876532',
							celularPersonal: ''
						},
						situacionPersonalEstadoCivil: {
							clave: 'SOL',
							valor: 'SOLTERO (A)'
						},
						paisNacimiento: {
							clave: 'MX',
							valor: 'MEXICO'
						},
						nacionalidad: {
							clave: 'MX',
							valor: 'MEXICO'
						},
						aclaracionesObservaciones: 'NADA'
					},
					{
						nombres: 'EDWIN',
						primerApellido: 'AREVALO ',
						segundoApellido: 'ZAPATA ',
						curp: 'OOEF860707HASLLB00',
						rfc: {
							rfc: 'OOEF860707',
							homoClave: 'OFO'
						},
						correoElectronico: {
							institucional: 'OOEF860707@correo.org',
							personal: 'OOEF860707@correo.org'
						},
						telefono: {
							casa: '4499876532',
							celularPersonal: ''
						},
						situacionPersonalEstadoCivil: {
							clave: 'SOL',
							valor: 'SOLTERO (A)'
						},
						paisNacimiento: {
							clave: 'MX',
							valor: 'MEXICO'
						},
						nacionalidad: {
							clave: 'MX',
							valor: 'MEXICO'
						},
						aclaracionesObservaciones: 'NADA'
					},
					{
						nombres: 'MARCO ',
						primerApellido: 'MALDONADO ',
						segundoApellido: 'GONZALES ',
						curp: 'ROYI750814HASLLB00',
						rfc: {
							rfc: 'ROYI750814',
							homoClave: 'RIO'
						},
						correoElectronico: {
							institucional: 'ROYI750814@correo.org',
							personal: 'ROYI750814@correo.org'
						},
						telefono: {
							casa: '4499876532',
							celularPersonal: ''
						},
						situacionPersonalEstadoCivil: {
							clave: 'SOL',
							valor: 'SOLTERO (A)'
						},
						paisNacimiento: {
							clave: 'MX',
							valor: 'MEXICO'
						},
						nacionalidad: {
							clave: 'MX',
							valor: 'MEXICO'
						},
						aclaracionesObservaciones: 'NADA'
					},
					{
						nombres: 'ISELA ',
						primerApellido: 'BAYLON ',
						segundoApellido: 'YAMAWAKI ',
						curp: 'LEAC781212HASLLB00',
						rfc: {
							rfc: 'LEAC781212',
							homoClave: 'LCE'
						},
						correoElectronico: {
							institucional: 'LEAC781212@correo.org',
							personal: 'LEAC781212@correo.org'
						},
						telefono: {
							casa: '4499876532',
							celularPersonal: ''
						},
						situacionPersonalEstadoCivil: {
							clave: 'SOL',
							valor: 'SOLTERO (A)'
						},
						paisNacimiento: {
							clave: 'MX',
							valor: 'MEXICO'
						},
						nacionalidad: {
							clave: 'MX',
							valor: 'MEXICO'
						},
						aclaracionesObservaciones: 'NADA'
					},
					{
						nombres: 'MARIA',
						primerApellido: 'FERNANDEZ ',
						segundoApellido: 'CHANCOS ',
						curp: 'DUBU840630HASLLB00',
						rfc: {
							rfc: 'DUBU840630',
							homoClave: 'DUU'
						},
						correoElectronico: {
							institucional: 'DUBU840630@correo.org',
							personal: 'DUBU840630@correo.org'
						},
						telefono: {
							casa: '4499876532',
							celularPersonal: ''
						},
						situacionPersonalEstadoCivil: {
							clave: 'SOL',
							valor: 'SOLTERO (A)'
						},
						paisNacimiento: {
							clave: 'MX',
							valor: 'MEXICO'
						},
						nacionalidad: {
							clave: 'MX',
							valor: 'MEXICO'
						},
						aclaracionesObservaciones: 'NADA'
					},
					{
						nombres: 'ANTONIO ',
						primerApellido: 'ALOSILLA ',
						segundoApellido: 'YAMAWAKI ',
						curp: 'MUCD950505HASLLB00',
						rfc: {
							rfc: 'MUCD950505',
							homoClave: 'MDU'
						},
						correoElectronico: {
							institucional: 'MUCD950505@correo.org',
							personal: 'MUCD950505@correo.org'
						},
						telefono: {
							casa: '4499876532',
							celularPersonal: ''
						},
						situacionPersonalEstadoCivil: {
							clave: 'SOL',
							valor: 'SOLTERO (A)'
						},
						paisNacimiento: {
							clave: 'MX',
							valor: 'MEXICO'
						},
						nacionalidad: {
							clave: 'MX',
							valor: 'MEXICO'
						},
						aclaracionesObservaciones: 'NADA'
					}
				]
			},
			{
				sujetoObligado: 'Secretaria de la Función Publica',
				data: [
					{
						nombres: 'JORGE ',
						primerApellido: 'YAMAWAKI ',
						segundoApellido: 'MAMANI ',
						curp: 'LUTC920630HASLLB00',
						rfc: {
							rfc: 'LUTC920630',
							homoClave: 'LCU'
						},
						correoElectronico: {
							institucional: 'LUTC920630@correo.org',
							personal: 'LUTC920630@correo.org'
						},
						telefono: {
							casa: '4499876532',
							celularPersonal: ''
						},
						situacionPersonalEstadoCivil: {
							clave: 'SOL',
							valor: 'SOLTERO (A)'
						},
						paisNacimiento: {
							clave: 'MX',
							valor: 'MEXICO'
						},
						nacionalidad: {
							clave: 'MX',
							valor: 'MEXICO'
						},
						aclaracionesObservaciones: 'NADA'
					},
					{
						nombres: 'JORGE ',
						primerApellido: 'HERRERA ',
						segundoApellido: 'FLORES ',
						curp: 'MITD700309HASLLB00',
						rfc: {
							rfc: 'MITD700309',
							homoClave: 'MDI'
						},
						correoElectronico: {
							institucional: 'MITD700309@correo.org',
							personal: 'MITD700309@correo.org'
						},
						telefono: {
							casa: '4499876532',
							celularPersonal: ''
						},
						situacionPersonalEstadoCivil: {
							clave: 'SOL',
							valor: 'SOLTERO (A)'
						},
						paisNacimiento: {
							clave: 'MX',
							valor: 'MEXICO'
						},
						nacionalidad: {
							clave: 'MX',
							valor: 'MEXICO'
						},
						aclaracionesObservaciones: 'NADA'
					},
					{
						nombres: 'ZARITA',
						primerApellido: 'CHIRINOS ',
						segundoApellido: 'BOZA ',
						curp: 'XOVO951224HASLLB00',
						rfc: {
							rfc: 'XOVO951224',
							homoClave: 'XOO'
						},
						correoElectronico: {
							institucional: 'XOVO951224@correo.org',
							personal: 'XOVO951224@correo.org'
						},
						telefono: {
							casa: '4499876532',
							celularPersonal: ''
						},
						situacionPersonalEstadoCivil: {
							clave: 'SOL',
							valor: 'SOLTERO (A)'
						},
						paisNacimiento: {
							clave: 'MX',
							valor: 'MEXICO'
						},
						nacionalidad: {
							clave: 'MX',
							valor: 'MEXICO'
						},
						aclaracionesObservaciones: 'NADA'
					},
					{
						nombres: 'MARCO ',
						primerApellido: 'ALOCEN ',
						segundoApellido: 'TEJEDO ',
						curp: 'JUYA861010HASLLB00',
						rfc: {
							rfc: 'JUYA861010',
							homoClave: 'JAU'
						},
						correoElectronico: {
							institucional: 'JUYA861010@correo.org',
							personal: 'JUYA861010@correo.org'
						},
						telefono: {
							casa: '4499876532',
							celularPersonal: ''
						},
						situacionPersonalEstadoCivil: {
							clave: 'SOL',
							valor: 'SOLTERO (A)'
						},
						paisNacimiento: {
							clave: 'MX',
							valor: 'MEXICO'
						},
						nacionalidad: {
							clave: 'MX',
							valor: 'MEXICO'
						},
						aclaracionesObservaciones: 'NADA'
					},
					{
						nombres: 'LEONCIA',
						primerApellido: 'BEDOYA ',
						segundoApellido: 'ZAMALLOA ',
						curp: 'MIBD970113HASLLB00',
						rfc: {
							rfc: 'MIBD970113',
							homoClave: 'MDI'
						},
						correoElectronico: {
							institucional: 'MIBD970113@correo.org',
							personal: 'MIBD970113@correo.org'
						},
						telefono: {
							casa: '4499876532',
							celularPersonal: ''
						},
						situacionPersonalEstadoCivil: {
							clave: 'SOL',
							valor: 'SOLTERO (A)'
						},
						paisNacimiento: {
							clave: 'MX',
							valor: 'MEXICO'
						},
						nacionalidad: {
							clave: 'MX',
							valor: 'MEXICO'
						},
						aclaracionesObservaciones: 'NADA'
					},
					{
						nombres: 'EDWIN',
						primerApellido: 'AREVALO ',
						segundoApellido: 'ZAPATA ',
						curp: 'OOEF860707HASLLB00',
						rfc: {
							rfc: 'OOEF860707',
							homoClave: 'OFO'
						},
						correoElectronico: {
							institucional: 'OOEF860707@correo.org',
							personal: 'OOEF860707@correo.org'
						},
						telefono: {
							casa: '4499876532',
							celularPersonal: ''
						},
						situacionPersonalEstadoCivil: {
							clave: 'SOL',
							valor: 'SOLTERO (A)'
						},
						paisNacimiento: {
							clave: 'MX',
							valor: 'MEXICO'
						},
						nacionalidad: {
							clave: 'MX',
							valor: 'MEXICO'
						},
						aclaracionesObservaciones: 'NADA'
					},
					{
						nombres: 'MARCO ',
						primerApellido: 'MALDONADO ',
						segundoApellido: 'GONZALES ',
						curp: 'ROYI750814HASLLB00',
						rfc: {
							rfc: 'ROYI750814',
							homoClave: 'RIO'
						},
						correoElectronico: {
							institucional: 'ROYI750814@correo.org',
							personal: 'ROYI750814@correo.org'
						},
						telefono: {
							casa: '4499876532',
							celularPersonal: ''
						},
						situacionPersonalEstadoCivil: {
							clave: 'SOL',
							valor: 'SOLTERO (A)'
						},
						paisNacimiento: {
							clave: 'MX',
							valor: 'MEXICO'
						},
						nacionalidad: {
							clave: 'MX',
							valor: 'MEXICO'
						},
						aclaracionesObservaciones: 'NADA'
					},
					{
						nombres: 'ISELA ',
						primerApellido: 'BAYLON ',
						segundoApellido: 'YAMAWAKI ',
						curp: 'LEAC781212HASLLB00',
						rfc: {
							rfc: 'LEAC781212',
							homoClave: 'LCE'
						},
						correoElectronico: {
							institucional: 'LEAC781212@correo.org',
							personal: 'LEAC781212@correo.org'
						},
						telefono: {
							casa: '4499876532',
							celularPersonal: ''
						},
						situacionPersonalEstadoCivil: {
							clave: 'SOL',
							valor: 'SOLTERO (A)'
						},
						paisNacimiento: {
							clave: 'MX',
							valor: 'MEXICO'
						},
						nacionalidad: {
							clave: 'MX',
							valor: 'MEXICO'
						},
						aclaracionesObservaciones: 'NADA'
					},
					{
						nombres: 'MARIA',
						primerApellido: 'FERNANDEZ ',
						segundoApellido: 'CHANCOS ',
						curp: 'DUBU840630HASLLB00',
						rfc: {
							rfc: 'DUBU840630',
							homoClave: 'DUU'
						},
						correoElectronico: {
							institucional: 'DUBU840630@correo.org',
							personal: 'DUBU840630@correo.org'
						},
						telefono: {
							casa: '4499876532',
							celularPersonal: ''
						},
						situacionPersonalEstadoCivil: {
							clave: 'SOL',
							valor: 'SOLTERO (A)'
						},
						paisNacimiento: {
							clave: 'MX',
							valor: 'MEXICO'
						},
						nacionalidad: {
							clave: 'MX',
							valor: 'MEXICO'
						},
						aclaracionesObservaciones: 'NADA'
					},
					{
						nombres: 'ANTONIO ',
						primerApellido: 'ALOSILLA ',
						segundoApellido: 'YAMAWAKI ',
						curp: 'MUCD950505HASLLB00',
						rfc: {
							rfc: 'MUCD950505',
							homoClave: 'MDU'
						},
						correoElectronico: {
							institucional: 'MUCD950505@correo.org',
							personal: 'MUCD950505@correo.org'
						},
						telefono: {
							casa: '4499876532',
							celularPersonal: ''
						},
						situacionPersonalEstadoCivil: {
							clave: 'SOL',
							valor: 'SOLTERO (A)'
						},
						paisNacimiento: {
							clave: 'MX',
							valor: 'MEXICO'
						},
						nacionalidad: {
							clave: 'MX',
							valor: 'MEXICO'
						},
						aclaracionesObservaciones: 'NADA'
					}
				]
			}
		],
		dataSelect: inicial,
		// dataSelect: ''
	};

	cleanForm = () => {
		this.setState((prevState) => ({
			...prevState,
			nombres: '',
			apellidoUno: '',
			apellidoDos: '',
			escolaridadNivel: '',
			institucion: '',
			nivel: '',
			dataArray: [],
			dataSelect: {}
		}));
	};

	handleInputChange = (event) => {
		const target = event.target;
		const value = target.value;
		const name = target.name;

		console.log('traget: ', target);

		this.setState((prevState) => ({
			...prevState,
			[name]: value
		}));
	};

	handleDataSelect = (data) => {
		this.setState((prevState) => ({
			...prevState,
			dataSelect: data
		}));
	};

	getEscolaridadNivel = () => {
		fetch('https://raw.githubusercontent.com/PDNMX/catalogos/master/S1%20-%20Declaraciones/nivel.json')
			.then((response) => response.json())
			.then((jsonData) => {
				this.setState((prevState) => ({
					...prevState,
					escolaridadNivelArray: jsonData
				}));
			})
			.catch((error) => {
				console.error(error);
			});
	};

	componentDidMount() {
		this.getEscolaridadNivel();
	}

	render() {
		let { classes } = this.props;

		return (
			<div>
				{!this.state.dataSelect && (
					<div>
						<Grid container spacing={0} className={classes.infoBusqueda}>
							<Grid item xs={12}>
								<Typography paragraph>
									<b>Aquí encontrarás la siguiente información:</b>
								</Typography>
								<ul className={classes.ul}>
									<li className={classes.li}>
										<Typography color="textPrimary" display="inline">
											La evolución patrimonial de las y los funcionarios
										</Typography>
									</li>
									<li className={classes.li}>
										<Typography color="textPrimary" display="inline">
											La trayectoria laboral de las y los funcionarios
										</Typography>
									</li>
									<li className={classes.li}>
										<Typography color="textPrimary" display="inline">
											Sus declaraciones sobre posibles conflictos de interés
										</Typography>
									</li>
								</ul>
							</Grid>
						</Grid>
						<Grid container spacing={0} className={classes.root}>
							<Grid item xs={12}>
								<Typography>
									<b>Busca un servidor público</b>
								</Typography>
							</Grid>
							<Grid item xs={12}>
								<Grid container spacing={1}>
									<Grid item xs={12} md={4}>
										<FormControl className={classes.formControl}>
											<TextField
												id="mui-name"
												label="Nombres"
												value={this.state.nombres}
												className={classes.textField}
												name="nombres"
												onChange={this.handleInputChange}
												margin="normal"
												fullWidth
												InputLabelProps={{
													className: classes.inputShrink,
													shrink: true
												}}
											/>
										</FormControl>
									</Grid>
									<Grid item xs={12} md={4}>
										<FormControl className={classes.formControl}>
											<TextField
												id="apellidoUno"
												name="apellidoUno"
												value={this.state.apellidoUno}
												className={classes.textField}
												onChange={this.handleInputChange}
												label="Apellido uno"
												margin="normal"
												fullWidth
												InputLabelProps={{
													className: classes.inputShrink,
													shrink: true
												}}
											/>
										</FormControl>
									</Grid>
									<Grid item xs={12} md={4}>
										<FormControl className={classes.formControl}>
											<TextField
												id="apellidoDos"
												name="apellidoDos"
												value={this.state.apellidoDos}
												className={classes.textField}
												onChange={this.handleInputChange}
												label="Apellido dos"
												margin="normal"
												fullWidth
												InputLabelProps={{
													className: classes.inputShrink,
													shrink: true
												}}
											/>
										</FormControl>
									</Grid>
									<Grid item xs={12} md={4}>
										<FormControl className={classes.formControl}>
											<InputLabel id="escolaridadNivel">Nivel escolar</InputLabel>
											<Select
												id="escolaridadNivel"
												name="escolaridadNivel"
												value={this.state.escolaridadNivel}
												onChange={this.handleInputChange}
											>
												<MenuItem value="" selected>
													TODOS
												</MenuItem>
												{this.state.escolaridadNivelArray.map((escolaridad) => {
													return (
														<MenuItem
															key={'escolaridad' + escolaridad.clave}
															value={escolaridad.clave}
														>
															{escolaridad.valor}
														</MenuItem>
													);
												})}
											</Select>
										</FormControl>
									</Grid>
									<Grid item xs={12} md={8}>
										<FormControl className={classes.formControl}>
											<InputLabel id="institucion">Institución</InputLabel>
											<Select
												id="institucion"
												name="institucion"
												value={this.state.institucion}
												onChange={this.handleInputChange}
											>
												<MenuItem value="" selected>
													Todos
												</MenuItem>
												<MenuItem value="aaa">aaa</MenuItem>
											</Select>
										</FormControl>
									</Grid>
									<Grid item xs={12} md={6}>
										<FormControl component="fieldset" className={classes.formControl}>
											<FormLabel component="legend">Nivel:</FormLabel>
											<RadioGroup
												aria-label="nivel"
												name="nivel"
												className={classes.group}
												value={this.state.nivel}
												onChange={this.handleInputChange}
												row
											>
												<FormControlLabel
													value=""
													control={<Radio color="secondary" />}
													label="Todos"
												/>
												<FormControlLabel
													value="FED"
													control={<Radio color="secondary" />}
													label="Federal"
												/>
												<FormControlLabel
													value="EST"
													control={<Radio color="secondary" />}
													label="Entidades federativas"
												/>
												<FormControlLabel
													value="MUN"
													control={<Radio color="secondary" />}
													label="Municipal"
												/>
											</RadioGroup>
										</FormControl>
									</Grid>
									<Grid item xs={12} style={{ textAlign: 'right' }}>
										<Button
											className={classes.button}
											type="submit"
											variant="contained"
											color="secondary"
										>
											Buscar
										</Button>
										<Button
											className={classes.button}
											type="reset"
											variant="contained"
											color="secondary"
											onClick={this.cleanForm}
										>
											Limpiar
										</Button>
									</Grid>

									<Grid item xs={12}>
										{/* <BusquedaFromMaterialUI getUsers={this.getUsers} />
                 */}
									</Grid>
								</Grid>
							</Grid>
						</Grid>
						<Grid container spacing={0} className={classes.root}>
							<div className={classes.resultadosRoot}>
								{this.state.dataArray.map((data) => {
									return (
										<ExpansionPanel key={'sujetoObligado-' + data.sujetoObligado}>
											<ExpansionPanelSummary
												expandIcon={<ExpandMoreIcon />}
												aria-controls="panel1a-content"
												id="panel1a-header"
												className={classes.resultadosTitulo}
											>
												<Typography className={classes.resultadosHeading}>
													{data.sujetoObligado}
												</Typography>
											</ExpansionPanelSummary>
											<ExpansionPanelDetails className={classes.resultadoContenido}>
												<Tabla data={data.data} handleDataSelect={this.handleDataSelect} />
											</ExpansionPanelDetails>
										</ExpansionPanel>
									);
								})}
							</div>
						</Grid>
					</div>
				)}
				{this.state.dataSelect && <Perfil data={this.state.dataSelect} />}
			</div>
		);
	}
}

export default withStyles(styles)(Busqueda);
