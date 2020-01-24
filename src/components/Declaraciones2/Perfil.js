import React from 'react';
import { Grid, Typography, Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import MenuSuperior from './MenuSuperior';
import styles from './style';

class Perfil extends React.Component {
	state = {
		opcionMenu: 0
	};

	render() {
		let { classes, data } = this.props;

		console.log(data);
		return (
			<div>
				<Grid container spacing={0} className={classes.perfilRoot}>
					<Grid item xs={false} md={8} />
					<Grid item xs={12} md={4} className={classes.alertDanger}>
						Actualización [FECHA]
					</Grid>
					<Grid item xs={12}>
						<Paper style={{ padding: '20px 15px' }}>
							<Grid container spacing={1}>
								<Grid item xs={12} md={9}>
									<Typography variant="h5" component="h3" className={classes.tituloCard}>
										NUALA EL AKROUT GARCIA ROSADO
									</Typography>
									<Typography className={classes.dataCard}>
										bxwknqwuwjer@dependencia.gob.mx
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
										INSTITUTO POTOSINO DE INVESTIGACION CIENTIFICA Y TECNOLOGICA, A.C.
									</Typography>
								</Grid>
								<Grid item xs={12} md={3}>
									<Typography variant="h5" component="h3" className={classes.tituloCard}>
										ÁREA DE ADSCRIPCIÓN:
									</Typography>
									<Typography className={classes.dataCard}>Unidad de Politica Regulatoria</Typography>
								</Grid>
								<Grid item xs={12} md={3}>
									<Typography variant="h5" component="h3" className={classes.tituloCard}>
										ENCARGO ACTUAL:
									</Typography>
									<Typography className={classes.dataCard}>
										Enlace de Alto Nivel de Responsabilidad
									</Typography>
								</Grid>
							</Grid>
						</Paper>
					</Grid>
				</Grid>
				<Grid container spacing={0} className={classes.perfilRoot}>
					<MenuSuperior />
				</Grid>
			</div>
		);
	}
}

export default withStyles(styles)(Perfil);
