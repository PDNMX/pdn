import React from 'react';
import { Grid, Typography } from '@mui/material';


import { BoxAccordion, BoxAccordionSummary, BoxAccordionDetails } from "../common/BoxAccordion";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { sumary, expansion } from './utils';

export default function DatosCamposPrivados(props) {
	const exp = expansion();
	const sum = sumary();
	const { campos } = props;

	return (
		<Grid item xs={12}>
			<BoxAccordion>
				<BoxAccordionSummary
					classes={sum}
					expandIcon={<ExpandMoreIcon />}
					aria-controls="panel1a-content"
					id="panel1a-header"
				>
					<Typography className={exp.heading}>
						<strong>Esta seccion contiene los siguientes datos de carácter reservado:</strong>
					</Typography>
				</BoxAccordionSummary>
				<BoxAccordionDetails>
					<ul>
						{campos.map((campo, index) => {
							return <li key={'campo-' + index}>{campo}</li>;
						})}
					</ul>
				</BoxAccordionDetails>
			</BoxAccordion>
		</Grid>
	);
}
