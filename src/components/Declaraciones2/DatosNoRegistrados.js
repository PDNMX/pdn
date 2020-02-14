import React from 'react';
import { Grid, makeStyles, Typography } from '@material-ui/core';

import style from './style';
const useStyles = makeStyles(style);

export default function DatosReservados() {
	const classes = useStyles();

	return (
		<Grid item xs={12}>
			<Typography className={classes.alertSuccess} align="center">
				El declarante no registró datos en esta sección.
			</Typography>
		</Grid>
	);
}
