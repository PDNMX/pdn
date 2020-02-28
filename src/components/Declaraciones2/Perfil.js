import React from 'react';
import { Grid, Typography, Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import MenuSuperior from './MenuSuperior';
import SituacionPatrimonial from './SituacionPatrimonial';
import Intereses from './Intereses';
import styles from './style';

class Perfil extends React.Component {
	state = {
		menuSuperior: 0,
		menuSituacionPatrimonial: 14,
		menuIntereses: 0
	};

	handleChangeMenuSuperior = (event, newValue) => {
		this.setState((prevSate) => {
			return { ...prevSate, menuSuperior: newValue };
		});
	};

	handleChangeMenuSituacionPatrimonial = (event, newValue) => {
		this.setState((prevSate) => {
			return { ...prevSate, menuSituacionPatrimonial: newValue };
		});
	};

	handleChangeMenuIntereses = (event, newValue) => {
		this.setState((prevSate) => {
			return { ...prevSate, menuIntereses: newValue };
		});
	};

	render() {
		let { classes, data } = this.props;
		return (
			<div>
				<Grid container spacing={0} className={classes.perfilRoot}>
					<Grid item xs={false} md={8} />
					<Grid item xs={12} md={4} className={classes.alertInfo}>
						Actualización: {data.metadata.actualizacion}
					</Grid>
					<Grid item xs={12}>
						<Paper style={{ padding: '20px 15px' }}>
							<Grid container spacing={1}>
								<Grid item xs={12} md={9}>
									<Typography variant="h5" component="h3" className={classes.tituloCard}>
										{data.declaracion.situacionPatrimonial.datosGenerales.nombres}{' '}
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
									<Typography className={classes.dataCard}>$16,058,713.00</Typography>
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
				<Grid container spacing={0} className={classes.perfilRoot}>
					<MenuSuperior
						menuSuperior={this.state.menuSuperior}
						handleChangeMenuSuperior={this.handleChangeMenuSuperior}
					/>
					{this.state.menuSuperior ? (
						<Intereses
							value={this.state.menuIntereses}
							setValue={this.handleChangeMenuIntereses}
							data={data.declaracion.interes}
						/>
					) : (
						<SituacionPatrimonial
							value={this.state.menuSituacionPatrimonial}
							setValue={this.handleChangeMenuSituacionPatrimonial}
							data={data.declaracion.situacionPatrimonial}
						/>
					)}
				</Grid>
			</div>
		);
	}
}

export default withStyles(styles)(Perfil);
