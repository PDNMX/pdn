import React from 'react';
import { Grid, Typography, Paper } from '@mui/material';

import makeStyles from '@mui/styles/makeStyles';

import style from './styleSecciones';
const useStyles = makeStyles(style);

export default function DatosReservados() {
	const classes = useStyles();

	return (
		<Grid item xs={12}>
			<Paper className={classes.paper}>
				<Typography className={classes.alertInfo} align="center">
					Los datos contenidos en esta seccion son de carácter reservado.
				</Typography>
			</Paper>
		</Grid>
	);
}
