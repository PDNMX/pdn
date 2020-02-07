import React from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import style from '../styleSecciones';

const useStyles = makeStyles(style);

export default function MenuSuperior(props) {
	const classes = useStyles();
	const { data } = props;

	return (
		<Grid container spacing={2} className={classes.rootPrincipal}>
			<Grid item xs={12}>
				<Typography className={classes.tituloSeccion} align="center">
					5. EXPERIENCIA LABORAL (ÚLTIMOS CINCO EMPLEOS)
				</Typography>
			</Grid>
			{data.experiencia.map((exp, index) => {
				return (
					<Grid item xs={12} key={'exp-' + index}>
						<Paper className={classes.paper}>
							{exp.ambitoSector.clave === 'PUB' && (
								<Grid container spacing={1}>
									<Grid item xs={12} md={4}>
										<Typography className={classes.cardTitle}>
											ÁMBITO/SECTOR EN EL QUE LABORASTE:
										</Typography>
										<Typography className={classes.card}>{exp.ambitoSector.valor}</Typography>
									</Grid>
									<Grid item xs={12} md={4}>
										<Typography className={classes.cardTitle}>NIVEL/ORDEN DE GOBIERNO</Typography>
										<Typography className={classes.card}>{exp.nivelOrdenGobierno}</Typography>
									</Grid>
									<Grid item xs={12} md={4}>
										<Typography className={classes.cardTitle}>ÁMBITO PÚBLICO</Typography>
										<Typography className={classes.card}>{exp.ambitoPublico}</Typography>
									</Grid>
									<Grid item xs={12} md={4}>
										<Typography className={classes.cardTitle}>
											NOMBRE DEL ENTE PÚBLICO/NOMBRE DE LA EMPRESA, SOCIEDAD O ASOCIACIÓN
										</Typography>
										<Typography className={classes.card}>{exp.nombreEntePublico}</Typography>
									</Grid>
									<Grid item xs={12} md={4}>
										<Typography className={classes.cardTitle}>ÁREA DE ADSCRIPCIÓN/ÁREA</Typography>
										<Typography className={classes.card}>{exp.areaAdscripcion}</Typography>
									</Grid>
									<Grid item xs={12} md={4}>
										<Typography className={classes.cardTitle}>
											EMPLEO, CARGO O COMISIÓN/PUESTO
										</Typography>
										<Typography className={classes.card}>{exp.empleoCargoComision}</Typography>
									</Grid>
									<Grid item xs={12} md={4}>
										<Typography className={classes.cardTitle}>
											ESPECIFIQUE FUNCIÓN PRINCIPAL
										</Typography>
										<Typography className={classes.card}>{exp.funcionPrincipal}</Typography>
									</Grid>
									<Grid item xs={12} md={4}>
										<Typography className={classes.cardTitle}>FECHA DE INGRESO</Typography>
										<Typography className={classes.card}>{exp.fechaIngreso}</Typography>
									</Grid>
									<Grid item xs={12} md={4}>
										<Typography className={classes.cardTitle}>FECHA DE EGRESO</Typography>
										<Typography className={classes.card}>{exp.fechaEgreso}</Typography>
									</Grid>
									<Grid item xs={12} md={4}>
										<Typography className={classes.cardTitle}>LUGAR DONDE SE UBICA</Typography>
										<Typography className={classes.card}>{exp.ubicacion}</Typography>
									</Grid>
								</Grid>
							)}
							{exp.ambitoSector.clave !== 'PUB' && (
								<Grid container spacing={1}>
									<Grid item xs={12} md={4}>
										<Typography className={classes.cardTitle}>
											ÁMBITO/SECTOR EN EL QUE LABORASTE:
										</Typography>
										<Typography className={classes.card}>{exp.ambitoSector.valor}</Typography>
									</Grid>
									<Grid item xs={12} md={4}>
										<Typography className={classes.cardTitle}>
											NOMBRE DEL ENTE PÚBLICO/NOMBRE DE LA EMPRESA, SOCIEDAD O ASOCIACIÓN
										</Typography>
										<Typography className={classes.card}>
											{exp.nombreEmpresaSociedadAsociacion}
										</Typography>
									</Grid>
									<Grid item xs={12} md={4}>
										<Typography className={classes.cardTitle}>RFC</Typography>
										<Typography className={classes.card}>{exp.rfc}</Typography>
									</Grid>
									<Grid item xs={12} md={4}>
										<Typography className={classes.cardTitle}>ÁREA DE ADSCRIPCIÓN/ÁREA</Typography>
										<Typography className={classes.card}>{exp.areaAdscripcion}</Typography>
									</Grid>
									<Grid item xs={12} md={4}>
										<Typography className={classes.cardTitle}>
											EMPLEO, CARGO O COMISIÓN/PUESTO
										</Typography>
										<Typography className={classes.card}>{exp.empleoCargoComision}</Typography>
									</Grid>
									<Grid item xs={12} md={4}>
										<Typography className={classes.cardTitle}>SECTOR AL QUE PERTENECE</Typography>
										<Typography className={classes.card}>{exp.sector.valor}</Typography>
									</Grid>
									<Grid item xs={12} md={4}>
										<Typography className={classes.cardTitle}>FECHA DE INGRESO</Typography>
										<Typography className={classes.card}>{exp.fechaIngreso}</Typography>
									</Grid>
									<Grid item xs={12} md={4}>
										<Typography className={classes.cardTitle}>FECHA DE EGRESO</Typography>
										<Typography className={classes.card}>{exp.fechaEgreso}</Typography>
									</Grid>
									<Grid item xs={12} md={4}>
										<Typography className={classes.cardTitle}>LUGAR DONDE SE UBICA</Typography>
										<Typography className={classes.card}>{exp.ubicacion}</Typography>
									</Grid>
								</Grid>
							)}
						</Paper>
					</Grid>
				);
			})}
		</Grid>
	);
}
