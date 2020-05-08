import React from 'react';
import { Grid, Typography } from '@material-ui/core';

import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { sumary, expansion } from './utils';

export default function DatosCamposPrivados(props) {
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
						<strong>Esta seccion contiene los siguientes datos de carácter reservado:</strong>
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
