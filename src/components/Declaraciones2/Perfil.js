import React from 'react';
import { Grid, Typography, Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import MenuSuperior from './MenuSuperior';
import SituacionPatrimonial from './SituacionPatrimonial';
import Intereses from './Intereses';
import styles from './style';
import { getMoneda } from './utils';

import Button from '@material-ui/core/Button';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

import scrollToComponent from 'react-scroll-to-component';

class Perfil extends React.Component {
	state = {
		menuSuperior: 0,
		menuSituacionPatrimonial: 0,
		menuIntereses: 0
	};

	

	refPatrimonial = (section) => {
		this.patrimonial = section;
	};

	refIntereses = (section) => {
		this.intereses = section;
	};

	handleChangeMenuSuperior = (event, newValue) => {
		this.setState((prevSate) => {
			return { ...prevSate, menuSuperior: newValue };
		});
	};

	handleChangeMenuSituacionPatrimonial = (event, newValue) => {
		this.setState(
			(prevSate) => {
				return { ...prevSate, menuSituacionPatrimonial: newValue };
			},
			() => {
				scrollToComponent(this.top, { align: 'top' });
			}
		);
	};

	handleChangeMenuIntereses = (event, newValue) => {
		this.setState(
			(prevSate) => {
				return { ...prevSate, menuIntereses: newValue };
			},
			() => {
				scrollToComponent(this.top, { align: 'top' });
			}
		);
	};

	getIngresos = (data) => {
		switch (data.metadata.tipo) {
			case 'INICIAL':
				return getMoneda(
					data.declaracion.situacionPatrimonial.ingresos.ingresoMensualNetoDeclarante.valor * 12
				);
			case 'MODIFICACIÓN':
				return getMoneda(data.declaracion.situacionPatrimonial.ingresos.ingresoAnualNetoDeclarante.valor);
			case 'CONCLUSIÓN':
				return getMoneda(data.declaracion.situacionPatrimonial.ingresos.ingresoConclusionNetoDeclarante.valor);
			default:
				break;
		}
	};

	render() {
		let { classes, data, handleGoBack, refPerfil } = this.props;
		return (
			<div>
				<Grid container spacing={0} className={classes.perfilRoot} ref={refPerfil}>
					<Grid item xs={12} md={12} style={{ textAlign: 'right', paddingBottom: '20px' }}>
						<Button
							className={classes.btnBack}
							onClick={() => handleGoBack()}
							startIcon={<ArrowBackIosIcon />}
						>
							Regresar
						</Button>
					</Grid>
					<Grid item xs={false} md={8} />
					<Grid item xs={12} md={4} className={classes.alertInfo}>
						Actualización: {data.metadata.actualizacion}
					</Grid>
					<Grid item xs={12}>
						<Paper style={{ padding: '20px 15px' }}>
							<Grid container spacing={1}>
								<Grid item xs={12} md={9}>
									<Typography variant="h5" component="h3" className={classes.tituloCard}>
										{data.declaracion.situacionPatrimonial.datosGenerales.nombre}{' '}
										{data.declaracion.situacionPatrimonial.datosGenerales.primerApellido}{' '}
										{data.declaracion.situacionPatrimonial.datosGenerales.segundoApellido}
									</Typography>
									<Typography className={classes.dataCard}>
										{
											data.declaracion.situacionPatrimonial.datosGenerales.correoElectronico
												.institucional
										}
									</Typography>
								</Grid>
								<Grid item xs={12} md={3}>
									<Typography variant="h5" component="h3" className={classes.tituloCard}>
										INGRESOS ANUALES NETOS:
									</Typography>
									<Typography className={classes.dataCard}>{this.getIngresos(data)}</Typography>
								</Grid>
								<Grid item xs={12} md={6}>
									<Typography variant="h5" component="h3" className={classes.tituloCard}>
										DEPENDENCIA:
									</Typography>
									<Typography className={classes.dataCard}>
										{
											data.declaracion.situacionPatrimonial.datosEmpleoCargoComision
												.nombreEntePublico
										}
									</Typography>
								</Grid>
								<Grid item xs={12} md={3}>
									<Typography variant="h5" component="h3" className={classes.tituloCard}>
										ÁREA DE ADSCRIPCIÓN:
									</Typography>
									<Typography className={classes.dataCard}>
										{data.declaracion.situacionPatrimonial.datosEmpleoCargoComision.areaAdscripcion}
									</Typography>
								</Grid>
								<Grid item xs={12} md={3}>
									<Typography variant="h5" component="h3" className={classes.tituloCard}>
										ENCARGO ACTUAL:
									</Typography>
									<Typography className={classes.dataCard}>
										{
											data.declaracion.situacionPatrimonial.datosEmpleoCargoComision
												.empleoCargoComision
										}
									</Typography>
								</Grid>
							</Grid>
						</Paper>
					</Grid>
				</Grid>
				<Grid
					container
					spacing={0}
					className={classes.perfilRoot}
					ref={(section) => {
						this.top = section;
					}}
				>
					<MenuSuperior
						menuSuperior={this.state.menuSuperior}
						handleChangeMenuSuperior={this.handleChangeMenuSuperior}
					/>
					{this.state.menuSuperior ? (
						<Intereses
							value={this.state.menuIntereses}
							setValue={this.handleChangeMenuIntereses}
							data={data.declaracion.interes}
							tipo={data.metadata.tipo}
						/>
					) : (
						<SituacionPatrimonial
							value={this.state.menuSituacionPatrimonial}
							setValue={this.handleChangeMenuSituacionPatrimonial}
							data={data.declaracion.situacionPatrimonial}
							tipo={data.metadata.tipo}
						/>
					)}
					<Grid item xs={12} md={12} style={{ textAlign: 'right', paddingTop: '20px' }}>
						<Button
							className={classes.btnBack}
							onClick={() => handleGoBack()}
							startIcon={<ArrowBackIosIcon />}
						>
							Regresar
						</Button>
					</Grid>
				</Grid>
			</div>
		);
	}
}

export default withStyles(styles)(Perfil);
