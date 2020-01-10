import React from 'react';

import { Route, Switch, Link } from 'react-router-dom';
import { Grid } from '@material-ui/core';

//header data
import Header from './Header';
import S3 from '../../assets/iconos_azul/1_icono.svg';
import background from '../../assets/img/pdn_sis1.jpeg';

import Footer from '../Home/Footer';

import classNames from 'classnames';
import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import imgBuscar from '../../assets/declaraciones/servidores_declaraciones.svg';
import imgEstadisticas from '../../assets/declaraciones/estadisticas.svg';

import Busqueda from './Busqueda';
import PerfilMaterialUI from '../Declaraciones/PerfilMaterialUI';
import Stats from '../Declaraciones/Estadisticas/Stats';

import styles from './style';

const titulo =
	'Sistema de evolución patrimonial, de declaración de intereses y constancia de presentación de declaración fiscal';
const subtitulo = 'Declaraciones';
const copy =
	'Consulta y visualiza los datos <b>públicos</b> de las declaraciones patrimoniales, y de intereses, así como la constancia de declaración anual de impuestos de las y los servidores públicos.';

class Declaraciones extends React.Component {
	render() {
		const { classes } = this.props;

		return (
			<div>
				<Header logo={S3} titulo={titulo} subtitulo={subtitulo} copy={copy} background={background} />
				<Grid container spacing={0} className={classes.bgContainer}>
					<Grid item xs={12} style={{ maxWidth: 1200, margin: '0 auto' }}>
						<Grid container spacing={0}>
							<Grid
								item
								md={6}
								xs={12}
								className={classNames(
									this.props.location.pathname.includes('estadistica')
										? classes.cardSeleccionada
										: classes.card,
									'tabDeclaraciones'
								)}
							>
								<Link className={classes.link} to="/declaraciones/estadisticas">
									<figure className={classes.figure}>
										<img alt="Estadísticas" src={imgEstadisticas} className={classes.image} />
									</figure>
									<Typography
										variant="subtitle1"
										style={{
											fontWeight: this.props.location.pathname.includes('estadistica') ? 500 : 300
										}}
										className={classes.whiteText}
									>
										Visor de datos
									</Typography>
								</Link>
							</Grid>
							<Grid
								item
								md={6}
								xs={12}
								className={classNames(
									!this.props.location.pathname.includes('estadistica')
										? classes.cardSeleccionada
										: classes.card,
									'tabDeclaraciones'
								)}
							>
								<Link className={classes.link} to="/declaraciones">
									<figure className={classes.figure}>
										<img
											alt="Buscar un servidor público"
											src={imgBuscar}
											className={classes.image}
										/>
									</figure>
									<Typography
										variant="subtitle1"
										style={{
											fontWeight: !this.props.location.pathname.includes('estadistica')
												? 500
												: 300
										}}
										className={classes.whiteText}
									>
										Buscar un servidor público
									</Typography>
								</Link>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
				{/* fin menu */}
				<Grid container spacing={0}>
					<Grid item xs={12} className={classes.sectionT}>
						<Switch>
							<Route exact path="/declaraciones" component={Busqueda} />
							<Route path="/declaraciones/perfil/:id?" component={PerfilMaterialUI} />
							<Route path="/declaraciones/estadisticas" component={Stats} />
						</Switch>
					</Grid>
				</Grid>
				<Footer />
			</div>
		);
	}
}

export default withStyles(styles)(Declaraciones);
