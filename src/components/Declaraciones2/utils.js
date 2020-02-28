import React from 'react';
import Grid from '@material-ui/core/Grid';

import { makeStyles } from '@material-ui/core/styles';

const getUnidad = (unidad) => {
	switch (unidad) {
		case 'm2':
			return (
				<span>
					m<sup>2</sup>
				</span>
			);
		case 'km2':
			return (
				<span>
					km<sup>2</sup>
				</span>
			);
		default:
			return unidad;
	}
};

const getMorales = (elements) => {
	return elements.filter((i) => i.tipoPersona !== 'FISICA');
};

/************** CSS *******************/
/************** Expansion *******************/
const sumary = makeStyles((theme) => ({
	root: {
		backgroundColor: '#83dfff',
		textTransform: 'uppercase'
	}
}));
const expansion = makeStyles((theme) => ({
	root: {
		width: '100%'
	},
	heading: {
		fontSize: theme.typography.pxToRem(15),
		fontWeight: theme.typography.fontWeightRegular
	}
}));
/************** Expansion *******************/

function Divider() {
	return (
		<Grid item xs={12}>
			<hr style={{ border: '4px solid #f2f2f2' }} />
		</Grid>
	);
}

export { getUnidad, getMorales, sumary, expansion, Divider };
