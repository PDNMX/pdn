import React from 'react';
import { Grid, makeStyles, Typography } from '@material-ui/core';

import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import style from './style';
const useStyles = makeStyles(style);

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

export default function DatosCamposPrivados(props) {
	const classes = useStyles();
	const exp = expansion();
	const sum = sumary();
	const { campos } = props;

	return (
		<Grid item xs={12}>
			<ExpansionPanel>
				<ExpansionPanelSummary
					classes={sum}
					expandIcon={<ExpandMoreIcon />}
					aria-controls="panel1a-content"
					id="panel1a-header"
				>
					<Typography className={exp.heading}>
						<strong>Esta seccion contiene los siguientes datos de caracter reservado:</strong>
					</Typography>
				</ExpansionPanelSummary>
				<ExpansionPanelDetails>
					<ul>
						{campos.map((campo, index) => {
							return <li key={'campo-' + index}>{campo}</li>;
						})}
					</ul>
				</ExpansionPanelDetails>
			</ExpansionPanel>
		</Grid>
	);
}
