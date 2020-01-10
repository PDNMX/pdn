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
		dataSelect: {
			metadata: {
				actualizacion: '2020-01-09T18:18:27Z',
				institucion: 'SECRETARIA ESTATAL DEL AGUA',
				contacto: 'MITD700309@correo.org',
				personaContacto: 'JORGE  HERRERA  FLORES ',
				tipo: 'MODIFICACION'
			},
			declaracion: {
				situacionPatrimonial: {
					datosGenerales: {
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
					domicilioDeclarante: {
						domicilioMexico: {
							calle: 'PRINCIPAL',
							numeroExterior: '138',
							numeroInterior: '1',
							coloniaLocalidad: 'GUADALUPE POSADA',
							municipioAlcaldia: {
								clave: '001',
								valor: 'AGUASCALIENTES'
							},
							entidadFederativa: {
								clave: '01',
								valor: 'AGUASCALIENTES'
							},
							codigoPostal: '20070'
						},
						aclaracionesObservaciones: 'NADA'
					},
					datosCurricularesDeclarante: {
						escolaridad: [
							{
								tipoOperacion: 'SIN_CAMBIOS',
								nivel: {
									clave: 'BCH',
									valor: 'BACHILLERATO'
								},
								institucionEducativa: {
									nombre: 'CEBETIS 93',
									ubicacion: 'MX'
								},
								carreraAreaConocimiento: '',
								estatus: 'FINALIZADO',
								documentoObtenido: 'CERTIFICADO',
								fechaObtencion: '2000-02-06'
							},
							{
								tipoOperacion: 'SIN_CAMBIOS',
								nivel: {
									clave: 'SEC',
									valor: 'SECUNDARIA'
								},
								institucionEducativa: {
									nombre: 'SECUNDARIA TECNICA 12',
									ubicacion: 'MX'
								},
								carreraAreaConocimiento: '',
								estatus: 'FINALIZADO',
								documentoObtenido: 'BOLETA',
								fechaObtencion: '2002-07-17'
							},
							{
								tipoOperacion: 'SIN_CAMBIOS',
								nivel: {
									clave: 'PRI',
									valor: 'PRIMARIA'
								},
								institucionEducativa: {
									nombre: 'PRIMARIA PRIVADA',
									ubicacion: 'MX'
								},
								carreraAreaConocimiento: '',
								estatus: 'FINALIZADO',
								documentoObtenido: 'BOLETA',
								fechaObtencion: '2002-07-17'
							}
						],
						aclaracionesObservaciones: 'NADA'
					},
					datosEmpleoCargoComision: {
						tipoOperacion: 'SIN_CAMBIOS',
						nivelOrdenGobierno: 'ESTATAL',
						ambitoPublico: 'EJECUTIVO',
						nombreEntePublico: 'SECRETARÍA ESTATAL DEL AGUA',
						areaAdscripcion: 'CONTABILIDAD',
						empleoCargoComision: 'ENLACE CONTABILIDAD',
						contratadoPorHonorarios: true,
						nivelEmpleoCargoComision: 'ENLACE',
						funcionPrincipal: 'ADMINISTRAR EL DINERO',
						fechaTomaPosesion: '2009-03-29',
						telefonoOficina: {
							telefono: '4491234636',
							extension: '435'
						},
						domicilioMexico: {
							calle: 'PRINCIPAL',
							numeroExterior: '138',
							numeroInterior: '1',
							coloniaLocalidad: 'GUADALUPE POSADA',
							municipioAlcaldia: {
								clave: '001',
								valor: 'AGUASCALIENTES'
							},
							entidadFederativa: {
								clave: '01',
								valor: 'AGUASCALIENTES'
							},
							codigoPostal: '20070'
						},
						aclaracionesObservaciones: 'NADA',
						cuentaConOtroCargoPublico: false
					},
					experienciaLaboral: {
						ninguno: false,
						experiencia: [
							{
								tipoOperacion: 'SIN_CAMBIOS',
								ambitoSector: {
									clave: 'PUB',
									valor: 'PÚBLICO'
								},
								nivelOrdenGobierno: 'MUNICIPAL',
								ambitoPublico: 'ORGANO_AUTONOMO',
								nombreEntePublico: 'INSTITUCION GUBERNAMENTAL',
								areaAdscripcion: 'CONTABILIDAD',
								empleoCargoComision: 'ENLACE',
								funcionPrincipal: 'ADMINISTRAR EL DINERO',
								fechaIngreso: '2006-03-04',
								fechaEgreso: '2015-06-02',
								ubicacion: 'MEXICO'
							}
						],
						aclaracionesObservaciones: 'NADA'
					},
					datosPareja: {
						ninguno: false,
						tipoOperacion: 'SIN_CAMBIOS',
						nombre: 'ISELA ',
						primerApellido: 'MAMANI ',
						segundoApellido: 'BAIOCCHI ',
						fechaNacimiento: '1965-03-17',
						rfc: 'SUZJ780915FWE',
						relacionConDeclarante: 'CONYUGE',
						ciudadanoExtranjero: true,
						curp: '',
						esDependienteEconomico: true,
						habitaDomicilioDeclarante: true,
						lugarDondeReside: 'MEXICO',
						domicilioMexico: {
							calle: 'PRINCIPAL',
							numeroExterior: '138',
							numeroInterior: '1',
							coloniaLocalidad: 'GUADALUPE POSADA',
							municipioAlcaldia: {
								clave: '001',
								valor: 'AGUASCALIENTES'
							},
							entidadFederativa: {
								clave: '01',
								valor: 'AGUASCALIENTES'
							},
							codigoPostal: '20070'
						},
						actividadLaboral: {
							clave: 'NING',
							valor: 'NINGUNO'
						},
						aclaracionesObservaciones: 'NADA'
					},
					datosDependienteEconomico: {
						ninguno: false,
						dependienteEconomico: [
							{
								tipoOperacion: 'SIN_CAMBIOS',
								nombre: 'JORGE ',
								primerApellido: 'PAREDES ',
								segundoApellido: 'BAIOCCHI ',
								fechaNacimiento: '1965-03-17',
								rfc: 'SUZJ780915FWE',
								parentescoRelacion: {
									clave: 'HIJ',
									valor: 'HIJO(A)'
								},
								extranjero: true,
								curp: '',
								habitaDomicilioDeclarante: true,
								lugarDondeReside: 'MEXICO',
								domicilioMexico: {
									calle: 'PRINCIPAL',
									numeroExterior: '138',
									numeroInterior: '1',
									coloniaLocalidad: 'GUADALUPE POSADA',
									municipioAlcaldia: {
										clave: '001',
										valor: 'AGUASCALIENTES'
									},
									entidadFederativa: {
										clave: '01',
										valor: 'AGUASCALIENTES'
									},
									codigoPostal: '20070'
								},
								actividadLaboral: {
									clave: 'NING',
									valor: 'NINGUNO'
								}
							}
						],
						aclaracionesObservaciones: 'NADA'
					},
					ingresos: {
						remuneracionMensualCargoPublico: {
							valor: 8737,
							moneda: {
								clave: 'MXN',
								valor: 'PESO MEXICANO'
							}
						},
						otrosIngresosMensualesTotal: {
							valor: 323189,
							moneda: {
								clave: 'MXN',
								valor: 'PESO MEXICANO'
							}
						},
						actividadIndustialComercialEmpresarial: {
							remuneracion: {
								valor: 65646,
								moneda: {
									clave: 'MXN',
									valor: 'PESO MEXICANO'
								}
							},
							nombreRazonSocial: 'EMPRESA PROPIA',
							tipoNegocio: 'TIENDA'
						},
						actividadFinanciera: {
							remuneracion: {
								valor: 53570,
								moneda: {
									clave: 'MXN',
									valor: 'PESO MEXICANO'
								}
							},
							tipoInstrumento: {
								clave: 'CAP',
								valor: 'CAPITAL'
							}
						},
						serviciosProfesionales: {
							remuneracion: {
								valor: 82275,
								moneda: {
									clave: 'MXN',
									valor: 'PESO MEXICANO'
								}
							},
							tipoServicio: 'PROFESIONAL'
						},
						otrosIngresos: {
							remuneracion: {
								valor: 38040,
								moneda: {
									clave: 'MXN',
									valor: 'PESO MEXICANO'
								}
							},
							tipoIngreso: 'CONSULTAS'
						},
						ingresoMensualNetoDeclarante: {
							valor: 331926,
							moneda: {
								clave: 'MXN',
								valor: 'PESO MEXICANO'
							}
						},
						ingresoMensualNetoParejaDependiente: {
							valor: 14205,
							moneda: {
								clave: 'MXN',
								valor: 'PESO MEXICANO'
							}
						},
						totalIngresosMensualesNetos: {
							valor: 346131,
							moneda: {
								clave: 'MXN',
								valor: 'PESO MEXICANO'
							}
						},
						aclaracionesObservaciones: 'NADA'
					},
					bienesInmuebles: {
						ninguno: false,
						bienInmueble: [
							{
								tipoOperacion: 'SIN_CAMBIOS',
								tipoInmueble: {
									clave: 'TERR',
									valor: 'TERRENO'
								},
								titular: [
									{
										clave: 'DEC',
										valor: 'DECLARANTE'
									}
								],
								porcentajePropiedad: 100,
								superficieTerreno: {
									valor: 978,
									unidad: 'Metro cuadrado'
								},
								superficieConstruccion: {
									valor: 465,
									unidad: 'Metro cuadrado'
								},
								transmisor: [
									{
										tipoPersona: 'MORAL',
										nombreRazonSocial: 'INMOVILIARIA HOME',
										rfc: 'INM101010P93',
										relacion: {
											clave: 'OTRO',
											valor: 'OTRO(ESPECIFIQUE)'
										}
									}
								],
								formaAdquisicion: {
									clave: 'DNC',
									valor: 'DONACIÓN'
								},
								formaPago: 'CREDITO',
								valorAdquisicion: {
									valor: 978436,
									moneda: {
										clave: 'MXN',
										valor: 'PESO MEXICANO'
									}
								},
								fechaAdquiscion: '1998-07-17',
								datoIdentificacion: '111D54A1D',
								valorConformeA: 'ESCRITURA',
								domicilioMexico: {
									calle: 'PRINCIPAL',
									numeroExterior: '138',
									numeroInterior: '1',
									coloniaLocalidad: 'GUADALUPE POSADA',
									municipioAlcaldia: {
										clave: '001',
										valor: 'AGUASCALIENTES'
									},
									entidadFederativa: {
										clave: '01',
										valor: 'AGUASCALIENTES'
									},
									codigoPostal: '20070'
								},
								motivoBaja: {
									clave: 'OTRO',
									valor: 'NO APLICA'
								}
							}
						],
						aclaracionesObservaciones: 'NADA'
					},
					vehiculos: {
						ninguno: false,
						vehiculo: [
							{
								tipoOperacion: 'SIN_CAMBIOS',
								tipoVehiculo: {
									clave: 'AUMOT',
									valor: 'AUTOMÓVIL/MOTOCICLETA'
								},
								titular: [
									{
										clave: 'DEC',
										valor: 'DECLARANTE'
									}
								],
								transmisor: [
									{
										tipoPersona: 'MORAL',
										nombreRazonSocial: 'AUTOMOTRIZ DE LUJO',
										rfc: 'AUL121212B00',
										relacion: {
											clave: 'OTRO',
											valor: 'OTRO(ESPECIFIQUE)'
										}
									}
								],
								marca: 'CHEVROLET',
								modelo: 'CAMARO',
								anio: 2017,
								numeroSerieRegistro: 'FBFF4FC9',
								lugarRegistro: {
									pais: 'MX',
									entidadFederativa: {
										clave: '01',
										valor: 'AGUASCALIENTES'
									}
								},
								formaAdquisicion: {
									clave: 'HRN',
									valor: 'HERENCIA'
								},
								formaPago: 'CONTADO',
								valorAdquisicion: {
									valor: 1924512,
									moneda: {
										clave: 'MXN',
										valor: 'PESO MEXICANO'
									}
								},
								fechaAdquisicion: '2019-07-31',
								motivoBaja: {
									clave: 'OTRO',
									valor: 'NO APLICA'
								}
							}
						],
						aclaracionesObservaciones: 'NADA'
					},
					bienesMuebles: {
						ninguno: false,
						bienMueble: [
							{
								tipoOperacion: 'SIN_CAMBIOS',
								titular: [
									{
										clave: 'DEC',
										valor: 'DECLARANTE'
									}
								],
								tipoBien: {
									clave: 'MECA',
									valor: 'MENAJE DE CASA (MUEBLES Y ACCESORIOS DE CASA)'
								},
								transmisor: [
									{
										tipoPersona: 'MORAL',
										nombreRazonSocial: 'MUEBLERIA GRANDE',
										rfc: 'MUG121212LOL',
										relacion: {
											clave: 'OTRO',
											valor: 'OTRO(ESPECIFIQUE)'
										}
									}
								],
								descripcionGeneralBien: 'SILLAS',
								formaAdquisicion: {
									clave: 'HRN',
									valor: 'HERENCIA'
								},
								formaPago: 'CONTADO',
								valorAdquisicion: {
									valor: 13432,
									moneda: {
										clave: 'MXN',
										valor: 'PESO MEXICANO'
									}
								},
								fechaAdquisicion: '2019-07-31',
								motivoBaja: {
									clave: 'OTRO',
									valor: 'NO APLICA'
								}
							}
						],
						aclaracionesObservaciones: 'NADA'
					},
					inversiones: {
						ninguno: false,
						inversion: [
							{
								tipoOperacion: 'SIN_CAMBIOS',
								tipoInversion: {
									clave: 'POMM',
									valor: 'POSESIÓN  DE MONEDAS Y/O METALES'
								},
								subTipoInversion: {
									clave: 'CENT',
									valor: 'CENTENARIOS'
								},
								titular: [
									{
										clave: 'DEC',
										valor: 'DECLARANTE'
									}
								],
								numeroCuentaContrato: '169807481',
								localizacionInversion: {
									pais: {
										clave: 'MX',
										valor: 'México'
									},
									institucionRazonSocial: 'HSBC',
									rfc: 'HAB040404TRX'
								},
								saldoSituacionActual: {
									valor: 62061,
									moneda: {
										clave: 'MXN',
										valor: 'PESO MEXICANO'
									}
								}
							}
						],
						aclaracionesObservaciones: 'NADA'
					},
					adeudos: {
						ninguno: false,
						adeudo: [
							{
								tipoOperacion: 'SIN_CAMBIOS',
								titular: [
									{
										clave: 'DEC',
										valor: 'DECLARANTE'
									}
								],
								tipoAdeudo: {
									clave: 'TCRD',
									valor: 'TARJETA DE CRÉDITO DEPARTAMENTAL'
								},
								numeroCuentaContrato: '219423944',
								fechaAdquision: '2003-02-26',
								montoOriginal: {
									valor: 165873,
									moneda: {
										clave: 'MXN',
										valor: 'PESO MEXICANO'
									}
								},
								saldoInsolutoSituacionActual: {
									valor: 159923,
									moneda: {
										clave: 'MXN',
										valor: 'PESO MEXICANO'
									}
								},
								otorganteCredito: {
									tipoPersona: 'MORAL',
									nombreInstitucion: 'HSBC',
									rfc: 'HAB040404TRX'
								},
								localizacionAdeudo: {
									pais: {
										clave: 'MX',
										valor: 'MEXICO'
									}
								}
							}
						],
						aclaracionesObservaciones: 'NADA'
					},
					prestamoOComodato: {
						ninguno: false,
						prestamo: [
							{
								tipoOperacion: 'SIN_CAMBIOS',
								tipoBien: {
									vehiculo: {
										tipo: {
											clave: 'AUMOT',
											valor: 'AUTOMÓVIL/MOTOCICLETA'
										},
										marca: 'AUDI ',
										modelo: 'TT',
										anio: 2019,
										numeroSerieRegistro: '1A8E1715C',
										lugarRegistro: {
											pais: 'MX',
											entidadFederativa: {
												clave: '01',
												valor: 'AGUASCALIENTES'
											}
										}
									}
								},
								duenoTitular: {
									tipoDuenoTitular: 'FISICA',
									nombreTitular: 'JAVIER ALOSILLA ',
									rfc: 'SUZJ780915FWE',
									relacionConTitular: 'OTRO'
								}
							}
						],
						aclaracionesObservaciones: 'NADA'
					}
				},
				interes: {
					participacion: {
						ninguno: false,
						participacion: [
							{
								tipoOperacion: 'SIN_CAMBIOS',
								tipoRelacion: 'DECLARANTE',
								nombreEmpresaSociedadAsociacion: 'EMPRESA MANOFACTURERA',
								rfc: 'MAN050609ULO',
								porcentajeParticipacion: 79,
								tipoParticipacion: {
									clave: 'APOD',
									valor: 'APODERADO'
								},
								recibeRemuneracion: true,
								montoMensual: {
									valor: 8861,
									moneda: {
										clave: 'MXN',
										valor: 'PESO MEXICANO'
									}
								},
								ubicacion: {
									pais: {
										clave: 'MX',
										valor: 'MEXICO'
									},
									entidadFederativa: {
										clave: 'MX',
										valor: '01'
									}
								}
							}
						],
						aclaracionesObservaciones: 'NADA'
					},
					participacionTomaDecisiones: {
						ninguno: false,
						participacion: [
							{
								tipoOperacion: 'SIN_CAMBIOS',
								tipoRelacion: 'DECLARANTE',
								tipoInstitucion: {
									clave: 'OSC',
									valor: 'ORGANIZACIONES DE LA SOCIEDAD CIVIL'
								},
								nombreInstitucion: 'INSTITUCION PUBLICA',
								rfc: 'NIP030609KIO',
								puestoRol: 'SOCIO',
								fechaInicioParticipacion: '2003-02-26',
								recibeRemuneracion: true,
								montoMensual: {
									valor: 11127,
									moneda: {
										clave: 'MXN',
										valor: 'PESO MEXICANO'
									}
								},
								ubicacion: {
									pais: {
										clave: 'MX',
										valor: 'MEXICO'
									},
									entidadFederativa: {
										clave: '01',
										valor: 'AGUASCALIENTES'
									}
								}
							}
						],
						aclaracionesObservaciones: 'NADA'
					},
					apoyos: {
						ninguno: false,
						apoyo: [
							{
								tipoOperacion: 'SIN_CAMBIOS',
								beneficiarioPrograma: {
									clave: 'OTRO',
									valor: 'OTRO (ESPECIFIQUE)'
								},
								nombrePrograma: 'BENEFICIO DE GOBIERNO',
								institucionOtorgante: 'INST GOB',
								nivelOrdenGobierno: 'ESTATAL',
								tipoApoyo: {
									clave: 'OBRA',
									valor: 'OBRA'
								},
								formaRecepcion: 'MONETARIO',
								montoApoyoMensual: {
									valor: 6871,
									moneda: {
										clave: 'MXN',
										valor: 'PESO MEXICANO'
									}
								},
								especifiqueApoyo: ''
							}
						],
						aclaracionesObservaciones: 'NADA'
					},
					representacion: {
						ninguno: false,
						representacion: [
							{
								tipoOperacion: 'SIN_CAMBIOS',
								tipoRelacion: 'DECLARANTE',
								tipoRepresentacion: null,
								fechaInicioRepresentacion: '2003-02-26',
								tipoPersona: 'FISICA',
								nombreRazonSocial: 'JAVIER ALOSILLA ',
								rfc: 'SUZJ780915FWE',
								recibeRemuneracion: true,
								montoMensual: {
									valor: 7411,
									moneda: {
										clave: 'MXN',
										valor: 'PESO MEXICANO'
									}
								},
								ubicacion: {
									pais: {
										clave: 'MX',
										valor: 'MEXICO'
									},
									entidadFederativa: {
										clave: '01',
										valor: 'AGUASCALIENTES'
									}
								}
							}
						],
						aclaracionesObservaciones: 'NADA'
					},
					clientesPrincipales: {
						ninguno: false,
						cliente: [
							{
								tipoOperacion: 'SIN_CAMBIOS',
								realizaActividadLucrativa: true,
								tipoRelacion: 'DECLARANTE',
								empresa: {
									nombreEmpresaServicio: 'SERVICIOS PROFECIONALES',
									rfc: 'MITD700309MDI'
								},
								clientePrincipal: {
									tipoPersona: 'MORAL',
									nombreRazonSocial: 'COMISARIA MUNICIPAL',
									rfc: 'CAK010203VNR'
								},
								montoAproximadoGanancia: {
									valor: 14017,
									moneda: {
										clave: 'MXN',
										valor: 'PESO MEXICANO'
									}
								},
								ubicacion: {
									pais: {
										clave: 'MX',
										valor: 'MEXICO'
									},
									entidadFederativa: {
										clave: '01',
										valor: 'AGUASCALIENTES'
									}
								}
							}
						],
						aclaracionesObservaciones: 'NADA'
					},
					beneficiosPrivados: {
						ninguno: false,
						beneficio: [
							{
								tipoOperacion: 'SIN_CAMBIOS',
								tipoBeneficio: {
									clave: 'D',
									valor: 'DONACIÓN'
								},
								beneficiario: [
									{
										clave: 'DC',
										valor: 'DECLARANTE'
									}
								],
								otorgante: {
									tipoPersona: 'FISICA',
									nombreRazonSocial: 'DESPACHO JURIDICO',
									rfc: 'JUD070707GA4'
								},
								formaRecepcion: 'MONETARIO',
								especifiqueBeneficio: '',
								montoMensualAproximado: {
									valor: 8793,
									moneda: {
										clave: 'MXN',
										valor: 'PESO MEXICANO'
									}
								}
							}
						],
						aclaracionesObservaciones: 'NADA'
					},
					fideicomisos: {
						ninguno: false,
						fideicomiso: [
							{
								tipoOperacion: 'SIN_CAMBIOS',
								tipoRelacion: 'DECLARANTE',
								tipoFideicomiso: 'PUBLICO',
								tipoParticipacion: 'FIDEICOMITENTE',
								rfcFideicomiso: 'KISB970529KBI',
								fideicomitente: {
									tipoPersona: 'FISICA',
									nombreRazonSocial: 'GISSELA HUAMANI ALVA ',
									rfc: 'POXG811004PGO'
								},
								fiduciario: {
									nombreRazonSocial: 'FLOR RIOS LANDA ',
									rfc: 'NOCE920214NEO'
								},
								fideicomisario: {
									tipoPersona: 'FISICA',
									nombreRazonSocial: 'MAGNOLIA TEJEDO BAYLON ',
									rfc: 'XOVO951224XOO'
								},
								extanjero: 'MX'
							}
						],
						aclaracionesObservaciones: 'NADA'
					}
				}
			},
			id: 411
		}
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
