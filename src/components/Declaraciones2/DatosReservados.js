import React from 'react';
import { Grid, makeStyles, Typography } from '@material-ui/core';

import style from './style';
const useStyles = makeStyles(style);

export default function DatosReservados() {
	const classes = useStyles();

	return (
		<Grid item xs={12}>
			<Typography className={classes.alertInfo} align="center">
				Los datos contenidos en esta seccion son de carácter reservado.
			</Typography>
		</Grid>
	);
}
